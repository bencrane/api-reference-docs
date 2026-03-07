> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Retrieve Queue

> Get a queue by its ID, or by type and name.



## OpenAPI

````yaml v3-openapi GET /api/v1/queues/{queueParam}
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
  /api/v1/queues/{queueParam}:
    get:
      tags:
        - queues
      summary: Retrieve a queue
      description: Get a queue by its ID, or by type and name.
      operationId: retrieve_queue_v1
      parameters:
        - in: path
          name: queueParam
          required: true
          schema:
            type: string
          description: >-
            The queue ID (e.g., `queue_1234`), or the name of the queue when
            using the `type` query parameter.
          example: queue_1234
        - in: query
          name: type
          schema:
            type: string
            enum:
              - id
              - task
              - custom
            default: id
          required: false
          description: |
            How to interpret the `queueParam` path parameter:
            - `id`: Treat as a queue ID (default)
            - `task`: Treat as a task ID to get the task's default queue
            - `custom`: Treat as a custom queue name
      responses:
        '200':
          description: Successful request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/QueueObject'
        '401':
          description: Unauthorized request
        '404':
          description: Queue not found
      security:
        - secretKey: []
      x-codeSamples:
        - lang: typescript
          source: |-
            import { queues } from "@trigger.dev/sdk";

            // Using queue ID
            const queue = await queues.retrieve("queue_1234");

            // Using type and name for a task queue
            const taskQueue = await queues.retrieve({
              type: "task",
              name: "my-task-id",
            });

            // Using type and name for a custom queue
            const customQueue = await queues.retrieve({
              type: "custom",
              name: "my-custom-queue",
            });
components:
  schemas:
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