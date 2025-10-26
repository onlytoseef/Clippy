import { NextRequest, NextResponse } from "next/server";
import { GoogleAuth } from 'google-auth-library';

const PROJECT_ID = process.env.GCP_PROJECT_ID!;
const LOCATION = process.env.GCP_REGION || "us-east5";
const MODEL = "claude-3-7-sonnet@20250219";

// Determine endpoint based on location (as per Vertex AI docs)
const ENDPOINT = LOCATION === "global" 
  ? "https://aiplatform.googleapis.com" 
  : `https://${LOCATION}-aiplatform.googleapis.com`;

// Claude on Vertex AI endpoint
const VERTEX_AI_URL = `${ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/anthropic/models/${MODEL}:streamRawPredict`;

// Setup Google Auth with Application Default Credentials
const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
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

    if (!channelName?.trim() || !targetAudienceAge?.trim() || !language?.trim() || !scriptLength?.trim() || !targetMarket?.trim()) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

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

    console.log('Attempting to get access token...');
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    if (!accessToken.token) {
      console.error('Failed to get access token');
      return NextResponse.json({ error: "Failed to get access token" }, { status: 500 });
    }

    console.log('Access token obtained successfully');
    console.log('Making request to Vertex AI URL:', VERTEX_AI_URL);

    // Gemini API format
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
        maxOutputTokens: 4096,
      }
    };

    const response = await fetch(VERTEX_AI_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Vertex AI API error:', errorData);
      return NextResponse.json(
        { error: "Failed to generate script", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Response data:', JSON.stringify(data).substring(0, 200));
    
    // Claude response format (Anthropic on Vertex AI)
    const generatedScript = data.content?.[0]?.text;

    if (!generatedScript) {
      console.error('No script in response:', data);
      return NextResponse.json({ error: "No script generated", responseData: data }, { status: 500 });
    }

    return NextResponse.json({ script: generatedScript });

  } catch (error: any) {
    console.error("Claude Sonnet 4 API error - Full details:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    return NextResponse.json({ 
      error: error.message || "Internal server error",
      errorType: error.name,
      details: error.cause?.message || "No additional details"
    }, { status: 500 });
  }
}
