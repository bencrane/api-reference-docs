> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Cancel run

> Cancels an in-progress run. If the run is already completed, this will have no effect.



## OpenAPI

````yaml v3-openapi POST /api/v2/runs/{runId}/cancel
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
  /api/v2/runs/{runId}/cancel:
    parameters:
      - $ref: '#/components/parameters/runId'
    post:
      tags:
        - runs
      summary: Cancel a run
      description: >-
        Cancels an in-progress run. If the run is already completed, this will
        have no effect.
      operationId: cancel_run_v1
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
                    description: The ID of the run that was canceled.
                    example: run_1234
        '400':
          description: Invalid request
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    enum:
                      - Invalid or missing run ID
                      - Failed to create new run
        '401':
          description: Unauthorized request
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    enum:
                      - Invalid or Missing API key
        '404':
          description: Resource not found
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    enum:
                      - Run not found
      security:
        - secretKey: []
      x-codeSamples:
        - lang: typescript
          source: |-
            import { runs } from "@trigger.dev/sdk";

            await runs.cancel("run_1234");
components:
  parameters:
    runId:
      in: path
      name: runId
      required: true
      schema:
        type: string
      description: >
        The ID of an run, starts with `run_`. The run ID will be returned when
        you trigger a run on a task.
      example: run_1234
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