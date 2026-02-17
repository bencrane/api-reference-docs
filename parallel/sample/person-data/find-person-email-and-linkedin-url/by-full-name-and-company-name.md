# Find Person Email and LinkedIn URL by Full Name and Company Name

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
            "description": "The name of the company where the person works.",
            "type": "string"
          },
          "full_name": {
            "description": "The full name of the person to find the work mail and LinkedIn URL for.",
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
            "description": "The URL to the person's LinkedIn profile. If unavailable, return null.",
            "type": "string"
          },
          "work_mail": {
            "description": "The professional email address of the person at the specified company. If unavailable, return null.",
            "type": "string"
          }
        },
        "required": [
          "work_mail",
          "linkedin_url"
        ],
        "type": "object"
      },
      "type": "json"
    }
  }
}'
```
