import * as fs from "node:fs";
import * as path from "node:path";
import * as https from "node:https";

const apiKey = process.env.XAI_API_KEY;
if (!apiKey) { console.error("XAI_API_KEY is not set"); process.exit(1); }

interface SceneScript { name: string; script: string; }

function callGrokTTS(text: string, voice: string = "ara"): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      text,
      voice_id: voice,
      language: "en",
      output_format: { codec: "wav", sample_rate: 24000 },
    });
    const req = https.request("https://api.x.ai/v1/tts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    }, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (c: Buffer) => chunks.push(c));
      res.on("end", () => {
        const buf = Buffer.concat(chunks);
        if (res.statusCode !== 200) {
          reject(new Error(`Grok TTS error ${res.statusCode}: ${buf.toString()}`));
        } else {
          resolve(buf);
        }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function getWavDuration(wavBuffer: Buffer): number {
  const sampleRate = wavBuffer.readUInt32LE(24);
  const bitsPerSample = wavBuffer.readUInt16LE(34);
  const channels = wavBuffer.readUInt16LE(22);
  const dataSize = wavBuffer.length - 44;
  return dataSize / (sampleRate * channels * (bitsPerSample / 8));
}

async function generateVoiceover(scenes: SceneScript[]) {
  const outputDir = path.join(__dirname, "..", "public", "audio");
  fs.mkdirSync(outputDir, { recursive: true });
  const manifest: Record<string, { file: string; durationSec: number }> = {};

  for (const scene of scenes) {
    console.log(`Generating: ${scene.name}...`);
    const wavBuffer = await callGrokTTS(scene.script);
    const filepath = path.join(outputDir, `${scene.name}.wav`);
    fs.writeFileSync(filepath, wavBuffer);
    const durationSec = getWavDuration(wavBuffer);
    manifest[scene.name] = { file: `audio/${scene.name}.wav`, durationSec };
    console.log(`  Saved: ${filepath} (${durationSec.toFixed(1)}s)`);
  }

  const manifestPath = path.join(outputDir, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nTiming manifest: ${manifestPath}`);
  return manifest;
}

const scenes: SceneScript[] = [
  { name: "scene-1-hook", script: "Your newborn can swim. Well, sort of." },
  { name: "scene-2-body", script: "It's called the dive reflex, and every baby is born with it. When a newborn's face touches water, three things happen automatically. They hold their breath. Their arms and legs start moving in a swimming motion. And their heart rate actually slows down to conserve oxygen. Scientists believe it's left over from our evolutionary past. But here's the thing. This incredible reflex disappears around six months old. Gone forever." },
  { name: "scene-3-cta", script: "Subscribe for more mind-blowing baby facts you never knew you needed." },
];

generateVoiceover(scenes).catch(console.error);
