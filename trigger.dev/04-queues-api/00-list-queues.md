> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List Queues

> List all queues in your environment with pagination support.



## OpenAPI

````yaml v3-openapi GET /api/v1/queues
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
  /api/v1/queues:
    get:
      tags:
        - queues
      summary: List all queues
      description: List all queues in your environment with pagination support.
      operationId: list_queues_v1
      parameters:
        - in: query
          name: page
          schema:
            type: integer
          required: false
          description: Page number of the queue listing (1-based)
        - in: query
          name: perPage
          schema:
            type: integer
          required: false
          description: Number of queues per page
      responses:
        '200':
          description: Successful request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ListQueuesResult'
        '401':
          description: Unauthorized request
      security:
        - secretKey: []
      x-codeSamples:
        - lang: typescript
          source: |-
            import { queues } from "@trigger.dev/sdk";

            // List all queues
            const allQueues = await queues.list();

            // With pagination
            const pagedQueues = await queues.list({
              page: 1,
              perPage: 20,
            });
components:
  schemas:
    ListQueuesResult:
      type: object
      required:
        - data
        - pagination
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/QueueObject'
          description: An array of queue objects
        pagination:
          type: object
          properties:
            currentPage:
              type: integer
              description: The current page number
              example: 1
            totalPages:
              type: integer
              description: The total number of pages
              example: 5
            count:
              type: integer
              description: The total number of queues
              example: 50
    QueueObject:
      type: object
      required:
        - id
        - name
        - type
        - running
        - queued
        - paused
      properties:
        id:
          type: string
          description: The queue ID, e.g., `queue_1234`
          example: queue_1234
        name:
          type: string
          description: >-
            The queue name. For task queues, this is the task ID. For custom
            queues, this is the name you specified.
          example: my-task-id
        type:
          type: string
          enum:
            - task
            - custom
          description: |
            The type of queue:
            - `task`: Created automatically for each task
            - `custom`: Created explicitly in your code using `queue()`
          example: task
        running:
          type: integer
          description: The number of runs currently executing
          example: 5
        queued:
          type: integer
          description: The number of runs currently queued
          example: 10
        paused:
          type: boolean
          description: Whether the queue is paused. When paused, no new runs will start.
          example: false
        concurrencyLimit:
          type: integer
          nullable: true
          description: The current concurrency limit of the queue
          example: 10
        concurrency:
          type: object
          description: Detailed concurrency information
          properties:
            current:
              type: integer
              nullable: true
              description: The effective/current concurrency limit
              example: 10
            base:
              type: integer
              nullable: true
              description: The base concurrency limit defined in code
              example: 10
            override:
              type: integer
              nullable: true
              description: The override concurrency limit (if set)
              example: null
            overriddenAt:
              type: string
              format: date-time
              nullable: true
              description: When the concurrency limit was overridden
              example: null
            overriddenBy:
              type: string
              nullable: true
              description: Who overrode the concurrency limit (null if via API)
              example: null
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