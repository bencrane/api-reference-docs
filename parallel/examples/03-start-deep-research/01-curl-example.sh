curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "input": "Create a research report on the most recent academic research advancements in web search for LLMs.",
  "processor": "ultra"
}'