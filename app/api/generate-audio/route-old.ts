import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

// Create WAV header for PCM audio data
function createWAVHeader(pcmData: Buffer, sampleRate = 24000, channels = 1, bitsPerSample = 16) {
  const header = Buffer.alloc(44);
  const byteRate = sampleRate * channels * (bitsPerSample / 8);
  const blockAlign = channels * (bitsPerSample / 8);
  const dataSize = pcmData.length;
  const fileSize = 36 + dataSize;

  // RIFF chunk descriptor
  header.write('RIFF', 0);
  header.writeUInt32LE(fileSize, 4);
  header.write('WAVE', 8);

  // fmt sub-chunk
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // Sub-chunk size
  header.writeUInt16LE(1, 20);  // Audio format (PCM)
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);

  // data sub-chunk
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return header;
}

export async function POST(request: NextRequest) {
  try {
    const { 
      voiceName = 'Kore',
      speakingStyle = 'Say cheerfully',
      content
    } = await request.json();

    // Validation
    if (!content || content.trim() === '') {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Initialize Google GenAI with API key from environment
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY
    });

    console.log('Generating audio with Google AI TTS...');
    console.log('Voice Name:', voiceName);
    console.log('Speaking Style:', speakingStyle);
    console.log('Content:', content);

    // Combine speaking style with content
    const fullText = `${speakingStyle}: ${content}`;

    // Generate audio using Google GenAI TTS
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: fullText }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName },
          },
        },
      },
    });

    console.log('Google AI TTS Response received, processing audio...');
    console.log('Full response:', JSON.stringify(response, null, 2));

    // Extract audio data from response
    const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    const mimeType = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.mimeType;
    
    console.log('Mime type:', mimeType);
    console.log('Data length:', data ? data.length : 'No data');
    
    if (!data) {
      throw new Error('No audio data received from Google AI');
    }

    // Convert base64 to buffer (this is raw PCM audio data from Google)
    const pcmBuffer = Buffer.from(data, 'base64');
    console.log('PCM buffer size:', pcmBuffer.length);

    // Create proper WAV file with header
    const wavHeader = createWAVHeader(pcmBuffer);
    const wavBuffer = Buffer.concat([wavHeader, pcmBuffer]);
    console.log('WAV buffer size (with header):', wavBuffer.length);

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `audio_${timestamp}.wav`;
    const filePath = join(process.cwd(), 'public', 'generated-audio', fileName);

    // Ensure directory exists
    const { mkdir } = require('fs/promises');
    const { dirname } = require('path');
    await mkdir(dirname(filePath), { recursive: true });

    // Save WAV file with proper header
    await writeFile(filePath, wavBuffer);

    // Generate public URL for the audio file
    const audioUrl = `/generated-audio/${fileName}`;

    console.log(`Successfully generated audio: ${fileName}`);
    console.log(`File saved at: ${filePath}`);
    console.log(`Public URL: ${audioUrl}`);

    return NextResponse.json({
      success: true,
      audioUrl: audioUrl,
      fileName: fileName,
      voiceName: voiceName,
      speakingStyle: speakingStyle,
      content: content,
      fullText: fullText,
      fileSize: wavBuffer.length,
      mimeType: mimeType || 'audio/wav',
      generatedAt: new Date().toISOString()
    });

  } catch (error: unknown) {
    console.error('Audio generation error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    
    return NextResponse.json(
      { 
        error: "Failed to generate audio",
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}