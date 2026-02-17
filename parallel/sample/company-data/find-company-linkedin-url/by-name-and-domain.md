# Find Company LinkedIn URL by Name and Domain

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
          "company_domain": {
            "description": "The domain of the company to find the LinkedIn URL for.",
            "type": "string"
          },
          "company_name": {
            "description": "The name of the company to find the LinkedIn URL for.",
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
          "company_linkedin_url": {
            "description": "The official LinkedIn profile URL for the company. If a LinkedIn profile cannot be found for the company, return null.",
            "type": "string"
          }
        },
        "required": [
          "company_linkedin_url"
        ],
        "type": "object"
      },
      "type": "json"
    }
  }
}'
```
