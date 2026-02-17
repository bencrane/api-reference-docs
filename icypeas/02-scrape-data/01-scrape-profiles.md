# Icypeas API — Scrape Data: Scrape Profiles

> **CAUTION:** Rate limits always apply on all routes. Check the dedicated page for more information.

## Single Profile Scraping

### Endpoint

```
GET https://app.icypeas.com/api/scrape/profile?url=PROFILE_URL
```

### Responses

| Code | Description |
|------|-------------|
| 200 | Profile found |
| 200 | Profile not found |
| 200 | Validation errors |
| 401 | Authentication failed |
| 429 | Rate limit exceeded |

---

## Bulk Profiles Scraping

### Endpoint

```
POST https://app.icypeas.com/api/scrape
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | Should always be `profile`. |
| `data` | array | Yes | An array containing the profile URLs to scrape. Max 50 profiles per request. |

### Example Request

```json
{
  "type": "profile",
  "data": [
    "https://www.linkedin.com/in/corentin-ribeyre-30085a3b",
    "https://www.linkedin.com/in/pierre-baptiste-landoin-icypes/"
  ]
}
```

### Response — 200 Success

```json
{
  "success": true,
  "data": [
    {
      "searchId": "#YOUR_SEARCH_ID_1#",
      "status": "FOUND",
      "result": { ... }
    },
    {
      "searchId": "#YOUR_SEARCH_ID_2#",
      "status": "NOT_FOUND",
      "result": null
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` means the search succeeded (no error raised). |
| `data` | array | Array of result objects. |
| `data[].searchId` | string | The ID of each search item (for fetching results later). |
| `data[].status` | string | `FOUND` when profile was found, `NOT_FOUND` when not. |
| `data[].result` | object / null | The profile object, or `null` if not found. |

### Profile Result Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Icypeas unique identifier. |
| `firstname` | string | First name. |
| `lastname` | string | Last name. |
| `numOfConnections` | number | Number of connections. |
| `headline` | string | Profile headline. |
| `url` | string | Profile URL. |
| `ContactInfo` | object | Contact information. |
| `ContactInfo.phoneNumber` | string | Phone number. |
| `ContactInfo.linkedinEmail` | string | Email address. |
| `skills` | array | Skills (each with `value`). |
| `languages` | array | Languages (each with `value` and `norm`). |
| `lid` | string | LinkedIn ID (the `my-linkedin-id` in `https://linkedin.com/in/my-linkedin-id`). |
| `linkedinEmail` | string | Email address. |
| `description` | string | Profile description. |
| `address` | object | Address information. |
| `address.streetAddress` | string | Street address. |
| `address.addressLocality` | string | Address locality. |
| `address.addressRegion` | string | Address region. |
| `address.postalCode` | string | Postal code. |
| `address.addressCountry` | string | Address country. |
| `address.addressCountryCode` | string | Address country code (ISO Alpha 2 or UNK). |
| `educations` | array | Education history. |
| `educations[].fieldsOfStudy` | array | Fields of study (each with `value`). |
| `educations[].urn` | string | URN of the school. |
| `educations[].name` | string | School name. |
| `educations[].degree` | string | Degree earned. |
| `educations[].startDate` | string | Start date (ISO 8601). |
| `educations[].endDate` | string | End date (ISO 8601). |
| `educations[].schoolInformation` | string | Additional school information (0 if still in progress). |
| `worksFor` | array | Current work experience. |
| `worksFor[].name` | string | Organization name. |
| `worksFor[].location` | string | Organization location. |
| `worksFor[].lid` | string | LinkedIn ID of the company. |
| `worksFor[].urn` | string | URN of the organization entry. |
| `worksFor[].startDate` | string | Start date (ISO 8601). |
| `worksFor[].endDate` | string | End date (ISO 8601). |
| `worksFor[].description` | string | Job description. |
| `worksFor[].jobTitle` | string | Job title. |
| `alumniOf` | array | Past work experience. |
| `alumniOf[].name` | string | Organization name. |
| `alumniOf[].location` | string | Organization location. |
| `alumniOf[].lid` | string | LinkedIn ID of the company. |
| `alumniOf[].urn` | string | URN of the organization entry. |
| `alumniOf[].startDate` | string | Start date (ISO 8601). |
| `alumniOf[].endDate` | string | End date (ISO 8601). |
| `alumniOf[].description` | string | Job description. |
| `alumniOf[].jobTitle` | string | Job title. |
| `volunteeringExperiences` | array | Volunteering experiences. |
| `volunteeringExperiences[].name` | string | Organization name. |
| `volunteeringExperiences[].location` | string | Organization location. |
| `volunteeringExperiences[].lid` | string | LinkedIn ID of the company. |
| `volunteeringExperiences[].urn` | string | URN of the organization entry. |
| `volunteeringExperiences[].startDate` | string | Start date (ISO 8601). |
| `volunteeringExperiences[].endDate` | string | End date (ISO 8601). |
| `volunteeringExperiences[].description` | string | Job description. |
| `volunteeringExperiences[].jobTitle` | string | Job title. |
| `openProfile` | boolean | Indicates if the profile is open to connections. |
| `deleted` | boolean | Indicates if the profile has been deleted. |

### Other Responses

| Code | Description |
|------|-------------|
| 200 | Validation errors |
| 401 | Authentication failed |
| 429 | Rate limit exceeded |