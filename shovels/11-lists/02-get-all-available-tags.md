# Shovels.ai - Lists - Get All Available Tags

## Lists

## Get All Available Tags

Returns all available permit tags.

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

A list of available permit tags. Paginated response for tags.

| Field | Type | Description |
|-------|------|-------------|
| items | Tags · object[] | **required** — The list of items returned in the response following given criteria. |
| size | integer | **required** — The number of items returned in the response. |
| next_cursor | string \| null | **required** — The cursor for retrieving the next page of results. |

### Example Request

```bash
curl --request GET \
  --url 'https://api.shovels.ai/v2/list/tags?size=50' \
  --header 'X-API-Key: <api-key>'
```

### Example Response

**200**

```json
{
  "items": [
    {
      "id": "new_dwelling",
      "description": "New Dwelling"
    },
    {
      "id": "new_adu",
      "description": "New Apartment Unit"
    },
    {
      "id": "accessory_structure",
      "description": "Accessory Structure"
    },
    {
      "id": "pool_spa",
      "description": "Pool or Spa"
    },
    {
      "id": "room_addition",
      "description": "Room Addition"
    },
    {
      "id": "kitchen_remodel",
      "description": "Kitchen Remodel"
    },
    {
      "id": "bath_remodel",
      "description": "Bath Remodel"
    },
    {
      "id": "solar",
      "description": "Solar Panels"
    },
    {
      "id": "reroof",
      "description": "Reroofing"
    },
    {
      "id": "utilities",
      "description": "Utility"
    },
    {
      "id": "window_door",
      "description": "Window or Door Repair"
    }
  ],
  "size": 50,
  "next_cursor": "example_cursor"
}
```