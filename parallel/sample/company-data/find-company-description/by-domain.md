# Find Company Description by Domain

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
            "description": "The domain of the company to retrieve its description",
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
          "company_description": {
            "description": "A 2-4 sentence summary providing a high-level overview of the company's primary business activities, products, services, and mission, derived from information available on the company's official website or reliable public sources. If a description cannot be found, return 'Description unavailable'.",
            "type": "string"
          }
        },
        "required": [
          "company_description"
        ],
        "type": "object"
      },
      "type": "json"
    }
  }
}'
```
