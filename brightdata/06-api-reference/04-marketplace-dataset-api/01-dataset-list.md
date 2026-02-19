> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.
# Dataset list
> List all Dataset IDs of all Scraper APIs, you can use this API endpoint to retrieve a list of available datasets.
<a href="https://www.postman.com/bright-data-api/bright-data-api/request/1o6iob0/dataset-list" target="_blank">
  <img height="32" width="128" noZoom src="https://run.pstmn.io/button.svg" />
</a>
## OpenAPI
````yaml dca-api GET /datasets/list
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
  /datasets/list:
    get:
      tags:
        - Datasets
      description: Retrieve a list of available datasets
      operationId: listDatasets
      responses:
        '200':
          description: List of available datasets
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/DatasetListItem'
                example:
                  - id: gd_l1vijqt9jfj7olije
                    name: Crunchbase companies information
                    size: 2300000
                  - id: gd_l1vikfch901nx3by4
                    name: Instagram - Profiles
                    size: 620000000
        '401':
          description: Unauthorized - Invalid or missing API token
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    example: Unauthorized
        '500':
          description: Internal server error
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    example: Internal server error
components:
  schemas:
    DatasetListItem:
      type: object
      required:
        - id
        - name
        - size
      properties:
        id:
          type: string
          description: Unique identifier for the dataset
          example: gd_l1vijqt9jfj7olije
        name:
          type: string
          description: Human-readable name of the dataset
          example: Crunchbase companies information
        size:
          type: integer
          description: Number of records in the dataset
          example: 2300000
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