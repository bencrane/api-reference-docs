# Find Company Employee Range by Name, Domain, and LinkedIn URL

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
            "description": "The domain of the company to find the employee range for.",
            "type": "string"
          },
          "company_linkedin_url": {
            "description": "The LinkedIn URL of the company to find the employee range for.",
            "type": "string"
          },
          "company_name": {
            "description": "The name of the company to find the employee range for.",
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
          "employee_range": {
            "description": "The estimated number of employees working at the company, represented as a range (e.g., '1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5001-10000', '10000+'). If an exact number is found, convert it to the appropriate range. If the employee range cannot be determined, return 'Unknown'.",
            "type": "string"
          }
        },
        "required": [
          "employee_range"
        ],
        "type": "object"
      },
      "type": "json"
    }
  }
}'
```
