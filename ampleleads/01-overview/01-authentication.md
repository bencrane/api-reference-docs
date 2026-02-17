# Authentication

All requests must include your API key as a query parameter:

```
?api_key=YOUR_API_KEY
```

**Base URL:** `https://api.ampleleads.io/v1`

**Get your API key:** [https://app.ampleleads.io/api-keys](https://app.ampleleads.io/api-keys)

## Examples

### Bash

```bash
# GET: fetch credits
curl "https://api.ampleleads.io/v1/credits?api_key=YOUR_API_KEY"

# POST: Linkedin Person Enrich
curl -X POST "https://api.ampleleads.io/v1/linkedin/person/enrich?api_key=YOUR_API_KEY" \
  -H "content-type: application/json" \
  -d '{"url":"https://linkedin.com/in/..."}'
```

## Errors

- **401 Unauthorized** — missing/invalid `api_key`
- **403 Forbidden** — key inactive/revoked (if applicable)

## Security

Keep keys secret, rotate if exposed, and use separate keys per environment.