> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.
# Get Snapshot Delivery Parts
> When requesting a delivery in batches (see available delivery APIs) use this endpoint to check how many parts were created. format, compress and batch_size should exactly match what was sent to the delivery/download API calls.
## OpenAPI
````yaml dca-api get /datasets/v3/snapshot/{snapshot_id}/parts
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
  /datasets/v3/snapshot/{snapshot_id}/parts:
    get:
      description: >-
        When requesting a delivery in batches (see available delivery APIs) use
        this endpoint to check how many parts were created. format, compress and
        batch_size should exactly match what was sent to the delivery/download
        API calls.
      parameters:
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
          description: Divide into batches of X records
          required: false
          schema:
            type: integer
            minimum: 1000
          example: 1000
        - name: snapshot_id
          in: path
          required: true
          schema:
            type: string
            example: s_m4x7enmven8djfqak
            description: The ID that was returned when the collection was triggered
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  parts:
                    type: integer
                    description: Number of parts that were created
components:
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