> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Retrieve a batch

> Retrieve a batch by its ID, including its status and the IDs of all runs in the batch.



## OpenAPI

````yaml v3-openapi GET /api/v1/batches/{batchId}
openapi: 3.1.0
info:
  title: Trigger.dev v3 REST API
  description: >-
    The REST API lets you trigger and manage runs on Trigger.dev. You can
    trigger a run, get the status of a run, and get the results of a run. 
  version: 2024-04
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
servers:
  - url: https://api.trigger.dev
    description: Trigger.dev API
security: []
paths:
  /api/v1/batches/{batchId}:
    parameters:
      - $ref: '#/components/parameters/batchId'
    get:
      tags:
        - batches
      summary: Retrieve a batch
      description: >-
        Retrieve a batch by its ID, including its status and the IDs of all runs
        in the batch.
      operationId: retrieve_batch_v1
      responses:
        '200':
          description: Successful request
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                    description: The batch ID.
                  status:
                    type: string
                    enum:
                      - PENDING
                      - PROCESSING
                      - COMPLETED
                      - PARTIAL_FAILED
                      - ABORTED
                    description: The current status of the batch.
                  idempotencyKey:
                    type: string
                    nullable: true
                    description: The idempotency key provided when triggering, if any.
                  createdAt:
                    type: string
                    format: date-time
                  updatedAt:
                    type: string
                    format: date-time
                  runCount:
                    type: integer
                    description: The total number of runs in the batch.
                  runs:
                    type: array
                    items:
                      type: string
                    description: Array of run IDs in the batch.
                  successfulRunCount:
                    type: integer
                    nullable: true
                    description: Number of successful runs (populated after completion).
                  failedRunCount:
                    type: integer
                    nullable: true
                    description: Number of failed runs (populated after completion).
                  errors:
                    type: array
                    nullable: true
                    description: >-
                      Error details for failed items (present for PARTIAL_FAILED
                      batches).
                    items:
                      type: object
                      properties:
                        index:
                          type: integer
                          description: The index of the failed item.
                        taskIdentifier:
                          type: string
                          description: The task identifier of the failed item.
                        error:
                          type: object
                          description: The error details.
                        errorCode:
                          type: string
                          nullable: true
                          description: An optional error code.
        '401':
          description: Unauthorized request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '404':
          description: Batch not found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
      security:
        - secretKey: []
      x-codeSamples:
        - lang: typescript
          label: Fetch
          source: >-
            const response = await
            fetch("https://api.trigger.dev/api/v1/batches/batch_1234", {
              headers: {
                "Authorization": `Bearer ${process.env.TRIGGER_SECRET_KEY}`,
              },
            });

            const batch = await response.json();
components:
  parameters:
    batchId:
      in: path
      name: batchId
      required: true
      schema:
        type: string
      description: The ID of the batch, starts with `batch_`.
      example: batch_1234
  schemas:
    ErrorResponse:
      type: object
      properties:
        error:
          type: string
          example: Something went wrong
      required:
        - error
  securitySchemes:
    secretKey:
      type: http
      scheme: bearer
      description: >
        Use your project-specific Secret API key. Will start with `tr_dev_`,
        `tr_prod`, `tr_stg`, etc.


        You can find your Secret API key in the API Keys section of your
        Trigger.dev project dashboard.


        Our TypeScript SDK will default to using the value of the
        `TRIGGER_SECRET_KEY` environment variable if it is set. If you are using
        the SDK in a different environment, you can set the key using the
        `configure` function.


        ```typescript

        import { configure } from "@trigger.dev/sdk";


        configure({ accessToken: "tr_dev_1234" });

        ```

````