# Shovels.ai - States - Search States

## States

### Search States

Searches for US states based on the provided search term.

**Method:** `GET`

---

## Authorizations

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | ✅ |

---

## Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| q | string | ✅ | — | The name to search for in the state fields. |
| cursor | string \| null | ❌ | — | Cursor for pagination |
| size | integer | ❌ | 50 | Required range: `1 <= x <= 100` |

---

## Response

**200** `application/json`

A list of states that match the search term.

Paginated response for states.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | States · object[] | ✅ | The list of items returned in the response following given criteria. |
| items[].geo_id | string | — | State abbreviation |
| items[].name | string | — | State name |
| size | integer | ✅ | The number of items returned in the response. |
| next_cursor | string \| null | ✅ | The cursor for retrieving the next page of results. |

---

## Example Request

```bash
curl --request GET \
  --url 'https://api.shovels.ai/v2/states/search?size=50' \
  --header 'X-API-Key: <api-key>'
```

## Example Response (200)

```json
{
  "items": [
    {
      "geo_id": "CA",
      "name": "CALIFORNIA"
    },
    {
      "geo_id": "TX",
      "name": "TEXAS"
    },
    {
      "geo_id": "MT",
      "name": "MONTANA"
    }
  ],
  "size": 3
}
```