# Find Company HQ Location by Name and Domain

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
          "company_name": {
            "description": "The name of the company to find the HQ location for.",
            "type": "string"
          },
          "company_website": {
            "description": "The website of the company to find the HQ location for.",
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
            "description": "The city where the company's headquarters is located. If the city cannot be determined, return null.",
            "type": "string"
          },
          "hq_country": {
            "description": "The country where the company's headquarters is located. If the country cannot be determined, return null.",
            "type": "string"
          },
          "hq_state": {
            "description": "The state, province, or region where the company's headquarters is located. If the state, province, or region cannot be determined, return null.",
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
