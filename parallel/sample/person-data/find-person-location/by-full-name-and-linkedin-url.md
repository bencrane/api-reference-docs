# Find Person Location by Full Name and LinkedIn URL

```bash
curl -X POST https://api.parallel.ai/v1/tasks/runs \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "input": "",
  "processor": "base",
  "task_spec": {
    "input_schema": {
      "json_schema": {
        "properties": {
          "person_full_name": {
            "description": "The full name of the person to find the living location for.",
            "type": "string"
          },
          "person_linkedin_url": {
            "description": "The LinkedIn profile URL of the person to find the living location for.",
            "type": "string"
          }
        },
        "type": "object"
      },
      "type": "json"
    },
    "output_schema": {
      "json_schema": {
        "additionalProperties": false,
        "properties": {
          "city": {
            "description": "The city where the person lives. If unavailable, return null.",
            "type": "string"
          },
          "country": {
            "description": "The country where the person lives. If unavailable, return null.",
            "type": "string"
          },
          "state": {
            "description": "The state or province where the person lives. If unavailable, return null.",
            "type": "string"
          }
        },
        "required": [
          "city",
          "state",
          "country"
        ],
        "type": "object"
      },
      "type": "json"
    }
  }
}'
```
