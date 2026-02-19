# Social Media Scrapers API - LinkedIn - Job Listings API

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.

> Collect detailed LinkedIn job listing information using a job URL.

## Job Listings Information API

The Job Listings Information API allows you to collect detailed information about a **single LinkedIn job listing** by providing the job URL.

---

## Collect by URL

This endpoint allows users to collect comprehensive data about a LinkedIn job posting, including job details, company information, and metadata.

### Input Parameters

| Parameter | Type   | Required | Description                   |
|-----------|--------|----------|-------------------------------|
| `URL`     | string | Yes      | The LinkedIn job listing URL. |

---

### Output Structure

Includes comprehensive job, company, and metadata details.

#### Job details

* `job_posting_id`
* `job_title`
* `job_summary`
* `job_seniority_level`
* `job_function`
* `job_employment_type`
* `job_industries`
* `job_base_pay_range`
* `base_salary`
* `job_description_formatted`
* and more

> For the full list of fields,
> [View complete output reference](https://brightdata.com/cp/data_api/gd_lpfll7v5hcqtkxl6l?tab=overview)

#### Company details

* `company_name`
* `company_id`
* `company_url`
* `company_logo`

#### Job metadata

* `job_location`
* `job_posted_time`
* `job_posted_date`
* `job_num_applicants`
* `apply_link`
* `country_code`
* `title_id`

#### Job poster information

* `job_poster`

---

This endpoint provides a complete snapshot of a LinkedIn job listing, making it suitable for job market analysis, hiring trend tracking, and competitive research.

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
  /linkedin/jobs/collect:
    post:
      tags:
        - LinkedIn Jobs
      summary: Collect LinkedIn job listing by URL
      description: >-
        Collect detailed information about a LinkedIn job listing using the job
        URL.
      operationId: collectLinkedInJob
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LinkedInJobCollectRequest'
            example:
              url: https://www.linkedin.com/jobs/view/123456789
      responses:
        '200':
          description: Job listing collected successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LinkedInJobCollectResponse'
              example:
                job_posting_id: '123456789'
                job_title: Senior Software Engineer
                job_summary: >-
                  We are looking for an experienced software engineer to join
                  our team.
                job_seniority_level: Mid-Senior level
                job_function: Engineering
                job_employment_type: Full-time
                job_industries:
                  - Information Technology
                  - Software
                job_base_pay_range: $120,000 - $150,000
                base_salary: 135000
                job_description_formatted: <p>Responsibilities include building scalable systems...</p>
                company_name: Example Corp
                company_id: '987654'
                company_url: https://www.linkedin.com/company/example-corp/
                company_logo: https://cdn.linkedin.com/logo.png
                job_location: San Francisco, CA, United States
                job_posted_time: 3 days ago
                job_posted_date: '2024-01-15'
                job_num_applicants: 42
                job_poster: John Doe
                apply_link: https://www.linkedin.com/jobs/apply/123456789
                country_code: US
                title_id: software-engineer-iii
        '400':
          description: Invalid LinkedIn job URL
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                error: Invalid input
                message: The provided LinkedIn job URL is not valid.
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
    LinkedInJobCollectRequest:
      type: object
      required:
        - url
      properties:
        url:
          type: string
          format: uri
          description: LinkedIn job listing URL
    LinkedInJobCollectResponse:
      type: object
      properties:
        job_posting_id:
          type: string
        job_title:
          type: string
        job_summary:
          type: string
        job_seniority_level:
          type: string
        job_function:
          type: string
        job_employment_type:
          type: string
        job_industries:
          type: array
          items:
            type: string
        job_base_pay_range:
          type: string
        base_salary:
          type: number
        job_description_formatted:
          type: string
        company_name:
          type: string
        company_id:
          type: string
        company_url:
          type: string
        company_logo:
          type: string
        job_location:
          type: string
        job_posted_time:
          type: string
        job_posted_date:
          type: string
        job_num_applicants:
          type: integer
        job_poster:
          type: string
        apply_link:
          type: string
        country_code:
          type: string
        title_id:
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