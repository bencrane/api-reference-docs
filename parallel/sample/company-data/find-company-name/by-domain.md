# Find Company Name by Domain

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
          "domain": {
            "description": "The domain name of the company",
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
            "description": "The official name of the company associated with the provided domain. If the company name cannot be determined from the domain, return null.",
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
