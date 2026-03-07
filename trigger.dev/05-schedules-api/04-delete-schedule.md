> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete Schedule

> Delete a schedule by its ID. This will only work on `IMPERATIVE` schedules that were created in the dashboard or using the imperative SDK functions like `schedules.create()`.



## OpenAPI

````yaml v3-openapi DELETE /api/v1/schedules/{schedule_id}
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
  /api/v1/schedules/{schedule_id}:
    delete:
      tags:
        - schedules
      summary: Delete Schedule
      description: >-
        Delete a schedule by its ID. This will only work on `IMPERATIVE`
        schedules that were created in the dashboard or using the imperative SDK
        functions like `schedules.create()`.
      operationId: delete_schedule_v1
      parameters:
        - in: path
          name: schedule_id
          required: true
          schema:
            type: string
          description: The ID of the schedule.
      responses:
        '200':
          description: Schedule deleted successfully
        '401':
          description: Unauthorized request
        '404':
          description: Resource not found
      security:
        - secretKey: []
      x-codeSamples:
        - lang: typescript
          source: |-
            import { schedules } from "@trigger.dev/sdk";

            await schedules.del(scheduleId);
components:
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