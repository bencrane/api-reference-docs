> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Promote deployment

> Promote a previously deployed version to be the current version for the environment. This makes the specified version active for new task runs.



## OpenAPI

````yaml v3-openapi POST /api/v1/deployments/{version}/promote
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
  /api/v1/deployments/{version}/promote:
    parameters:
      - in: path
        name: version
        required: true
        schema:
          type: string
        description: The deployment version to promote (e.g., "20250228.1").
    post:
      tags:
        - deployments
      summary: Promote deployment
      description: >-
        Promote a previously deployed version to be the current version for the
        environment. This makes the specified version active for new task runs.
      operationId: promote_deployment_v1
      responses:
        '200':
          description: Deployment promoted successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                    description: The deployment ID
                  version:
                    type: string
                    description: The deployment version (e.g., "20250228.1")
                  shortCode:
                    type: string
                    description: The short code for the deployment
        '400':
          description: Invalid request
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
        '401':
          description: Unauthorized - API key is missing or invalid
        '404':
          description: Deployment not found
      security:
        - secretKey: []
      x-codeSamples:
        - lang: typescript
          source: |-
            const response = await fetch(
              `https://api.trigger.dev/api/v1/deployments/${version}/promote`,
              {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${secretKey}`,
                  "Content-Type": "application/json",
                },
              }
            );
            const result = await response.json();
        - lang: curl
          source: >-
            curl -X POST
            "https://api.trigger.dev/api/v1/deployments/20250228.1/promote" \
              -H "Authorization: Bearer tr_dev_1234" \
              -H "Content-Type: application/json"
components:
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