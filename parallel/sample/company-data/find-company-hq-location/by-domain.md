# Find Company HQ Location by Domain

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
          "company_domain": {
            "description": "The domain of the company to find the HQ location for.",
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
          "hq_city": {
            "description": "The city where the company's headquarters is located. If unavailable, return null.",
            "type": "string"
          },
          "hq_country": {
            "description": "The country where the company's headquarters is located. If unavailable, return null.",
            "type": "string"
          },
          "hq_state": {
            "description": "The state or province where the company's headquarters is located. If unavailable, return null.",
            "type": "string"
          }
        },
        "required": [
          "hq_city",
          "hq_state",
          "hq_country"
        ],
        "type": "object"
      },
      "type": "json"
    }
  }
}'
```
