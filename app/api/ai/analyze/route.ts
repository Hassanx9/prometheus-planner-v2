import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// System prompt for build analysis
const SYSTEM_PROMPT = `You are an expert ARPG (Action Role-Playing Game) build advisor specializing in Path of Exile 2 and Diablo IV. Your role is to analyze player builds and provide strategic optimization advice based on the latest meta, game mechanics, and community knowledge.

Key Responsibilities:
1. Analyze build configurations including skill trees, gear, and gem links
2. Provide optimization suggestions based on current meta
3. Identify weaknesses and suggest improvements
4. Recommend gear priorities and stat focuses
5. Suggest alternative approaches for different activities (leveling, bossing, mapping)

Always provide:
- Specific, actionable advice
- Meta-relevant recommendations
- Clear explanations of why changes are suggested
- Consideration of different game activities
- References to current patch notes and balance changes when relevant

Be concise but thorough, and always maintain a helpful, expert tone.`;

export async function POST(request: NextRequest) {
  try {
    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Initialize OpenAI client inside the function to avoid build-time errors
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const body = await request.json();
    const { message, buildData, context } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Build the user message with context
    let userMessage = message;
    if (buildData) {
      userMessage = `Build Context:\n${JSON.stringify(buildData, null, 2)}\n\nUser Question: ${message}`;
    }
    if (context) {
      userMessage = `${context}\n\n${userMessage}`;
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content || 'No response generated';

    return NextResponse.json({
      response,
      model: 'gpt-4o',
      usage: completion.usage,
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Handle specific OpenAI errors
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
