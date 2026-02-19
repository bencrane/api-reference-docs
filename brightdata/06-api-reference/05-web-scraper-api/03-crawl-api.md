> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Crawl API

> Bright Data Web Scraper API enables you to trigger a collection for automated web data extraction.

Related guide: [Crawl API Introduction](/scraping-automation/crawl-api/overview)


## OpenAPI

````yaml api-reference/rest-api/scraper/crawl-rest-api.json post /datasets/v3/trigger
openapi: 3.1.0
info:
  title: Bright Data Web Scraper API
  description: >-
    API for automated web data collection and extraction with support for
    various scraping scenarios and delivery options
  version: 1.0.0
servers:
  - url: https://api.brightdata.com
security:
  - bearerAuth: []
paths:
  /datasets/v3/trigger:
    post:
      description: Trigger a web scraping collection based on provided inputs
      parameters:
        - name: dataset_id
          description: Your dataset ID
          in: query
          required: true
          schema:
            type: string
            example: gd_m6gjtfmeh43we6cqc
        - name: include_errors
          in: query
          schema:
            type: boolean
            example: true
          description: >-
            Include errors report with the results. By setting "include_errors"
            to `true`, you will receive a detailed report of any errors that
            occur during the data collection.
        - name: custom_output_fields
          description: >-
            The "custom_output_fields" parameter is used to filter the response
            data to include only the specified fields. You can list the output
            columns you want, separated by a pipe (`|`). 

             For example, if you want the response to include only the URL and the date it was last updated, you would set the parameter to "url|about.updated_on". This allows you to customize the data output to include only the fields relevant to your needs.
          in: query
          required: false
          schema:
            type: string
            example: url|about.updated_on
      requestBody:
        required: true
        description: >-
          You can provide the input data in either JSON or CSV format. The input
          specifies the URLs or other parameters required by the scraper.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TriggerInput'
            example:
              - url: https://www.airbnb.com/rooms/50122531
              - url: https://www.airbnb.com/rooms/50127677
          multipart/form-data:
            schema:
              type: object
              properties:
                data:
                  type: string
                  format: binary
                  description: >-
                    A CSV file containing the URLs or other inputs required by
                    the scraper
      responses:
        '200':
          description: Collection job successfully started
          content:
            application/json:
              schema:
                type: object
                properties:
                  snapshot_id:
                    type: string
                    description: >-
                      A Snapshot ID is a unique identifier for a specific data
                      snapshot, used to retrieve results from a data collection
                      job triggered via the API. Read more about [Snapshot
                      ID](/api-reference/terminology#snapshot-id).
                    example: s_m4x7enmven8djfqak
        '400':
          description: Bad request - invalid input parameters
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    example: Invalid input format
        '401':
          description: Unauthorized - invalid or missing API token
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    example: Unauthorized
components:
  schemas:
    TriggerInput:
      type: array
      description: >-
        An array of objects containing URLs or other parameters required by the
        scraper. The exact fields needed depend on the specific dataset being
        used.
      example:
        - url: https://www.airbnb.com/rooms/50122531
        - url: https://www.airbnb.com/rooms/50127677
      items:
        type: object
        additionalProperties:
          description: >-
            Properties vary based on the dataset requirements. Most commonly
            includes 'url' field. 
             Example: ```[{"url":"https://www.airbnb.com/rooms/50122531"},{"url":"https://www.airbnb.com/rooms/50127677"}]```
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