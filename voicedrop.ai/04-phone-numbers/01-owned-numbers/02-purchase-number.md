# VoiceDrop.ai - Phone Numbers - Owned Numbers - Purchase Number

## POST - Purchase Number

```
POST https://api.voicedrop.ai/v1/sender-numbers/owned-numbers/purchase
```

---

## Authorization

**API Key** - uses API Key from collection: VoiceDrop API Reference

---

## Request Body

```json
{
  "numbers": [12252271558],
  "redirect_to": "7865555555"
}
```

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/sender-numbers/owned-numbers/purchase' \
--data '{"numbers": [17865555551],
    "redirect_to": "7865555555"
}'
```

---

## Example Response - 200 OK

```json
{
  "status": "success",
  "numbers_on_cart": 1,
  "numbers_purchased": 1
}
```