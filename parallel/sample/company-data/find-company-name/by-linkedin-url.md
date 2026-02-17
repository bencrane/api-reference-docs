# Find Company Name by LinkedIn URL

```bash
curl -X POST https://api.parallel.ai/v1/tasks/runs \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "input": "",
  "processor": "lite",
  "task_spec": {
    "input_schema": {
      "json_schema": {
        "properties": {
          "company_linkedin_url": {
            "description": "The LinkedIn URL of the company to extract the name from.",
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
          "company_name": {
            "description": "The official name of the company as listed on its LinkedIn profile. If the company name cannot be extracted or is unavailable, return null.",
            "type": "string"
          }
        },
        "required": [
          "company_name"
        ],
        "type": "object"
      },
      "type": "json"
    }
  }
}'
```
