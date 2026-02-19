> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Download Snapshot

> Download the snapshot content. This endpoint allows you to retrieve the collected dataset once the snapshot status is `ready`. Data can be downloaded in multiple formats and optionally split into batches.

<Note>
  Result data is available for download for 16 days after collection. To avoid expiration, make sure to download the data within 16 days or configure a delivery method to get it automatically to your storage.
</Note>

<Note>
  If needed, the result can be divided into several parts:

  1. Download the first part by specifying a `batch_size` and `part=1`
  2. Check how many part were created using <a href="/api-reference/web-scraper-api/management-apis/get-snapshot-delivery-parts#get-snapshot-delivery-parts" target="_blank">
     this endpoint</a>
  3. Download the rest of the parts by changing the `part` parameter. (`batch_size`, `format` and `compress` must stay the same for each call)
</Note>


## OpenAPI

````yaml dca-api GET /datasets/v3/snapshot/{snapshot_id}
openapi: 3.1.0
info:
  title: Brightdata API
  description: API for interaction with datasets marketplace
  version: 1.0.0
servers:
  - url: https://api.brightdata.com
security:
  - bearerAuth: []
paths:
  /datasets/v3/snapshot/{snapshot_id}:
    get:
      description: >-
        Download the snapshot content. This endpoint allows you to retrieve the
        collected dataset once the snapshot status is `ready`. Data can be
        downloaded in multiple formats and optionally split into batches.
      parameters:
        - name: snapshot_id
          in: path
          required: true
          schema:
            type: string
            example: s_m4x7enmven8djfqak
          description: The ID that was returned when the collection was triggered
        - name: format
          in: query
          description: Format of the data to be received
          required: false
          schema:
            type: string
            enum:
              - json
              - ndjson
              - jsonl
              - csv
          example: json
        - name: compress
          in: query
          description: Whether the result should be compressed or not
          required: false
          schema:
            type: boolean
          example: true
        - name: batch_size
          in: query
          description: Divide the snapshot into batches of X records
          required: false
          schema:
            type: integer
            minimum: 1000
          example: 1000
        - name: part
          in: query
          description: If `batch_size` was provided, specifies which batch part to download
          required: false
          schema:
            type: integer
          example: 1
      responses:
        '200':
          description: Okk
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DatasetSnapshotContent'
                description: Snapshot data in the requested format
              examples:
                snapshot_data:
                  value:
                    about: >-
                      Bitstamp is the world's longest-running cryptocurrency
                      exchange...
                    company_id: '2734818'
                    company_size: 501-1,000 employees
                    country_code: LU
                    name: Bitstamp
                    url: https://www.linkedin.com/company/bitstamp
                    website: https://www.bitstamp.net/
        '400':
          description: Invalid request parameters
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
              examples:
                invalid_request:
                  value:
                    error: Invalid request parameters
        '401':
          description: User authentication is required
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
              examples:
                unauthorized:
                  value:
                    error: User authentication is required
        '404':
          description: Snapshot not found
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
              examples:
                snapshot_not_found:
                  value:
                    error: Snapshot not found
        '409':
          description: Snapshot is not ready for download
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
              examples:
                snapshot_not_ready:
                  value:
                    error: Snapshot is not ready for download
components:
  schemas:
    DatasetSnapshotContent:
      type: object
      example:
        about: >-
          Bitstamp is the world's longest-running cryptocurrency exchange,
          continuously supporting the Bitcoin economy since 2011. With a proven
          track record and mature approach to the industry, Bitstamp provides a
          secure and transparent venue to over four million customers and
          enables partners to access emerging crypto markets through time-proven
          infrastructure. NMLS ID: 1905429 View more on the NMLS website here:
          https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/1905429
        affiliated: []
        company_id: '2734818'
        company_size: 501-1,000 employees
        country_code: LU
        crunchbase_url: >-
          https://www.crunchbase.com/organization/bitstamp?utm_source=linkedin&utm_medium=referral&utm_campaign=linkedin_companies&utm_content=profile_cta_anon&trk=funding_crunchbase
        description: "Bitstamp | 30,341 followers on LinkedIn. World&#39;s longest-running crypto exchange | Bitstamp is the world's longest-running cryptocurrency exchange, continuously supporting the Bitcoin economy since 2011."
        employees_in_linkedin: 365
        followers: 30341
        formatted_locations:
          - Luxembourg, Luxembourg L-2520, LU
        founded: 2011
        headquarters: Luxembourg, Luxembourg
        id: bitstamp
        industries: Financial Services
        input:
          url: https://www.linkedin.com/company/2734818
        investors:
          - Ripple
        locations:
          - Luxembourg, Luxembourg L-2520, LU
        name: Bitstamp
        organization_type: Privately Held
        slogan: World's longest-running crypto exchange
        sphere: Financial Services
        type: Privately Held
        url: https://www.linkedin.com/company/bitstamp
        website: https://www.bitstamp.net/
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