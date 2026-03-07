> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Retrieve run events

> Returns all OTel span events for a run. Useful for debugging and observability.



## OpenAPI

````yaml v3-openapi GET /api/v1/runs/{runId}/events
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
  /api/v1/runs/{runId}/events:
    parameters:
      - $ref: '#/components/parameters/runId'
    get:
      tags:
        - runs
      summary: Retrieve run events
      description: >-
        Returns all OTel span events for a run. Useful for debugging and
        observability.
      operationId: get_run_events_v1
      responses:
        '200':
          description: Successful request
          content:
            application/json:
              schema:
                type: object
                properties:
                  events:
                    type: array
                    items:
                      type: object
                      properties:
                        spanId:
                          type: string
                          description: The span ID of the event.
                        parentId:
                          type: string
                          nullable: true
                          description: The parent span ID, if any.
                        runId:
                          type: string
                          nullable: true
                          description: The run ID associated with this event.
                        message:
                          type: string
                          description: The event message.
                        startTime:
                          type: string
                          description: >-
                            The start time of the event as a bigint string
                            (nanoseconds since epoch).
                        duration:
                          type: number
                          description: The duration of the event in nanoseconds.
                        isError:
                          type: boolean
                          description: Whether this event represents an error.
                        isPartial:
                          type: boolean
                          description: Whether this event is partial (still in progress).
                        isCancelled:
                          type: boolean
                          description: Whether this event was cancelled.
                        level:
                          type: string
                          enum:
                            - TRACE
                            - DEBUG
                            - LOG
                            - INFO
                            - WARN
                            - ERROR
                          description: The log level of the event.
                        kind:
                          type: string
                          enum:
                            - UNSPECIFIED
                            - INTERNAL
                            - SERVER
                            - CLIENT
                            - PRODUCER
                            - CONSUMER
                            - UNRECOGNIZED
                            - LOG
                          description: The kind of span event.
                        attemptNumber:
                          type: number
                          nullable: true
                          description: The attempt number this event belongs to.
                        taskSlug:
                          type: string
                          description: The task identifier.
                        events:
                          type: array
                          description: >-
                            Span events (e.g. exceptions, cancellations) that
                            occurred during this event.
                          items:
                            type: object
                            properties:
                              name:
                                type: string
                                description: >-
                                  The event name (e.g. "exception",
                                  "cancellation", "attempt_failed").
                              time:
                                type: string
                                format: date-time
                                description: The time the event occurred.
                              properties:
                                type: object
                                description: Event-specific properties.
                        style:
                          type: object
                          description: Display style metadata for the event.
                          properties:
                            icon:
                              type: string
                              description: Icon identifier for display.
                            variant:
                              type: string
                              description: Visual variant (e.g. "success", "failure").
                            accessory:
                              type: object
                              description: Accessory display element.
                              properties:
                                text:
                                  type: string
                                style:
                                  type: string
                                  enum:
                                    - codepath
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
            const response = await
            fetch("https://api.trigger.dev/api/v1/runs/run_1234/events", {
              headers: {
                Authorization: `Bearer ${process.env.TRIGGER_SECRET_KEY}`,
              },
            });


            const { events } = await response.json();
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