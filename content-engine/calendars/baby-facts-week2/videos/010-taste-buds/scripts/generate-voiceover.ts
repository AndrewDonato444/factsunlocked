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
  { name: "scene-1-hook", script: "Your baby can taste way more than you can. And it's not even close." },
  { name: "scene-2-body", script: "Babies are born with about ten thousand taste buds. Adults? Only around five thousand. And here's what makes it even crazier. Adult taste buds are mostly on the tongue. But baby taste buds are everywhere. The tongue, the roof of the mouth, the back of the throat, even the sides of the cheeks. Everything they eat or drink lights up their entire mouth. That's why babies react so strongly to new flavors. It's not that they're being picky. They're literally tasting more than you are." },
  { name: "scene-3-cta", script: "Subscribe for more mind-blowing baby facts you never knew you needed." },
];

generateVoiceover(scenes).catch(console.error);
