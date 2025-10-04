import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

// WAV header creation function
function createWavHeader(audioBuffer: Buffer, sampleRate = 24000, channels = 1, bitsPerSample = 16) {
  const header = Buffer.alloc(44);
  
  // RIFF identifier
  header.write('RIFF', 0);
  // File size
  header.writeUInt32LE(36 + audioBuffer.length, 4);
  // WAVE identifier
  header.write('WAVE', 8);
  // Format chunk identifier
  header.write('fmt ', 12);
  // Format chunk length
  header.writeUInt32LE(16, 16);
  // Sample format (PCM)
  header.writeUInt16LE(1, 20);
  // Channel count
  header.writeUInt16LE(channels, 22);
  // Sample rate
  header.writeUInt32LE(sampleRate, 24);
  // Byte rate
  header.writeUInt32LE(sampleRate * channels * bitsPerSample / 8, 28);
  // Block align
  header.writeUInt16LE(channels * bitsPerSample / 8, 32);
  // Bits per sample
  header.writeUInt16LE(bitsPerSample, 34);
  // Data chunk identifier
  header.write('data', 36);
  // Data chunk length
  header.writeUInt32LE(audioBuffer.length, 40);
  
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

    // Extract audio data from response
    const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!data) {
      throw new Error('No audio data received from Google AI');
    }

    // Convert base64 to buffer (this is raw PCM data)
    const pcmBuffer = Buffer.from(data, 'base64');

    // Create proper WAV file with header
    const wavHeader = createWavHeader(pcmBuffer);
    const wavBuffer = Buffer.concat([wavHeader, pcmBuffer]);

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `audio_${timestamp}.wav`;
    const filePath = join(process.cwd(), 'public', 'generated-audio', fileName);

    // Ensure directory exists
    const { mkdir } = require('fs/promises');
    const { dirname } = require('path');
    await mkdir(dirname(filePath), { recursive: true });

    // Save audio file with proper WAV format
    await writeFile(filePath, wavBuffer);

    // Generate public URL for the audio file
    const audioUrl = `/generated-audio/${fileName}`;

    console.log(`Successfully generated audio: ${fileName}`);

    return NextResponse.json({
      success: true,
      audioUrl: audioUrl,
      fileName: fileName,
      voiceName: voiceName,
      speakingStyle: speakingStyle,
      content: content,
      fullText: fullText,
      fileSize: wavBuffer.length,
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