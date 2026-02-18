# Shovels.ai - Meta - Get Data Release Date

## Meta

## Get Data Release Date

Returns the release date of the current data served by the API.

**GET**

### Authorizations

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | required |

### Response

**200** — `application/json`

The data release date.

| Field | Type | Description |
|-------|------|-------------|
| released_at | string\<date\> | **required** — The date of the current data release. |

### Example Request

```bash
curl --request GET \
  --url https://api.shovels.ai/v2/meta/release \
  --header 'X-API-Key: <api-key>'
```

### Example Response

**200**

```json
{
  "released_at": "2020-01-01"
}
```