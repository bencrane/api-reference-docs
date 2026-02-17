# Icypeas API — Discover Email Addresses: Find a Single Email Address

Icypeas provides a special route to find an email address from a firstname, a lastname and a company domain name. When you are looking for the email address of one prospect, use this route.

> **CAUTION:** Do not use this route if you want to make many searches. Use the **bulk search** instead, which is designed to handle thousands of searches in parallel.

## Endpoint

```
POST https://app.icypeas.com/api/email-search
```

## Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `firstname` | string | Yes (can be empty if lastname is set) | The firstname of the person you want to find. |
| `lastname` | string | Yes (can be empty if firstname is set) | The lastname of the person you want to find. |
| `domainOrCompany` | string | Yes | The domain or the company name of the person you want to find. |
| `custom` | object | No | Custom object to pass a custom webhook and/or a custom id that will be added to the search. |

### `custom` Object

| Field | Type | Description |
|-------|------|-------------|
| `webhookUrl` | url | A custom webhook URL that will be triggered for this search when it is done. See the 'Push notifications' section for request details. |
| `externalId` | string | A custom ID to track your search when fetching results or being notified through a webhook. Uniqueness is not enforced — you need to manage that yourself. |

## Example Request

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "domainOrCompany": "icypeas.com"
}
```

## Responses

### 200 — Success

```json
{
  "success": true,
  "item": {
    "_id": "#YOUR_SEARCH_ID#",
    "status": "NONE"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` means your search has been taken into account. |
| `item` | object | Information about your search. |
| `item._id` | string | Search ID to follow its progression. |
| `item.status` | string | Status of this search. See Useful Information > Result Status for details. |

### 200 — Validation Errors

Returned when there are validation errors in the request body.

### 401 — Unauthorized

Returned when authentication fails.

### 429 — Rate Limit Exceeded

Returned when the rate limit is exceeded.