# VoiceDrop.ai - Phone Numbers - Owned Numbers - List Available

## GET - List Available

```
GET https://api.voicedrop.ai/v1/sender-numbers/owned-numbers/available
```

---

## Authorization

**API Key** - uses API Key from collection: VoiceDrop API Reference

---

## Query Parameters

| Parameter | Example | Description |
|---|---|---|
| `state` | — | Filter numbers by state. Ignored if `area_code` is set |
| `quantity` | `10` | Quantity of numbers to list (max 100). May return fewer if not enough available |
| `area_code` | `786` | Filter by area code. Leave empty to filter by state only |

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/sender-numbers/owned-numbers/available?quantity=10&area_code=786'
```

---

## Example Response - 200 OK

```json
{
  "numbers": [
    {
      "id": 17869441754,
      "didSummary": "(786) 944-1754",
      "phone_number": "7869441754",
      "state": "FL"
    },
    {
      "id": 17869441753,
      "didSummary": "(786) 944-1753",
      "phone_number": "7869441753",
      "state": "FL"
    },
    {
      "id": 17869441752,
      "didSummary": "(786) 944-1752",
      "phone_number": "7869441752",
      "state": "FL"
    },
    {
      "id": 17869441751,
      "didSummary": "(786) 944-1751",
      "phone_number": "7869441751",
      "state": "FL"
    },
    {
      "id": 17869441750,
      "didSummary": "(786) 944-1750",
      "phone_number": "7869441750",
      "state": "FL"
    },
    {
      "id": 17869441748,
      "didSummary": "(786) 944-1748",
      "phone_number": "7869441748",
      "state": "FL"
    },
    {
      "id": 17869441747,
      "didSummary": "(786) 944-1747",
      "phone_number": "7869441747",
      "state": "FL"
    },
    {
      "id": 17869441746,
      "didSummary": "(786) 944-1746",
      "phone_number": "7869441746",
      "state": "FL"
    },
    {
      "id": 17869441744,
      "didSummary": "(786) 944-1744",
      "phone_number": "7869441744",
      "state": "FL"
    },
    {
      "id": 17869441743,
      "didSummary": "(786) 944-1743",
      "phone_number": "7869441743",
      "state": "FL"
    }
  ],
  "quantity_requested": 10,
  "quantity_returned": 10
}
```