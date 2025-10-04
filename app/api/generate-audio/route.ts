import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const { 
      voiceName = 'Zephyr',
      speakingStyle = 'A deep, measured Urdu voice with precise diction, classical intonation, poetic rhythm, and theatrical pauses full of gravitas.',
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

    console.log('Google AI TTS Response received');

    // Extract audio data from response
    const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!audioData) {
      throw new Error('No audio data received from Google AI');
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
    const filePath = join(process.cwd(), 'public', 'generated-audio', fileName);

    // Ensure directory exists
    const { mkdir } = require('fs/promises');
    const { dirname } = require('path');
    await mkdir(dirname(filePath), { recursive: true });

    // Save WAV file
    await writeFile(filePath, wavBuffer);

    console.log(`Successfully created WAV file: ${fileName}`);
    console.log(`File size: ${wavBuffer.length} bytes`);

    return NextResponse.json({
      success: true,
      fileName: fileName,
      audioUrl: `/generated-audio/${fileName}`,
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