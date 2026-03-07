> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Retrieve run trace

> Returns the full OTel trace tree for a run, including all spans and their children.



## OpenAPI

````yaml v3-openapi GET /api/v1/runs/{runId}/trace
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
  /api/v1/runs/{runId}/trace:
    parameters:
      - $ref: '#/components/parameters/runId'
    get:
      tags:
        - runs
      summary: Retrieve run trace
      description: >-
        Returns the full OTel trace tree for a run, including all spans and
        their children.
      operationId: get_run_trace_v1
      responses:
        '200':
          description: Successful request
          content:
            application/json:
              schema:
                type: object
                properties:
                  trace:
                    type: object
                    properties:
                      traceId:
                        type: string
                        description: The OTel trace ID.
                      rootSpan:
                        $ref: '#/components/schemas/SpanDetailedSummary'
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
                      - Trace not found
      security:
        - secretKey: []
      x-codeSamples:
        - lang: typescript
          source: >-
            const response = await
            fetch("https://api.trigger.dev/api/v1/runs/run_1234/trace", {
              headers: {
                Authorization: `Bearer ${process.env.TRIGGER_SECRET_KEY}`,
              },
            });


            const { trace } = await response.json();
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
    SpanDetailedSummary:
      type: object
      properties:
        id:
          type: string
          description: The span ID.
        parentId:
          type: string
          nullable: true
          description: The parent span ID, if any.
        runId:
          type: string
          description: The run ID this span belongs to.
        data:
          type: object
          properties:
            message:
              type: string
              description: The span message.
            taskSlug:
              type: string
              description: The task identifier, if applicable.
            startTime:
              type: string
              format: date-time
              description: The start time of the span.
            duration:
              type: number
              description: The duration of the span in nanoseconds.
            isError:
              type: boolean
            isPartial:
              type: boolean
            isCancelled:
              type: boolean
            level:
              type: string
              enum:
                - TRACE
                - DEBUG
                - LOG
                - INFO
                - WARN
                - ERROR
            attemptNumber:
              type: number
              nullable: true
            properties:
              type: object
              description: Arbitrary OTel attributes attached to the span.
            events:
              type: array
              description: >-
                Span events (e.g. exceptions, cancellations) that occurred
                during this span.
              items:
                type: object
                properties:
                  name:
                    type: string
                    description: >-
                      The event name (e.g. "exception", "cancellation",
                      "attempt_failed").
                  time:
                    type: string
                    format: date-time
                    description: The time the event occurred.
                  properties:
                    type: object
                    description: Event-specific properties.
        children:
          type: array
          description: >-
            Nested child spans. Each child has the same structure as the parent
            span.
          items:
            $ref: '#/components/schemas/SpanDetailedSummary'
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