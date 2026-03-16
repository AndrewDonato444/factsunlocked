import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is not set");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

interface SceneScript {
  name: string;
  script: string;
  direction?: string;
}

function writeWav(filepath: string, pcmData: Buffer, sampleRate: number = 24000, channels: number = 1, bitDepth: number = 16) {
  const byteRate = sampleRate * channels * (bitDepth / 8);
  const blockAlign = channels * (bitDepth / 8);
  const dataSize = pcmData.length;
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitDepth, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);
  fs.writeFileSync(filepath, Buffer.concat([header, pcmData]));
}

const callTTS = ai.models.generateContent.bind(ai.models);

async function generateWithRetry(
  params: Parameters<typeof ai.models.generateContent>[0],
  retries = 3,
): ReturnType<typeof ai.models.generateContent> {
  for (let i = 0; i < retries; i++) {
    try {
      return await callTTS(params);
    } catch (e: unknown) {
      const status = (e as { status?: number }).status;
      if (status === 429 && i < retries - 1) {
        console.log(`  Rate limited, waiting ${15 * (i + 1)}s...`);
        await new Promise(r => setTimeout(r, 15000 * (i + 1)));
        continue;
      }
      throw e;
    }
  }
  throw new Error(`generateWithRetry: all ${retries} attempts failed`);
}

async function generateVoiceover(scenes: SceneScript[], voice: string = "Aoede") {
  const outputDir = path.join(__dirname, "..", "public", "audio");
  fs.mkdirSync(outputDir, { recursive: true });

  const manifest: Record<string, { file: string; durationSec: number }> = {};

  for (const scene of scenes) {
    console.log(`Generating: ${scene.name}...`);
    const prompt = scene.direction
      ? `Speak in a ${scene.direction} tone:\n${scene.script}`
      : scene.script;

    const response = await generateWithRetry({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    const data = response.candidates![0].content!.parts![0].inlineData!.data!;
    const audioBuffer = Buffer.from(data, "base64");

    const filepath = path.join(outputDir, `${scene.name}.wav`);
    writeWav(filepath, audioBuffer);

    const durationSec = audioBuffer.length / (24000 * 2);
    manifest[scene.name] = { file: `audio/${scene.name}.wav`, durationSec };
    console.log(`  Saved: ${filepath} (${durationSec.toFixed(1)}s)`);
  }

  const manifestPath = path.join(outputDir, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nTiming manifest: ${manifestPath}`);

  return manifest;
}

// Script for "A Baby's Stomach Is the Size of a Marble"
const scenes: SceneScript[] = [
  {
    name: "scene-1-hook",
    script: "A newborn's stomach is the size of a marble. A tiny, little marble. That's it.",
    direction: "warm, surprised, like sharing an amazing secret with a friend",
  },
  {
    name: "scene-2-body",
    script: "On day one, your baby's stomach holds just five to seven milliliters. That's about a teaspoon. By day three, it's the size of a walnut. By one week, an apricot. And by one month, it's about the size of an egg. That's why newborns eat every two hours. Their tank is tiny, but their appetite is huge.",
  },
  {
    name: "scene-3-cta",
    script: "Follow for more mind-blowing baby facts you never knew you needed.",
  },
];

generateVoiceover(scenes).catch(console.error);
