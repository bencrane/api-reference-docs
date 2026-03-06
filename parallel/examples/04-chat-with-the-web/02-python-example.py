import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["PARALLEL_API_KEY"],  # Your Parallel API key
    base_url="https://api.parallel.ai"  # Parallel's API endpoint
)

response = client.chat.completions.create(
    model="speed", # Parallel model name
    messages=[
        {"role": "user", "content": "What does Parallel Web Systems do?"}
    ]
)

print(response.choices[0].message.content)