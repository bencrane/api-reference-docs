# Find Company Description by Name and Domain

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
            "description": "The name of the company to find the description for.",
            "type": "string"
          },
          "company_website": {
            "description": "The website of the company to find the description for.",
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
            "description": "A 1-3 sentence summary describing the company's primary business activities, mission, and offerings, based on information found on its official website or reputable business directories. If a description cannot be found, return 'Description unavailable'.",
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
