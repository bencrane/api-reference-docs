# Find Person LinkedIn URL by Full Name, Company Name, and Company Domain

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
          "company_domain": {
            "description": "The domain of the company the person works for.",
            "type": "string"
          },
          "full_name": {
            "description": "The full name of the person whose LinkedIn URL needs to be found.",
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
            "description": "The direct URL to the LinkedIn profile of the person identified by the provided full name, company name, and company domain. If a LinkedIn profile cannot be found, return null.",
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
