> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get deployment

> Retrieve information about a specific deployment by its ID.



## OpenAPI

````yaml v3-openapi GET /api/v1/deployments/{deploymentId}
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
  /api/v1/deployments/{deploymentId}:
    parameters:
      - in: path
        name: deploymentId
        required: true
        schema:
          type: string
        description: The deployment ID.
    get:
      tags:
        - deployments
      summary: Get deployment
      description: Retrieve information about a specific deployment by its ID.
      operationId: get_deployment_v1
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
                  imagePlatform:
                    type: string
                    description: Platform of the deployment image
                  externalBuildData:
                    type: object
                    nullable: true
                    description: External build data if applicable
                  errorData:
                    type: object
                    nullable: true
                    description: Error data if the deployment failed
                  worker:
                    type: object
                    nullable: true
                    description: Worker information if available
                    properties:
                      id:
                        type: string
                      version:
                        type: string
                      tasks:
                        type: array
                        items:
                          type: object
                          properties:
                            id:
                              type: string
                            slug:
                              type: string
                            filePath:
                              type: string
                            exportName:
                              type: string
        '401':
          description: Unauthorized - Access token is missing or invalid
        '404':
          description: Deployment not found
      security:
        - secretKey: []
      x-codeSamples:
        - lang: typescript
          source: |-
            const response = await fetch(
              `https://api.trigger.dev/api/v1/deployments/${deploymentId}`,
              {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${secretKey}`,
                },
              }
            );
            const deployment = await response.json();
        - lang: curl
          source: >-
            curl -X GET
            "https://api.trigger.dev/api/v1/deployments/deployment_1234" \
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