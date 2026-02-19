> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Monitor Progress

> The Monitor Progress API is designed to track the current status of a data collection job, also known as a snapshot, indicating whether it is collecting data, processing it, or ready for download.

* [**Asynchronous Usage**](https://docs.brightdata.com/api-reference/rest-api/scraper/asynchronous-requests)**:** Trigger a data collection job via the async endpoint (`/trigger`), receive a `snapshot_id`, and poll the Monitor Progress API until the status is ready, then download the results.
* [**Synchronous Usage**](https://docs.brightdata.com/api-reference/web-scraper-api/synchronous-requests)**:** If a sync request (`/scrape`) exceeds the 1-minute timeout, receive a `snapshot_id` to poll the Monitor Progress API and download the results once they are ready.

The Monitor Progress API provides flexibility and stability, allowing efficient handling of large data volumes by differentiating between immediate and delayed result retrievals.

<Tip>
  If the request takes too long, we recommend sending an Asynchronous request.
</Tip>


## OpenAPI

````yaml  dca-api get /datasets/v3/progress/{snapshot_id}
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
  /datasets/v3/progress/{snapshot_id}:
    get:
      description: >-
        The Monitor Progress API is designed to track the current status of a
        data collection job, also known as a snapshot, indicating whether it is
        collecting data, processing it, or ready for download.
      parameters:
        - name: snapshot_id
          in: path
          required: true
          schema:
            type: string
            example: s_m4x7enmven8djfqak
          description: The ID that was returned when the collection was triggered
      responses:
        '200':
          description: Running
          content:
            application/json:
              schema:
                type: object
                properties:
                  snapshot_id:
                    type: string
                  dataset_id:
                    type: string
                  status:
                    type: string
                    description: Status of the snapshot
                    enum:
                      - starting
                      - running
                      - ready
                      - failed
              examples:
                running_snapshot:
                  value:
                    snapshot_id: s_m4x7enmven8djfqak
                    dataset_id: ds_123456789
                    status: running
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