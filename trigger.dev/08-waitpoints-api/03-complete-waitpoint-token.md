> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Complete a waitpoint token

> Completes a waitpoint token, unblocking any run that is waiting for it via `wait.forToken()`. An optional `data` payload can be passed and will be returned to the waiting run. If the token is already completed, this is a no-op and returns `success: true`.

This endpoint accepts both secret API keys and short-lived JWTs (public access tokens), making it safe to call from frontend clients.



## OpenAPI

````yaml v3-openapi POST /api/v1/waitpoints/tokens/{waitpointId}/complete
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
  /api/v1/waitpoints/tokens/{waitpointId}/complete:
    post:
      tags:
        - waitpoints
      summary: Complete a waitpoint token
      description: >-
        Completes a waitpoint token, unblocking any run that is waiting for it
        via `wait.forToken()`. An optional `data` payload can be passed and will
        be returned to the waiting run. If the token is already completed, this
        is a no-op and returns `success: true`.


        This endpoint accepts both secret API keys and short-lived JWTs (public
        access tokens), making it safe to call from frontend clients.
      operationId: complete_waitpoint_token_v1
      parameters:
        - in: path
          name: waitpointId
          required: true
          schema:
            type: string
          description: The ID of the waitpoint token to complete.
          example: waitpoint_abc123
      requestBody:
        required: false
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CompleteWaitpointTokenRequest'
      responses:
        '200':
          description: Waitpoint token completed successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CompleteWaitpointTokenResponse'
        '401':
          description: Unauthorized
        '404':
          description: Waitpoint token not found
        '500':
          description: Internal Server Error
      security:
        - secretKey: []
        - publicAccessToken: []
      x-codeSamples:
        - lang: typescript
          source: |-
            import { wait } from "@trigger.dev/sdk";

            // Complete with data (returned to the waiting run)
            await wait.completeToken(token, {
              status: "approved",
              comment: "Looks good to me!",
            });

            // Complete with no data
            await wait.completeToken(token, {});
components:
  schemas:
    CompleteWaitpointTokenRequest:
      type: object
      properties:
        data:
          description: >-
            Any JSON-serializable value to pass back to the run waiting on this
            token. The data will be returned from `wait.forToken()` as the
            result payload.
          example:
            status: approved
            comment: Looks good to me!
    CompleteWaitpointTokenResponse:
      type: object
      required:
        - success
      properties:
        success:
          type: boolean
          enum:
            - true
          description: Always `true` when the request succeeds.
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
    publicAccessToken:
      type: http
      scheme: bearer
      description: >
        A short-lived JWT scoped to a specific waitpoint token. Returned as
        `publicAccessToken`

        when you call `wait.createToken()` or `POST /api/v1/waitpoints/tokens`.


        This token is safe to embed in frontend clients — it can only complete
        the specific

        waitpoint it was issued for and cannot be used for any other API
        operations.

````