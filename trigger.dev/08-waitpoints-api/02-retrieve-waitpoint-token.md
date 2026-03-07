> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Retrieve a waitpoint token

> Retrieves a waitpoint token by its ID, including its current status and output if it has been completed.



## OpenAPI

````yaml v3-openapi GET /api/v1/waitpoints/tokens/{waitpointId}
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
  /api/v1/waitpoints/tokens/{waitpointId}:
    get:
      tags:
        - waitpoints
      summary: Retrieve a waitpoint token
      description: >-
        Retrieves a waitpoint token by its ID, including its current status and
        output if it has been completed.
      operationId: retrieve_waitpoint_token_v1
      parameters:
        - in: path
          name: waitpointId
          required: true
          schema:
            type: string
          description: The ID of the waitpoint token.
          example: waitpoint_abc123
      responses:
        '200':
          description: Successful request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/WaitpointTokenObject'
        '401':
          description: Unauthorized
        '404':
          description: Waitpoint token not found
        '500':
          description: Internal Server Error
      security:
        - secretKey: []
      x-codeSamples:
        - lang: typescript
          source: |-
            import { wait } from "@trigger.dev/sdk";

            const token = await wait.retrieveToken("waitpoint_abc123");

            console.log(token.status); // "WAITING" | "COMPLETED" | "TIMED_OUT"

            if (token.status === "COMPLETED") {
              console.log(token.output);
            }
components:
  schemas:
    WaitpointTokenObject:
      type: object
      required:
        - id
        - url
        - status
        - tags
        - createdAt
      properties:
        id:
          type: string
          description: The unique ID of the waitpoint token.
          example: waitpoint_abc123
        url:
          type: string
          description: >-
            An HTTP callback URL. A POST request to this URL (with an optional
            JSON body) will complete the waitpoint without needing an API key.
          example: >-
            https://api.trigger.dev/api/v1/waitpoints/tokens/waitpoint_abc123/callback/abc123hash
        status:
          type: string
          enum:
            - WAITING
            - COMPLETED
            - TIMED_OUT
          description: The current status of the waitpoint token.
        idempotencyKey:
          type: string
          nullable: true
          description: The idempotency key used when creating the token, if any.
        idempotencyKeyExpiresAt:
          type: string
          format: date-time
          nullable: true
          description: When the idempotency key expires.
        timeoutAt:
          type: string
          format: date-time
          nullable: true
          description: When the token will time out, if a timeout was set.
        completedAt:
          type: string
          format: date-time
          nullable: true
          description: When the token was completed, if it has been completed.
        output:
          type: string
          nullable: true
          description: >-
            The serialized output data passed when completing the token. Only
            present when `status` is `COMPLETED`.
        outputType:
          type: string
          nullable: true
          description: The content type of the output (e.g. `"application/json"`).
        outputIsError:
          type: boolean
          nullable: true
          description: Whether the output represents an error (e.g. a timeout).
        tags:
          type: array
          items:
            type: string
          description: Tags attached to the waitpoint.
        createdAt:
          type: string
          format: date-time
          description: When the waitpoint token was created.
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