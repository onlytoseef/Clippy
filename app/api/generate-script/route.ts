import { NextRequest, NextResponse } from "next/server";
import { GoogleAuth } from 'google-auth-library';

// Make sure to set your environment variables in .env.local
const PROJECT_ID = process.env.GCP_PROJECT_ID!;
const REGION = process.env.GCP_REGION || "us-east5";

// Vertex AI REST API endpoint for Claude
const VERTEX_AI_URL = `https://${REGION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${REGION}/publishers/anthropic/models/claude-3-5-sonnet@20240620:generateContent`;

// Initialize Google Auth
const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

export async function POST(req: NextRequest) {
  try {
    const {
      prompt,
      selectedType,
      selectedTone,
      selectedDuration,
      channelName,
      targetAudienceAge,
      language,
      scriptLength,
      targetMarket
    } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Check required fields
    if (!channelName?.trim() || !targetAudienceAge?.trim() || !language?.trim() || !scriptLength?.trim() || !targetMarket?.trim()) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    const scriptType = selectedType || 'custom';
    const tone = selectedTone || 'natural';
    const duration = selectedDuration || 'flexible';

    const fullPrompt = `You are an expert YouTube scriptwriter with strong knowledge of storytelling, audience engagement, and content structure. I am creating a video with the following details. Please use them to generate a well-researched, high-retention script.

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

    // Prepare the request body for Vertex AI REST API
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: fullPrompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };

    // Get access token for authentication
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    // Make the API call to Vertex AI
    const response = await fetch(VERTEX_AI_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Vertex AI API error:', errorData);
      return NextResponse.json(
        { error: "Failed to generate script from Vertex AI" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Extract the generated script from the response
    const generatedScript = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedScript) {
      return NextResponse.json(
        { error: "No script generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({ script: generatedScript });

  } catch (error: any) {
    console.error("Claude API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}