# API REFERENCE - Decision Management

URL: https://documentation.enigma.com/screening/api/decisions

When case management is enabled, the screening API stores decisions for each screening request. These endpoints allow you to retrieve and update decisions programmatically.

---

## Enabling Case Management

To record screening decisions for later retrieval, you must enable case management in your configuration by setting `use_case_manager` to `true` in the `general` section.

### Option 1: Set in Stored Configuration

Create or update a stored configuration with case management enabled:

```bash
curl --location --request POST 'https://api.enigma.com/evaluation/sanctions/configuration/<query_type>' \
--header 'x-api-key: <YOUR API KEY>' \
--header 'Content-Type: application/json' \
--header 'Account-Name: <YOUR ACCOUNT NAME>' \
--data '{
  "general": {
    "use_case_manager": true
  },
  "entity": {
    "alert_threshold": 0.8,
    "hit_threshold": 0.5
  }
}'
```

Then reference this configuration in your screening requests using `stored_config_name`.

### Option 2: Set via Configuration Overrides

Include case management in your screening request's `configuration_overrides`:

```bash
curl --location 'https://api.enigma.com/evaluation/sanctions/screen' \
--header 'x-api-key: <YOUR API KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "tag": "screening with decision recording",
  "configuration_overrides": {
    "general": {
      "use_case_manager": true
    }
  },
  "searches": [
    {
      "type": "ENTITY",
      "entity_description": {
        "person_name": ["John Doe"]
      }
    }
  ]
}'
```

Once case management is enabled, each screening request will automatically create a decision record that can be retrieved using the `request_id` from the screening response.

---

## Get Single Decision

Retrieve a decision by its request ID.

```bash
curl --location --request POST \
  'https://api.enigma.com/evaluation/sanctions/decisions/get_one/<decision_id>' \
  --header 'x-api-key: <YOUR API KEY>'
```

**Response:**

```json
{
  "request_id": "fed01a4a-da7e-11ee-8600-0a58a9feac02",
  "status": "pending_review",
  "alert": true,
  "tag": "example screening request",
  "assignee_id": "user-123",
  "created_at": "2024-03-04T23:29:07.084985+00:00",
  "updated_at": "2024-03-05T10:15:00.000000+00:00"
}
```

---

## Get Multiple Decisions

Retrieve multiple decisions with pagination and filtering options.

```bash
curl --location --request POST \
  'https://api.enigma.com/evaluation/sanctions/decisions/get_many?page=0&amt=10&alert=true&status=pending_review' \
  --header 'x-api-key: <YOUR API KEY>'
```

### Query Parameters

| Parameter | Description | Required |
|---|---|---|
| `page` | Page number for pagination (0-indexed) | No (default: 0) |
| `amt` | Number of results per page | No (default: 10) |
| `alert` | Filter by alert status (`true` or `false`) | No |
| `tag` | Filter by request tag | No |
| `assignee_id` | Filter by assigned user ID | No |
| `from_date` | Filter decisions from this date (format: `YYYY-MM-DDTHH:MM`) | No |
| `to_date` | Filter decisions up to this date (format: `YYYY-MM-DDTHH:MM`) | No |
| `status` | Filter by decision status | No |

---

## Update Decision

Update a decision's status, assignee, or other properties.

```bash
curl --location --request POST 'https://api.enigma.com/evaluation/sanctions/decisions/update_one' \
--header 'x-api-key: <YOUR API KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "request_id": "fed01a4a-da7e-11ee-8600-0a58a9feac02",
  "status": "cleared",
  "assignee_id": "user-456",
  "notes": "Reviewed and cleared - false positive"
}'
```

### Update Fields

| Field | Description |
|---|---|
| `request_id` | The decision ID to update (required) |
| `status` | New status for the decision |
| `assignee_id` | User ID to assign the decision to |
| `notes` | Notes or comments about the decision |