curl -N https://api.parallel.ai/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $PARALLEL_API_KEY" \
  -d '{
    "model": "speed",
    "messages": [
      { "role": "user", "content": "What does Parallel Web Systems do?" }
    ],
    "stream": false
  }'