import { Request, Response } from 'express';
import { GoogleAuth } from 'google-auth-library';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';

// Google Cloud Configuration
const PROJECT_ID = process.env.GCP_PROJECT_ID!;
const REGION = process.env.GCP_REGION || 'us-east5';
const CREDENTIALS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS!;

// Initialize Google Auth
const auth = new GoogleAuth({
  keyFilename: CREDENTIALS_PATH,
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

// ============================================
// SCRIPT GENERATION (Claude 3.7 Sonnet)
// ============================================
export const generateScript = asyncHandler(async (req: Request, res: Response) => {
  const {
    channelName,
    targetAudienceAge,
    language,
    scriptLength,
    targetMarket,
    prompt
  } = req.body;

  // Validation
  if (!channelName || !targetAudienceAge || !language || !scriptLength || !targetMarket || !prompt) {
    throw new ApiError(400, 'All fields are required');
  }

  // Get OAuth2 access token
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();

  if (!accessToken.token) {
    throw new ApiError(500, 'Failed to get access token');
  }

  // Vertex AI endpoint for Claude
  const MODEL = 'claude-3-7-sonnet@20250219';
  const ENDPOINT = `https://${REGION}-aiplatform.googleapis.com`;
  const url = `${ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${REGION}/publishers/anthropic/models/${MODEL}:rawPredict`;

  // Build professional prompt
  const systemPrompt = `You are an expert YouTube scriptwriter with strong knowledge of storytelling, audience engagement, and content structure. I am creating a video with the following details. Please use them to generate a well-researched, high-retention script.

VIDEO DETAILS:
• Title: ${prompt}
• Key Points Summary: ${prompt}
• Target Audience Age: ${targetAudienceAge}
• Language: ${language}
• Script Length: ${scriptLength}
• Target Market: ${targetMarket}
• Channel Name: ${channelName}

SCRIPT GUIDELINES:
1. Use a friendly, conversational tone (not robotic or overly formal).
2. Add 2–3 light, natural jokes based on the topic and audience.
3. Place a natural Call to Action (Like, Subscribe, Comment) at a point in the script where engagement is likely to be high — not just at the end.
4. Ask 1–2 interesting questions in the middle of the script to encourage audience comments.
5. Ensure all information is accurate and properly researched — no made-up data.
6. Mention the channel name once near the beginning and once near the end in a natural way.
7. Use strong 30s hook at the start, smooth transitions between sections, and an engaging ending.
8. End with a warm sign-off

OUTPUT:
A complete, ready-to-use YouTube script that:
• Is engaging and friendly
• Includes humor
• Drives audience interaction
• Mentions the channel name
• Uses accurate, researched content
• Flows naturally from start to end

Please generate a high-quality YouTube script following these guidelines.`;

  // Call Vertex AI
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      anthropic_version: 'vertex-2023-10-16',
      messages: [{
        role: 'user',
        content: systemPrompt
      }],
      max_tokens: 4096,
      temperature: 0.7,
      top_k: 40,
      top_p: 0.95
    })
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Vertex AI API error:', errorData);
    throw new ApiError(response.status, 'Failed to generate script from Vertex AI');
  }

  const data = await response.json();
  const generatedScript = data.content?.[0]?.text;

  if (!generatedScript) {
    throw new ApiError(500, 'No script generated');
  }

  res.json(new ApiResponse(true, 'Script generated successfully', {
    script: generatedScript
  }));
});

// ============================================
// IMAGE GENERATION (Google Imagen 4.0)
// ============================================
export const generateImage = asyncHandler(async (req: Request, res: Response) => {
  const { 
    prompt, 
    numberOfImages = 1,
    sampleImageSize = "1K",
    aspectRatio = "1:1",
    personGeneration = "allow_all"
  } = req.body;

  // Validation
  if (!prompt || prompt.trim() === '') {
    throw new ApiError(400, 'Prompt is required');
  }

  if (numberOfImages < 1 || numberOfImages > 4) {
    throw new ApiError(400, 'Number of images must be between 1 and 4');
  }

  // Initialize Google GenAI with API key
  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY!
  });

  console.log('Generating images with Google Imagen...');
  console.log('Prompt:', prompt);
  console.log('Number of images:', numberOfImages);

  // Generate images using Imagen 4.0
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-fast-generate-001',
    prompt: prompt,
    config: {
      numberOfImages: numberOfImages,
      aspectRatio: aspectRatio,
      personGeneration: personGeneration
    },
  });

  console.log('Google Imagen Response received, processing images...');

  // Process generated images
  const images = [];
  let idx = 1;
  
  if (response.generatedImages && response.generatedImages.length > 0) {
    for (const generatedImage of response.generatedImages) {
      if (generatedImage.image && generatedImage.image.imageBytes) {
        const imgBytes = generatedImage.image.imageBytes;
        
        images.push({
          id: `imagen-${idx}`,
          base64: imgBytes,
          dataUrl: `data:image/png;base64,${imgBytes}`,
          filename: `imagen-${idx}.png`,
          index: idx
        });
        idx++;
      }
    }
  }

  // Calculate tokens used (estimate)
  const tokensUsed = numberOfImages * Math.ceil(prompt.length / 4);

  console.log(`Successfully generated ${images.length} images`);
  console.log(`Tokens used: ${tokensUsed}`);

  res.json(new ApiResponse(true, 'Images generated successfully', {
    images: images,
    tokensUsed: tokensUsed,
    prompt: prompt,
    numberOfImages: numberOfImages,
    config: {
      sampleImageSize,
      aspectRatio, 
      personGeneration
    },
    generatedAt: new Date().toISOString()
  }));
});

// ============================================
// AUDIO GENERATION (Google TTS - Gemini 2.5 Flash)
// ============================================
export const generateAudio = asyncHandler(async (req: Request, res: Response) => {
  const { 
    text,
    voice = 'Zephyr',
    emotion = 'Urdu Poetry',
    speed = 0.9
  } = req.body;

  // Validation
  if (!text || text.trim() === '') {
    throw new ApiError(400, 'Text is required');
  }

  // Initialize Google GenAI with API key
  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY!
  });

  console.log('Generating audio with Gemini 2.5 Flash TTS...');
  console.log('Voice:', voice);
  console.log('Emotion:', emotion);
  console.log('Speed:', speed);
  console.log('Text:', text);

  // Generate audio using Gemini 2.5 Flash TTS
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: text }] }],
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: voice },
        },
      },
    },
  });

  console.log('Google AI TTS Response received');

  // Extract audio data from response
  const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  
  if (!audioData) {
    throw new ApiError(500, 'No audio data received from Google AI');
  }

  // Convert base64 to buffer - this is raw PCM audio data
  const pcmBuffer = Buffer.from(audioData, 'base64');
  console.log('PCM buffer size:', pcmBuffer.length);

  // Create WAV header for 24kHz, 16-bit, mono PCM
  const createWAVHeader = (dataSize: number) => {
    const header = Buffer.alloc(44);
    const sampleRate = 24000;
    const channels = 1;
    const bitsPerSample = 16;
    const byteRate = sampleRate * channels * (bitsPerSample / 8);
    const blockAlign = channels * (bitsPerSample / 8);

    // RIFF chunk
    header.write('RIFF', 0);
    header.writeUInt32LE(36 + dataSize, 4);
    header.write('WAVE', 8);

    // fmt chunk
    header.write('fmt ', 12);
    header.writeUInt32LE(16, 16);
    header.writeUInt16LE(1, 20);
    header.writeUInt16LE(channels, 22);
    header.writeUInt32LE(sampleRate, 24);
    header.writeUInt32LE(byteRate, 28);
    header.writeUInt16LE(blockAlign, 32);
    header.writeUInt16LE(bitsPerSample, 34);

    // data chunk
    header.write('data', 36);
    header.writeUInt32LE(dataSize, 40);

    return header;
  };

  // Create proper WAV file
  const wavHeader = createWAVHeader(pcmBuffer.length);
  const wavBuffer = Buffer.concat([wavHeader, pcmBuffer]);

  // Generate unique filename
  const timestamp = Date.now();
  const fileName = `audio_${timestamp}.wav`;

  // Save file (optional - for keeping records)
  const fs = await import('fs/promises');
  const path = await import('path');
  const filePath = path.join(process.cwd(), 'public', 'generated-audio', fileName);
  
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, wavBuffer);
    console.log(`Successfully created WAV file: ${fileName}`);
    console.log(`File size: ${wavBuffer.length} bytes`);
  } catch (error) {
    console.warn('Failed to save audio file locally:', error);
  }

  // Return the audio file as blob
  res.setHeader('Content-Type', 'audio/wav');
  res.setHeader('Content-Length', wavBuffer.length.toString());
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.send(wavBuffer);
});

// ============================================
// VIDEO GENERATION (RunwayML / Synthesia)
// ============================================
export const generateVideo = asyncHandler(async (req: Request, res: Response) => {
  const { prompt, duration, aspectRatio } = req.body;

  // Validation
  if (!prompt) {
    throw new ApiError(400, 'Prompt is required');
  }

  // TODO: Integrate with RunwayML or Synthesia
  // For now, placeholder response

  res.json(new ApiResponse(true, 'Video generation endpoint', {
    message: 'Video generation will be implemented with RunwayML/Synthesia',
    prompt,
    duration: duration || '5s',
    aspectRatio: aspectRatio || '16:9'
  }));
});
