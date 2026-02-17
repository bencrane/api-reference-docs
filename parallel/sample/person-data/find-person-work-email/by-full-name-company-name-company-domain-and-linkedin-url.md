# Find Person Work Email by Full Name, Company Name, Company Domain, and LinkedIn URL

```bash
curl -X POST https://api.parallel.ai/v1/tasks/runs \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "input": "",
  "processor": "pro",
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
          "person_full_name": {
            "description": "The full name of the person whose work email needs to be found.",
            "type": "string"
          },
          "person_linkedin_url": {
            "description": "The LinkedIn profile URL of the person.",
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
            "description": "The professional email address of the person at the specified company. If the work email cannot be found, return null.",
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
