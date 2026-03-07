> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List Schedules

> List all schedules. You can also paginate the results.



## OpenAPI

````yaml v3-openapi GET /api/v1/schedules
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
  /api/v1/schedules:
    get:
      tags:
        - schedules
      summary: List all schedules
      description: List all schedules. You can also paginate the results.
      operationId: list_schedules_v1
      parameters:
        - in: query
          name: page
          schema:
            type: integer
          required: false
          description: Page number of the schedule listing
        - in: query
          name: perPage
          schema:
            type: integer
          required: false
          description: Number of schedules per page
      responses:
        '200':
          description: Successful request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ListSchedulesResult'
        '401':
          description: Unauthorized request
      security:
        - secretKey: []
      x-codeSamples:
        - lang: typescript
          source: |-
            import { schedules } from "@trigger.dev/sdk";

            const allSchedules = await schedules.list();
components:
  schemas:
    ListSchedulesResult:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/ScheduleObject'
        pagination:
          type: object
          properties:
            currentPage:
              type: integer
            totalPages:
              type: integer
            count:
              type: integer
    ScheduleObject:
      type: object
      properties:
        id:
          type: string
          example: sched_1234
          description: The unique ID of the schedule, prefixed with 'sched_'
        task:
          type: string
          example: my-scheduled-task
          description: The id of the scheduled task that will be triggered by this schedule
        type:
          type: string
          example: IMPERATIVE
          description: >-
            The type of schedule, `DECLARATIVE` or `IMPERATIVE`. Declarative
            schedules are declared in your code by setting the `cron` property
            on a `schedules.task`. Imperative schedules are created in the
            dashboard or by using the imperative SDK functions like
            `schedules.create()`.
        active:
          type: boolean
          example: true
          description: Whether the schedule is active or not
        deduplicationKey:
          type: string
          description: The deduplication key used to prevent creating duplicate schedules
          example: dedup_key_1234
        externalId:
          type: string
          description: >-
            The external ID of the schedule. Can be anything that is useful to
            you (e.g., user ID, org ID, etc.)
          example: user_1234
        generator:
          type: object
          properties:
            type:
              type: string
              enum:
                - CRON
            expression:
              type: string
              description: The cron expression used to generate the schedule
              example: 0 0 * * *
            description:
              type: string
              description: The description of the generator in plain english
              example: Every day at midnight
        timezone:
          type: string
          example: America/New_York
          description: >-
            Defaults to UTC. In IANA format, if set then it will trigger at the
            CRON frequency in that timezone and respect daylight savings time.
        nextRun:
          type: string
          format: date-time
          description: The next time the schedule will run
          example: '2024-04-01T00:00:00Z'
        environments:
          type: array
          items:
            $ref: '#/components/schemas/ScheduleEnvironment'
    ScheduleEnvironment:
      type: object
      properties:
        id:
          type: string
        type:
          type: string
        userName:
          type: string
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