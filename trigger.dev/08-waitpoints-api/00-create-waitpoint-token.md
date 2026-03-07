> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a waitpoint token

> Creates a new waitpoint token that can be used to pause a run until an external event completes it. The token includes a `url` which can be called via HTTP POST to complete the waitpoint. Use the token ID with `wait.forToken()` inside a task to pause execution until the token is completed.



## OpenAPI

````yaml v3-openapi POST /api/v1/waitpoints/tokens
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
  /api/v1/waitpoints/tokens:
    post:
      tags:
        - waitpoints
      summary: Create a waitpoint token
      description: >-
        Creates a new waitpoint token that can be used to pause a run until an
        external event completes it. The token includes a `url` which can be
        called via HTTP POST to complete the waitpoint. Use the token ID with
        `wait.forToken()` inside a task to pause execution until the token is
        completed.
      operationId: create_waitpoint_token_v1
      requestBody:
        required: false
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateWaitpointTokenRequest'
      responses:
        '200':
          description: Waitpoint token created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateWaitpointTokenResponse'
        '401':
          description: Unauthorized
        '422':
          description: Unprocessable Entity
        '500':
          description: Internal Server Error
      security:
        - secretKey: []
      x-codeSamples:
        - lang: typescript
          source: |-
            import { wait } from "@trigger.dev/sdk";

            const token = await wait.createToken({
              timeout: "1h",
              tags: ["user:1234567"],
            });

            console.log(token.id);  // e.g. "waitpoint_abc123"
            console.log(token.url); // HTTP callback URL to complete externally
components:
  schemas:
    CreateWaitpointTokenRequest:
      type: object
      properties:
        idempotencyKey:
          type: string
          description: >-
            An optional idempotency key. If you pass the same key twice before
            it expires, you will receive the original token back. The returned
            token may already be completed, in which case `wait.forToken()` will
            continue immediately.
          example: approval-user-1234567
        idempotencyKeyTTL:
          type: string
          description: >-
            How long the idempotency key is valid, after which passing the same
            key creates a new waitpoint. Accepts durations like "30s", "1m",
            "2h", "3d".
          example: 1h
        timeout:
          type: string
          description: >-
            How long to wait before the token times out. When a run is waiting
            for a timed-out token, `wait.forToken()` returns with `ok: false`.
            Accepts an ISO 8601 date string or duration shorthand like "30s",
            "1m", "2h", "3d", "4w".
          example: 1h
        tags:
          oneOf:
            - type: string
            - type: array
              items:
                type: string
          description: >-
            Tags to attach to the waitpoint. You can set up to 10 tags, each
            under 128 characters. We recommend namespacing tags with a prefix
            like `user:1234567` or `org_9876543`.
          example:
            - user:1234567
            - org:9876543
    CreateWaitpointTokenResponse:
      type: object
      required:
        - id
        - isCached
        - url
      properties:
        id:
          type: string
          description: The unique ID of the waitpoint token.
          example: waitpoint_abc123
        isCached:
          type: boolean
          description: >-
            `true` if an existing token was returned because the same
            `idempotencyKey` was used within its TTL window.
        url:
          type: string
          description: >-
            An HTTP callback URL. A POST request to this URL (with an optional
            JSON body) will complete the waitpoint without needing an API key.
          example: >-
            https://api.trigger.dev/api/v1/waitpoints/tokens/waitpoint_abc123/callback/abc123hash
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