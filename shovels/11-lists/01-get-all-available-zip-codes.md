# Shovels.ai - Lists - Get All Available Zip Codes

## Lists

## Get All Available Zip Codes

Returns all available ZIP codes for which we have permit and contractor data.

**GET**

### Authorizations

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | required |

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| cursor | string \| null | Cursor for pagination |
| size | integer | default: `50` — Required range: `1 <= x <= 100` |

### Response

**200** — `application/json`

A list of available ZIP codes. Paginated response for ZIP codes view.

| Field | Type | Description |
|-------|------|-------------|
| items | ZipCodesView · object[] | **required** — The list of items returned in the response following given criteria. |
| size | integer | **required** — The number of items returned in the response. |
| next_cursor | string \| null | **required** — The cursor for retrieving the next page of results. |

### Example Request

```bash
curl --request GET \
  --url 'https://api.shovels.ai/v2/list/zip?size=50' \
  --header 'X-API-Key: <api-key>'
```

### Example Response

**200**

```json
{
  "items": [
    {
      "zip_code": "90001"
    },
    {
      "zip_code": "90002"
    },
    {
      "zip_code": "90003"
    },
    {
      "zip_code": "90004"
    },
    {
      "zip_code": "90005"
    },
    {
      "zip_code": "90006"
    },
    {
      "zip_code": "90007"
    },
    {
      "zip_code": "90008"
    },
    {
      "zip_code": "90009"
    },
    {
      "zip_code": "90010"
    }
  ],
  "size": 50,
  "next_cursor": "example_cursor"
}
```