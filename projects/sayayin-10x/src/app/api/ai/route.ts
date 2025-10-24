import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const token = process.env.HUGGINGFACE_TOKEN;

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct',
      {
        method: 'POST',
        headers: {
          Authorization: Bearer ,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_new_tokens: 200, temperature: 0.7 },
        }),
      }
    );

    const result = await response.json();
    const reply = result?.[0]?.generated_text?.replace(prompt, '').trim() || 'No response.';

    return Response.json({ reply });
  } catch (error) {
    return Response.json({ reply: 'AI temporarily unavailable.' }, { status: 500 });
  }
}
