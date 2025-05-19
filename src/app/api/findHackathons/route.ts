import { NextRequest, NextResponse } from 'next/server';

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || '';

// Define Hackathon type
interface Hackathon {
  id: string;
  title: string;
  theme: string;
  platform: string;
  deadline: string;
  link: string;
  description: string;
}

export async function POST(request: NextRequest) {
  try {
    // Check for valid request
    if (!request.body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // Parse the request body
    const requestBody = await request.json();
    const { interest } = requestBody;

    if (!interest || typeof interest !== 'string') {
      return NextResponse.json({ error: 'Interest is required' }, { status: 400 });
    }

    // Generate prompt for Perplexity
    const prompt = `Find ongoing or upcoming hackathons related to ${interest}. Please return ONLY a valid JSON array of hackathon objects with these EXACT fields: title, theme, platform, deadline, link, description. Include platforms like Devpost, Devfolio, DoraHacks, and MLH. Give at least 10 available hackathons if available. Each object should have exactly these fields with string values. The response must be a valid JSON array without any additional text.`;

    // Call Perplexity API if key is available
    if (PERPLEXITY_API_KEY) {
      try {
        const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
          },
          body: JSON.stringify({
            model: "sonar-pro",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
          })
        });

        if (!perplexityResponse.ok) {
          throw new Error(`Perplexity API error: ${perplexityResponse.statusText}`);
        }

        const data = await perplexityResponse.json();
        
        // Extract and parse the JSON from the response
        const content = data.choices[0].message.content;
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        const jsonContent = jsonMatch ? jsonMatch[0] : content;
        
        const hackathonsData = JSON.parse(jsonContent);
        
        if (hackathonsData.length === 0) {
          return NextResponse.json({ message: 'No hackathons found for the given interest.' });
        }
        
        // Add an ID to each hackathon
        const hackathonsWithIds = hackathonsData.map((hackathon: Omit<Hackathon, 'id'>, index: number) => ({
          id: `hack-${index}`,
          ...hackathon
        }));
        
        return NextResponse.json({ hackathons: hackathonsWithIds });
      } catch (apiError) {
        console.error('API error:', apiError);
        return NextResponse.json({ error: 'Failed to fetch hackathon data' }, { status: 500 });
      }
    } else {
      // If no API key, return not found message
      return NextResponse.json({ message: 'Hackathon data is currently unavailable.' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to find hackathons' }, { status: 500 });
  }
}
