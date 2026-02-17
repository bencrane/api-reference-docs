# Find Person Work Email and LinkedIn URL by Full Name, Company Name, and Company Website

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
          "company_website": {
            "description": "The website of the company the person works for.",
            "type": "string"
          },
          "full_name": {
            "description": "The full name of the person to find the work email and LinkedIn URL for.",
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
            "description": "The URL to the person'\''s professional LinkedIn profile. If the LinkedIn URL cannot be found, return null.",
            "type": "string"
          },
          "work_email": {
            "description": "The professional email address of the person at the specified company. If the work email cannot be found, return null.",
            "type": "string"
          }
        },
        "required": [
          "work_email",
          "linkedin_url"
        ],
        "type": "object"
      },
      "type": "json"
    }
  }
}'
```
