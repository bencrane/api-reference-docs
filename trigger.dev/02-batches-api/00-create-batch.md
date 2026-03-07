> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create batch

> Phase 1 of 2-phase batch API. Creates a batch record and optionally blocks the parent run for batchTriggerAndWait.
After creating a batch, stream items via POST /api/v3/batches/{batchId}/items.




## OpenAPI

````yaml openapi POST /api/v3/batches
openapi: 3.0.0
info:
  title: Trigger.dev API
  description: API for triggering events in Trigger.dev
  version: 1.0.0
servers:
  - url: https://api.trigger.dev
    description: Trigger.dev API server
security:
  - BearerAuth: []
paths:
  /api/v3/batches:
    post:
      tags:
        - Batches
      summary: Create a batch (Phase 1)
      description: >
        Phase 1 of 2-phase batch API. Creates a batch record and optionally
        blocks the parent run for batchTriggerAndWait.

        After creating a batch, stream items via POST
        /api/v3/batches/{batchId}/items.
      operationId: createBatch
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateBatchRequest'
      responses:
        '202':
          description: Batch successfully created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateBatchResponse'
          headers:
            x-trigger-jwt-claims:
              description: JWT claims for the batch
              schema:
                type: string
            x-trigger-jwt:
              description: JWT token for browser clients
              schema:
                type: string
        '400':
          description: Invalid request (e.g., runCount <= 0 or exceeds maximum)
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '401':
          description: Unauthorized - API key is missing or invalid
        '422':
          description: Validation error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '429':
          description: Rate limit exceeded
          headers:
            X-RateLimit-Limit:
              description: Maximum number of requests allowed
              schema:
                type: integer
            X-RateLimit-Remaining:
              description: Number of requests remaining
              schema:
                type: integer
            X-RateLimit-Reset:
              description: Unix timestamp when the rate limit resets
              schema:
                type: integer
            Retry-After:
              description: Seconds to wait before retrying
              schema:
                type: integer
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '500':
          description: Internal server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
      externalDocs:
        description: Find more info here
        url: https://trigger.dev/docs/triggering
components:
  schemas:
    CreateBatchRequest:
      type: object
      required:
        - runCount
      properties:
        runCount:
          type: integer
          minimum: 1
          description: Expected number of items in the batch. Must be a positive integer.
        parentRunId:
          type: string
          description: Parent run ID (friendly ID) for batchTriggerAndWait.
        resumeParentOnCompletion:
          type: boolean
          description: >-
            Whether to resume parent on completion. Set to true for
            batchTriggerAndWait.
        idempotencyKey:
          type: string
          description: >-
            Idempotency key for the batch. If provided and a batch with this key
            already exists, the existing batch will be returned.
    CreateBatchResponse:
      type: object
      required:
        - id
        - runCount
        - isCached
      properties:
        id:
          type: string
          description: >-
            The batch ID (friendly ID). Use this to stream items via POST
            /api/v3/batches/{batchId}/items.
        runCount:
          type: integer
          description: The expected run count.
        isCached:
          type: boolean
          description: Whether this response came from a cached/idempotent batch.
        idempotencyKey:
          type: string
          description: The idempotency key if provided.
    Error:
      type: object
      properties:
        message:
          type: string
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

````