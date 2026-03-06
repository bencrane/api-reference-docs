// @ts-nocheck
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.PARALLEL_API_KEY, // Your Parallel API key
  baseURL: 'https://api.parallel.ai', // Parallel's API endpoint
});

async function main() {
  const response = await client.chat.completions.create({
    model: 'speed', // Parallel model name
    messages: [
      { role: 'user', content: 'What does Parallel Web Systems do?' }
    ],
  });

  console.log(response.choices[0].message.content);
}

main().catch(console.error);