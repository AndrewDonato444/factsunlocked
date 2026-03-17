import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) { console.error("GEMINI_API_KEY is not set — skipping image generation"); process.exit(0); }

const ai = new GoogleGenAI({ apiKey });
const callGenerateContent = ai.models.generateContent.bind(ai.models);

async function generateWithRetry(params: Parameters<typeof ai.models.generateContent>[0], retries = 3): ReturnType<typeof ai.models.generateContent> {
  for (let i = 0; i < retries; i++) {
    try { return await callGenerateContent(params); }
    catch (e: unknown) {
      const status = (e as { status?: number }).status;
      if (status === 429 && i < retries - 1) { const w = 15*(i+1); console.log(`  Rate limited, waiting ${w}s...`); await new Promise(r => setTimeout(r, w*1000)); continue; }
      throw e;
    }
  }
  throw new Error("all retries failed");
}

async function generateAssets(requests: { name: string; prompt: string; aspectRatio: string }[]) {
  const outputDir = path.join(__dirname, "..", "public", "images");
  fs.mkdirSync(outputDir, { recursive: true });
  const manifest: Record<string, { file: string; prompt: string; model: string; generatedAt: string }> = {};

  for (let i = 0; i < requests.length; i++) {
    const req = requests[i];
    console.log(`Generating image: ${req.name}...`);
    try {
      const response = await generateWithRetry({
        model: "gemini-2.5-flash-image",
        contents: req.prompt,
        config: { responseModalities: ["TEXT", "IMAGE"], imageConfig: { aspectRatio: req.aspectRatio as any } },
      });
      const imagePart = response.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData);
      if (imagePart && imagePart.inlineData) {
        const buffer = Buffer.from(imagePart.inlineData.data!, "base64");
        const filepath = path.join(outputDir, `${req.name}.png`);
        fs.writeFileSync(filepath, buffer);
        console.log(`  Saved: ${filepath} (${(buffer.length / 1024).toFixed(0)} KB)`);
        manifest[req.name] = { file: `images/${req.name}.png`, prompt: req.prompt, model: "gemini-2.5-flash-image", generatedAt: new Date().toISOString() };
      } else { console.warn(`  No image returned for ${req.name}`); }
    } catch (e) { console.error(`  Failed: ${req.name}`, e); }
    if (i < requests.length - 1) await new Promise(r => setTimeout(r, 2000));
  }

  fs.writeFileSync(path.join(outputDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`\nImage manifest written`);
  return manifest;
}

const requests = [
  {
    name: "bg-scene-1",
    prompt: "Photorealistic close-up of a doctor's stethoscope on a newborn baby's tiny chest, warm soft lighting, tender medical examination scene. Shallow depth of field, golden warm tones. No text, no watermarks, no logos, no words. Portrait orientation, suitable as a video background with space for text overlay.",
    aspectRatio: "2:3",
  },
  {
    name: "bg-scene-2",
    prompt: "Photorealistic image of a tiny baby sleeping peacefully with a visible heartbeat monitor in the background showing a fast pulse, soft warm hospital nursery lighting, educational and calming mood. No text, no watermarks, no logos, no words. Portrait orientation, suitable as a video background with space for text overlay.",
    aspectRatio: "2:3",
  },
  {
    name: "bg-scene-3",
    prompt: "Photorealistic warm close-up of a smiling baby being held against a parent's chest, soft golden hour lighting, heartwarming and cozy mood, blurred nursery background. No text, no watermarks, no logos, no words. Portrait orientation, suitable as a video background with space for text overlay.",
    aspectRatio: "2:3",
  },
];

generateAssets(requests).catch(console.error);
