> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Retrieve Env Var

> Retrieve a specific environment variable for a specific project and environment.



## OpenAPI

````yaml v3-openapi GET /api/v1/projects/{projectRef}/envvars/{env}/{name}
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
  /api/v1/projects/{projectRef}/envvars/{env}/{name}:
    parameters:
      - $ref: '#/components/parameters/projectRef'
      - $ref: '#/components/parameters/env'
      - $ref: '#/components/parameters/envvarName'
    get:
      tags:
        - envvars
      summary: Retrieve environment variable
      description: >-
        Retrieve a specific environment variable for a specific project and
        environment.
      operationId: get_project_envvar_v1
      responses:
        '200':
          description: Successful request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EnvVarValue'
        '400':
          description: Invalid request parameters or body
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '401':
          description: Unauthorized request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '404':
          description: Resource not found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
      security:
        - secretKey: []
        - personalAccessToken: []
      x-codeSamples:
        - lang: typescript
          label: Outside of a task
          source: >-
            import { envvars } from "@trigger.dev/sdk";


            const variable = await envvars.retrieve("proj_yubjwjsfkxnylobaqvqz",
            "dev", "SLACK_API_KEY");


            console.log(`Value: ${variable.value}`);
        - lang: typescript
          label: Inside a task
          source: |-
            import { envvars, task } from "@trigger.dev/sdk";

            export const myTask = task({
              id: "my-task",
              run: async () => {
                // projectRef and env are automatically inferred from the task context
                const variable = await envvars.retrieve("SLACK_API_KEY");

                console.log(`Value: ${variable.value}`);
              }
            })
components:
  parameters:
    projectRef:
      in: path
      name: projectRef
      required: true
      schema:
        type: string
      description: >-
        The external ref of the project. You can find this in the project
        settings. Starts with `proj_`.
      example: proj_yubjwjsfkxnylobaqvqz
    env:
      in: path
      name: env
      required: true
      schema:
        type: string
        enum:
          - dev
          - staging
          - prod
      description: The environment of the project to list variables for.
      example: dev
    envvarName:
      in: path
      name: name
      required: true
      schema:
        type: string
      description: The name of the environment variable.
      example: SLACK_API_KEY
  schemas:
    EnvVarValue:
      type: object
      properties:
        value:
          type: string
          example: slack_123456
      required:
        - value
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
    personalAccessToken:
      type: http
      scheme: bearer
      description: >
        Use your user-specific Personal Access Token, which you can generate
        from the Trigger.dev dashboard in your account settings. (It will start
        with `tr_pat_`.)


        Our TypeScript SDK will default to using the value of the
        `TRIGGER_ACCESS_TOKEN` environment variable if it is set. If you are
        using the SDK in a different environment, you can set the key using the
        `configure` function.


        ```typescript

        import { configure } from "@trigger.dev/sdk";


        configure({ accessToken: "tr_pat_1234" });

        ```

````