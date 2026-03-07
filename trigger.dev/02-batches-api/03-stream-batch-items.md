> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Stream batch items

> Phase 2 of 2-phase batch API. Accepts an NDJSON stream of batch items and enqueues them.
Each line in the body should be a valid BatchItemNDJSON object.
The stream is processed with backpressure - items are enqueued as they arrive.
The batch is sealed when the stream completes successfully.




## OpenAPI

````yaml openapi POST /api/v3/batches/{batchId}/items
openapi: 3.0.0
info:
  title: Trigger.dev API
  description: API for triggering events in Trigger.dev
  version: 1.0.0
servers:
  - url: https://api.trigger.dev
    description: Trigger.dev API server
security:
  - BearerAuth: []
paths:
  /api/v3/batches/{batchId}/items:
    post:
      tags:
        - Batches
      summary: Stream batch items (Phase 2)
      description: >
        Phase 2 of 2-phase batch API. Accepts an NDJSON stream of batch items
        and enqueues them.

        Each line in the body should be a valid BatchItemNDJSON object.

        The stream is processed with backpressure - items are enqueued as they
        arrive.

        The batch is sealed when the stream completes successfully.
      operationId: streamBatchItems
      parameters:
        - name: batchId
          in: path
          required: true
          description: The batch ID returned from POST /api/v3/batches
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/x-ndjson:
            schema:
              type: string
              description: >
                NDJSON (newline-delimited JSON) stream where each line is a
                BatchItemNDJSON object.

                Example:

                {"index":0,"task":"my-task","payload":{"key":"value1"}}

                {"index":1,"task":"my-task","payload":{"key":"value2"}}
          application/ndjson:
            schema:
              type: string
              description: >
                NDJSON (newline-delimited JSON) stream where each line is a
                BatchItemNDJSON object.
      responses:
        '200':
          description: Items successfully processed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StreamBatchItemsResponse'
        '400':
          description: Invalid request (e.g., invalid JSON, item exceeds maximum size)
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '401':
          description: Unauthorized - API key is missing or invalid
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '415':
          description: >-
            Unsupported Media Type - Content-Type must be application/x-ndjson
            or application/ndjson
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '422':
          description: Validation error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '500':
          description: Internal server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
      externalDocs:
        description: Find more info here
        url: https://trigger.dev/docs/triggering
components:
  schemas:
    StreamBatchItemsResponse:
      type: object
      required:
        - id
        - itemsAccepted
        - itemsDeduplicated
        - sealed
      properties:
        id:
          type: string
          description: The batch ID.
        itemsAccepted:
          type: integer
          description: Number of items successfully accepted.
        itemsDeduplicated:
          type: integer
          description: Number of items that were deduplicated (already enqueued).
        sealed:
          type: boolean
          description: >
            Whether the batch was sealed and is ready for processing.

            If false, the batch needs more items before processing can start.

            Clients should check this field and retry with missing items if
            needed.
        enqueuedCount:
          type: integer
          description: >-
            Total items currently enqueued. Only present when sealed=false to
            help with retries.
        expectedCount:
          type: integer
          description: >-
            Expected total item count. Only present when sealed=false to help
            with retries.
    Error:
      type: object
      properties:
        message:
          type: string
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

````