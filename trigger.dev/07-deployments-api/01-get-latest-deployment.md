> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get latest deployment

> Retrieve information about the latest unmanaged deployment for the authenticated project.



## OpenAPI

````yaml v3-openapi GET /api/v1/deployments/latest
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
  /api/v1/deployments/latest:
    get:
      tags:
        - deployments
      summary: Get latest deployment
      description: >-
        Retrieve information about the latest unmanaged deployment for the
        authenticated project.
      operationId: get_latest_deployment_v1
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
                    description: The deployment ID
                  status:
                    type: string
                    enum:
                      - PENDING
                      - INSTALLING
                      - BUILDING
                      - DEPLOYING
                      - DEPLOYED
                      - FAILED
                      - CANCELED
                      - TIMED_OUT
                    description: The current status of the deployment
                  contentHash:
                    type: string
                    description: Hash of the deployment content
                  shortCode:
                    type: string
                    description: The short code for the deployment
                  version:
                    type: string
                    description: The deployment version (e.g., "20250228.1")
                  imageReference:
                    type: string
                    nullable: true
                    description: Reference to the deployment image
                  errorData:
                    type: object
                    nullable: true
                    description: Error data if the deployment failed
        '401':
          description: Unauthorized - API key is missing or invalid
        '404':
          description: No deployment found
      security:
        - secretKey: []
      x-codeSamples:
        - lang: typescript
          source: |-
            const response = await fetch(
              "https://api.trigger.dev/api/v1/deployments/latest",
              {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${secretKey}`,
                },
              }
            );
            const deployment = await response.json();
        - lang: curl
          source: |-
            curl -X GET "https://api.trigger.dev/api/v1/deployments/latest" \
              -H "Authorization: Bearer tr_dev_1234"
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