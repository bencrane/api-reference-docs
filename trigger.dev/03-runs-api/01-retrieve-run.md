> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Retrieve run

> Retrieve information about a run, including its status, payload, output, and attempts. If you authenticate with a Public API key, we will omit the payload and output fields for security reasons.




## OpenAPI

````yaml v3-openapi GET /api/v3/runs/{runId}
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
  /api/v3/runs/{runId}:
    parameters:
      - $ref: '#/components/parameters/runId'
    get:
      tags:
        - run
      summary: Retrieve a run
      description: >
        Retrieve information about a run, including its status, payload, output,
        and attempts. If you authenticate with a Public API key, we will omit
        the payload and output fields for security reasons.
      operationId: retrieve_run_v1
      responses:
        '200':
          description: Successful request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RetrieveRunResponse'
        '400':
          description: Invalid request
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    enum:
                      - Invalid or missing run ID
        '401':
          description: Unauthorized request
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    enum:
                      - Invalid or Missing API key
        '404':
          description: Resource not found
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    enum:
                      - Run not found
      security:
        - secretKey: []
      x-codeSamples:
        - lang: typescript
          source: >-
            import { runs } from "@trigger.dev/sdk";


            const result = await runs.retrieve("run_1234");


            // We include boolean helpers to check the status of the run

            // (isSuccess, isFailed, isCompleted, etc.)

            if (result.isSuccess) {
              console.log("Run was successful with output", result.output);
            }


            // You also have access to the run status that includes more
            granular information

            console.log("Run status:", result.status);


            // You can access the payload and output

            console.log("Payload:", result.payload);

            console.log("Output:", result.output);


            // You can also access the attempts, which will give you information
            about errors (if they exist)

            for (const attempt of result.attempts) {
              if (attempt.status === "FAILED") {
                console.log("Attempt failed with error:", attempt.error);
              }
            }
components:
  parameters:
    runId:
      in: path
      name: runId
      required: true
      schema:
        type: string
      description: >
        The ID of an run, starts with `run_`. The run ID will be returned when
        you trigger a run on a task.
      example: run_1234
  schemas:
    RetrieveRunResponse:
      allOf:
        - $ref: '#/components/schemas/CommonRunObject'
        - type: object
          required:
            - attempts
          properties:
            payload:
              type: object
              description: >-
                The payload that was sent to the task. Will be omitted if the
                request was made with a Public API key
              example:
                foo: bar
            payloadPresignedUrl:
              type: string
              description: >-
                The presigned URL to download the payload. Will only be included
                if the payload is too large to be included in the response.
                Expires in 5 minutes.
              example: >-
                https://r2.cloudflarestorage.com/packets/yubjwjsfkxnylobaqvqz/dev/run_p4omhh45hgxxnq1re6ovy/payload.json?X-Amz-Expires=300&X-Amz-Date=20240625T154526Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=10b064e58a0680db5b5e077be2be3b2a%2F20240625%2Fauto%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=88604cb993ffc151b4d73f2439da431d9928488e4b3dcfa4a7c8f1819
            output:
              type: object
              description: >-
                The output of the run. Will be omitted if the request was made
                with a Public API key
              example:
                foo: bar
            outputPresignedUrl:
              type: string
              description: >-
                The presigned URL to download the output. Will only be included
                if the output is too large to be included in the response.
                Expires in 5 minutes.
              example: >-
                https://r2.cloudflarestorage.com/packets/yubjwjsfkxnylobaqvqz/dev/run_p4omhh45hgxxnq1re6ovy/payload.json?X-Amz-Expires=300&X-Amz-Date=20240625T154526Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=10b064e58a0680db5b5e077be2be3b2a%2F20240625%2Fauto%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=88604cb993ffc151b4d73f2439da431d9928488e4b3dcfa4a7c8f1819
            relatedRuns:
              type: object
              properties:
                root:
                  $ref: '#/components/schemas/CommonRunObject'
                  description: >-
                    The root run of the run hierarchy. Will be omitted if the
                    run is the root run
                parent:
                  $ref: '#/components/schemas/CommonRunObject'
                  description: >-
                    The parent run of the run. Will be omitted if the run is the
                    root run
                children:
                  description: >-
                    The immediate children of the run. Will be omitted if the
                    run has no children
                  type: array
                  items:
                    $ref: '#/components/schemas/CommonRunObject'
            schedule:
              type: object
              description: >-
                The schedule that triggered the run. Will be omitted if the run
                was not triggered by a schedule
              required:
                - id
                - generator
              properties:
                id:
                  type: string
                  description: The unique ID of the schedule, prefixed with `sched_`
                  example: sched_1234
                externalId:
                  type: string
                  description: >-
                    The external ID of the schedule. Can be anything that is
                    useful to you (e.g., user ID, org ID, etc.)
                  example: user_1234
                deduplicationKey:
                  type: string
                  description: >-
                    The deduplication key used to prevent creating duplicate
                    schedules
                  example: dedup_key_1234
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
            attempts:
              type: array
              items:
                type: object
                required:
                  - id
                  - status
                  - createdAt
                  - updatedAt
                properties:
                  id:
                    type: string
                    description: The unique ID of the attempt, prefixed with `attempt_`
                    example: attempt_1234
                  status:
                    type: string
                    enum:
                      - PENDING
                      - EXECUTING
                      - PAUSED
                      - COMPLETED
                      - FAILED
                      - CANCELED
                  error:
                    $ref: '#/components/schemas/SerializedError'
                  createdAt:
                    type: string
                    format: date-time
                  updatedAt:
                    type: string
                    format: date-time
                  startedAt:
                    type: string
                    format: date-time
                  completedAt:
                    type: string
                    format: date-time
    CommonRunObject:
      type: object
      required:
        - id
        - status
        - taskIdentifier
        - createdAt
        - updatedAt
      properties:
        id:
          type: string
          description: The unique ID of the run, prefixed with `run_`
          example: run_1234
        status:
          type: string
          description: The status of the run
          enum:
            - PENDING_VERSION
            - DELAYED
            - QUEUED
            - EXECUTING
            - REATTEMPTING
            - FROZEN
            - COMPLETED
            - CANCELED
            - FAILED
            - CRASHED
            - INTERRUPTED
            - SYSTEM_FAILURE
        taskIdentifier:
          type: string
          description: The identifier of the task that was run
          example: my-task
        version:
          type: string
          example: 20240523.1
          description: The version of the worker that executed the run
        idempotencyKey:
          type: string
          description: >-
            The idempotency key used to prevent creating duplicate runs, if
            provided
          example: idempotency_key_1234
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
        isTest:
          type: boolean
          description: Whether the run is a test run or not
          example: false
        startedAt:
          type: string
          format: date-time
          description: The time the run started
        finishedAt:
          type: string
          format: date-time
          description: The time the run finished
        delayedUntil:
          type: string
          format: date-time
          description: >-
            If the run was triggered with a delay, this will be the time the run
            will be enqueued to execute
        ttl:
          $ref: '#/components/schemas/TTL'
        expiredAt:
          type: string
          format: date-time
          description: >-
            If the run had a TTL and that time has passed, when the run
            "expired".
        tags:
          type: array
          description: >-
            Tags can be attached to a run to make it easy to find runs (in the
            dashboard or using SDK functions like `runs.list`)
          example:
            - user_5df987al13
            - org_c6b7dycmxw
          items:
            type: string
            description: >-
              A tag must be between 1 and 128 characters, a run can have up to
              10 tags attached to it.
        metadata:
          type: object
          description: >-
            The metadata of the run. See [Metadata](/runs/metadata) for more
            information.
          example:
            foo: bar
        costInCents:
          type: number
          example: 0.00292
          description: >-
            The compute cost of the run (so far) in cents. This cost does not
            apply to DEV runs.
        baseCostInCents:
          type: number
          example: 0.0025
          description: >-
            The invocation cost of the run in cents. This cost does not apply to
            DEV runs.
        durationMs:
          type: number
          example: 491
          description: >-
            The duration of compute (so far) in milliseconds. This does not
            include waits.
        depth:
          type: integer
          example: 0
          description: >-
            The depth of the run in the task run hierarchy. The root run has a
            depth of 0.
        batchId:
          type: string
          description: The ID of the batch that this run belongs to
          example: batch_1234
        triggerFunction:
          type: string
          description: The name of the function that triggered the run
          enum:
            - trigger
            - triggerAndWait
            - batchTrigger
            - batchTriggerAndWait
    SerializedError:
      type: object
      required:
        - message
      properties:
        message:
          type: string
          example: Something went wrong
        name:
          type: string
          example: Error
        stackTrace:
          type: string
          example: 'Error: Something went wrong'
    TTL:
      type:
        - string
        - number
      description: >-
        The time-to-live for this run. If the run is not executed within this
        time, it will be removed from the queue and never execute. You can use a
        string in this format: `1h`, `1m`, `1h42m` or a number of seconds (min.
        1).
      example: 1h42m
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