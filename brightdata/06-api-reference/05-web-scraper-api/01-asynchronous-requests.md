> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Asynchronous Requests

> Bright Data Web Scraper API enables you to trigger a collection for automated web data extraction.

Related guide: [Web Scraper API Introduction](/datasets/scrapers/scrapers-library/overview)

<a href="https://www.postman.com/bright-data-api/bright-data-api/request/1z189u8/trigger-chatgpt-search-scraping" target="_blank">
  <img height="32" width="128" noZoom={true} src="https://run.pstmn.io/button.svg" />
</a>


## OpenAPI

````yaml api-reference/rest-api/scraper/scraper-rest-api.json post /datasets/v3/trigger
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
          description: >-
            Dataset ID for which data collection is triggered. Read more about
            [Dataset ID](/api-reference/terminology#dataset-id).
          in: query
          required: true
          schema:
            type: string
            example: gd_l1vikfnt1wgvvqz95w
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
        - name: type
          in: query
          schema:
            type: string
            enum:
              - discover_new
          description: >-
            Set it to "discover_new" to trigger a collection that includes a
            discovery phase. 

             Enables a discovery phase that finds new entities or products using methods like search, categories, or keywords. Use this when collecting data where specific targets aren't known in advance. It will discover new information based on your provided inputs rather than working with predefined data points.
        - name: discover_by
          in: query
          schema:
            type: string
          description: >-
            Specifies the method used for discovering new data during a
            collection. Here are some available options: 

             - `keyword`: Uses keywords to discover new entities or products. Example: "smartphones" - This will trigger a collection to discover new smartphone products or entities. 
             - `best_sellers_url`: Uses a URL that lists best-selling items to discover new products.
             Example: "https://example.com/best-sellers" - This URL will be used to discover products listed as best sellers on the site. 
             - `category_url`: Uses a URL that lists categories to discover new entities within those categories. Example: "https://example.com/electronics" - This URL will be used to discover new products within the electronics category. 
             - `location`: Uses a location-based approach to discover entities relevant to that location. Example: "New York" - This will trigger a collection to discover data related to the specified location.
        - name: include_errors
          in: query
          schema:
            type: boolean
            example: true
          description: >-
            Include errors report with the results. By setting "include_errors"
            to `true`, you will receive a detailed report of any errors that
            occur during the data collection.
        - name: limit_per_input
          in: query
          schema:
            type: number
            minimum: 1
          description: Limit the number of results per input
        - name: limit_multiple_results
          in: query
          schema:
            type: number
            minimum: 1
          description: Limit the total number of results
        - name: notify
          in: query
          schema:
            type: string
            example: true
          description: >-
            Specify whether notifications should be sent upon completion of the
            data collection job. When set to `true`, it enables notifications to
            be sent to the specified webhook, informing you about the status or
            completion of the collection.
        - name: endpoint
          in: query
          schema:
            type: string
            example: https://example.com/webhook
          description: >-
            Specify the Webhook URL that should be called for the data
            collection process.
        - name: format
          in: query
          schema:
            type: string
            enum:
              - json
              - ndjson
              - jsonl
              - csv
            example: json
          description: Specifies the format of the data to be delivered
        - name: auth_header
          in: query
          schema:
            type: string
          description: Authorization header for webhook delivery
        - name: uncompressed_webhook
          in: query
          schema:
            type: boolean
            example: true
          description: >-
            By default, the data will be sent compressed. Pass true to send it
            uncompressed
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
                    example:
                      snapshot_id: s_m4x7enmven8djfqak
              example:
                snapshot_id: s_m4x7enmven8djfqak
        '400':
          description: Bad request - invalid input parameters
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Description of the validation error.
                    example:
                      error: Invalid input format
              example:
                error: Invalid input format
        '401':
          description: Unauthorized - invalid or missing API token
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Authentication error message.
                    example:
                      error: Unauthorized
              example:
                error: Unauthorized
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