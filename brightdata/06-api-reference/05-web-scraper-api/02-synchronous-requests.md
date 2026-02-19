> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Synchronous Requests

> This endpoint allows users to fetch data efficiently and ensures seamless integration with their applications or workflows.

## How It Works

This synchronous API endpoint allows users to send a scraping request and receive the results in real-time directly in the response, at the point of request - such as a terminal or application - without the need for external storage or manual downloads. This approach streamlines the data collection process by eliminating additional steps for retrieving results.

You can specify the desired output format using the format parameter. If no format is provided, the response will default to JSON.

## Timeout Limit

Please note that this synchronous request is subject to a 1 minute timeout limit. If the data retrieval process exceeds this limit, the API will return an HTTP 202 response, indicating that the request is still being processed. In such cases, you will receive a snapshot ID to monitor and retrieve the results asynchronously via the Monitor Snapshot and Download Snapshot endpoints.

Example response on timeout:

```JSON 202 theme={null}
{
  "snapshot_id": "s_xxx",
  "message": "Your request is still in progress and cannot be retrieved in this call. Use the provided Snapshot ID to track progress via the Monitor Snapshot endpoint and download it once ready via the Download Snapshot endpoint."
}
```


## OpenAPI

````yaml dca-api POST /datasets/v3/scrape
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
  /datasets/v3/scrape:
    post:
      summary: Scrape data and return it directly in the response.
      description: >-
        This endpoint allows users to fetch data efficiently and ensures
        seamless integration with their applications or workflows.
      parameters:
        - name: dataset_id
          in: query
          description: Dataset ID for which data collection is triggered.
          required: true
          schema:
            type: string
        - name: custom_output_fields
          description: >-
            List of output columns, separated by `|` (e.g.,
            `url|about.updated_on`). Filters the response to include only the
            specified fields.
          in: query
          required: false
          schema:
            type: string
            example: url|about.updated_on
        - name: include_errors
          in: query
          schema:
            type: boolean
          description: Include errors report with the results.
        - name: format
          in: query
          description: 'Specifies the format of the response (default: ndjson).'
          schema:
            type: string
            enum:
              - ndjson
              - json
              - csv
            default: json
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ScrapeRequestWithFields'
      responses:
        '200':
          description: OK
          content:
            text/plain:
              schema:
                type: string
                example: OK
        '202':
          description: Request is still in progress, snapshot will be available later.
          headers:
            retry-after:
              description: Time in seconds before retrying the request.
              schema:
                type: integer
                example: 10
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                  message:
                    type: string
              example:
                status: starting
                message: Snapshot is not ready yet, try again in 30s
components:
  schemas:
    ScrapeRequestWithFields:
      type: object
      properties:
        input:
          type: array
          items:
            type: object
            properties:
              url:
                type: string
                description: URL to scrape.
            required:
              - url
          description: List of input items to scrape.
        custom_output_fields:
          type: string
          description: >-
            List of output columns, separated by `|` (e.g.,
            `url|about.updated_on`). Filters the response to include only the
            specified fields.
          example: url|about.updated_on
      required:
        - input
      example:
        input:
          - url: www.linkedin.com/in/bulentakar
        custom_output_fields: url|about.updated_on
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