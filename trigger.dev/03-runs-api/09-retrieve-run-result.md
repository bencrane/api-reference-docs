> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Retrieve run result

> Returns the execution result of a completed run. Returns 404 if the run doesn't exist or hasn't finished yet.



## OpenAPI

````yaml v3-openapi GET /api/v1/runs/{runId}/result
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
  /api/v1/runs/{runId}/result:
    parameters:
      - $ref: '#/components/parameters/runId'
    get:
      tags:
        - runs
      summary: Retrieve run result
      description: >-
        Returns the execution result of a completed run. Returns 404 if the run
        doesn't exist or hasn't finished yet.
      operationId: get_run_result_v1
      responses:
        '200':
          description: Successful request
          content:
            application/json:
              schema:
                type: object
                required:
                  - ok
                  - id
                properties:
                  ok:
                    type: boolean
                    description: Whether the run completed successfully.
                  id:
                    type: string
                    description: The run ID.
                  output:
                    type: string
                    description: >-
                      The serialized output as a string (present when ok is
                      true). Use outputType to determine how to parse it — for
                      "application/json" use JSON.parse().
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
                    description: Execution usage stats.
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
                type: object
                properties:
                  error:
                    type: string
                    enum:
                      - Invalid or Missing API Key
        '404':
          description: Run not found or not yet finished
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    enum:
                      - Run either doesn't exist or is not finished
      security:
        - secretKey: []
      x-codeSamples:
        - lang: typescript
          label: Fetch
          source: >-
            const response = await
            fetch("https://api.trigger.dev/api/v1/runs/run_1234/result", {
              headers: {
                "Authorization": `Bearer ${process.env.TRIGGER_SECRET_KEY}`,
              },
            });

            const result = await response.json();
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