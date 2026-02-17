# Icypeas API — Discover Email Addresses: Bulk Search

Icypeas provides a route to launch your bulk search without going to the app.

When using the API, you have to provide:

- The name of your bulk search so that you can find it later on
- The task to execute on the data
- The data you want to analyze

> **CAUTION:** Each bulk search launched from the API cannot contain more than 5000 items.

## Task Types

### Email Search (`email-search`)

The data array should contain rows with three elements: firstname, lastname, and domain or company name. Firstname and/or lastname are optional — you need at least one of them (e.g. `["John", "", "icypeas.com"]`).

```json
{
  "task": "email-search",
  "name": "My cool email discovery",
  "data": [
    ["John", "Doe", "icypeas.com"],
    ["Charline", "Lestelle", "Google"],
    ["", "Avocado", "yelp.fr"],
    ["Jeanine", "", "Comodoro LLC"]
  ]
}
```

### Email Verification (`email-verification`)

The data array should contain rows with one element: the email address.

```json
{
  "task": "email-verification",
  "name": "My cool email verification",
  "data": [
    ["john.doe@icypeas.com"],
    ["charline.lestelle@google.com"],
    ["jeanine@comodoro.com"]
  ]
}
```

### Domain Scan (`domain-search`)

The data array should contain rows with one element: the domain or company name.

```json
{
  "task": "domain-search",
  "name": "My cool domain scan",
  "data": [
    ["icypeas.com"],
    ["google.com"],
    ["yelp.fr"],
    ["Comodoro LLC"]
  ]
}
```

### Using Your Own IDs

You can pass your own IDs for each item using the `custom` object. The `externalIds` array must have the same length as your `data` array. Uniqueness is not enforced — you need to manage that yourself.

```json
{
  "task": "domain-search",
  "name": "My cool domain scan",
  "data": [
    ["icypeas.com"],
    ["google.com"],
    ["yelp.fr"],
    ["Comodoro LLC"]
  ],
  "custom": {
    "externalIds": ["my-row-1", "my-row-2", "my-row-3", "my-row-4"]
  }
}
```

## Endpoint

```
POST https://app.icypeas.com/api/bulk-search
```

## Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Name of the bulk search you are creating. |
| `task` | string | Yes | The type of bulk search: `domain-search`, `email-search`, or `email-verification`. |
| `data` | array | Yes | Emails, prospects, or domains you want to analyze. |
| `custom` | object | No | Custom object for passing custom webhooks and/or custom IDs. |

### `data` Array

Each row is an array of items to be analyzed. For `email-search`, each row should have 3 items. For other modes, each row has 1 item.

### `custom` Object

| Field | Type | Description |
|-------|------|-------------|
| `webhookUrlItem` | url | Custom webhook called each time a row is processed, returning the result for that row. See 'Push notifications' for details. |
| `webhookUrlBulkDone` | url | Custom webhook called when the whole bulk search is processed, returning statistics (not results). See 'Push notifications' for details. |
| `externalIds` | array | Array of strings. Each ID corresponds to a row in your data array. Length must match the data array. Uniqueness is not enforced. |
| `includeResultsInWebhook` | boolean | If provided, results are included directly in the webhook called at the end of the bulk. For bulk searches with more than 1000 items, ensure your webhook and server can accept large POST requests. |

## Example Request

```json
{
  "name": "Icypeas Prospects to analyze",
  "task": "email-search",
  "data": [
    ["John", "Doe", "icypeas.com"],
    ["John", "Doe", "Icypeas"]
  ]
}
```

## Responses

### 200 — Success

```json
{
  "success": true,
  "status": "in_progress",
  "file": "#FILEID#"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Whether the request was successful. |
| `status` | string | The status of the bulk search. |
| `file` | string | The new file's ID. |

### 200 — Validation Errors

Returned when there are validation errors in the request body.

### 401 — Unauthorized

Returned when authentication fails.

### 429 — Rate Limit Exceeded

Returned when the rate limit is exceeded.