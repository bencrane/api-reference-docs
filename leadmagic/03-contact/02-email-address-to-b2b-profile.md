> ## Documentation Index
> Fetch the complete documentation index at: https://leadmagic.io/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Email Address to B2B Profile

> Use this endpoint to find a business profile based on the provided email.

# Email to Profile

Convert an email address into a professional profile URL. Find the professional identity behind any email.

## Endpoint Details

<Tabs>
  <Tab title="Pricing" icon="coins">
    | Metric         | Value                            |
    | -------------- | -------------------------------- |
    | **Cost**       | **10 credits** per profile found |
    | **No Results** | **FREE** if no profile found     |

    <Tip>
      Reverse lookup is more resource-intensive than forward lookup, hence the higher cost.
    </Tip>
  </Tab>

  <Tab title="Rate Limits" icon="gauge">
    ### Per-Endpoint Limit

    | Metric              | Value                |
    | ------------------- | -------------------- |
    | **Requests/Minute** | 3,000                |
    | **Burst Capacity**  | \~50 requests/second |

    ### Gateway Limits (Account-Wide)

    | Tier            | RPM    | Daily     |
    | --------------- | ------ | --------- |
    | **Standard**    | 5,000  | 500,000   |
    | **High Volume** | 10,000 | 1,000,000 |
  </Tab>

  <Tab title="Response Time" icon="clock">
    | Metric           | Value     |
    | ---------------- | --------- |
    | **Median (P50)** | \~600ms   |
    | **P95**          | \~2,000ms |
    | **P99**          | \~4,000ms |
  </Tab>
</Tabs>

***

## Quick Example

<CodeGroup>
  ```bash cURL theme={"theme":{"light":"github-light","dark":"github-dark"}}
  curl -X POST 'https://api.leadmagic.io/v1/people/email-to-b2b-profile' \
    -H 'X-API-Key: YOUR_API_KEY' \
    -H 'Content-Type: application/json' \
    -d '{"work_email": "john@company.com"}'
  ```

  ```javascript Node.js theme={"theme":{"light":"github-light","dark":"github-dark"}}
  const response = await fetch('https://api.leadmagic.io/v1/people/email-to-b2b-profile', {
    method: 'POST',
    headers: {
      'X-API-Key': 'YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ work_email: 'john@company.com' })
  });
  const data = await response.json();
  if (data.profile_url) {
    console.log(`Profile: ${data.profile_url}`);
  }
  ```

  ```python Python theme={"theme":{"light":"github-light","dark":"github-dark"}}
  import requests

  response = requests.post(
      'https://api.leadmagic.io/v1/people/email-to-b2b-profile',
      headers={'X-API-Key': 'YOUR_API_KEY'},
      json={'work_email': 'john@company.com'}
  )
  data = response.json()
  print(f"Profile: {data.get('profile_url', 'Not found')}")
  ```
</CodeGroup>

***

## Request Parameters

<ParamField body="work_email" type="string">
  Work email address to lookup. Preferred over personal\_email.
</ParamField>

<ParamField body="personal_email" type="string">
  Personal email address to lookup. Alternative identifier.
</ParamField>

<Warning>
  You must provide either `work_email` or `personal_email` (or both for better match rates).
</Warning>

***

## Response

<ResponseField name="profile_url" type="string">
  Professional profile URL/username (null if not found)
</ResponseField>

<ResponseField name="credits_consumed" type="number" required>
  Credits used (10 if found, 0 if not)
</ResponseField>

<ResponseField name="message" type="string" required>
  Human-readable status message
</ResponseField>

### Example Response

<Frame>
  ```json  theme={"theme":{"light":"github-light","dark":"github-dark"}}
  {
    "profile_url": "linkedin.com/in/johndoe",
    "credits_consumed": 10,
    "message": "Profile URL found"
  }
  ```
</Frame>

***

## Success Messages

| Message                            | Meaning                                      | Cost       |
| ---------------------------------- | -------------------------------------------- | ---------- |
| `Profile URL found`                | Professional profile successfully identified | 10 credits |
| `No profile found for this email.` | No matching profile found                    | FREE       |

***

## Workflow

<Steps>
  <Step title="Submit Email">
    Send the work or personal email address.
  </Step>

  <Step title="Profile Lookup">
    We search our database for matching professional profiles.
  </Step>

  <Step title="Get Profile URL">
    Receive the professional profile URL.
  </Step>

  <Step title="Enrich Further">
    Use [Profile Search](/v1/reference/profile-search) to get full profile details.
  </Step>
</Steps>

***

## Best Practices

<AccordionGroup>
  <Accordion title="Use work email first" icon="building">
    Work emails have higher match rates than personal emails for professional profiles.
  </Accordion>

  <Accordion title="Chain with Profile Search" icon="link">
    After finding a profile URL, use Profile Search to get complete profile data.
  </Accordion>

  <Accordion title="Handle no matches gracefully" icon="circle-xmark">
    Not all emails have associated professional profiles. Plan for partial enrichment.
  </Accordion>
</AccordionGroup>

***

## Use Cases

<CardGroup cols={2}>
  <Card title="CRM Enrichment" icon="database">
    Add professional profile links to your CRM contacts.
  </Card>

  <Card title="Lead Research" icon="magnifying-glass">
    Identify the professional identity behind inbound leads.
  </Card>

  <Card title="Visitor Identification" icon="eye">
    Match website visitors to professional profiles.
  </Card>

  <Card title="Data Completeness" icon="check-double">
    Fill in missing profile URLs in your contact database.
  </Card>
</CardGroup>


## OpenAPI

````yaml post /v1/people/b2b-profile
openapi: 3.1.0
info:
  title: LeadMagic API
  version: 1.4.34
  description: >
    # LeadMagic API Documentation


    The LeadMagic API provides comprehensive B2B data enrichment services
    including email validation, email finding, profile search, company
    intelligence, and more.


    ## Quick Start


    1. Get your API key from the [LeadMagic Dashboard](https://app.leadmagic.io)

    2. Add the `X-API-Key` header to all requests

    3. Start enriching your data!


    ## Base URL


    All API requests should be made to: `https://api.leadmagic.io`


    ## Rate Limits


    Each endpoint has specific rate limits (requests per minute). Exceeding
    limits returns a `429 Too Many Requests` response.


    ## Credits


    API calls consume credits based on the endpoint used. Check your balance
    with the `/v1/credits` endpoint.


    ## Support


    Contact us at support@leadmagic.io for assistance.
  contact:
    name: LeadMagic Support
    email: support@leadmagic.io
    url: https://leadmagic.io
  termsOfService: https://leadmagic.io/terms
servers:
  - url: https://api.leadmagic.io
    description: Production API Server
security:
  - ApiKeyAuth: []
tags:
  - name: Credits
    description: Manage and check your credit balance
  - name: Analytics
    description: >-
      Monitor your API usage with comprehensive analytics endpoints (FREE - no
      credits consumed)
  - name: People Enrichment
    description: Find and validate contact information for individuals
  - name: Company Enrichment
    description: Discover company information and intelligence
  - name: Jobs Data
    description: Search job listings and detect career changes
  - name: Ads Data
    description: Search advertising data across platforms
paths:
  /v1/people/b2b-profile:
    post:
      tags:
        - People Enrichment
      summary: Email Address to B2B Profile
      description: >-
        Use this endpoint to find a business profile based on the provided
        email.
      operationId: email-to-b2b-profile
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                work_email:
                  type: string
                  description: Provide the Work Email of the person
                  default: jesse@leadmagic.io
                personal_email:
                  type: string
                  description: Provide the Personal Email of the person
                  default: jesseouel@gmail.com
      responses:
        '200':
          description: Successful response with B2B profile details
          content:
            application/json:
              schema:
                type: object
                properties:
                  profile_url:
                    type: string
                    example: jouellette
                  message:
                    type: string
                    example: Profile URL found
                  credits_consumed:
                    type: integer
                    example: 10
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '402':
          $ref: '#/components/responses/PaymentRequired'
        '404':
          $ref: '#/components/responses/NotFound'
        '429':
          $ref: '#/components/responses/RateLimitExceeded'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  responses:
    BadRequest:
      description: |
        Bad Request - The request was malformed or contains invalid parameters.

        **Common causes:**
        - Missing required fields
        - Invalid field format (e.g., malformed email)
        - Invalid JSON syntax
        - Invalid parameter values
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/ValidationError'
    Unauthorized:
      description: |
        Unauthorized - Authentication failed.

        **Common causes:**
        - Missing X-API-Key header
        - Invalid or expired API key
        - Malformed API key
      content:
        application/problem+json:
          schema:
            oneOf:
              - $ref: '#/components/schemas/MissingAuthenticationError'
              - $ref: '#/components/schemas/InvalidApiKeyError'
    PaymentRequired:
      description: >
        Payment Required - Insufficient credits for this request.


        **Action required:** Add credits to your account at
        https://app.leadmagic.io/billing
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/InsufficientCreditsError'
    NotFound:
      description: |
        Not Found - The requested resource could not be found.

        **Common causes:**
        - Profile doesn't exist or is not accessible
        - Company not found in our database
        - Invalid URL or identifier
      content:
        application/problem+json:
          schema:
            oneOf:
              - $ref: '#/components/schemas/ResourceNotFoundError'
              - $ref: '#/components/schemas/ProfileNotFoundError'
    RateLimitExceeded:
      description: |
        Too Many Requests - Rate limit exceeded.

        **Action required:** Check the `Retry-After` header for when to retry.

        **Headers returned:**
        - `Retry-After`: Seconds until you can retry
        - `RateLimit-Limit`: Your limit per minute
        - `RateLimit-Remaining`: Remaining requests this minute
        - `RateLimit-Reset`: Seconds until limit resets
      headers:
        Retry-After:
          schema:
            type: integer
          description: Seconds to wait before retrying
        RateLimit-Limit:
          schema:
            type: integer
          description: Maximum requests per minute
        RateLimit-Remaining:
          schema:
            type: integer
          description: Remaining requests this minute
        RateLimit-Reset:
          schema:
            type: integer
          description: Seconds until limit resets
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/RateLimitExceededError'
    InternalServerError:
      description: >
        Internal Server Error - Something went wrong on our end.


        **Action required:** Wait 30 seconds and retry. If the problem persists,
        contact support@leadmagic.io
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/InternalServerError'
  schemas:
    ValidationError:
      allOf:
        - $ref: '#/components/schemas/ErrorResponse'
      example:
        success: false
        errors:
          - type: https://api.leadmagic.io/errors/validation_error
            title: Request validation failed. Check your input parameters.
            status: 400
            code: validation_error
            param:
              - email
            detail: 'Email format is invalid. Expected format: user@domain.com'
            action: Provide a valid email address in the 'email' field.
            docs: https://docs.leadmagic.io/api-reference/errors
        meta:
          request_id: ea6e3248-f4d2-437d-bca3-20881b529129
          timestamp: '2024-02-01T12:00:00.000Z'
    MissingAuthenticationError:
      allOf:
        - $ref: '#/components/schemas/ErrorResponse'
      example:
        success: false
        errors:
          - type: https://api.leadmagic.io/errors/missing_authentication
            title: >-
              Authentication required. Provide a valid API key in the X-API-Key
              header (case-insensitive).
            status: 401
            code: missing_authentication
            docs: https://docs.leadmagic.io/api-reference/authentication
        meta:
          request_id: ea6e3248-f4d2-437d-bca3-20881b529129
          timestamp: '2024-02-01T12:00:00.000Z'
    InvalidApiKeyError:
      allOf:
        - $ref: '#/components/schemas/ErrorResponse'
      example:
        success: false
        errors:
          - type: https://api.leadmagic.io/errors/invalid_api_key
            title: Invalid API key. The key does not exist or is incorrect.
            status: 401
            code: invalid_api_key
            docs: https://docs.leadmagic.io/api-reference/authentication
        meta:
          request_id: ea6e3248-f4d2-437d-bca3-20881b529129
          timestamp: '2024-02-01T12:00:00.000Z'
    InsufficientCreditsError:
      allOf:
        - $ref: '#/components/schemas/ErrorResponse'
      example:
        success: false
        errors:
          - type: https://api.leadmagic.io/errors/insufficient_credits
            title: 'Insufficient credits: need 5, have 2.50. Add credits to continue.'
            status: 402
            code: insufficient_credits
            detail: >-
              This request requires 5 credit(s) but your account only has 2.50
              credits remaining.
            action: >-
              Add credits to your account at https://app.leadmagic.io/billing or
              contact sales@leadmagic.io for enterprise plans.
            docs: https://docs.leadmagic.io/api-reference/credits
            context:
              credits_required: 5
              credits_available: 2.5
              credits_needed: 2.5
        meta:
          request_id: ea6e3248-f4d2-437d-bca3-20881b529129
          timestamp: '2024-02-01T12:00:00.000Z'
    ResourceNotFoundError:
      allOf:
        - $ref: '#/components/schemas/ErrorResponse'
      example:
        success: false
        errors:
          - type: https://api.leadmagic.io/errors/resource_not_found
            title: Resource not found.
            status: 404
            code: resource_not_found
            docs: https://docs.leadmagic.io/api-reference/errors
        meta:
          request_id: ea6e3248-f4d2-437d-bca3-20881b529129
          timestamp: '2024-02-01T12:00:00.000Z'
    ProfileNotFoundError:
      allOf:
        - $ref: '#/components/schemas/ErrorResponse'
      example:
        success: false
        errors:
          - type: https://api.leadmagic.io/errors/profile_not_found
            title: Profile not found or not accessible
            status: 404
            code: profile_not_found
            docs: https://docs.leadmagic.io/api-reference/errors
        meta:
          request_id: ea6e3248-f4d2-437d-bca3-20881b529129
          timestamp: '2024-02-01T12:00:00.000Z'
    RateLimitExceededError:
      allOf:
        - $ref: '#/components/schemas/ErrorResponse'
      example:
        success: false
        errors:
          - type: https://api.leadmagic.io/errors/rate_limit_exceeded
            title: >-
              Rate limit exceeded: 3,000 requests per 1 minute. Wait and try
              again.
            status: 429
            code: rate_limit_exceeded
            detail: >-
              You have exceeded the maximum allowed request rate. Please wait
              before making additional requests.
            action: >-
              Wait 42 seconds before retrying. Consider implementing exponential
              backoff.
            docs: https://docs.leadmagic.io/api-reference/rate-limits
            context:
              limit: 3000
              window: 1 minute
              remaining: 0
              reset_at: 1706745642
              retry_after_seconds: 42
        meta:
          request_id: ea6e3248-f4d2-437d-bca3-20881b529129
          timestamp: '2024-02-01T12:00:00.000Z'
    InternalServerError:
      allOf:
        - $ref: '#/components/schemas/ErrorResponse'
      example:
        success: false
        errors:
          - type: https://api.leadmagic.io/errors/INTERNAL_ERROR
            title: >-
              Something went wrong on our end. Our team has been notified and is
              investigating.
            status: 500
            code: INTERNAL_ERROR
            detail: >-
              This is a temporary server error. The issue has been automatically
              reported to our team.
            action: >-
              Wait 30 seconds and retry your request. If the problem persists,
              contact support@leadmagic.io
            docs: https://docs.leadmagic.io/api-reference/errors
        meta:
          request_id: ea6e3248-f4d2-437d-bca3-20881b529129
          timestamp: '2024-02-01T12:00:00.000Z'
    ErrorResponse:
      type: object
      description: RFC 9457 Problem Details error response
      required:
        - success
        - errors
      properties:
        success:
          type: boolean
          example: false
          description: Always false for error responses
        errors:
          type: array
          description: Array of error details (typically one, but can be multiple)
          items:
            $ref: '#/components/schemas/ErrorDetail'
        meta:
          $ref: '#/components/schemas/ResponseMeta'
    ErrorDetail:
      type: object
      description: RFC 9457 compliant error detail
      required:
        - type
        - title
        - status
      properties:
        type:
          type: string
          format: uri
          description: RFC 9457 - URI reference identifying the error type
          example: https://api.leadmagic.io/errors/validation_error
        title:
          type: string
          description: RFC 9457 - Short human-readable summary
          example: Request validation failed. Check your input parameters.
        status:
          type: integer
          description: RFC 9457 - HTTP status code
          example: 400
        detail:
          type: string
          description: RFC 9457 - Human-readable explanation specific to this occurrence
          example: The email field is required but was not provided.
        instance:
          type: string
          format: uri
          description: RFC 9457 - URI reference for this specific occurrence
          example: /v1/people/email-validation#req_abc123
        code:
          type: string
          description: Machine-readable error code for programmatic handling
          example: validation_error
        param:
          type: array
          description: Parameters that caused the error
          items:
            type: string
          example:
            - email
        action:
          type: string
          description: Suggested action to resolve the error
          example: Provide a valid email address in the 'email' field.
        docs:
          type: string
          format: uri
          description: Link to relevant documentation
          example: https://docs.leadmagic.io/api-reference/errors
        context:
          type: object
          description: Additional context specific to this error type
          additionalProperties: true
    ResponseMeta:
      type: object
      description: Metadata included in all responses
      properties:
        request_id:
          type: string
          format: uuid
          description: Unique identifier for this request (use for debugging/support)
          example: ea6e3248-f4d2-437d-bca3-20881b529129
        timestamp:
          type: string
          format: date-time
          description: ISO 8601 timestamp when the response was generated
          example: '2024-02-01T12:00:00.000Z'
        environment:
          type: string
          description: API environment (production, staging)
          example: production
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key
      description: >-
        Your LeadMagic API key. Header name is case-insensitive (X-API-Key,
        X-API-KEY, x-api-key all work).

````