> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Complete a waitpoint token via HTTP callback

> Completes a waitpoint token using the pre-signed callback URL returned in the `url` field when the token was created. No API key is required — the `callbackHash` in the URL acts as the authentication token.

This is designed to be given directly to external services (e.g. as a webhook URL) so they can unblock a waiting run without needing access to your API key. The entire request body is passed as the output data to the waiting run.

If the token is already completed, this is a no-op and returns `success: true`.



## OpenAPI

````yaml v3-openapi POST /api/v1/waitpoints/tokens/{waitpointId}/callback/{callbackHash}
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
  /api/v1/waitpoints/tokens/{waitpointId}/callback/{callbackHash}:
    post:
      tags:
        - waitpoints
      summary: Complete a waitpoint token via HTTP callback
      description: >-
        Completes a waitpoint token using the pre-signed callback URL returned
        in the `url` field when the token was created. No API key is required —
        the `callbackHash` in the URL acts as the authentication token.


        This is designed to be given directly to external services (e.g. as a
        webhook URL) so they can unblock a waiting run without needing access to
        your API key. The entire request body is passed as the output data to
        the waiting run.


        If the token is already completed, this is a no-op and returns `success:
        true`.
      operationId: complete_waitpoint_token_callback_v1
      parameters:
        - in: path
          name: waitpointId
          required: true
          schema:
            type: string
          description: The ID of the waitpoint token.
          example: waitpoint_abc123
        - in: path
          name: callbackHash
          required: true
          schema:
            type: string
          description: >-
            The HMAC hash that authenticates the request. This is embedded in
            the `url` returned when creating the token — do not construct it
            manually.
      requestBody:
        required: false
        content:
          application/json:
            schema:
              type: object
              description: >-
                Any JSON object. The entire body is passed as the output data to
                the run waiting on this token. If the body is not valid JSON, an
                empty object is used.
              example:
                status: approved
                comment: Looks good to me!
      responses:
        '200':
          description: Waitpoint token completed successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CompleteWaitpointTokenResponse'
        '401':
          description: Invalid callback URL or hash mismatch
        '404':
          description: Waitpoint token not found
        '405':
          description: Method not allowed
        '411':
          description: Content-Length header is required
        '413':
          description: Request body too large
        '500':
          description: Internal Server Error
      x-codeSamples:
        - lang: Shell
          label: cURL
          source: >-
            # The full URL is returned as `url` when you create a token

            curl -X POST
            "https://api.trigger.dev/api/v1/waitpoints/tokens/waitpoint_abc123/callback/abc123hash"
            \
              -H "Content-Type: application/json" \
              -d '{"status": "approved", "comment": "Looks good to me!"}'
        - lang: typescript
          source: >-
            import { wait } from "@trigger.dev/sdk";


            // In your task: create the token and send the URL to an external
            service

            const token = await wait.createToken({ timeout: "1h" });


            await sendApprovalRequestEmail({
              callbackUrl: token.url, // give this URL to the external service
            });


            // The external service POSTs to token.url to unblock the run

            const result = await wait.forToken<{ status: string }>(token);
components:
  schemas:
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

````