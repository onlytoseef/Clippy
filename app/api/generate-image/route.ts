import { GoogleGenAI } from "@google/genai"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { 
      prompt, 
      numberOfImages = 1,
      sampleImageSize = "1K",
      aspectRatio = "1:1",
      personGeneration = "allow_adult"
    } = await request.json()

    // Validation
    if (!prompt || prompt.trim() === '') {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      )
    }

    if (numberOfImages < 1 || numberOfImages > 4) {
      return NextResponse.json(
        { error: "Number of images must be between 1 and 4" },
        { status: 400 }
      )
    }

    // Initialize Google GenAI with API key from environment
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY
    })

    console.log('Generating images with Google AI Studio...')
    console.log('Prompt:', prompt)
    console.log('Number of images:', numberOfImages)

    // Generate images using the exact format from Google documentation
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-fast-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: numberOfImages,
        aspectRatio: aspectRatio,
        personGeneration: personGeneration
      },
    })

    console.log('Google AI Response received, processing images...')

    // Process generated images - exact format from your example
    const images = []
    let idx = 1
    
    if (response.generatedImages && response.generatedImages.length > 0) {
      for (const generatedImage of response.generatedImages) {
        if (generatedImage.image && generatedImage.image.imageBytes) {
          const imgBytes = generatedImage.image.imageBytes
          
          images.push({
            id: `imagen-${idx}`,
            base64: imgBytes,
            dataUrl: `data:image/png;base64,${imgBytes}`,
            filename: `imagen-${idx}.png`,
            index: idx
          })
          idx++
        }
      }
    }

    // Calculate tokens used (estimate based on prompt and images)
    const tokensUsed = numberOfImages * Math.ceil(prompt.length / 4)

    console.log(`Successfully generated ${images.length} images`)
    console.log(`Tokens used: ${tokensUsed}`)

    return NextResponse.json({
      success: true,
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
    })

  } catch (error: unknown) {
    console.error('Image generation error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    
    return NextResponse.json(
      { 
        error: "Failed to generate images",
        details: errorMessage 
      },
      { status: 500 }
    )
  }
}