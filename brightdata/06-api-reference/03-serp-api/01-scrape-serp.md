> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Scrape SERP

> Extract search engine results using Bright Data SERP API. Extract structured data from major search engines including Google, Bing, Yandex, DuckDuckGo, and more.  Get organic results, paid ads, local listings, shopping results, and other SERP features.

Related guide: [SERP API Introduction](/scraping-automation/serp-api/introduction)

<a href="https://www.postman.com/bright-data-api/bright-data-api/request/kpq952m/google-search" target="_blank">
  <img height="32" width="128" noZoom src="https://run.pstmn.io/button.svg" />
</a>

<Card title="Bright Data Python SDK" icon="python" href="https://docs.brightdata.com/api-reference/SDK" cta="Get Started">
  For an easy start using our tools check out our new Python SDK.
</Card>


## OpenAPI

````yaml serp-rest-api POST /request
openapi: 3.0.1
info:
  title: Brightdata SERP API
  description: >-
    Integrate Bright Data SERP APIs to your pipeline and secure high-end
    scraping precision
  version: 1.0.0
servers:
  - url: https://api.brightdata.com
security:
  - bearerAuth: []
paths:
  /request:
    post:
      parameters:
        - in: query
          name: async
          description: Set this to `true` for asynchronous
          required: false
          schema:
            type: boolean
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PostBody'
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTP200'
        '400':
          description: Unauthorized
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTP400'
        '401':
          description: Unauthorized
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTP401'
components:
  schemas:
    PostBody:
      required:
        - zone
        - url
        - format
      type: object
      properties:
        zone:
          description: >-
            Zone identifier that defines your Bright Data product configuration.
            Each zone contains targeting rules, output preferences, and access
            permissions. 
             Manage zones at: https://brightdata.com/cp/zones
          type: string
          example: serp_api1
        url:
          description: >-
            Complete target URL to scrape. Must include protocol (http/https),
            be publicly accessible.
          type: string
          example: https://www.google.com/search?q=pizza
        format:
          description: >-
            Response format: `raw` returns HTML content as string, `json`
            returns structured data.
          type: string
          enum:
            - raw
            - json
          example: json
        method:
          description: Method for requesting an HTML via proxy is `GET`.
          type: string
          default: GET
          example: GET
        country:
          description: >-
            Two-letter ISO 3166-1 country code for proxy location (e.g., `us`,
            `gb`, `de`, `ca`, `au`). If not specified, system auto-selects
            optimal location based on your zone configuration. 
             List of country codes: https://docs.brightdata.com/general/faqs#where-can-i-see-the-list-of-country-codes
          type: string
          example: us
        data_format:
          description: >-
            Additional response format transformation: `markdown` converts HTML
            content to clean markdown format, `screenshot` captures a PNG image
            of the rendered page.
          type: string
          enum:
            - markdown
            - screenshot
          example: markdown
    HTTP200:
      type: string
      example: OK
    HTTP400:
      type: string
      example: Bad Request
    HTTP401:
      type: string
      example: User authentication is required
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      description: >-
        Use your Bright Data API Key as a Bearer token in the Authorization
        header.


        **How to authenticate:**

        1. Obtain your API Key from the Bright Data account settings at
        https://brightdata.com/cp/setting/users

        2. Include the API Key in the Authorization header of your requests

        3. Format: `Authorization: Bearer YOUR_API_KEY`


        **Example:**

        ```

        Authorization: Bearer
        b5648e1096c6442f60a6c4bbbe73f8d2234d3d8324554bd6a7ec8f3f251f07df

        ```


        Learn how to get your Bright Data API key:
        https://docs.brightdata.com/api-reference/authentication
      bearerFormat: API Key

````