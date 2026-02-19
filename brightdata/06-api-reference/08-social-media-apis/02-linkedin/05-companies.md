# Social Media Scrapers API - LinkedIn - Companies API

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.

> Collect detailed LinkedIn company profile information using a company URL.

## Companies Information API

The Companies Information API allows you to collect comprehensive information about a **LinkedIn company profile** by providing the company URL.

---

## Collect by URL

This endpoint allows users to collect detailed company data, including business information, engagement metrics, locations, alumni network, and media assets.

### Input Parameters

| Parameter | Type   | Required | Description                        |
|-----------|--------|----------|------------------------------------|
| `URL`     | string | Yes      | The LinkedIn company profile URL.  |

---

### Output Structure

Includes detailed company, business, engagement, and media data.

---

### Company details

* `id`
* `name`
* `about`
* `slogan`
* `description`
* `specialties`
* `organization_type`
* `company_size`
* `industries`
* `founded`
* and more

> For the full list of supported fields,
> [View complete output reference](https://brightdata.com/cp/data_api/gd_l1vikfnt1wgvvqz95w?tab=overview)

---

### Business information

* `country_code`
* `country_codes_array`
* `locations`
* `formatted_locations`
* `headquarters`
* `funding`
* `crunchbase_url`
* `get_directions_url`

---

### Engagement and network

* `followers`
* `employees`
* `employees_in_linkedin`
* `alumni`
* `alumni_information`
* `affiliated`
* `similar`

---

### Media and metadata

* `logo`
* `image`
* `url`
* `updates`
* `timestamp`

---

This endpoint provides a **complete snapshot of a LinkedIn company profile**, making it suitable for:

* Company research
* Competitive analysis
* Market intelligence
* Investment research
* Brand monitoring

---

## OpenAPI

```yaml
openapi: 3.0.3
info:
  title: Web Scraper IDE REST API
  description: >-
    APIs for scraping and collecting structured data from web sources including
    social media platforms.
  version: 1.0.0
servers:
  - url: https://api.brightdata.com
security:
  - bearerAuth: []
tags:
  - name: Instagram
    description: Instagram scraping endpoints
paths:
  /linkedin/companies/collect:
    post:
      tags:
        - LinkedIn Companies
      summary: Collect LinkedIn company profile by URL
      description: >-
        Collect comprehensive information from a LinkedIn company profile using
        the company URL.
      operationId: collectLinkedInCompany
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CompanyCollectRequest'
            example:
              url: https://www.linkedin.com/company/microsoft/
      responses:
        '200':
          description: Company data collected successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CompanyCollectResponse'
              example:
                id: '1035'
                name: Microsoft
                about: >-
                  Microsoft enables digital transformation for the era of an
                  intelligent cloud.
                slogan: >-
                  Empower every person and organization on the planet to achieve
                  more.
                description: >-
                  Technology company specializing in software, cloud computing,
                  and AI.
                specialties:
                  - Cloud Computing
                  - AI
                  - Software
                organization_type: Public Company
                company_size: 10,001+ employees
                industries:
                  - Software Development
                founded: 1975
                country_code: US
                headquarters: Redmond, Washington, United States
                followers: 22000000
                employees: 220000
                logo: https://media.licdn.com/logo.png
                image: https://media.licdn.com/banner.png
                url: https://www.linkedin.com/company/microsoft/
                timestamp: '2025-01-22T12:00:00Z'
        '400':
          description: Invalid LinkedIn company URL
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                error: Invalid input
                message: The provided LinkedIn company URL is not valid.
        '401':
          description: Unauthorized
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                error: Unauthorized
                message: Invalid or missing API token.
components:
  schemas:
    CompanyCollectRequest:
      type: object
      required:
        - url
      properties:
        url:
          type: string
          format: uri
          description: LinkedIn company profile URL
    CompanyCollectResponse:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        about:
          type: string
        slogan:
          type: string
        description:
          type: string
        specialties:
          type: array
          items:
            type: string
        organization_type:
          type: string
        company_size:
          type: string
        industries:
          type: array
          items:
            type: string
        founded:
          type: integer
        country_code:
          type: string
        headquarters:
          type: string
        followers:
          type: integer
        employees:
          type: integer
        logo:
          type: string
        image:
          type: string
        url:
          type: string
        timestamp:
          type: string
    ErrorResponse:
      type: object
      properties:
        error:
          type: string
        message:
          type: string
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
```