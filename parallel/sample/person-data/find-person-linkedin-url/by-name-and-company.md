# Find Person LinkedIn URL by Name and Company

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
          "company_name": {
            "description": "The name of the company the person works for.",
            "type": "string"
          },
          "person_name": {
            "description": "The name of the person to find the LinkedIn URL for.",
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
          "linkedin_url": {
            "description": "The direct URL to the LinkedIn profile of the person identified by the provided name and company. If a LinkedIn profile cannot be found for the specified person and company, return null.",
            "type": "string"
          }
        },
        "required": [
          "linkedin_url"
        ],
        "type": "object"
      },
      "type": "json"
    }
  }
}'
```
