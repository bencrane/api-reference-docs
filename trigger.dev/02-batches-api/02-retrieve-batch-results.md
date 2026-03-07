> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Retrieve batch results

> Returns the execution results of all completed runs in a batch. Only finished runs (successful or failed) are included in the items array — runs that are still executing are omitted. Returns 404 if the batch doesn't exist.



## OpenAPI

````yaml v3-openapi GET /api/v1/batches/{batchId}/results
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
  /api/v1/batches/{batchId}/results:
    parameters:
      - $ref: '#/components/parameters/batchId'
    get:
      tags:
        - batches
      summary: Retrieve batch results
      description: >-
        Returns the execution results of all completed runs in a batch. Only
        finished runs (successful or failed) are included in the items array —
        runs that are still executing are omitted. Returns 404 if the batch
        doesn't exist.
      operationId: get_batch_results_v1
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
                  items:
                    type: array
                    description: Execution results for each run in the batch.
                    items:
                      type: object
                      required:
                        - ok
                        - id
                      properties:
                        ok:
                          type: boolean
                          description: Whether this run completed successfully.
                        id:
                          type: string
                          description: The run ID.
                        output:
                          type: string
                          description: >-
                            The serialized output as a string (present when ok
                            is true). Use outputType to determine how to parse
                            it — for "application/json" use JSON.parse().
                        outputType:
                          type: string
                          description: >-
                            The content type of the serialized output, e.g.
                            "application/json".
                        error:
                          type: object
                          description: Error details (present when ok is false).
                        usage:
                          type: object
                          properties:
                            durationMs:
                              type: number
                              description: Duration of the run in milliseconds.
                        taskIdentifier:
                          type: string
                          description: The task identifier.
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
            fetch("https://api.trigger.dev/api/v1/batches/batch_1234/results", {
              headers: {
                "Authorization": `Bearer ${process.env.TRIGGER_SECRET_KEY}`,
              },
            });

            const results = await response.json();
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