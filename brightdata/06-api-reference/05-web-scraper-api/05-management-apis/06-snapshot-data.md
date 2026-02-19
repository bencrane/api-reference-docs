> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.
# Get Snapshot Data
> Retrieve the logs for a specific dataset snapshot
## OpenAPI
````yaml dca-api get /datasets/v3/log/{snapshot_id}
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
  /datasets/v3/log/{snapshot_id}:
    get:
      description: Retrieve the logs for a specific dataset snapshot
      parameters:
        - name: snapshot_id
          in: path
          required: true
          schema:
            type: string
            example: s_mcd3rc6l2md984eoij
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SnapshotDataResponse'
        '404':
          description: Snapshot not found
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    example: Snapshot not found
components:
  schemas:
    SnapshotDataResponse:
      type: object
      examples:
        - id: s_mcd3rc6l2md984eoij
          created: '2025-06-26T08:09:32.781Z'
          Status: ready
          dataset_name: Apple App Store
          scraper_name: Apple App Store - collect by URL
          Dataset_size: 2
          Inputs_count: 2
          Dataset_id: gd_lsk9ki3u2iishmwrui
          Discovery_collector_id: null
          file_size: 65381
          trigger:
            type: CP
            user: amite@brightdata.com
            ip: 130.41.220.17
            trigger_url: >-
              /trigger?customer=hl_dacd97fb&type=url_collection&dataset_id=gd_lsk9ki3u2iishmwrui&include_errors=true&discover_only=false
            ts: '2025-06-26T08:09:32.074Z'
          Duration: 6
          Duration_per_input: 3
          Success_rate: 1
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