# Find Company Domain by Name and LinkedIn URL

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
          "company_linkedin_url": {
            "description": "The LinkedIn URL of the company to find the domain for.",
            "type": "string"
          },
          "company_name": {
            "description": "The name of the company to find the domain for.",
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
            "description": "The official domain for the company. If the domain cannot be found, return null.",
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
