> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.
# Get Snapshot Metadata
> Get dataset snapshot metadata
## OpenAPI
````yaml dca-api GET /datasets/snapshots/{id}
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
  /datasets/snapshots/{id}:
    get:
      description: Get dataset snapshot metadata
      parameters:
        - in: path
          name: id
          description: >-
            A Snapshot ID is a unique identifier for a specific data snapshot,
            used to retrieve results from a data collection job triggered via
            the API. Read more about [Snapshot
            ID](/api-reference/terminology#snapshot-id).
          required: true
          schema:
            type: string
            example: snap_m2bxug4e2o352v1jv1
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DatasetSnapshotMeta'
        '404':
          description: Snapshot not found
          content:
            text/html:
              schema:
                type: string
                example: snapshot not found
components:
  schemas:
    DatasetSnapshotMeta:
      type: object
      properties:
        id:
          type: string
        created:
          type: string
          format: date-time
        status:
          type: string
          enum:
            - scheduled
            - building
            - ready
            - failed
        dataset_id:
          type: string
        customer_id:
          type: string
        dataset_size:
          type: integer
          description: Number of records in the snapshot
        file_size:
          type: integer
          description: Size of the snapshot file in bytes
        cost:
          type: number
        error:
          type: string
        error_code:
          type: string
        warning:
          type: string
        warning_code:
          type: string
        initiation_type:
          type: string
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