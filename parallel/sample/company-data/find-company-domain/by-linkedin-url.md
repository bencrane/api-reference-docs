# Find Company Domain by LinkedIn URL

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
          "linkedin_url": {
            "description": "The LinkedIn URL of the company to find the domain for.",
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
          "company_domain": {
            "description": "The primary domain name of the company (e.g., 'example.com') derived from the provided LinkedIn URL. If the domain cannot be extracted or is unavailable, return null.",
            "type": "string"
          }
        },
        "required": [
          "company_domain"
        ],
        "type": "object"
      },
      "type": "json"
    }
  }
}'
```
