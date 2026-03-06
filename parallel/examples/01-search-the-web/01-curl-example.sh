curl https://api.parallel.ai/v1beta/search \
  -H "Content-Type: application/json" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "parallel-beta: search-extract-2025-10-10" \
  -d '{
    "objective": "Find latest information about Parallel Web Systems. Focus on new product releases, benchmarks, or company announcements.",
    "search_queries": [
      "Parallel Web Systems products",
      "Parallel Web Systems announcements"
    ],
    "mode": "fast",
    "excerpts": {
      "max_chars_per_result": 10000
    }
  }'