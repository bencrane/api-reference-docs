# Adyntel - Google Shopping

## AD LIBRARIES — Google Shopping

You first need to create an account, you can sign up [here](https://app.adyntel.com/signup) to receive 50 credits to test it out.

The Google Shopping endpoint allows you to find all Google Shopping ads for a given company. This is different from the [Google](https://docs.adyntel.com/ad-libraries/google) endpoint, which reports on certain types of ads (search, image, video) run on the Google platform — this endpoint returns strictly shopping ads.

It takes a company domain as input.

Company domain has to be passed in the `company.com` format, meaning all prefixes like `https://` or `www.` need to be removed.

---

## API Endpoint

```
POST api.adyntel.com/google_shopping
```

See what Google Shopping ads a company is running by providing their website as input.

### Headers

| Name         | Value            | Required |
|--------------|------------------|----------|
| Content-Type | application/json | ✅       |

### Body

| Name           | Type   | Description           | Required |
|----------------|--------|-----------------------|----------|
| api_key        | string | Adyntel API key       | ✅       |
| email          | string | Adyntel account email | ✅       |
| company_domain | string | Company website       | ✅       |

---

## Example Request

```json
{
    "api_key": "hd-nndgi7gy6b3kdsgd-a",
    "email": "elon@tesla.com",
    "company_domain": "tesla.com"
}
```

---

## Example Response

The response contains only an `id` that you then use in the [Google Shopping Status endpoint](https://docs.adyntel.com/ad-libraries/google-shopping-status) to retrieve results.

```json
{
    "id": "12172142-7717-0066-0000-f1e50ca3d579"
}
```

---

## Response Attributes

| Attribute | Type   | Description                                                              |
|-----------|--------|--------------------------------------------------------------------------|
| id        | string | Job ID to poll via the Google Shopping Status endpoint for final results. |