# Find Work Email by Full Name, Company Name, and Company Domain

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
          "company_domain": {
            "description": "The domain of the company where the person works.",
            "type": "string"
          },
          "full_name": {
            "description": "The full name of the person whose work email needs to be found.",
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
          "work_email": {
            "description": "The professional email address of the person at the specified company. If the email address cannot be found or verified, return null.",
            "type": "string"
          }
        },
        "required": [
          "work_email"
        ],
        "type": "object"
      },
      "type": "json"
    }
  }
}'
```
