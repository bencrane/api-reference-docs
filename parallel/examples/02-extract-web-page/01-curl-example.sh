curl https://api.parallel.ai/v1beta/extract \
  -H "Content-Type: application/json" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "parallel-beta: search-extract-2025-10-10" \
  -d '{
    "urls": ["https://parallel.ai/blog/search-api-benchmark"],
    "objective": "How does Parallel perform on search benchmarks?",
    "excerpts": true,
    "full_content": false
  }'