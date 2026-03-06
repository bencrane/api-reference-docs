curl -X POST https://api.parallel.ai/v1beta/findall/runs \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "Content-Type: application/json" \
  -H "parallel-beta: findall-2025-09-15" \
  -d '{
    "objective": "Find all startups in SF",
    "entity_type": "startups",
    "match_conditions": [
      {
        "name": "san_francisco_location_check",
        "description": "Startup must be located in San Francisco."
      }
    ],
    "generator": "core",
    "match_limit": 100
  }'