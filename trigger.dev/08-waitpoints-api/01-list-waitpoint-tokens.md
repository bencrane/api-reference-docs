> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List waitpoint tokens

> Returns a paginated list of waitpoint tokens for the current environment. Results are ordered by creation date, newest first. Use cursor-based pagination with `page[after]` and `page[before]` to navigate pages.



## OpenAPI

````yaml v3-openapi GET /api/v1/waitpoints/tokens
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
    get:
      tags:
        - waitpoints
      summary: List waitpoint tokens
      description: >-
        Returns a paginated list of waitpoint tokens for the current
        environment. Results are ordered by creation date, newest first. Use
        cursor-based pagination with `page[after]` and `page[before]` to
        navigate pages.
      operationId: list_waitpoint_tokens_v1
      parameters:
        - in: query
          name: page[size]
          schema:
            type: integer
            minimum: 1
            maximum: 100
          required: false
          description: Number of tokens to return per page (1–100).
        - in: query
          name: page[after]
          schema:
            type: string
          required: false
          description: >-
            Return tokens after this cursor (from `pagination.next` in a
            previous response).
        - in: query
          name: page[before]
          schema:
            type: string
          required: false
          description: >-
            Return tokens before this cursor (from `pagination.previous` in a
            previous response).
        - in: query
          name: filter[status]
          schema:
            type: string
          required: false
          description: >-
            Comma-separated list of statuses to filter by. Allowed values:
            `WAITING`, `COMPLETED`, `TIMED_OUT`.
          example: WAITING,COMPLETED
        - in: query
          name: filter[idempotencyKey]
          schema:
            type: string
          required: false
          description: Filter by idempotency key.
        - in: query
          name: filter[tags]
          schema:
            type: string
          required: false
          description: Comma-separated list of tags to filter by.
          example: user:1234567,org:9876543
        - in: query
          name: filter[createdAt][period]
          schema:
            type: string
          required: false
          description: >-
            Shorthand time period to filter by creation date (e.g. `1h`, `24h`,
            `7d`). Cannot be combined with `filter[createdAt][from]` or
            `filter[createdAt][to]`.
          example: 24h
        - in: query
          name: filter[createdAt][from]
          schema:
            type: string
            format: date-time
          required: false
          description: Filter tokens created at or after this ISO 8601 timestamp.
        - in: query
          name: filter[createdAt][to]
          schema:
            type: string
            format: date-time
          required: false
          description: Filter tokens created at or before this ISO 8601 timestamp.
      responses:
        '200':
          description: Successful request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ListWaitpointTokensResult'
        '401':
          description: Unauthorized
        '422':
          description: Invalid query parameters (e.g. unrecognised status value)
        '500':
          description: Internal Server Error
      security:
        - secretKey: []
      x-codeSamples:
        - lang: typescript
          source: |-
            import { wait } from "@trigger.dev/sdk";

            // Iterate over all tokens (auto-paginated)
            for await (const token of wait.listTokens()) {
              console.log(token.id, token.status);
            }

            // Filter by status and tags
            for await (const token of wait.listTokens({
              status: ["WAITING"],
              tags: ["user:1234567"],
            })) {
              console.log(token.id);
            }
components:
  schemas:
    ListWaitpointTokensResult:
      type: object
      required:
        - data
        - pagination
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/WaitpointTokenObject'
          description: An array of waitpoint token objects.
        pagination:
          type: object
          properties:
            next:
              type: string
              nullable: true
              description: >-
                Cursor for the next page. Pass as `page[after]` in the next
                request.
              example: waitpoint_abc123
            previous:
              type: string
              nullable: true
              description: >-
                Cursor for the previous page. Pass as `page[before]` in the next
                request.
              example: waitpoint_xyz789
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