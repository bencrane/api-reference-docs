> ## Documentation Index
> Fetch the complete documentation index at: https://docs.blitz-api.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Find Companies

> ### 💰 Cost: 1 Credit per result (max = `max_results`)

Search for companies matching specific criteria: industry, location, size, keywords, and more.

All filters are optional and combined with **AND** logic. Within each filter, multiple values use **OR** logic.

> **Field Normalization**: Industry names, country codes, and other enum fields must match exact normalized values. See the [Field Normalization Reference](/guide/reference/field-normalization).



## OpenAPI

````yaml api-reference/v2.openapi.json post /v2/search/companies
openapi: 3.1.0
info:
  title: Blitz OpenAPI Reference
  version: 2.1.0
  description: >-
    Welcome to the Blitz API Reference.


    Use this interactive documentation to test endpoints directly in your
    browser. Authentication is required via the `x-api-key` header.


    ## Search APIs


    Our Search endpoints let you build targeted lists of companies and people
    using powerful filters. Both Company Search and People Search share common
    filter patterns (location, industry, keywords) documented in our [Field
    Normalization Guide](/guide/reference/field-normalization).
servers:
  - url: https://api.blitz-api.ai
    description: Production server
security: []
paths:
  /v2/search/companies:
    post:
      tags:
        - Company Search
      summary: Find Companies
      description: >-
        ### 💰 Cost: 1 Credit per result (max = `max_results`)


        Search for companies matching specific criteria: industry, location,
        size, keywords, and more.


        All filters are optional and combined with **AND** logic. Within each
        filter, multiple values use **OR** logic.


        > **Field Normalization**: Industry names, country codes, and other enum
        fields must match exact normalized values. See the [Field Normalization
        Reference](/guide/reference/field-normalization).
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                company:
                  $ref: '#/components/schemas/CompanySearchCriteria'
                  description: Company search criteria. All sub-filters are optional.
                cursor:
                  type: string
                  nullable: true
                  minLength: 3
                  default: null
                  description: >-
                    Pagination cursor returned by a previous request. Pass it to
                    retrieve the next page of results.
                max_results:
                  type: number
                  minimum: 1
                  maximum: 50
                  default: 10
                  description: Maximum number of results to return per page (1–50).
            examples:
              saas-europe:
                summary: SaaS companies in Europe (51-500 employees)
                value:
                  company:
                    keywords:
                      include:
                        - SaaS
                        - cloud platform
                    industry:
                      include:
                        - Software Development
                        - Technology; Information and Internet
                    hq:
                      continent:
                        - Europe
                    employee_range:
                      - 51-200
                      - 201-500
                  max_results: 25
              fintech-us-startup:
                summary: FinTech startups in the US founded after 2020
                value:
                  company:
                    keywords:
                      include:
                        - fintech
                        - payments
                        - neobank
                    hq:
                      country_code:
                        - US
                    founded_year:
                      min: 2020
                    employee_range:
                      - 1-10
                      - 11-50
                    type:
                      include:
                        - Privately Held
                  max_results: 10
              enterprise-apac:
                summary: Large enterprises in APAC
                value:
                  company:
                    hq:
                      sales_region:
                        - APAC
                    employee_range:
                      - 5001-10000
                      - 10001+
                    type:
                      include:
                        - Public Company
                    min_linkedin_followers: 10000
                  max_results: 50
              pagination:
                summary: Paginate to next page
                value:
                  company:
                    industry:
                      include:
                        - Software Development
                    hq:
                      country_code:
                        - FR
                  cursor: eyJwYWdlIjoyLCJzZWFyY2hfaWQiOiJhYmMxMjMifQ==
                  max_results: 25
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  results_count:
                    type: number
                    description: Number of companies returned in this page.
                  total_results:
                    type: number
                    description: Total number of companies matching the query.
                  cursor:
                    type: string
                    nullable: true
                    description: >-
                      Pagination cursor for the next page. `null` if no more
                      results.
                  results:
                    type: array
                    description: Array of matching company profiles.
                    items:
                      type: object
                      properties:
                        linkedin_url:
                          type: string
                        linkedin_id:
                          type: number
                        name:
                          type: string
                        about:
                          type: string
                          nullable: true
                        industry:
                          type: string
                          nullable: true
                        type:
                          type: string
                          nullable: true
                        size:
                          type: string
                          nullable: true
                        employees_on_linkedin:
                          type: number
                          nullable: true
                        followers:
                          type: number
                          nullable: true
                        founded_year:
                          type: number
                          nullable: true
                        specialties:
                          type: string
                          nullable: true
                        hq:
                          type: object
                          nullable: true
                          properties:
                            city:
                              type: string
                              nullable: true
                            state:
                              type: string
                              nullable: true
                            postcode:
                              type: string
                              nullable: true
                            country_code:
                              type: string
                              nullable: true
                            country_name:
                              type: string
                              nullable: true
                            continent:
                              type: string
                              nullable: true
                            street:
                              type: string
                              nullable: true
                        domain:
                          type: string
                          nullable: true
                        website:
                          type: string
                          nullable: true
                example:
                  results_count: 2
                  total_results: 148
                  cursor: eyJwYWdlIjoyLCJzZWFyY2hfaWQiOiJhYmMxMjMifQ==
                  results:
                    - linkedin_url: https://www.linkedin.com/company/blitz-api
                      linkedin_id: 108037802
                      name: Blitzapi
                      about: >-
                        BlitzAPI provides enriched B2B data access through a
                        suite of flexible and high-performance APIs.
                      industry: Technology; Information and Internet
                      type: Privately Held
                      size: 1-10
                      employees_on_linkedin: 3
                      followers: 6
                      founded_year: null
                      specialties: null
                      hq:
                        city: Paris
                        state: null
                        postcode: null
                        country_code: FR
                        country_name: France
                        continent: Europe
                        street: null
                      domain: blitz-api.ai
                      website: https://blitz-api.ai
                    - linkedin_url: https://www.linkedin.com/company/example-saas
                      linkedin_id: 987654321
                      name: ExampleSaaS
                      about: >-
                        Cloud-based project management platform for modern
                        teams.
                      industry: Software Development
                      type: Privately Held
                      size: 51-200
                      employees_on_linkedin: 124
                      followers: 3420
                      founded_year: 2021
                      specialties: SaaS, Project Management, Collaboration
                      hq:
                        city: Berlin
                        state: Berlin
                        postcode: '10115'
                        country_code: DE
                        country_name: Germany
                        continent: Europe
                        street: Friedrichstraße 123
                      domain: example-saas.com
                      website: https://www.example-saas.com
        '401':
          $ref: '#/components/responses/Unauthorized'
        '402':
          $ref: '#/components/responses/PaymentRequired'
        '422':
          $ref: '#/components/responses/InvalidInput'
        '429':
          $ref: '#/components/responses/TooManyRequests'
        '500':
          $ref: '#/components/responses/InternalServerError'
      security:
        - APIKey: []
components:
  schemas:
    CompanySearchCriteria:
      type: object
      description: Company-level filters for Company Search.
      properties:
        name:
          $ref: '#/components/schemas/KeywordFilter'
          description: Search in the company name.
        keywords:
          $ref: '#/components/schemas/KeywordFilter'
          description: Search in the company description / about section.
        industry:
          $ref: '#/components/schemas/EnumFilter'
          description: >-
            Filter by LinkedIn industry. See [Field
            Normalization](/guide/reference/field-normalization#industries) for
            the full list of ~700 accepted values.
        hq:
          $ref: '#/components/schemas/LocationFilter'
          description: Filter by headquarters location.
        employee_count:
          $ref: '#/components/schemas/RangeFilter'
          description: Filter by exact LinkedIn employee count (numeric range).
        employee_range:
          type: array
          items:
            type: string
            enum:
              - 1-10
              - 11-50
              - 51-200
              - 201-500
              - 501-1000
              - 1001-5000
              - 5001-10000
              - 10001+
          default: []
          description: >-
            Filter by LinkedIn employee range bucket. Mutually combinable (OR
            logic).
        founded_year:
          $ref: '#/components/schemas/RangeFilter'
          description: Filter by founding year (numeric range).
        type:
          $ref: '#/components/schemas/EnumFilter'
          description: >-
            Filter by company type. Accepted values: `Educational`, `Educational
            Institution`, `Government Agency`, `Nonprofit`, `Partnership`,
            `Privately Held`, `Public Company`, `Self-Employed`, `Self-Owned`,
            `Sole Proprietorship`.
        min_linkedin_followers:
          type: number
          minimum: 0
          maximum: 10000000
          default: 1
          description: Minimum number of LinkedIn followers.
    KeywordFilter:
      type: object
      description: >-
        Keyword filter with include/exclude logic. Used across Company Search
        (name, keywords) and People Search (title, headline).
      properties:
        include:
          type: array
          items:
            type: string
          default: []
          description: Keywords to match. Results must contain at least one of these terms.
        exclude:
          type: array
          items:
            type: string
          default: []
          description: >-
            Keywords to exclude. Results containing any of these terms are
            filtered out.
    EnumFilter:
      type: object
      description: >-
        Enum filter with include/exclude logic. Used for industry, company type,
        and similar categorical fields.
      properties:
        include:
          type: array
          items:
            type: string
          default: []
          description: Values to match. Results must match at least one.
        exclude:
          type: array
          items:
            type: string
          default: []
          description: Values to exclude.
    LocationFilter:
      type: object
      description: >-
        Location filter for headquarters (Company Search) or person location
        (People Search). All sub-fields are optional and combined with AND
        logic.
      properties:
        continent:
          type: array
          items:
            type: string
            enum:
              - Africa
              - Antarctica
              - Asia
              - Europe
              - North America
              - Oceania
              - South America
          default: []
          description: >-
            Filter by continent. See [Field
            Normalization](/guide/reference/field-normalization#continents) for
            accepted values.
        country_code:
          type: array
          items:
            type: string
          default: []
          description: >-
            ISO 3166-1 alpha-2 country codes (e.g., `US`, `FR`, `DE`). See
            [Field
            Normalization](/guide/reference/field-normalization#country-codes).
        sales_region:
          type: array
          items:
            type: string
            enum:
              - NORAM
              - LATAM
              - EMEA
              - APAC
          default: []
          description: >-
            Filter by sales region. See [Field
            Normalization](/guide/reference/field-normalization#sales-regions).
        city:
          $ref: '#/components/schemas/KeywordFilter'
          description: Keyword search on the city name.
    RangeFilter:
      type: object
      description: >-
        Numeric range filter. Used for employee_count, founded_year, and similar
        numeric fields.
      properties:
        min:
          type: number
          minimum: 0
          default: 0
          description: Minimum value (inclusive).
        max:
          type: number
          minimum: 0
          default: 0
          description: Maximum value (inclusive). Set to `0` to leave unbounded.
    ErrorUnauthorized:
      type: object
      properties:
        message:
          type: string
      example:
        message: >-
          Missing API key, please provide a valid API key in the 'x-api-key'
          header
    ErrorPaymentRequired:
      type: object
      properties:
        message:
          type: string
      example:
        message: Insufficient credits balance
    ErrorInvalidInput:
      type: object
      properties:
        success:
          type: boolean
        error:
          type: object
          properties:
            code:
              type: string
            message:
              type: string
      example:
        success: false
        error:
          code: INVALID_INPUT
          message: Missing required fields
    ErrorInternalServer:
      type: object
      properties:
        success:
          type: boolean
        message:
          type: string
      example:
        success: false
        message: this is a controlled error. created at 2025-07-11T10:20:00.000Z
  responses:
    Unauthorized:
      description: Unauthorized – Missing or invalid API key.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorUnauthorized'
    PaymentRequired:
      description: Payment Required – Insufficient credits.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorPaymentRequired'
    InvalidInput:
      description: Unprocessable Entity – Invalid input.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorInvalidInput'
    TooManyRequests:
      description: Too Many Requests – Rate limit exceeded.
      content:
        application/json:
          schema:
            type: object
            example:
              success: false
              message: Rate limit exceeded, please try again later
    InternalServerError:
      description: Internal Server Error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorInternalServer'
  securitySchemes:
    APIKey:
      type: apiKey
      in: header
      name: x-api-key
      description: Your Blitz API Key.

````