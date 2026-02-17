# Person Enrich

`POST` `https://api.ampleleads.io/v1/linkedin/person/enrich`

The LinkedIn Person Enrich endpoint takes a public LinkedIn profile URL and returns a fully enriched profile: name, headline, location, contact details, latest position + full experience history, skills, education, recommendations, and people-also-viewed data.

## Rate Limits

- 400 requests per minute per account.

## Credits

- Each enrichment request costs **4 credits**.

## Body Params

| Parameter | Type   | Required | Description                              |
|-----------|--------|----------|------------------------------------------|
| `url`     | string | yes      | LinkedIn URL of the person to enrich.    |

## Request

```bash
curl --request POST \
     --url https://api.ampleleads.io/v1/linkedin/person/enrich \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "url": "https://linkedin.com/in/jeannie-wyrick-b4760710a"
}
'
```

## Response

**200**

```json
{
  "success": true,
  "data": {
    "first_name": "...",
    "last_name": "...",
    "headline": "...",
    "location": "...",
    "contact_details": { ... },
    "experience": [ ... ],
    "skills": [ ... ],
    "education": [ ... ],
    "recommendations": [ ... ],
    "people_also_viewed": [
      {
        "first_name": "Gracie",
        "last_name": "Long",
        "headline": "Graphic Designer at Love's",
        "linkedin_url": "https://linkedin.com/in/laurenglong",
        "followers": 87,
        "is_premium": false,
        "urn": "urn:li:fsd_profile:ACoAAERHVqABHECuK43juo-JpwXQV8F1n03Slts",
        "public_identifier": "laurenglong",
        "profile_picture_url": "https://media.licdn.com/dms/image/..."
      }
    ]
  }
}
```

> **Note:** Response truncated. Full response includes complete profile data across all fields listed above.