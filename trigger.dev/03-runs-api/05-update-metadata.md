> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update metadata

> Update the metadata of a run.



## OpenAPI

````yaml v3-openapi PUT /api/v1/runs/{runId}/metadata
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
  /api/v1/runs/{runId}/metadata:
    parameters:
      - $ref: '#/components/parameters/runId'
    put:
      tags:
        - runs
      summary: Update run metadata
      description: Update the metadata of a run.
      operationId: update_run_metadata_v1
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                metadata:
                  type: object
                  description: The new metadata to set on the run.
                  example:
                    key: value
      responses:
        '200':
          description: Successful request
          content:
            application/json:
              schema:
                type: object
                properties:
                  metadata:
                    type: object
                    description: The updated metadata of the run.
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
                      - Invalid metadata
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
                      - Task Run not found
      security:
        - secretKey: []
      x-codeSamples:
        - lang: typescript
          label: Save metadata
          source: |-
            import { metadata, task } from "@trigger.dev/sdk";

            export const myTask = task({
              id: "my-task",
              run: async () => {
                await metadata.save({ key: "value" });
              }
            });
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