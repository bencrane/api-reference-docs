{
  "input": "Produce a clear, specific, thorough and comprehensive document outlining how the parallel.ai deep research api works. Your output should allow for an LLM or AI to successfully build a modal function that calls the proper parallel.ai endpoints and do so from within trigger.dev",
  "output": {
    "executive_summary": "This process outlines a robust method for orchestrating a Parallel.ai Deep Research task from within a Trigger.dev workflow, using a Modal-hosted function as a secure intermediary. The primary objective is to initiate a long-running research task and reliably retrieve the final report—either as structured JSON ('auto' schema) or markdown ('text' schema)—using production-safe asynchronous patterns. The core of the integration relies on several key Parallel.ai API endpoints: `POST /v1/tasks/runs` to create a task, `GET /v1/tasks/runs/{run_id}` to check its status, and `GET /v1/tasks/runs/{run_id}/result` to fetch the final output. For real-time progress updates, an optional beta endpoint, `GET /v1beta/tasks/runs/{run_id}/events`, provides a Server-Sent Events (SSE) stream. Authentication for all API calls is handled via an `x-api-key` header. The recommended production pattern leverages Trigger.dev v4's Waitpoint feature. In this architecture, the Trigger.dev job first creates a unique Waitpoint token, which provides a callback URL. This URL is passed as the `webhook.url` when creating the Parallel.ai task. The Trigger.dev job then pauses itself using `wait.forToken()`. Once the research task is complete, Parallel.ai sends a notification to the webhook URL, which automatically resumes the Trigger.dev job, allowing it to proceed with fetching the final result from Parallel.ai.",
    "solution_architecture_overview": "The solution architecture orchestrates a long-running asynchronous task across three services: Trigger.dev for workflow management, Modal for serverless function execution, and Parallel.ai for the deep research task itself. The workflow proceeds as follows:\n\n1.  **Initiation (Trigger.dev):** A job is triggered within Trigger.dev. Its first action is to call `wait.createToken()`, which generates a unique, single-use HTTPS URL. This URL will serve as the callback endpoint for Parallel.ai.\n\n2.  **Delegation to Intermediary (Trigger.dev to Modal):** The Trigger.dev job then makes an authenticated `POST` request to a custom endpoint hosted on Modal (e.g., `/deep-research/create`). The request body includes the research prompt and, crucially, the `token.url` generated in the previous step.\n\n3.  **Task Creation (Modal to Parallel.ai):** The Modal function receives the request. It securely accesses the Parallel.ai API key from a Modal Secret. It then constructs and sends a `POST` request to Parallel.ai's `/v1/tasks/runs` endpoint. This request payload contains the research input and a `webhook` object where the `url` is set to the Trigger.dev Waitpoint URL. The Modal function returns the `run_id` received from Parallel.ai back to the Trigger.dev job.\n\n4.  **Pause and Wait (Trigger.dev):** Upon receiving the `run_id`, the Trigger.dev job executes `wait.forToken(token)`. This action pauses the job run indefinitely (up to a configured timeout, e.g., 45 minutes), consuming no compute resources while it waits for the webhook callback.\n\n5.  **Asynchronous Processing (Parallel.ai):** Parallel.ai executes the deep research task, which can take a significant amount of time (up to ~45 minutes). \n\n6.  **Callback on Completion (Parallel.ai to Trigger.dev):** Once the task is complete, Parallel.ai sends a `POST` request to the webhook URL it was given. This request hits the Trigger.dev Waitpoint endpoint. The body of this request contains the Parallel.ai Task Run object, including the `run_id` and the final status (e.g., 'completed').\n\n7.  **Resumption (Trigger.dev):** The webhook event automatically resumes the paused Trigger.dev job. The JSON payload from the Parallel.ai webhook is available as the output of the `wait.forToken()` call.\n\n8.  **Result Retrieval (Trigger.dev to Modal to Parallel.ai):** The resumed Trigger.dev job now makes a second authenticated `POST` request to another Modal endpoint (e.g., `/deep-research/result`), passing the `run_id`. The Modal function receives this `run_id`, calls Parallel.ai's blocking `GET /v1/tasks/runs/{run_id}/result` endpoint, retrieves the complete research report, and returns it as a JSON response.\n\n9.  **Completion (Trigger.dev):** The Trigger.dev job receives the final research report from Modal and can proceed to store it, forward it, or perform any subsequent actions.",
    "parallel_ai_api_introduction": {
      "purpose": "The Parallel.ai Deep Research API is specifically designed to handle open-ended research questions. Its primary function is to take a natural-language research objective and conduct a comprehensive, multi-step web exploration to deliver analyst-grade intelligence. It is optimized for complex tasks that require in-depth investigation, producing thorough results complete with citations.",
      "key_features": "Key features of the Deep Research API include: accepting natural language input for research prompts, a declarative approach where the user specifies the research objective rather than the steps, performing multi-step web exploration to gather information, and providing flexible output structures. The API can produce comprehensive results with citations, ensuring the source of the information is traceable. It supports both structured JSON output through its 'auto' schema and markdown reports via its 'text' schema.",
      "asynchronous_nature": "The API is fundamentally asynchronous. When a new research task is created, the API returns immediately with a `run_id` and a 'queued' status. The actual research process is a long-running task that can take up to 45 minutes to complete for complex queries. This design means that results are not available in the initial response. Users must implement a mechanism to retrieve the results later, such as polling the status endpoint, using webhooks for completion notifications, or streaming progress via Server-Sent Events (SSE).",
      "output_formats": "The Deep Research API supports two primary output formats to cater to different use cases. The default is the 'auto' schema, which provides a structured JSON output that is automatically determined by the research results. This is ideal for programmatic use and data processing. The second format is the 'text' schema, which generates a comprehensive report in markdown format. This is suitable for human-readable reports. The desired output format can be specified in the `task_spec` object during task creation."
    },
    "parallel_ai_authentication": {
      "method": "Authentication with the Parallel.ai API is handled via an API Key. This key must be included in every request sent to the API endpoints. The key is passed as a value within a specific HTTP header.",
      "header_name": "The required HTTP header for authentication is 'x-api-key'. A valid request must include this header with the user's unique API key as its value, for example: `x-api-key: YOUR_API_KEY`.",
      "key_acquisition": "An API key is obtained from the Parallel.ai developer platform. Users need to sign up and access their account dashboard to generate or retrieve their unique API key, which is then used to authenticate all subsequent API calls. The documentation refers to this key as `$PARALLEL_API_KEY` or `YOUR_API_KEY` and recommends storing it securely, for example, using Modal Secrets."
    },
    "parallel_ai_task_creation": {
      "http_method": "A new Deep Research task is created by sending a 'POST' request to the Parallel.ai API.",
      "endpoint": "The specific API endpoint for initiating a new task run is 'https://api.parallel.ai/v1/tasks/runs'.",
      "request_body_parameters": "The JSON request body for creating a task includes several key parameters. The 'input' parameter is required and contains the natural language research query. The 'processor' parameter specifies the model to use, such as 'pro' or 'ultra', with 'fast' variants available (e.g., 'ultra-fast'). Other optional parameters include 'task_spec' to define the `output_schema` (e.g., 'text' for markdown), 'enable_events' (a boolean) to allow for progress streaming via SSE, and a 'webhook' object to specify a callback URL (`{ url, event_types }`) for completion notifications.",
      "beta_header_requirement": "Certain advanced features, such as webhooks and Server-Sent Events (SSE), are in beta and require a specific HTTP header to be enabled. To use webhooks, the request must include the header `parallel-beta: webhook-2025-08-12`. To use SSE, the header must include `events-sse-2025-07-24`. If both features are used, these flags can be comma-separated in the header value."
    },
    "parallel_ai_result_retrieval_methods": {
      "method_name": "Webhooks, Polling, and Server-Sent Events (SSE)",
      "how_it_works": "The Parallel.ai API, being asynchronous for long-running tasks like Deep Research, offers three main ways to get results. 1) Webhooks: You provide a callback URL when creating a task. Parallel.ai sends a notification to this URL when the task's status changes (e.g., completes). This notification contains metadata like the `run_id` but not the result itself. You must then make a separate call to the `/result` endpoint to fetch the final output. 2) Polling: This is the simplest method, where you periodically make GET requests to the `/v1/tasks/runs/{run_id}` endpoint, checking the `status` field. Once the status is 'completed', you make a final GET request to the `/v1/tasks/runs/{run_id}/result` endpoint. 3) Server-Sent Events (SSE): For tasks created with `enable_events: true`, you can connect to an SSE stream at `/v1beta/tasks/runs/{run_id}/events`. This provides real-time progress messages (e.g., 'Planning task...', 'Executing tool...') and concludes with a final state event that includes the output.",
      "best_for_scenario": "Webhooks are the best practice for production backends, especially when integrated with services like Trigger.dev. This event-driven approach is efficient and saves compute costs by pausing workflows until a callback is received. Polling is suitable for simple scripts, debugging, or low-volume scenarios where simplicity is prioritized over efficiency. SSE is specifically designed for interactive user interfaces or dashboards where showing real-time progress to the end-user is a requirement.",
      "recommended_for_this_solution": true
    },
    "parallel_ai_webhook_integration": {
      "setup_process": "To register a webhook for a specific task, you must include a `webhook` object in the JSON body of the `POST /v1/tasks/runs` request. This object must contain a `url` for the callback and an `event_types` array, typically `[\"task_run.status\"]`. As this feature is in beta, the request must also include the HTTP header `parallel-beta` with the value `webhook-2025-08-12`. For this specific solution, the recommended approach is to use a Trigger.dev Waitpoint token URL as the `webhook.url`.",
      "notification_payload": "The data sent to the webhook URL is a JSON payload containing a `timestamp`, `type` (e.g., 'task_run.status'), and a `data` object. This `data` object is the Task Run object itself, which includes the `run_id`, the current `status` of the task (e.g., 'completed', 'failed'), and other metadata. It is critical to understand that this payload serves as a notification and does not contain the full research result or output from the task.",
      "result_retrieval_step": "After your webhook endpoint receives a notification indicating the task is complete, a mandatory second step is required to fetch the actual data. You must use the `run_id` from the webhook's payload to make a `GET` request to the `/v1/tasks/runs/{run_id}/result` endpoint. This API call is blocking; it will wait until the run is fully completed and then return the final output, which can be structured JSON or markdown text.",
      "security_verification": "As a security best practice, Parallel.ai signs all webhook requests using HMAC-SHA256. The signature is provided in the `webhook-signature` HTTP header. To verify the request's authenticity, you should compute an HMAC signature over a concatenated string of the `webhook-id`, `webhook-timestamp`, and the raw request payload (`<webhook-id>.<webhook-timestamp>.<payload>`). This computed signature should then be compared against the one in the header using a timing-safe comparison. However, the documentation notes that if you use Trigger.dev Waitpoints, the provided token URL is pre-authenticated, eliminating the need to implement this signature verification logic yourself."
    },
    "modal_setup_and_configuration": {
      "project_setup": "To begin, create a main Python file for the Modal application, for instance, named `server.py`. This file will serve as the central point for your application's logic. Inside this file, you will import the required libraries such as `modal`, `os`, `httpx`, and `fastapi`. You will then define the Modal App object (e.g., `app = modal.App(...)`), which acts as a container for your functions, image definitions, and other configurations. The provided example code outlines a complete `server.py` that sets up the application, defines the container image, and implements the FastAPI endpoints that will interact with the Parallel.ai API.",
      "required_dependencies": "The Modal application requires specific Python packages to be installed in its container image to function correctly. Based on the provided implementation, the necessary dependencies are `fastapi[standard]` and `httpx`. The `fastapi` package is used to create and manage the web endpoints, while `httpx` is utilized for making asynchronous HTTP requests to the Parallel.ai API. Although the official `parallel-web` SDK exists, the example code demonstrates making raw HTTP calls, making `httpx` the direct dependency for this implementation.",
      "image_definition": "A `modal.Image` must be defined to specify the software environment for the container where the functions will run. The provided code example shows how to do this by creating a base image and then installing the required packages. The specific code snippet is: `image = modal.Image.debian_slim().pip_install(\"fastapi[standard]\", \"httpx\")`. This line of code defines an image based on the lightweight `debian-slim` distribution and uses the `.pip_install()` method to add the `fastapi` and `httpx` libraries to it, ensuring they are available at runtime."
    },
    "modal_secret_management": {
      "secret_creation": "To securely manage the Parallel.ai API key, you must use Modal's secret management feature. You can create a secret through the Modal dashboard or via the CLI. The example implementation assumes a secret named `parallel-api` has been created. This secret should contain an environment variable key, such as `PARALLEL_API_KEY`, whose value is your actual Parallel.ai API key. The example also suggests creating a second secret, `my-web-auth-token`, to hold a bearer token under the key `AUTH_TOKEN`, which can be used to secure your own Modal web endpoints.",
      "attaching_to_function": "Once a secret is created, it must be attached to the Modal function that needs to access it. This is done by passing a list of secrets to the `secrets` argument of the `@app.function` decorator. The provided code example demonstrates this with the following snippet: `secrets=[modal.Secret.from_name(\"parallel-api\"), modal.Secret.from_name(\"my-web-auth-token\")]`. This line instructs Modal to make the environment variables from both the `parallel-api` and `my-web-auth-token` secrets available to the decorated function's runtime environment.",
      "accessing_in_code": "Within the function's code, the secret values can be accessed as standard environment variables using Python's built-in `os` module. The example code shows how to retrieve the Parallel.ai API key with `os.environ[\"PARALLEL_API_KEY\"]`. Similarly, the optional authorization token for the endpoint is accessed via `os.environ.get(\"AUTH_TOKEN\")`. This approach ensures that sensitive credentials are not hardcoded in the source code and are securely injected into the environment at runtime."
    },
    "modal_function_implementation": {
      "endpoint_decorator": "To expose a Python function as an HTTP endpoint, the `@modal.fastapi_endpoint` decorator is used. This decorator seamlessly integrates Modal with the FastAPI framework. In the provided example, `@modal.fastapi_endpoint(method='POST')` is applied to the `create`, `result`, and `stream` functions. This configuration makes each function accessible via a public URL that responds to HTTP POST requests, allowing external services like Trigger.dev to invoke them.",
      "request_payload_handling": "The Modal function is designed to handle a JSON payload sent in the body of the POST request. The example function signature, `async def create(request: Request, ...)` uses FastAPI's `Request` object. The JSON body is then read asynchronously using `body = await request.json()`. The code demonstrates robustly accessing data from this body by using the `.get()` dictionary method (e.g., `body.get(\"input\")`, `body.get(\"webhookUrl\")`). This prevents errors if an optional field is not included in the request and allows for flexible input from the calling service.",
      "api_call_logic": "The core logic within the function involves preparing and sending a request to the Parallel.ai API. First, the function retrieves the API key from the environment variables managed by Modal Secrets. It then constructs a `payload` dictionary containing the research `input` and `processor` type. The logic dynamically adds other parameters to this payload, such as `task_spec` for markdown output or a `webhook` object if a URL is provided. Finally, it uses the `httpx.AsyncClient` to make an asynchronous `POST` call to the `https://api.parallel.ai/v1/tasks/runs` endpoint, including the `x-api-key` header and the JSON payload. The function then processes the response, returning the `run_id` to the caller.",
      "dynamic_webhook_url_usage": "The implementation is designed to support a dynamic webhook URL provided by the client (e.g., a Trigger.dev Waitpoint URL). The code explicitly checks for the presence of a `webhookUrl` key in the incoming JSON payload with `if body.get(\"webhookUrl\"):`. If this key exists, its value is used to construct a `webhook` object within the payload sent to Parallel.ai: `payload[\"webhook\"] = {\"url\": body[\"webhookUrl\"], \"event_types\": [\"task_run.status\"]}`. This allows the calling workflow to specify a unique callback destination for each task run, enabling robust asynchronous patterns."
    },
    "modal_deployment": {
      "deployment_command": "To deploy the Modal application and create a persistent, publicly accessible endpoint, you use the Modal CLI. From your terminal, in the directory containing your Python script, you run the command `modal deploy <filename>.py`. For the provided example, the command would be `modal deploy server.py`. This command handles the entire process of packaging your code, building the container image with its dependencies, and provisioning the necessary cloud infrastructure to host your function.",
      "persistent_url": "A key benefit of using `modal deploy` is that it generates a stable, public HTTPS URL for each function decorated as a web endpoint (e.g., with `@modal.fastapi_endpoint`). This URL is persistent across deployments, meaning it will not change as long as the application and function names remain the same. This stability is crucial for integrations, as it provides a reliable endpoint that the Trigger.dev job can be configured to call without needing updates after every code change.",
      "development_server": "For local development and rapid iteration, Modal provides the `modal serve <filename>.py` command (e.g., `modal serve server.py`). Running this command starts a development server that exposes your web endpoints on a temporary URL. A major advantage of this mode is its live-reloading capability; any changes you save to your Python file are automatically detected and applied to the running application, allowing you to test modifications instantly without a full deployment cycle."
    },
    "trigger_dev_job_definition": {
      "job_creation_syntax": "A background job in Trigger.dev is defined by importing the `task` function from the '@trigger.dev/sdk' package. You then export a constant which is assigned the result of calling `task()`. This function takes an object as an argument, which must include a unique `id` for the job and an async `run` function. The `run` function is where the job's logic is implemented and receives `io` (for integrations) and `params` (payload) as arguments.",
      "file_structure": "While not explicitly defined in the context, the standard convention for modern web frameworks that use Trigger.dev (like Next.js) is to place job definitions in a dedicated directory. A typical file path would be `app/jobs/myJob.ts` or, following the example, `app/jobs/deepResearch.ts`. Each file typically exports one or more `task` definitions.",
      "basic_code_template": "import { task, wait } from \"@trigger.dev/sdk\";\n\nexport const deepResearch = task({\n  id: \"deep-research\",\n  run: async (io, params: {\n    input: string | Record<string, any>;\n    output_mode?: \"auto\" | \"text\";\n    processor?: string;\n  }) => {\n    // Job logic goes here, for example:\n    // 1. Create a wait token\n    // 2. Call an external service\n    // 3. Wait for a callback\n    // 4. Process the result\n    console.log(\"Job started with params:\", params);\n    // ... implementation ...\n    return { success: true };\n  },\n});"
    },
    "trigger_dev_webhook_handling_with_waitpoints": {
      "feature_overview": "Trigger.dev's 'Waitpoints' feature is designed to efficiently handle asynchronous operations that rely on external callbacks, such as webhooks. Instead of long-polling, a job can be paused, which saves on compute costs. When a Waitpoint token is created, it generates a unique URL. This URL can be given to a third-party service. When that service completes its work, it makes a POST request to the URL, which automatically resumes the paused Trigger.dev job run. The body of the POST request is then available as the output of the wait operation within the job.",
      "create_token_function": "The `wait.createToken()` function is used to generate a unique, single-use token and an associated callback URL. This function is called within the `run` method of a task. The returned object contains the `token` itself and a `url` property. This URL is what you provide to the external service (in this case, passed to the Modal function which then includes it in the Parallel.ai API call as the `webhook.url`). An optional timeout can be specified, for example: `const token = await wait.createToken({ timeout: \"45m\" });`.",
      "wait_for_token_function": "After creating a token and initiating the external asynchronous process, the job's execution is paused by calling `await wait.forToken(token)`. This function effectively halts the run at this line, consuming no compute resources while waiting. The job will only proceed once the associated token URL receives a POST request from the external service. The `.unwrap()` method is often chained to this call, which will either return the payload from the successful callback or throw an error if the wait times out or fails.",
      "resuming_the_run": "A job run is automatically resumed when the third-party service (Parallel.ai, via the Modal endpoint) makes an HTTP POST request to the unique URL generated by `wait.createToken()`. Trigger.dev handles this incoming request and continues the specific job run that was paused. The JSON body of the POST request becomes the return value of the `await wait.forToken()` call. In the provided example, this payload is captured in the `webhookEvent` variable: `const webhookEvent = await wait.forToken<any>(token).unwrap();`."
    },
    "trigger_dev_orchestration_logic": {
      "initiating_request_to_modal": "The Trigger.dev job initiates the process by making an asynchronous HTTP POST request to the deployed Modal function's URL using the standard `fetch` API. This request is responsible for creating the Parallel.ai task. The example code shows setting the `method` to 'POST', providing the necessary `headers` (including 'content-type' and an 'Authorization' bearer token for the Modal endpoint), and constructing the JSON `body` with the research parameters.",
      "passing_callback_url": "To enable the webhook callback mechanism, the unique URL generated by `wait.createToken()` is included in the JSON body of the initial `fetch` request to Modal. The code demonstrates this by setting a `webhookUrl` property in the JSON payload: `body: JSON.stringify({ ..., webhookUrl: token.url, ... })`. The Modal function then receives this URL and passes it along to the Parallel.ai API in the `webhook.url` field when creating the deep research task.",
      "handling_final_result": "After the job is paused with `wait.forToken()` and subsequently resumed by the webhook callback from Parallel.ai, the payload of that callback (containing the `run_id` and status) is captured. The job then proceeds to make a second `fetch` call. This call is directed at a different Modal endpoint (e.g., `MODAL_RESULT_URL`) designed to retrieve the final research report. The `run_id` from the webhook payload is sent in the body of this second request. The Modal function uses this `run_id` to call Parallel.ai's `/result` endpoint, which blocks until the result is ready and returns it. This final result is then received back in the Trigger.dev job and can be returned or processed further."
    },
    "end_to_end_implementation_guide": "This guide provides a comprehensive walkthrough for integrating Parallel.ai's Deep Research API with a Trigger.dev workflow, using Modal as a secure intermediary. It includes full code examples and configuration details.\n\n### **Step 1: Understand the Parallel.ai Task API**\n\n-   **Functionality:** The Deep Research task takes a natural language objective, performs multi-step web exploration, and returns a comprehensive report with citations. It's an asynchronous process that can take up to 45 minutes.\n-   **Output Formats:** It supports a default `auto` schema for structured JSON output and a `text` schema for markdown reports.\n-   **Authentication:** All requests to `https://api.parallel.ai` require an `x-api-key: YOUR_API_KEY` header.\n-   **Key Endpoints:**\n    -   `POST /v1/tasks/runs`: Creates a new research task. You pass the `input`, `processor` (e.g., `ultra`), and optionally a `webhook` URL.\n    -   `GET /v1/tasks/runs/{run_id}/result`: Retrieves the final result, blocking until the task is complete.\n-   **Webhooks:** To receive a callback on task completion, include a `webhook` object in the creation request: `{ \"url\": \"YOUR_CALLBACK_URL\", \"event_types\": [\"task_run.status\"] }`. This is a beta feature requiring the `parallel-beta: webhook-2025-08-12` header.\n\n### **Step 2: Implement the Modal Intermediary Function (Python)**\n\nModal will host our Python functions, securely store the Parallel.ai API key, and expose two web endpoints for Trigger.dev to call.\n\n**Prerequisites:**\n1.  Create a Modal Secret named `parallel-api` with a key `PARALLEL_API_KEY` and your API key as the value.\n2.  Create another Modal Secret named `my-web-auth-token` with a key `AUTH_TOKEN` and a secure, randomly generated string. This will protect your Modal endpoints.\n\n**`server.py` (Modal App):**\n```python\nimport os\nimport json\nimport httpx\nimport modal\nfrom fastapi import Depends, HTTPException, Request, status\nfrom fastapi.security import HTTPBearer, HTTPAuthorizationCredentials\nfrom fastapi.responses import JSONResponse\n\nimage = modal.Image.debian_slim().pip_install(\"fastapi[standard]\", \"httpx\")\napp = modal.App(\"parallel-deep-research\", image=image)\n\nauth_scheme = HTTPBearer(auto_error=False)\n\n# Endpoint to create a Parallel.ai task run\n@app.function(secrets=[modal.Secret.from_name(\"parallel-api\"), modal.Secret.from_name(\"my-web-auth-token\")])\n@modal.fastapi_endpoint(method=\"POST\")\nasync def create(request: Request, token: HTTPAuthorizationCredentials = Depends(auth_scheme)):\n    if token is None or token.credentials != os.environ.get(\"AUTH_TOKEN\"):\n        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=\"Unauthorized\")\n\n    body = await request.json()\n    parallel_api_key = os.environ[\"PARALLEL_API_KEY\"]\n\n    payload = {\n        \"input\": body.get(\"input\"),\n        \"processor\": body.get(\"processor\", \"ultra\"),\n    }\n\n    if body.get(\"output_mode\") == \"text\":\n        payload[\"task_spec\"] = {\"output_schema\": \"text\"}\n\n    headers = {\"x-api-key\": parallel_api_key, \"content-type\": \"application/json\"}\n    beta_flags = []\n\n    if body.get(\"webhookUrl\"):\n        payload[\"webhook\"] = {\"url\": body[\"webhookUrl\"], \"event_types\": [\"task_run.status\"]}\n        beta_flags.append(\"webhook-2025-08-12\")\n\n    if beta_flags:\n        headers[\"parallel-beta\"] = \",\".join(beta_flags)\n\n    async with httpx.AsyncClient(timeout=30.0) as client:\n        r = await client.post(\n            \"https://api.parallel.ai/v1/tasks/runs\",\n            headers=headers,\n            json=payload,\n        )\n        r.raise_for_status()\n        data = r.json()\n\n    return JSONResponse({\"run_id\": data[\"run_id\"], \"status\": data.get(\"status\"), \"processor\": data.get(\"processor\")})\n\n# Endpoint to retrieve the result of a completed task run\n@app.function(secrets=[modal.Secret.from_name(\"parallel-api\"), modal.Secret.from_name(\"my-web-auth-token\")])\n@modal.fastapi_endpoint(method=\"POST\")\nasync def result(request: Request, token: HTTPAuthorizationCredentials = Depends(auth_scheme)):\n    if token is None or token.credentials != os.environ.get(\"AUTH_TOKEN\"):\n        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=\"Unauthorized\")\n\n    body = await request.json()\n    run_id = body[\"run_id\"]\n    headers = {\"x-api-key\": os.environ[\"PARALLEL_API_KEY\"]}\n\n    # The /result endpoint blocks, so use a long timeout\n    async with httpx.AsyncClient(timeout=3600.0) as client:\n        r = await client.get(f\"https://api.parallel.ai/v1/tasks/runs/{run_id}/result\", headers=headers)\n        r.raise_for_status()\n        data = r.json()\n\n    return JSONResponse(data)\n```\nDeploy this app using `modal deploy server.py`. This will give you stable HTTPS URLs for the `create` and `result` functions.\n\n### **Step 3: Implement the Trigger.dev Workflow (TypeScript)**\n\nThis workflow will orchestrate the entire process using the Modal endpoints and Trigger.dev's `wait` functionality.\n\n**Prerequisites:**\n-   Set the following environment variables in your Trigger.dev project:\n    -   `MODAL_CREATE_URL`: The URL for your deployed Modal `create` function.\n    -   `MODAL_RESULT_URL`: The URL for your deployed Modal `result` function.\n    -   `MODAL_AUTH_TOKEN`: The auth token you stored in the `my-web-auth-token` Modal Secret.\n\n**`deepResearchTask.ts` (Trigger.dev Task):**\n```typescript\nimport { task, wait } from \"@trigger.dev/sdk\";\n\nexport const deepResearch = task({\n  id: \"deep-research\",\n  run: async (io, params: {\n    input: string | Record<string, any>;\n    output_mode?: \"auto\" | \"text\";\n    processor?: string;\n  }) => {\n    // 1. Create a Waitpoint token for the webhook callback from Parallel.ai\n    const token = await wait.createToken({ timeout: \"45m\" });\n\n    // 2. Call the Modal 'create' endpoint to start the Parallel.ai task\n    const createResp = await fetch(process.env.MODAL_CREATE_URL!, {\n      method: \"POST\",\n      headers: {\n        \"content-type\": \"application/json\",\n        Authorization: `Bearer ${process.env.MODAL_AUTH_TOKEN!}`,\n      },\n      body: JSON.stringify({\n        input: params.input,\n        output_mode: params.output_mode ?? \"auto\",\n        processor: params.processor ?? \"ultra\",\n        webhookUrl: token.url, // Pass the Waitpoint URL as the webhook\n      }),\n    });\n\n    if (!createResp.ok) {\n      throw new Error(`Modal create endpoint failed: ${await createResp.text()}`);\n    }\n    const { run_id } = await createResp.json();\n\n    // 3. Pause the job and wait for Parallel.ai to POST to the token URL\n    const webhookEvent = await wait.forToken<any>(token).unwrap();\n    // webhookEvent contains the body of the callback from Parallel.ai\n\n    // 4. Once resumed, fetch the final result via the Modal 'result' endpoint\n    const resultResp = await fetch(process.env.MODAL_RESULT_URL!, {\n      method: \"POST\",\n      headers: {\n        \"content-type\": \"application/json\",\n        Authorization: `Bearer ${process.env.MODAL_AUTH_TOKEN!}`,\n      },\n      body: JSON.stringify({ run_id }),\n    });\n\n    if (!resultResp.ok) {\n      throw new Error(`Modal result endpoint failed: ${await resultResp.text()}`);\n    }\n    const finalResult = await resultResp.json();\n\n    // 5. Return the final research report\n    return finalResult;\n  },\n});\n```\n\n### **Step 4: Practical Considerations**\n\n-   **Input Size:** Keep research prompts concise, ideally under 15,000 characters, for optimal performance.\n-   **Processors:** Use `pro` or `ultra` for Deep Research. The `pro-fast` and `ultra-fast` variants offer lower latency with a slight trade-off in fidelity.\n-   **Timeouts:** The `wait.createToken` timeout should be long enough to accommodate the maximum task duration (e.g., `45m`). The HTTP client timeout in the Modal `result` function should also be very long (e.g., 3600 seconds) as the Parallel.ai endpoint blocks until completion.\n-   **Security:** Never expose API keys in client-side code. Using Modal Secrets is the correct approach. The bearer token for the Modal endpoints adds an essential layer of security.\n-   **Idempotency:** Webhook delivery is \"at-least-once.\" If you build custom logic based on webhooks, use the `run_id` to handle potential duplicate events.",
    "complete_code_examples": [
      {
        "file_name": "server.py",
        "language": "Python",
        "description": "A Modal application that exposes secure FastAPI endpoints to interact with the Parallel.ai API. It includes an endpoint to create a new Deep Research task (handling webhook and SSE configuration) and another to retrieve the final result of a task run. It uses Modal Secrets to securely store the Parallel.ai API key and an optional authentication token for the endpoints themselves.",
        "code": "import os\nimport json\nimport httpx\nimport modal\nfrom fastapi import Depends, HTTPException, Request, status\nfrom fastapi.security import HTTPBearer, HTTPAuthorizationCredentials\nfrom fastapi.responses import StreamingResponse, JSONResponse\n\nimage = modal.Image.debian_slim().pip_install(\"fastapi[standard]\", \"httpx\")\napp = modal.App(\"parallel-deep-research\", image=image)\n\n# Optional: protect your web endpoints with a bearer token stored as AUTH_TOKEN in a Modal Secret\nauth_scheme = HTTPBearer(auto_error=False)\n\n@app.function(secrets=[modal.Secret.from_name(\"parallel-api\"), modal.Secret.from_name(\"my-web-auth-token\")])\n@modal.fastapi_endpoint(method=\"POST\")\nasync def create(request: Request, token: HTTPAuthorizationCredentials = Depends(auth_scheme)):\n    # Optional bearer auth for your endpoint\n    if token is None or token.credentials != os.environ.get(\"AUTH_TOKEN\"):\n        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=\"Unauthorized\")\n\n    body = await request.json()\n    # Expected fields in body\n    #   input: str | object (required)\n    #   processor: str (e.g., \"ultra\", \"pro-fast\")\n    #   output_mode: \"auto\" | \"text\" (default: auto)\n    #   webhookUrl: str (optional)\n    #   enableEvents: bool (optional)\n\n    parallel_api_key = os.environ[\"PARALLEL_API_KEY\"]\n\n    payload = {\n        \"input\": body.get(\"input\"),\n        \"processor\": body.get(\"processor\", \"ultra\"),\n    }\n\n    # Text schema -> markdown output\n    if body.get(\"output_mode\") == \"text\":\n        payload[\"task_spec\"] = {\"output_schema\": \"text\"}\n\n    # Enable webhook if provided\n    headers = {\"x-api-key\": parallel_api_key, \"content-type\": \"application/json\"}\n\n    # Beta: enable events SSE\n    beta_flags = []\n    if body.get(\"enableEvents\"):\n        payload[\"enable_events\"] = True\n        beta_flags.append(\"events-sse-2025-07-24\")\n\n    if body.get(\"webhookUrl\"):\n        payload[\"webhook\"] = {\"url\": body[\"webhookUrl\"], \"event_types\": [\"task_run.status\"]}\n        beta_flags.append(\"webhook-2025-08-12\")\n\n    # Add beta header if needed\n    if beta_flags:\n        # Join beta flags; if you only use one feature, a single value is fine\n        headers[\"parallel-beta\"] = \",\".join(beta_flags)\n\n    async with httpx.AsyncClient(timeout=30.0) as client:\n        r = await client.post(\n            \"https://api.parallel.ai/v1/tasks/runs\",\n            headers=headers,\n            json=payload,\n        )\n        r.raise_for_status()\n        data = r.json()\n\n    return JSONResponse({\"run_id\": data[\"run_id\"], \"status\": data.get(\"status\"), \"processor\": data.get(\"processor\")})\n\n@app.function(secrets=[modal.Secret.from_name(\"parallel-api\"), modal.Secret.from_name(\"my-web-auth-token\")])\n@modal.fastapi_endpoint(method=\"POST\")\nasync def result(request: Request, token: HTTPAuthorizationCredentials = Depends(auth_scheme)):\n    if token is None or token.credentials != os.environ.get(\"AUTH_TOKEN\"):\n        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=\"Unauthorized\")\n\n    body = await request.json()\n    run_id = body[\"run_id\"]\n\n    headers = {\"x-api-key\": os.environ[\"PARALLEL_API_KEY\"]}\n\n    # The /result endpoint blocks until completed; increase timeout as needed\n    async with httpx.AsyncClient(timeout=3600.0) as client:\n        r = await client.get(f\"https://api.parallel.ai/v1/tasks/runs/{run_id}/result\", headers=headers)\n        r.raise_for_status()\n        data = r.json()\n\n    return JSONResponse(data)\n\n# Optional: Re-stream Parallel SSE to clients (for dashboards/UIs)\n@app.function(secrets=[modal.Secret.from_name(\"parallel-api\"), modal.Secret.from_name(\"my-web-auth-token\")])\n@modal.fastapi_endpoint(method=\"POST\")\nasync def stream(request: Request, token: HTTPAuthorizationCredentials = Depends(auth_scheme)):\n    if token is None or token.credentials != os.environ.get(\"AUTH_TOKEN\"):\n        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=\"Unauthorized\")\n\n    body = await request.json()\n    run_id = body[\"run_id\"]\n\n    async def sse_iter():\n        headers = {\n            \"x-api-key\": os.environ[\"PARALLEL_API_KEY\"],\n            # SSE feature is beta-gated\n            \"parallel-beta\": \"events-sse-2025-07-24\",\n        }\n        async with httpx.AsyncClient(timeout=None) as client:\n            async with client.stream(\"GET\", f\"https://api.parallel.ai/v1beta/tasks/runs/{run_id}/events\", headers=headers) as resp:\n                resp.raise_for_status()\n                async for line in resp.aiter_lines():\n                    if line:\n                        yield (line + \"\\n\").encode()\n\n    return StreamingResponse(sse_iter(), media_type=\"text/event-stream\")"
      },
      {
        "file_name": "deepResearch.ts",
        "language": "TypeScript",
        "description": "A Trigger.dev v4 task that orchestrates the call to the Parallel.ai Deep Research API via the Modal endpoints. It uses `wait.createToken` to generate a unique webhook URL, passes it to the Modal `/create` endpoint, and then pauses execution with `wait.forToken`. When Parallel.ai completes the task and calls the webhook, the task resumes and calls the Modal `/result` endpoint to fetch the final report.",
        "code": "import { task, wait } from \"@trigger.dev/sdk\";\n\nexport const deepResearch = task({\n  id: \"deep-research\",\n  run: async (io, params: {\n    input: string | Record<string, any>;\n    output_mode?: \"auto\" | \"text\";\n    processor?: string; // e.g. \"ultra-fast\"\n  }) => {\n    // 1) Create a Waitpoint token for the webhook callback\n    const token = await wait.createToken({ timeout: \"45m\" });\n\n    // 2) Call your Modal endpoint to create the Parallel task run\n    const modalUrl = process.env.MODAL_CREATE_URL!; // e.g. https://your-ws--parallel-deep-research-create.modal.run\n    const authToken = process.env.MODAL_AUTH_TOKEN!; // if using bearer auth\n\n    const createResp = await fetch(modalUrl, {\n      method: \"POST\",\n      headers: {\n        \"content-type\": \"application/json\",\n        Authorization: `Bearer ${authToken}`,\n      },\n      body: JSON.stringify({\n        input: params.input,\n        output_mode: params.output_mode ?? \"auto\",\n        processor: params.processor ?? \"ultra\",\n        webhookUrl: token.url, // pass Waitpoint URL so Parallel can callback when done\n        enableEvents: false,   // set true if you also plan to stream in a UI\n      }),\n    });\n\n    if (!createResp.ok) throw new Error(`Modal create failed: ${await createResp.text()}`);\n    const { run_id } = await createResp.json();\n\n    // 3) Pause until Parallel posts to the Waitpoint URL\n    const webhookEvent = await wait.forToken<any>(token).unwrap();\n    // webhookEvent is the JSON body Parallel posted; it includes `data.run_id` and status\n\n    // 4) Fetch the final result from Parallel via your Modal result endpoint\n    const resultResp = await fetch(process.env.MODAL_RESULT_URL!, {\n      method: \"POST\",\n      headers: {\n        \"content-type\": \"application/json\",\n        Authorization: `Bearer ${authToken}`,\n      },\n      body: JSON.stringify({ run_id }),\n    });\n    if (!resultResp.ok) throw new Error(`Modal result failed: ${await resultResp.text()}`);\n    const finalResult = await resultResp.json();\n\n    // 5) Return or store finalResult\n    return finalResult;\n  },\n});"
      }
    ],
    "api_endpoint_reference": [
      {
        "service": "Parallel.ai",
        "endpoint": "https://api.parallel.ai/v1/tasks/runs",
        "http_method": "POST",
        "purpose": "To create and initiate a new Deep Research task run. The body of the request contains the research input, processor choice, and optional configurations like webhooks."
      },
      {
        "service": "Parallel.ai",
        "endpoint": "https://api.parallel.ai/v1/tasks/runs/{run_id}",
        "http_method": "GET",
        "purpose": "To retrieve the current status and metadata of a specific task run, identified by its `run_id`. Useful for polling-based approaches."
      },
      {
        "service": "Parallel.ai",
        "endpoint": "https://api.parallel.ai/v1/tasks/runs/{run_id}/result",
        "http_method": "GET",
        "purpose": "To retrieve the final output of a completed task run. This endpoint blocks until the task is finished."
      },
      {
        "service": "Parallel.ai",
        "endpoint": "https://api.parallel.ai/v1beta/tasks/runs/{run_id}/events",
        "http_method": "GET",
        "purpose": "To stream real-time progress updates from a task run using Server-Sent Events (SSE). Requires `enable_events: true` on task creation."
      },
      {
        "service": "Modal",
        "endpoint": "/deep-research/create",
        "http_method": "POST",
        "purpose": "A custom endpoint hosted on Modal that acts as a proxy to create a Parallel.ai task. It securely adds the API key and constructs the request payload."
      },
      {
        "service": "Modal",
        "endpoint": "/deep-research/result",
        "http_method": "POST",
        "purpose": "A custom endpoint hosted on Modal that retrieves the final result from Parallel.ai's `/result` endpoint, identified by the `run_id`."
      },
      {
        "service": "Trigger.dev",
        "endpoint": "{token.url}",
        "http_method": "POST",
        "purpose": "The dynamic Waitpoint URL generated by `wait.createToken`. Parallel.ai sends a POST request to this URL upon task completion, which resumes the paused Trigger.dev job."
      }
    ],
    "error_handling_and_best_practices": {
      "parallel_ai_error_checking": "The webhook payload from Parallel.ai contains the full Task Run object, including a `status` field. Before attempting to fetch the result, it is best practice to inspect this payload to ensure the status is 'completed'. If the status is 'failed', the job should handle the error appropriately instead of proceeding to call the `/result` endpoint, which would fail.",
      "trigger_dev_timeouts": "Parallel.ai's Deep Research tasks can take up to 45 minutes. It is crucial to set a sufficiently long `timeout` in the `wait.createToken` call (e.g., `{ timeout: '45m' }`). This prevents the Trigger.dev job from timing out and terminating prematurely while waiting for the webhook callback from a long-running research task.",
      "webhook_security": "Parallel.ai signs its webhook requests with an HMAC-SHA256 signature, which can be found in the `webhook-signature` header. While verifying this signature is a critical security practice for self-hosted webhook endpoints, the recommended pattern using Trigger.dev Waitpoints abstracts this away. The unique, single-use `token.url` provided by Trigger.dev is inherently secure for the scope of the job run, eliminating the need for manual signature verification in your code.",
      "idempotency": "Webhook systems can sometimes deliver the same event more than once. The workflow should be designed to be idempotent, meaning it can safely handle duplicate webhook deliveries. A common strategy is to use the `run_id` from the webhook payload as an idempotency key to ensure that the result-fetching and subsequent processing steps are only performed once for any given task run."
    }
  },
  "outputBasis": [
    {
      "field": "modal_function_implementation",
      "citations": [
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "There are two ways of invoking deployed functions.",
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "For more detail on setting up functions for invocation over HTTP see the web endpoints guide .\n©"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "The easiest way to create a web endpoint from an existing Python function is to use the `@modal.fastapi_endpoint` decorator .",
            "This decorator wraps the Modal Function in a FastAPI application .",
            "Note that web endpoints, like everything else on Modal, only run when they need\nto. When you hit the web endpoint the first time, it will boot up the container,\nwhich might take a few seconds. Modal keeps the container alive for a short\nperiod in case there are subsequent requests. If there are a lot of requests,\nModal might create more containers running in parallel.",
            "You can also deploy your app and create a persistent web endpoint in the cloud\nby running `modal deploy` :",
            "When using `@modal.fastapi_endpoint` , you can add [query parameters](https://fastapi.tiangolo.com/tutorial/query-params/) which\nwill be passed to your Function as arguments.",
            "This endpoint definition would be called like so:",
            "For ASGI apps, you can create a function decorated with `@modal.asgi_app` that returns a reference to\nyour web app:"
          ]
        }
      ],
      "reasoning": "The field value describes exposing a Python function as an HTTP endpoint using the fastapi_endpoint decorator, with a public URL that supports HTTP POST, and using a Request object to read the JSON body. The excerpts support this in several ways: the Modal docs explain that deploying a function as an HTTP endpoint can be achieved via an @modal.fastapi_endpoint decorator and that such endpoints respond to HTTP POST requests, enabling external services to invoke the function. This directly aligns with the need for a publicly accessible endpoint that Trigger.dev can call. Additional excerpts confirm that the endpoint will have a stable HTTPS URL and point to the web endpoints guidance for how to interact with the exposed function from external systems. The Modal webhook-focused excerpts provide guidance on how to propagate dynamic callback destinations (webhooks) to downstream APIs, which matches the field value’s description of constructing a payload and optionally including a webhook URL for Parallel.ai task run callbacks. Collectively, these excerpts directly support the idea of exposing a Modal function via a public HTTP endpoint, handling a JSON body, and integrating with Parallel.ai via a POST to the run endpoint and optional webhook configuration. The excerpts that discuss deployment of deployed functions, how to invoke these endpoints over HTTP, and the specifics of webhook integration are the most tightly aligned with the described implementation. Additional context about webhook payload structure and security (webhook headers and verification) reinforces the practical considerations for integrating with Trigger.dev and Parallel.ai in a real-world flow.",
      "confidence": "high"
    },
    {
      "field": "modal_deployment",
      "citations": [
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "For more detail on setting up functions for invocation over HTTP see the web endpoints guide .\n©",
            "HTTPS is used if the invoking client is not running Python and\ntherefore cannot import the Modal client library.",
            "If the invoking client is\nrunning Python, then the same [Modal client library](https://pypi.org/project/modal/) used to write Modal code",
            "There are two ways of invoking deployed functions."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "This endpoint definition would be called like so:",
            "For ASGI apps, you can create a function decorated with `@modal.asgi_app` that returns a reference to\nyour web app:"
          ]
        }
      ],
      "reasoning": "The provided field value describes three interrelated Modal deployment concepts: (1) a deployment command used to package, containerize, and provision a cloud-hosted function, (2) a persistent, public HTTPS URL generated by deployment which remains stable across deployments for reliable integrations, and (3) a development workflow that serves your function locally and exposes a temporary URL for rapid iteration. Evidence shows: deployment tooling and its outcome are discussed as a validation path for hosting functions created via Modal, indicating the deployment command and its responsibilities (packaging, building container, provisioning cloud infrastructure). The notion of a stable, public HTTPS URL for each decorated function aligns with the persistent_url description, highlighting that the endpoint remains fixed across changes and is suitable for Trigger.dev job configurations without needing updates after code changes. Moreover, there is explicit guidance on serving and testing locally with a development server, which corresponds to modal serve for rapid iteration and live-reloading capabilities. Finally, example endpoint usage and endpoint definitions illustrate how a deployed function can be called from external contexts and how the endpoint is defined and invoked in practice. Taken together, these excerpts support the field value's components: the deployment command that creates a hosted function, the persistence/stability of the endpoint URL for external integrations, and the development server workflow for local testing, including how such endpoints are called or defined in code.",
      "confidence": "medium"
    },
    {
      "field": "executive_summary",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n```\n[View "
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run\nContent:\nCopy page\nInitiates a task run.\nReturns immediately with a run object in status ‘queued’.\nBeta features can be enabled by setting the ‘parallel-beta’ header.\nCopy page\nPOST\n/\nv1\n/\ntasks\n/",
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value.",
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs)."
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Parallel Web Systems | Web Search & Research APIs Built for AI Agents ",
          "url": "https://parallel.ai/blog/sse-for-tasks",
          "excerpts": [
            "SSE for Task Runs is available now in beta across all Parallel Task API processors. Dive into our [documentation](https://docs.parallel.ai/task-api/task-sse) [[documentation] (https://docs.parallel.ai/task-api/task-sse)](https://docs.parallel.ai/task-api/task-sse) to integrate real-time streaming into your application."
          ]
        },
        {
          "title": "Trigger.dev v4 GA | Trigger.dev",
          "url": "https://trigger.dev/launchweek/0/trigger-v4-ga",
          "excerpts": [
            "Advanced workflow control with waitpoints. V4 introduces \"Waitpoints\" – a powerful primitive that can block runs until conditions are met. A ...Read more"
          ]
        },
        {
          "title": "Wait for token - Trigger.dev",
          "url": "https://trigger.dev/docs/wait-for-token",
          "excerpts": [
            "Waitpoint tokens pause task runs until you complete the token. They’re commonly used for approval workflows and other scenarios where you need to wait for external confirmation, such as human-in-the-loop processes. You can complete a token using the SDK or by making a POST request to the token’s URL."
          ]
        }
      ],
      "reasoning": "The most directly relevant excerpt demonstrates a concrete example of posting to the Parallel.ai task creation endpoint to initiate a run, including the required input and processor parameters, which aligns with the described goal of starting a Deep Research task from Trigger.dev. Additionally, documentation showing how to create a task run and the accompanying authorization headers, and the ability to supply a webhook URL for task completion, directly support the integration pattern where a Trigger.dev Waitpoint callback triggers a Parallel task and later resumes once the result is available. References that detail how to retrieve the task run status and eventually the final result map precisely to the step where the Trigger.dev workflow queries for completion and then fetches the output. Mention of the webhook payload, required headers like x-api-key, and the optional SSE/events endpoint provides the real-time progression or completion signals that accompany long-running tasks. Finally, Waitpoint-related guidance in Trigger.dev documentation contextualizes how to pause and resume the workflow around the long-running Parallel task, which is central to production-safe asynchronous orchestration described in the field value.",
      "confidence": "high"
    },
    {
      "field": "parallel_ai_api_introduction",
      "citations": [
        {
          "title": "What is AI deep research",
          "url": "https://parallel.ai/articles/what-is-deep-research",
          "excerpts": [
            "Parallel Deep Research API**. Parallel takes a fundamentally different approach by building web research infrastructure specifically for AI ...Read more"
          ]
        },
        {
          "title": "Overview - Parallel Documentation",
          "url": "https://docs.parallel.ai/getting-started/overview",
          "excerpts": [
            "Parallel provides a suite of APIs that combine AI inference with live web data to power research, enrichment, and automation workflows.Read more"
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run\nContent:\nCopy page\nInitiates a task run.\nReturns immediately with a run object in status ‘queued’.\nBeta features can be enabled by setting the ‘parallel-beta’ header.\nCopy page\nPOST\n/\nv1\n/\ntasks\n/",
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`",
            "​\ntask_spec\nTaskSpec · object\nTask specification. If unspecified, defaults to auto output schema.",
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value.",
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs)."
          ]
        },
        {
          "title": "llms.txt - Parallel Documentation",
          "url": "https://docs.parallel.ai/llms.txt",
          "excerpts": [
            "- [Retrieve Task Run](https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run.md): Retrieves run status by run_id.\nThe run result is available from the `/result` endpoint.",
            "- [Retrieve Task Run Result](https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result.md): Retrieves a run result by run_id, blocking until the run is completed.",
            "- [Stream Task Run Events](https://docs.parallel.ai/api-reference/tasks-v1/stream-task-run-events.md): Streams events for a task run. Returns a stream of events showing progress updates and state changes for the task\nrun.",
            "- [Create Task Run](https://docs.parallel.ai/api-reference/tasks-v1/create-task-run.md): Initiates a task run. Returns immediately with a run object in status 'queued'."
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        }
      ],
      "reasoning": "The Parallel Deep Research API is described as a system designed for open-ended research questions, performing multi-step web exploration and delivering analyst-grade intelligence with citations. This matches the field value’s emphasis on handling complex, unconstrained research objectives and providing traceable sources. Additional context explains that the API accepts natural language prompts, supports an asynchronous workflow where a run_id is returned and processing happens in the background, and offers two primary output formats: a structured JSON auto schema and a markdown-like text report. This aligns with the field value’s notes about output formats and the need for comprehensive results with citations. Concrete usage details demonstrate how to initiate a task run via a POST to the API, including the required input and processor fields, and how the webhook/callback or polling flow is used to retrieve results, which is essential for building a functioning integration or modal function that interacts with the endpoints from trigger.dev. Several excerpts provide explicit endpoint patterns and example requests (including create-task-run, task-run result retrieval, and webhook usage), illustrating how to implement the end-to-end flow described in the field value. Collectively, these excerpts directly support the described purpose, capabilities (multi-step research, citations, open-ended prompts), and asynchronous operation, as well as the available output formats (auto JSON and text/markdown reports).",
      "confidence": "high"
    },
    {
      "field": "parallel_ai_authentication",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "h-quickstart)\ncURL Python TypeScript\nCopy\nAsk AI\n```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`",
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value."
          ]
        }
      ],
      "reasoning": "The core authentication mechanism for the Parallel.ai API is the inclusion of an API key in the request header named x-api-key. This is demonstrated in a concrete curl example where the header is set to a value representing the API key, showing exactly how to pass credentials with each API call. A second excerpt reinforces this pattern by using a variable like PARALLEL_API_KEY (or YOUR_API_KEY), illustrating how developers typically supply the key in practice and implying secure handling (e.g., via secrets). Additional excerpts discuss how the API key is obtained from the developer platform and used across requests, which corroborates the acquisition and secure storage aspects described in the field value. Together, these excerpts directly support the field value’s claims about header-based authentication, key provisioning, and secure management, while other excerpts provide broader context about the API ecosystem but do not directly address the authentication header. ",
      "confidence": "high"
    },
    {
      "field": "parallel_ai_task_creation",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n```\n[View ",
            "https://api.parallel.ai/v1/tasks/runs",
            "https://docs.parallel.ai/task-api/task-deep-research",
            "h-quickstart)\ncURL Python TypeScript\nCopy\nAsk AI\n```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "https://api.parallel.ai/v1beta/search",
            "cURL Python TypeScript",
            "Copy",
            "Ask AI",
            "I\n```\ncurl  https://api.parallel.ai/v1beta/search  \\   -H  \"Content-Type: application/json\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  \"parallel-beta: search-extract-2025-10-10\"  \\   -d  '{     \"objective\": \"Find latest information about Parallel Web Systems. Focus on new product releases, benchmarks, or company announcements.\",     \"search_queries\": [       \"Parallel Web Systems products\",       \"Parallel Web Systems announcements\"     ],     \"max_results\": 10,     \"excerpts\": {       \"max_chars_per_result\": 10000     }   }'\n```\n[View Search Docs →"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`",
            "​\ntask_spec\nTaskSpec · object\nTask specification. If unspecified, defaults to auto output schema.",
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs).",
            "Section Title: Create Task Run\nContent:\nCopy page\nInitiates a task run.\nReturns immediately with a run object in status ‘queued’.\nBeta features can be enabled by setting the ‘parallel-beta’ header.\nCopy page\nPOST\n/\nv1\n/\ntasks\n/",
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value."
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "llms.txt - Parallel Documentation",
          "url": "https://docs.parallel.ai/llms.txt",
          "excerpts": [
            "- [Create Task Run](https://docs.parallel.ai/api-reference/tasks-v1/create-task-run.md): Initiates a task run. Returns immediately with a run object in status 'queued'. Beta features can be enabled by setting the 'parallel-beta' header.",
            "- [Retrieve Task Run Result](https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result.md): Retrieves a run result by run_id, blocking until the run is completed."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "\"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"status\" :  \"running\" ,   \"is_active\" :  true ,   \"processor\" :  \"core\" ,   \"metadata\" : {     \"my_key\" :  \"my_value\"   },   \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,   \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\" }\n",
            "Retrieves run status by run_id.",
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "If the invoking client is\nrunning Python, then the same [Modal client library](https://pypi.org/project/modal/) used to write Modal code",
            "HTTPS is used if the invoking client is not running Python and\ntherefore cannot import the Modal client library.",
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "For more detail on setting up functions for invocation over HTTP see the web endpoints guide .\n©"
          ]
        },
        {
          "title": "Task Group",
          "url": "https://docs.parallel.ai/task-api/group-api",
          "excerpts": [
            "The API is comprised of the following endpoints: Creation: To run a batch of tasks in a group, you first need to create a task group, after which you can add ...Read more The Parallel Task Group API enables you to batch process hundreds or thousands of Tasks efficiently."
          ]
        }
      ],
      "reasoning": "The most directly relevant content confirms that creating a new Deep Research task is done by posting to the API endpoint for task runs, specifically the v1 path, and that the request body includes fields such as input (the research query), processor (model variant like ultra or pro), and optional fields like task_spec to define the output schema, enable_events to receive streaming progress, and webhook to specify a callback URL and event types for completion notifications. It also notes the exact endpoint URL for initiating a task run and demonstrates a concrete curl example with input and processor fields, reinforcing the intended usage. Additional excerpts explicitly describe the webhook structure including a webhook URL and event_types, and the requirement to include beta headers to enable webhook and SSE features. Supporting excerpts illustrate the broader task-run lifecycle and how responses perturb the workflow, but the core connection to creation remains anchored in the POST to the task runs endpoint with the described payload and beta-header requirements. Taken together, these excerpts robustly support the field value’s description of how to create a new Deep Research task, the endpoint to call, the essential and optional request body fields, and the beta header flags necessary to enable advanced features.",
      "confidence": "high"
    },
    {
      "field": "complete_code_examples",
      "citations": [
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "There are two ways of invoking deployed functions.",
            "If the invoking client is\nrunning Python, then the same [Modal client library](https://pypi.org/project/modal/) used to write Modal code",
            "HTTPS is used if the invoking client is not running Python and\ntherefore cannot import the Modal client library.",
            "all deployed web endpoint functions have a stable HTTPS URL ."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "This decorator wraps the Modal Function in a FastAPI application .",
            "Note that web endpoints, like everything else on Modal, only run when they need\nto. When you hit the web endpoint the first time, it will boot up the container,\nwhich might take a few seconds. Modal keeps the container alive for a short\nperiod in case there are subsequent requests. If there are a lot of requests,\nModal might create more containers running in parallel.",
            "You can also deploy your app and create a persistent web endpoint in the cloud\nby running `modal deploy` :",
            "When using `@modal.fastapi_endpoint` , you can add [query parameters](https://fastapi.tiangolo.com/tutorial/query-params/) which\nwill be passed to your Function as arguments.",
            "This endpoint definition would be called like so:",
            "For ASGI apps, you can create a function decorated with `@modal.asgi_app` that returns a reference to\nyour web app:"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value.",
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs).",
            "Section Title: Create Task Run\nContent:\nCopy page\nInitiates a task run.\nReturns immediately with a run object in status ‘queued’.\nBeta features can be enabled by setting the ‘parallel-beta’ header.\nCopy page\nPOST\n/\nv1\n/\ntasks\n/",
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`",
            "​\ntask_spec\nTaskSpec · object\nTask specification. If unspecified, defaults to auto output schema."
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "-H  \"x-api-key:  $PARALLEL_API_KEY \"",
            "https://api.parallel.ai/v1/tasks/runs",
            "https://docs.parallel.ai/task-api/task-deep-research",
            "h-quickstart)\ncURL Python TypeScript\nCopy\nAsk AI\n```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n```\n[View "
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        }
      ],
      "reasoning": "The most relevant excerpts directly describe how to invoke deployed functions in Modal, which is essential for exposing endpoints to interact with the Parallel.ai API as shown in the Python example. They cover the Modal deployment pattern, including fastapi_endpoint usage, authentication via secrets, and the general approach to calling the external Parallel API from a deployed Modal function. Additional highly relevant excerpts outline how to configure webhooks and security signatures, which aligns with the webhook-based completion flow and the need to secure endpoints in the Python example. Several excerpts from the Parallel documentation demonstrate creating a task run via the API, including required headers and the shape of the request payload, which underpin the create-task-run step in the TypeScript example. There is also coverage of how to retrieve a task run result, which supports the final fetch step in the integration. The combination of these Modal invocation patterns, webhook configuration, and the Task Run lifecycle (create and retrieve) directly supports the field value describing a Modal-based API wrapper around Parallel Deep Research, including webhook-driven completion and result retrieval. Excerpts about the webhook payload and security details reinforce how the endpoints should be protected and how callbacks are structured. Contextual team-specific details from other sections (e.g., SSE updates, wait-for-token behavior) provide optional supporting context but are secondary to the core integration pattern described by the field value.",
      "confidence": "high"
    },
    {
      "field": "modal_secret_management",
      "citations": [
        {
          "title": "modal.Secret | Modal Docs",
          "url": "https://modal.com/docs/reference/modal.Secret",
          "excerpts": [
            "Secrets provide a dictionary of environment variables for images. Secrets are a secure way to add credentials and other sensitive information to the containers.Read more",
            "Secrets provide a dictionary of environment variables for images.",
            "Secrets are a secure way to add credentials and other sensitive information\nto the containers your functions run in. You can create and edit secrets on [the dashboard](https://modal.com/secrets) , or programmatically from Python code.",
            "See [the secrets guide page](https://modal.com/docs/guide/secrets) for more information.",
            "Section Title: modal.Secret > from_name",
            "In contrast to most other Modal objects, named Secrets must be provisioned\nfrom the Dashboard. See other methods for alternate ways of creating a new\nSecret from code."
          ]
        },
        {
          "title": "Secrets | Modal Docs",
          "url": "https://modal.com/docs/guide/secrets",
          "excerpts": [
            "Securely provide credentials and other sensitive information to your Modal Functions with Secrets. You can create and edit Secrets via the dashboard.Read more",
            "Securely provide credentials and other sensitive information to your Modal Functions with Secrets.",
            "You can create and edit Secrets via\nthe dashboard ,\nthe command line interface ( `modal secret` ), and\nprogrammatically from Python code ( `modal.Secret` ).",
            "To inject Secrets into the container running your Function, add the `secrets=[...]` argument to your `app.function` or `app.cls` decoration.",
            "You can then use your Secret by constructing it `from_name` when defining a Modal App\nand then accessing its contents as environment variables.",
            "For example, if you have a Secret called `secret-keys` containing the key `MY_PASSWORD` :",
            "Each Secret can contain multiple keys and values but you can also inject\nmultiple Secrets, allowing you to separate Secrets into smaller reusable units:",
            "The Secrets are applied in order, so key-values from later `modal.Secret` objects in the list will overwrite earlier key-values in the case of a clash.",
            "For example, if both `modal.Secret` objects above contained the key `FOO` , then\nthe value from `\"other-secret\"` would always be present in `os.environ[\"FOO\"]` ."
          ]
        }
      ],
      "reasoning": "The field value describes securely managing the Parallel.ai API key using Modal secrets, creating secrets (e.g., one for the API key and optionally another with an authorization token), attaching those secrets to a Modal function via the secrets parameter, and accessing them at runtime as environment variables (e.g., PARALLEL_API_KEY and AUTH_TOKEN) using os.environ. Excerpts explicitly detailing Modal Secrets cover exactly these points: creating and editing secrets, using modal.Secret.from_name to reference named secrets, attaching secrets to a function with the secrets argument, and reading secret values from environment variables inside code. These excerpts collectively establish the end-to-end workflow of secret management in Modal as described by the field value, including best practices for avoiding hard-coded credentials and ensuring secure runtime access. Specifically, content explains that secrets can be created via the dashboard or CLI, that a secret named parallel-api can store PARALLEL_API_KEY, that a second secret like my-web-auth-token can store AUTH_TOKEN, and that the function can access these values through os.environ, with examples demonstrating how to retrieve PARALLEL_API_KEY and AUTH_TOKEN. Additional guidance covers how secrets are applied in order to resolve key-value overwrites, and how to reference secrets with from_name to inject into the runtime environment. These direct statements align with each component of the field value: secret creation, attaching secrets to functions, and secure access in code.",
      "confidence": "high"
    },
    {
      "field": "parallel_ai_result_retrieval_methods",
      "citations": [
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "Parallel sends a POST request to your URL when the task finishes. Key points: Webhooks notify you when the task completes—they don't send the actual results. ...Read more"
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Webhook Setup - Parallel",
          "url": "https://docs.parallel.ai/resources/webhook-setup",
          "excerpts": [
            "Webhooks allow you to receive real-time notifications when events occur in your Parallel API operations, eliminating the need for constant polling. ... Task API ...Read more"
          ]
        },
        {
          "title": "llms.txt - Parallel Documentation",
          "url": "https://docs.parallel.ai/llms.txt",
          "excerpts": [
            "- [Retrieve Task Run](https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run.md): Retrieves run status by run_id.\nThe run result is available from the `/result` endpoint."
          ]
        },
        {
          "title": "Parallel Web Systems | Web Search & Research APIs Built for AI Agents ",
          "url": "https://parallel.ai/blog/sse-for-tasks",
          "excerpts": [
            "To receive live updates from a task run, establish an SSE connection using the run ID:\n### Establish an SSE connection",
            "SSE streams deliver four categories of real-time updates:\n**** Progress Statistics **** : Live counts of sources scanned, selected, and processed during web research execution.\n**** Message Updates **** : Model reasoning and thought processes as the task progresses through complex multi-hop research.\n**** Status Changes **** : Clear signals when tasks start, complete, or encounter errors.\n**** Error Details **** : Specific error information when issues arise, enabling immediate debugging.",
            "SSE for Task Runs is available now in beta across all Parallel Task API processors. Dive into our [documentation](https://docs.parallel.ai/task-api/task-sse) [[documentation] (https://docs.parallel.ai/task-api/task-sse)](https://docs.parallel.ai/task-api/task-sse) to integrate real-time streaming into your application."
          ]
        }
      ],
      "reasoning": "The chosen excerpts collectively describe the three retrieval methods in a way that maps to the finegrained field value. The most directly relevant piece states that webhooks notify you when a task completes and that you must fetch the final output from a separate endpoint, which aligns with the Webhooks method in the value. The webhook setup excerpt provides concrete details about how webhooks are configured and what the payloads look like, reinforcing the Webhooks portion. An excerpt showing a task run creation example that includes a webhook field demonstrates how to wire a webhook callback into a Parallel task run, which is a practical instantiation of the Webhooks method. An excerpt about streaming task run events (SSE) clarifies how SSE can be used to receive real-time progress and final outputs, directly supporting the SSE portion of the value. An excerpt about stream events and a reference to the SSE-enabled endpoints further corroborate the SSE approach and its use in real-time updates. Taken together, these excerpts cover the mechanism, configuration, and usage patterns for Webhooks, Polling (via explicit status checks and a final result call), and SSE, which matches the finegrained field’s described methods and scenarios. The order prioritizes sources that explicitly mention the retrieval method and practical setup, then includes supporting usage details and real-time streaming behavior.",
      "confidence": "high"
    },
    {
      "field": "trigger_dev_orchestration_logic",
      "citations": [
        {
          "title": "Trigger.dev v4 GA | Trigger.dev",
          "url": "https://trigger.dev/launchweek/0/trigger-v4-ga",
          "excerpts": [
            "Advanced workflow control with waitpoints. V4 introduces \"Waitpoints\" – a powerful primitive that can block runs until conditions are met. A ...Read more"
          ]
        },
        {
          "title": "Wait for token - Trigger.dev",
          "url": "https://trigger.dev/docs/wait-for-token",
          "excerpts": [
            "Waitpoint tokens pause task runs until you complete the token. They’re commonly used for approval workflows and other scenarios where you need to wait for external confirmation, such as human-in-the-loop processes. You can complete a token using the SDK or by making a POST request to the token’s URL.",
            "ST request to the `url` it returns. This is an HTTP callback:\nCopy\nAsk AI\nSection Title: Wait for token > ​\nContent:\n```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; const  token  =  await  wait .createToken ({   timeout :  \"10m\" , }); const  call  =  await  replicate . predictions .create ({   version :  \"27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478\" ,   input :  {     prompt :  \"A painting of a cat by Andy Warhol\" ,   } ,   // pass the provided URL to Replicate's webhook, so they can \"callback\"   webhook :  token .url ,   webhook_events_filter :  [ \"completed\" ] , }); const  prediction  =  await  wait .forToken < Prediction >(token) .unwrap (); // unwrap() throws a timeout error or "
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run\nContent:\nCopy page\nInitiates a task run.\nReturns immediately with a run object in status ‘queued’.\nBeta features can be enabled by setting the ‘parallel-beta’ header.\nCopy page\nPOST\n/\nv1\n/\ntasks\n/",
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value.",
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs)."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "This decorator wraps the Modal Function in a FastAPI application .",
            "This endpoint definition would be called like so:"
          ]
        }
      ],
      "reasoning": "The most directly relevant excerpt describes the Trigger.dev feature Waitpoints, which enable long-running workflows to pause and resume based on external triggers, aligning with the orchestration flow where Trigger.dev pauses for a wait token and resumes after a callback. This establishes the core mechanism that the finegrained field references for pausing, waiting for external confirmation, and continuing the workflow. The next set of excerpts details how wait tokens are created and awaited, including how a token is created with a timeout and later completed or awaited via webhook callbacks, which maps to the webhook-driven resume step in the described flow. Then, the excerpts detailing creating a Parallel task run via its API (including example requests, required headers such as the API key, and how to structure the input and webhook callback) provide the concrete steps for initiating the Parallel.ai work from the orchestration layer. Further, excerpts about creating a task run and the webhook integration (including how webhook payloads are used and what the body contains) map to how the Modal function would forward the webhook URL to Parallel.ai and receive the run_id/status in the callback. Excerpts describing Modal’s deployment invocation and the concept of passing the webhook URL to downstream services (including how Modal can trigger deployed functions and the need for providing an endpoint URL) directly support the part of the flow where Trigger.dev interacts with Modal to kick off the Parallel.ai task and carry through the webhook URL. Finally, excerpts discussing webhooks in the Parallel API and how to retrieve the final result from Parallel.ai (and how the webhook payload eventually contains the TaskRun result) close the loop by showing how the final result is obtained, which is echoed back through the orchestration layer for handling the final output. Collectively, these excerpts support the end-to-end orchestration described in the finegrained field value, including initiating the Parallel task from Trigger.dev via a Modal function, wiring a callback URL through a wait token, and obtaining the final result after the webhook callback.",
      "confidence": "medium"
    },
    {
      "field": "api_endpoint_reference",
      "citations": [
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs",
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "The run result is available from the `/result` endpoint.",
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}",
            "\"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"status\" :  \"running\" ,   \"is_active\" :  true ,   \"processor\" :  \"core\" ,   \"metadata\" : {     \"my_key\" :  \"my_value\"   },   \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,   \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\" }\n"
          ]
        },
        {
          "title": "Retrieve Task Run Result - Parallel",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result",
          "excerpts": [
            "{   \"run\" : {     \"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"status\" :  \"completed\" ,     \"is_active\" :  false ,     \"processor\" :  \"core\" ,     \"metadata\" : {       \"my_key\" :  \"my_value\"     },     \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,     \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\"   },   \"output\" : {     \"basis\" : [],     \"type\" :  \"json\" ,     \"content\" : {       \"gdp\" :  \"$3.1 trillion (2023)\"     }   }"
          ]
        },
        {
          "title": "Overview - Parallel Documentation",
          "url": "https://docs.parallel.ai/getting-started/overview",
          "excerpts": [
            "Parallel provides a suite of APIs that combine AI inference with live web data to power research, enrichment, and automation workflows.Read more"
          ]
        },
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "There are two ways of invoking deployed functions.",
            "If the invoking client is\nrunning Python, then the same [Modal client library](https://pypi.org/project/modal/) used to write Modal code",
            "HTTPS is used if the invoking client is not running Python and\ntherefore cannot import the Modal client library.",
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "For more detail on setting up functions for invocation over HTTP see the web endpoints guide .\n©"
          ]
        },
        {
          "title": "Task Group",
          "url": "https://docs.parallel.ai/task-api/group-api",
          "excerpts": [
            "The API is comprised of the following endpoints: Creation: To run a batch of tasks in a group, you first need to create a task group, after which you can add ...Read more The Parallel Task Group API enables you to batch process hundreds or thousands of Tasks efficiently."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`",
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value.",
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs)."
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'",
            "Webhook Payload Structure\nEach webhook payload contains:\n`timestamp` : ISO 8601 timestamp of when the event occurred\n`type` : Event type\n`data` : Event-specific payload. For the ‘task_run.status’ event, it is the complete [Task Run object](https://docs.parallel.ai/api-reference/task-api-v1/retrieve-task-run)\n"
          ]
        }
      ],
      "reasoning": "The finegrained field value lists a sequence of Parallel.ai endpoint references with specific HTTP methods and purposes: creating a task run via POST to /v1/tasks/runs, retrieving run status via GET on /v1/tasks/runs/{run_id}, fetching the final result via GET on /v1/tasks/runs/{run_id}/result, and streaming progress via GET on /v1beta/tasks/runs/{run_id}/events. The most direct excerpt confirms a POST to /v1/tasks/runs and explains that the body contains input, processor, and optional configurations like webhooks. This is the core action to initiate a Parallel Deep Research task. Supporting details appear in a subsequent excerpt that provides an example curl command calling the create-task-run endpoint and shows the input and processor fields, reinforcing the exact structure of the request body. Additional excerpts describe retrieving the task run status, with the status and example payloads illustrating how to poll for completion, and then retrieving the result once completed. The retrieved task-run response excerpts demonstrate a typical payload structure including run_id, status, and output, which aligns with the fields described in the finegrained value. There are excerpts describing Event streaming for real-time progress, which matches the events endpoint and the enable_events flag described in task creation. In addition, there are excerpts illustrating a Modal-based proxy for creating a Parallel task (a custom endpoint hosted on Modal that acts as a proxy), which maps to the provided Modal endpoint in the value. Finally, there are excerpts that show the Trigger.dev waitpoint URL usage (token.url) as the callback target for resuming a paused Trigger.dev workflow, aligning with the dynamic URL pattern in the field value. Taken together, these excerpts directly support the existence and usage of the endpoints, their HTTP methods, and the purpose of each endpoint as described in the finegrained field value, and they also cover the integration patterns via Modal and Trigger.dev that the value enumerates.",
      "confidence": "high"
    },
    {
      "field": "modal_setup_and_configuration",
      "citations": [
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "There are two ways of invoking deployed functions.",
            "If the invoking client is\nrunning Python, then the same [Modal client library](https://pypi.org/project/modal/) used to write Modal code",
            "HTTPS is used if the invoking client is not running Python and\ntherefore cannot import the Modal client library.",
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "For more detail on setting up functions for invocation over HTTP see the web endpoints guide .\n©"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "The easiest way to create a web endpoint from an existing Python function is to use the `@modal.fastapi_endpoint` decorator .",
            "This decorator wraps the Modal Function in a FastAPI application .",
            "Note that web endpoints, like everything else on Modal, only run when they need\nto. When you hit the web endpoint the first time, it will boot up the container,\nwhich might take a few seconds. Modal keeps the container alive for a short\nperiod in case there are subsequent requests. If there are a lot of requests,\nModal might create more containers running in parallel.",
            "You can also deploy your app and create a persistent web endpoint in the cloud\nby running `modal deploy` :",
            "When using `@modal.fastapi_endpoint` , you can add [query parameters](https://fastapi.tiangolo.com/tutorial/query-params/) which\nwill be passed to your Function as arguments.",
            "This endpoint definition would be called like so:",
            "For ASGI apps, you can create a function decorated with `@modal.asgi_app` that returns a reference to\nyour web app:"
          ]
        }
      ],
      "reasoning": "The most directly relevant content centers on how to work with Modal for deploying and invoking functions. It discusses that Modal can be used to invoke deployed functions, and notes the existence of a Modal App object as a container for functions, images, and configurations. This aligns with the field value’s emphasis on defining a Modal App and its container/image configuration. Additionally, mentions of using Python to invoke Modal-deployed functions and the use of a client library in Python corroborate the portion of the field value that involves a Python-based Modal workflow and endpoints. Although the excerpts do not explicitly list the exact package names or the precise image construction method, they confirm the core Modal lifecycle components described in the field value: a Modal App serves as the execution container, functions are deployed and invoked, and HTTP/HTTPS invocation is a mechanism for triggering the deployed code. The inclusion of webhook and web API related Modal content expands on the integration surface, which is compatible with a Modal-based solution that interacts with an external API like Parallel.ai. The absence of explicit mentions of the exact dependencies (fastapi[standard], httpx) or the specific image line (debian_slim with pip_install) means there is partial support, and no direct contradicting information is present. Taken together, the strongest, directly aligned support comes from the excerpts describing Modal App, deployed functions, and Python invocation patterns, while the most specific setup details (dependencies and image definition) are only indirectly supported by the broader Modal deployment content.",
      "confidence": "medium"
    },
    {
      "field": "solution_architecture_overview",
      "citations": [
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "Parallel sends a POST request to your URL when the task finishes. Key points: Webhooks notify you when the task completes—they don't send the actual results. ...Read more",
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs",
            "h-quickstart)\ncURL Python TypeScript\nCopy\nAsk AI\n```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "There are two ways of invoking deployed functions.",
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "Modal lets you take a function created by a deployment and call it from other contexts."
          ]
        },
        {
          "title": "Retrieve Task Run Result - Parallel",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result",
          "excerpts": [
            ""
          ]
        },
        {
          "title": "Wait: Overview - Trigger.dev",
          "url": "https://trigger.dev/docs/wait",
          "excerpts": [
            ""
          ]
        },
        {
          "title": "Webhook Setup - Parallel",
          "url": "https://docs.parallel.ai/resources/webhook-setup",
          "excerpts": [
            "Your webhook endpoint will receive requests with these headers:\n`webhook-id` : Unique identifier for each webhook event\n`webhook-timestamp` : Unix timestamp in seconds\n`webhook-signature` : One or more versioned signatures (e.g., `v1,<base64 signature>` )"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value."
          ]
        }
      ],
      "reasoning": "The field value describes a three-service orchestration pattern: Trigger.dev initiates and pauses a workflow, a serverless function platform (Modal) handles the integration and calls into Parallel.ai, and Parallel.ai performs a deep research task with a webhook-based callback to resume and retrieve results. Directly supporting this pattern are excerpts that (a) explain that Trigger.dev provides long-running workflows with webhooks and tokens to pause/wait for external events, (b) show how to initiate a Parallel.ai task run via its API, including the /v1/tasks/runs endpoint and the use of a webhook to deliver results, (c) illustrate how a separate function host (Modal) can receive input, call Parallel.ai, and expose an endpoint or webhook, and (d) give concrete webhook payloads and headers that would be used to signal completion and resume the Trigger.dev workflow. For example, one excerpt clarifies that webhooks notify when a Parallel.ai task completes and do not send the actual results, which is foundational to resuming the Trigger.dev waitpoint with the final data. Another excerpt provides the exact endpoint used to create a task run on Parallel.ai and mentions including a webhook URL for completion callbacks, which aligns with the Modal-mediated step that triggers Parallel.ai and passes a webhook that Target Trigger.dev can await. A separate excerpt discusses the Trigger.dev waitpoints and their behavior to pause runs until an external confirmation or webhook completes, which matches the Pause and Wait step in the field value. Additional excerpts outline how to invoke deployed functions or endpoints (Modal) to perform the integration logic and how the webhook flow is structured, providing concrete structure for the callback handling and result retrieval. Taken together, these excerpts collectively support the described architecture by detailing the orchestration points (Trigger.dev waitpoint/webhook, Modal as integration hub, and Parallel.ai task runs with webhook callbacks) and illustrate the flow, endpoints, and payloads involved in wiring the three services as described.",
      "confidence": "medium"
    },
    {
      "field": "end_to_end_implementation_guide",
      "citations": [
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "Parallel sends a POST request to your URL when the task finishes. Key points: Webhooks notify you when the task completes—they don't send the actual results. ...Read more",
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "h-quickstart)\ncURL Python TypeScript\nCopy\nAsk AI\n```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n```\n[View ",
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "What is AI deep research",
          "url": "https://parallel.ai/articles/what-is-deep-research",
          "excerpts": [
            "Parallel Deep Research API**. Parallel takes a fundamentally different approach by building web research infrastructure specifically for AI ...Read more"
          ]
        }
      ],
      "reasoning": "The field value describes an end-to-end integration workflow: calling Parallel.ai Deep Research via its Task API from Trigger.dev, mediated by Modal, including authentication, endpoints, webhook integration, and code structure. The most directly relevant excerpts provide concrete API usage for creating a task run and retrieving results, including the exact endpoints and payload structures. They also show how webhooks are used to trigger completion callbacks, which is central to an end-to-end flow that relies on asynchronous task processing. Additional excerpts demonstrate how to invoke and deploy documentation snippets (curl examples, endpoint URLs, and required headers) that map cleanly to a Modal-based intermediary function and a Trigger.dev task. Finally, one excerpt provides a conceptual overview of Parallel Deep Research, which supports understanding the overall architecture and purpose of the API in this integration context. Together, these excerpts corroborate the steps and components described in the field value: API endpoints for task creation and result retrieval, webhook-based completion notifications, Key authentication headers, and the orchestration pattern across Modal and Trigger.dev.",
      "confidence": "medium"
    },
    {
      "field": "error_handling_and_best_practices",
      "citations": [
        {
          "title": "Task Runs Lifecycle - Parallel",
          "url": "https://docs.parallel.ai/task-api/guides/execute-task-run",
          "excerpts": [
            "A Task Run Result can be accessed once the Task Run status becomes completed . ​. Rate Limits. The Task API enforces a limit of 2,000 requests per minute per ...Read more"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "The run result is available from the `/result` endpoint.",
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}",
            "\"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"status\" :  \"running\" ,   \"is_active\" :  true ,   \"processor\" :  \"core\" ,   \"metadata\" : {     \"my_key\" :  \"my_value\"   },   \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,   \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\" }\n"
          ]
        },
        {
          "title": "Webhook Setup - Parallel",
          "url": "https://docs.parallel.ai/resources/webhook-setup",
          "excerpts": [
            "Your webhook endpoint will receive requests with these headers:\n`webhook-id` : Unique identifier for each webhook event\n`webhook-timestamp` : Unix timestamp in seconds\n`webhook-signature` : One or more versioned signatures (e.g., `v1,<base64 signature>` )",
            "HMAC Signature Verification",
            "<webhook-id>.<webhook-timestamp>.<payload>",
            "Where:\n`<webhook-id>` : The value of the `webhook-id` header\n`<webhook-timestamp>` : The value of the `webhook-timestamp` header\n`<payload>` : The exact JSON body of the webhook request"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "Parallel sends a POST request to your URL when the task finishes. Key points: Webhooks notify you when the task completes—they don't send the actual results. ...Read more"
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        }
      ],
      "reasoning": "To support the stated best practices, the most compelling evidence comes from sources that explicitly describe monitoring a task run’s status before proceeding to fetch results, along with where the result is obtained and how to handle long-running tasks. The existence of a Task Run lifecycle that notes a run must be completed to access results directly supports the core practice of checking for completion prior to /result calls and aligns with error handling when status is not completed or has failed. Webhook-oriented sources provide concrete structure and verification details, including headers and signatures, which are critical for secure webhook handling and preventing duplicate processing. Additionally, documentation showing that a result is retrieved from a separate endpoint after completion reinforces the need to gate /result access behind a completed status check. Finally, webhook payload structure, including the status field and idempotency considerations, underpins robust design against duplicate deliveries and ensures correct event-driven orchestration. Directly quoting these points: the need to inspect the payload for status before attempting to fetch results; the guidance that the run result is available at the /result endpoint only after completion; the explicit webhook headers and signature verification details; and the fact that webhook systems can deliver duplicate events, which motivates idempotent design. Collectively, these excerpts substantiate the finegrained field value that emphasizes error handling, safe sequencing of API calls, and secure, reliable webhook processing.\n",
      "confidence": "high"
    },
    {
      "field": "parallel_ai_webhook_integration",
      "citations": [
        {
          "title": "Wait for HTTP callback | Trigger.dev",
          "url": "https://trigger.dev/changelog/wait-for-http-callback",
          "excerpts": [
            "Waitpoint token we give you a URL back that can be passed to a 3rd party. When they're done with the work they can make a POST request to that URL and we'll continue the run with the result.",
            "\n`  import { task, wait } from \"@trigger.dev/sdk\"; const replicate = new Replicate({ auth: process.env.REPLICATE_API_KEY, }); export const generateImage = task({ id: \"generate-image\", run: async () => { // You can create this token from your backend or inside a task const token = await wait.createToken({ timeout: \"10m\", }); await replicate.predictions.create({ version: \"27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478\", input: { prompt: \"A painting of a cat by Andy Warhol\", }, // pass the token url to Replicate's webhook, so they can \"callback\" // 👇 webhook: token.url, webhook_events_filter: [\"completed\"], }); const result = await wait.forToken<Prediction>(token).unwrap(); // unwrap() throws a timeout error or returns the result 👆 return result; }, }); ",
            "When Replicate has finished processing the image it will make an HTTP POST request to the URL we gave it. That will complete the Waitpoint and the JSON body is set as the output of the Waitpoint. The run is continued with the output of the Waitpoint.",
            "On the Cloud product we pause the run when you call `wait.forToken()` (so you stop being charged) and then continue the run when the HTTP callback comes in."
          ]
        },
        {
          "title": "Wait for token - Trigger.dev",
          "url": "https://trigger.dev/docs/wait-for-token",
          "excerpts": [
            "Waitpoint tokens pause task runs until you complete the token. They’re commonly used for approval workflows and other scenarios where you need to wait for external confirmation, such as human-in-the-loop processes. You can complete a token using the SDK or by making a POST request to the token’s URL."
          ]
        },
        {
          "title": "Webhook Setup - Parallel",
          "url": "https://docs.parallel.ai/resources/webhook-setup",
          "excerpts": [
            "Webhooks allow you to receive real-time notifications when events occur in your Parallel API operations, eliminating the need for constant polling. ... Task API ...Read more",
            "{   \"Content-Type\" :  \"application/json\" ,   \"webhook-id\" :  \"whevent_abc123def456\" ,   \"webhook-timestamp\" :  \"1751498975\" ,   \"webhook-signature\" :  \"v1,K5oZfzN95Z9UVu1EsfQmfVNQhnkZ2pj9o9NDN/H/pI4=\" }"
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}"
          ]
        }
      ],
      "reasoning": "The most directly relevant information describes using a webhook callback mechanism in the Parallel Task Run API, including the fact that a webhook object with a callback URL and event_types is required for the webhook integration. This directly supports the field value’s suggestion to use a Trigger.dev Waitpoint token URL as the webhook callback URL and to specify the event type such as task_run.status. The cited guidance also notes that this webhook feature is beta and requires a parallel-beta header, which aligns with the security considerations and beta flag described in the documentation excerpts. The webhook payload structure, including timestamp, event type, and a data object containing the task run details (run_id, status, etc.), supports understanding what the Trigger.dev callback will deliver to the endpoint. After receiving the webhook, the instruction to fetch the actual task run result via the run_id and the result endpoint confirms the end-to-end workflow: trigger a run with a webhook, receive a notification, then perform a blocking retrieval of the final data. Additionally, excerpts describing how to initiate a task run with a webhook field and the exact formatting of the webhook-related request/response details provide concrete evidence for how to implement this integration. Finally, related Trigger.dev waitpoint and HTTP callback excerpts illustrate how a URL provided by a wait token can be used as a callback URL, reinforcing the proposed integration pattern.",
      "confidence": "medium"
    },
    {
      "field": "trigger_dev_webhook_handling_with_waitpoints",
      "citations": [
        {
          "title": "Wait for token - Trigger.dev",
          "url": "https://trigger.dev/docs/wait-for-token",
          "excerpts": [
            "Waitpoint tokens pause task runs until you complete the token. They’re commonly used for approval workflows and other scenarios where you need to wait for external confirmation, such as human-in-the-loop processes. You can complete a token using the SDK or by making a POST request to the token’s URL.",
            "```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; // This can be called anywhere in your codebase, either in a task or in your backend code const  token  =  await  wait .createToken ({   timeout :  \"10m\" ,  // you can optionally specify a timeout for the token });\n```",
            "Once you have a token, you can wait for it to be completed using the `wait.forToken` function:",
            "```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; type  ApprovalToken  =  {   status :  \"approved\"  |  \"rejected\" ; }; // This must be called inside a task run function const  result  =  await  wait .forToken < ApprovalToken >(tokenId); if  ( result .ok) {   console .log ( \"Token completed\" ,  result . output .status);  // \"approved\" or \"rejected\" }  else  {   console .log ( \"Token timed out\" ,  result .error); }\n```\n",
            "ST request to the `url` it returns. This is an HTTP callback:\nCopy\nAsk AI\nSection Title: Wait for token > ​\nContent:\n```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; const  token  =  await  wait .createToken ({   timeout :  \"10m\" , }); const  call  =  await  replicate . predictions .create ({   version :  \"27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478\" ,   input :  {     prompt :  \"A painting of a cat by Andy Warhol\" ,   } ,   // pass the provided URL to Replicate's webhook, so they can \"callback\"   webhook :  token .url ,   webhook_events_filter :  [ \"completed\" ] , }); const  prediction  =  await  wait .forToken < Prediction >(token) .unwrap (); // unwrap() throws a timeout error or "
          ]
        },
        {
          "title": "Wait for HTTP callback | Trigger.dev",
          "url": "https://trigger.dev/changelog/wait-for-http-callback",
          "excerpts": [
            "Waitpoint token we give you a URL back that can be passed to a 3rd party. When they're done with the work they can make a POST request to that URL and we'll continue the run with the result.",
            "\n`  import { task, wait } from \"@trigger.dev/sdk\"; const replicate = new Replicate({ auth: process.env.REPLICATE_API_KEY, }); export const generateImage = task({ id: \"generate-image\", run: async () => { // You can create this token from your backend or inside a task const token = await wait.createToken({ timeout: \"10m\", }); await replicate.predictions.create({ version: \"27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478\", input: { prompt: \"A painting of a cat by Andy Warhol\", }, // pass the token url to Replicate's webhook, so they can \"callback\" // 👇 webhook: token.url, webhook_events_filter: [\"completed\"], }); const result = await wait.forToken<Prediction>(token).unwrap(); // unwrap() throws a timeout error or returns the result 👆 return result; }, }); ",
            "It's easier to understand with an example. Here we're going to get [Replicate](https://replicate.com) to generate an image for us in the background.",
            "When Replicate has finished processing the image it will make an HTTP POST request to the URL we gave it. That will complete the Waitpoint and the JSON body is set as the output of the Waitpoint. The run is continued with the output of the Waitpoint.",
            "On the Cloud product we pause the run when you call `wait.forToken()` (so you stop being charged) and then continue the run when the HTTP callback comes in."
          ]
        },
        {
          "title": "Waitpoints | Trigger.dev",
          "url": "https://trigger.dev/changelog/waitpoints",
          "excerpts": [
            "Waitpoint tokens allow you to create long-running workflows that can pause and resume based on external triggers. This is perfect for:.Read more"
          ]
        },
        {
          "title": "Wait for - Trigger.dev",
          "url": "https://trigger.dev/docs/wait-for",
          "excerpts": [
            "In the Trigger.dev Cloud we automatically pause execution of tasks when they are waiting for longer than a few seconds. When triggering and waiting for subtasks ...Read more In the Trigger. dev Cloud we automatically pause execution of tasks when they are waiting for longer than a few seconds.Read more"
          ]
        },
        {
          "title": "Retrieve Task Run Result - Parallel",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result",
          "excerpts": [
            ""
          ]
        },
        {
          "title": "Wait: Overview - Trigger.dev",
          "url": "https://trigger.dev/docs/wait",
          "excerpts": [
            ""
          ]
        },
        {
          "title": "Trigger.dev v4 GA | Trigger.dev",
          "url": "https://trigger.dev/launchweek/0/trigger-v4-ga",
          "excerpts": [
            "Advanced workflow control with waitpoints. V4 introduces \"Waitpoints\" – a powerful primitive that can block runs until conditions are met. A ...Read more"
          ]
        }
      ],
      "reasoning": "The field value describes a coherent workflow: a token is created to generate a unique callback URL; an external service uses that URL to complete work; the external callback payload becomes the output of the wait operation, and the run resumes once the callback is received. The most relevant passages explicitly define and illustrate this flow: a general statement that waitpoint tokens pause task runs and can be completed by an external service, with a URL provided to the third party; the existence of a wait.createToken function that returns a token and a URL to be given to the external service; the use of wait.forToken to suspend execution until the external webhook posts back, and the fact that the webhook payload becomes the return value of that wait; and examples showing how the external service calls back and the run continues. These excerpts also discuss the concept of resuming the run after the HTTP POST to the unique URL and how the webhook payload is used as the result, which directly supports the described field value. Additional excerpts provide concrete code snippets illustrating token creation, waiting on the token, and the subsequent webhook-driven continuation, thereby reinforcing the specificity of the described workflow. Supporting context about webhook URLs, the callback mechanism, and the fact that the URL is intended for third-party use further corroborates the described integration pattern. The earlier and peripheral Trigger.dev Waitpoint overview entries help situate the feature but are less specific to the exact webhook-driven flow, so they are considered supplementary context rather than core support for the finegrained field value.",
      "confidence": "high"
    },
    {
      "field": "trigger_dev_job_definition",
      "citations": [
        {
          "title": "Welcome to the Trigger.dev docs - Trigger.dev",
          "url": "https://trigger.dev/docs/introduction",
          "excerpts": [
            "Trigger.dev is an open source background jobs framework that lets you write reliable workflows in plain async code.Read more"
          ]
        },
        {
          "title": "Retrieve Task Run Result - Parallel",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result",
          "excerpts": [
            ""
          ]
        },
        {
          "title": "Wait: Overview - Trigger.dev",
          "url": "https://trigger.dev/docs/wait",
          "excerpts": [
            ""
          ]
        },
        {
          "title": "Waitpoints | Trigger.dev",
          "url": "https://trigger.dev/changelog/waitpoints",
          "excerpts": [
            "Waitpoint tokens allow you to create long-running workflows that can pause and resume based on external triggers. This is perfect for:.Read more"
          ]
        },
        {
          "title": "Wait for - Trigger.dev",
          "url": "https://trigger.dev/docs/wait-for",
          "excerpts": [
            "In the Trigger.dev Cloud we automatically pause execution of tasks when they are waiting for longer than a few seconds. When triggering and waiting for subtasks ...Read more In the Trigger. dev Cloud we automatically pause execution of tasks when they are waiting for longer than a few seconds.Read more"
          ]
        },
        {
          "title": "Trigger.dev v4 GA | Trigger.dev",
          "url": "https://trigger.dev/launchweek/0/trigger-v4-ga",
          "excerpts": [
            "Advanced workflow control with waitpoints. V4 introduces \"Waitpoints\" – a powerful primitive that can block runs until conditions are met. A ...Read more"
          ]
        },
        {
          "title": "Wait for token - Trigger.dev",
          "url": "https://trigger.dev/docs/wait-for-token",
          "excerpts": [
            "Waitpoint tokens pause task runs until you complete the token. They’re commonly used for approval workflows and other scenarios where you need to wait for external confirmation, such as human-in-the-loop processes. You can complete a token using the SDK or by making a POST request to the token’s URL.",
            "To get started using wait tokens, you need to first create a token using the `wait.createToken` function:",
            "```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; // This can be called anywhere in your codebase, either in a task or in your backend code const  token  =  await  wait .createToken ({   timeout :  \"10m\" ,  // you can optionally specify a timeout for the token });\n```",
            "Once you have a token, you can wait for it to be completed using the `wait.forToken` function:",
            "```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; type  ApprovalToken  =  {   status :  \"approved\"  |  \"rejected\" ; }; // This must be called inside a task run function const  result  =  await  wait .forToken < ApprovalToken >(tokenId); if  ( result .ok) {   console .log ( \"Token completed\" ,  result . output .status);  // \"approved\" or \"rejected\" }  else  {   console .log ( \"Token timed out\" ,  result .error); }\n```\n",
            "plete a token, you can use the `wait.completeToken` function:\nCopy\nAsk AI\n```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; // This can be called anywhere in your codebase, or from an external service, // passing in the token ID and the output of the token await  wait .completeToken < ApprovalToken >(tokenId ,  {   status :  \"approved\" , })",
            "ST request to the `url` it returns. This is an HTTP callback:\nCopy\nAsk AI\nSection Title: Wait for token > ​\nContent:\n```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; const  token  =  await  wait .createToken ({   timeout :  \"10m\" , }); const  call  =  await  replicate . predictions .create ({   version :  \"27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478\" ,   input :  {     prompt :  \"A painting of a cat by Andy Warhol\" ,   } ,   // pass the provided URL to Replicate's webhook, so they can \"callback\"   webhook :  token .url ,   webhook_events_filter :  [ \"completed\" ] , }); const  prediction  =  await  wait .forToken < Prediction >(token) .unwrap (); // unwrap() throws a timeout error or "
          ]
        }
      ],
      "reasoning": "The field value defines a Trigger.dev background job by importing the task function from the Trigger.dev SDK and exporting a constant assigned to the result of calling task(), with a run function that receives io and params. This aligns with the general description that Trigger.dev is a framework for writing reliable workflows in plain async code, where a job is defined and exported as a task with a run implementation. Excerpts that describe Trigger.dev as a framework for building reliable, asynchronous workflows directly support the idea of a task-based job definition. Additionally, references to waitpoints and tokens illustrate how workflows pause and resume, which is a common pattern in long-running or externally-driven Trigger.dev tasks. The material about wait tokens and webhook-like callbacks demonstrates practical mechanisms for pausing execution and continuing later, which contextualizes the run function’s behavior and how parameters are passed to a job. The combination of these sources supports the concept that a Trigger.dev job is defined via a task() invocation with a run(io, params) function, placed in a conventional file structure, consistent with the field value’s description of a standard job definition pattern and typical file paths. The excerpts collectively reinforce the components: (a) the task-based API surface, (b) the run function accepting payloads/params, (c) long-running or externally-triggered workflows via waitpoints or tokens, and (d) typical documentation coverage around where such job definitions live within a project.",
      "confidence": "medium"
    },
    {
      "field": "parallel_ai_authentication.method",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "h-quickstart)\ncURL Python TypeScript\nCopy\nAsk AI\n```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`",
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value."
          ]
        }
      ],
      "reasoning": "The most relevant information directly supporting the field value is where the API key is explicitly shown in the request headers as x-api-key (for example, using an environment variable for the API key). These excerpts demonstrate that authentication to the Parallel.ai API is performed by including an API key in the HTTP header for requests to the API endpoint. The other excerpts discuss headers in a broader sense, including required fields in the request body and mentions of headers for webhook configuration, which are related to API usage but do not establish the authentication mechanism as clearly as the explicit x-api-key examples. Together, these excerpts support the conclusion that the authentication method is API key-based, supplied via a specific HTTP header in every request to the API endpoints. The explicit header usage in the first set of excerpts provides clear, direct evidence, while the later ones offer contextual confirmation by showing header-related details in the same API workflow.\n",
      "confidence": "high"
    },
    {
      "field": "parallel_ai_authentication.header_name",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "h-quickstart)\ncURL Python TypeScript\nCopy\nAsk AI\n```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        }
      ],
      "reasoning": "The field value identifies the required authentication header as x-api-key. The most directly relevant pieces of text demonstrate this header being sent in API requests to the Parallel AI endpoint, for example using -H \"x-api-key: $PARALLEL_API_KEY\" in the curl commands. This exact header name and usage exemplify the authentication mechanism described by the field value. The other similar excerpts that replicate the same header usage further corroborate that x-api-key is the proper header name to utilize for authentication when making requests. While an excerpt that discusses headers in a general API reference exists, it does not conflict with or contradict the identified header name, and the explicit examples of x-api-key in actual requests provide the strongest support. Therefore, the most relevant content centers on the explicit presence of the x-api-key header in the request construction, with additional corroboration from repeated usage in the surfaced snippets.",
      "confidence": "high"
    },
    {
      "field": "parallel_ai_task_creation.request_body_parameters",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`",
            "Section Title: Create Task Run\nContent:\nCopy page\nInitiates a task run.\nReturns immediately with a run object in status ‘queued’.\nBeta features can be enabled by setting the ‘parallel-beta’ header.\nCopy page\nPOST\n/\nv1\n/\ntasks\n/",
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value.",
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs).",
            "​\ntask_spec\nTaskSpec · object\nTask specification. If unspecified, defaults to auto output schema."
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        }
      ],
      "reasoning": "The field value centers on the structure and content of the JSON body used to create a task run. Excerpt describes the body fields, showing that input is required and contains the natural language query, and that processor selects the model (e.g., extending with variants like ultra or ultra-fast). It also notes that there are optional fields such as task_spec to set the output schema, and enable_events to enable progress streaming, as well as a webhook object for completion notifications. Additional excerpts provide concrete examples of the curl payload with input and processor, reinforcing the exact shape and keys of the body. Together, these excerpts directly support the claim that the request body includes input, processor, and optional fields like task_spec, enable_events, and webhook, and illustrate how they are formed in practice. The most directly supporting excerpt shows the precise mapping of the request body keys (input, processor) and the context of creating a task run; subsequent excerpts expand on the optional webhook and events features and on task_spec usage. This combination confirms the described fields and their intended usage within the create-task-run request body.",
      "confidence": "high"
    },
    {
      "field": "parallel_ai_task_creation.http_method",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "h-quickstart)\ncURL Python TypeScript\nCopy\nAsk AI\n```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run\nContent:\nCopy page\nInitiates a task run.\nReturns immediately with a run object in status ‘queued’.\nBeta features can be enabled by setting the ‘parallel-beta’ header.\nCopy page\nPOST\n/\nv1\n/\ntasks\n/"
          ]
        }
      ],
      "reasoning": "The field value asserts that a new Deep Research task is created by sending a POST request to the Parallel.ai API. Excerpts that explicitly show a POST request used to initiate a task run directly support this claim, including the endpoint path and the payload structure. The most relevant content demonstrates sending a POST to the task runs endpoint with an input field and a processor value, which aligns with the notion of creating a new task (a Deep Research task) via an HTTP POST to the API. Related excerpts that describe the Create Task Run operation and the required body fields (such as input and processor) further corroborate that a POST request is the mechanism to create a new task run, reinforcing the connection between the HTTP method and task creation. Additional excerpts that present the same pattern (POST with similar payload) reinforce the consistency of this creation flow across the documentation. Overall, the most direct and explicit links show the POST pattern to /v1/tasks/runs to initiate a new run, which maps to creating a new Deep Research task in this context.",
      "confidence": "high"
    },
    {
      "field": "modal_deployment.persistent_url",
      "citations": [
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "For more detail on setting up functions for invocation over HTTP see the web endpoints guide .\n©",
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "There are two ways of invoking deployed functions.",
            "HTTPS is used if the invoking client is not running Python and\ntherefore cannot import the Modal client library.",
            "If the invoking client is\nrunning Python, then the same [Modal client library](https://pypi.org/project/modal/) used to write Modal code"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "This endpoint definition would be called like so:",
            "For ASGI apps, you can create a function decorated with `@modal.asgi_app` that returns a reference to\nyour web app:"
          ]
        }
      ],
      "reasoning": "The fine-grained field value asserts that a stable, public HTTPS URL is generated for each function decorated as a web endpoint and that this URL remains stable across deployments, enabling reliable integration with Trigger.dev. The most directly supportive statement describes a stable HTTPS URL that is persistent across deployments for such web endpoints, which aligns exactly with the field value. Additional support comes from references explaining how deployed functions can be invoked over HTTP and from notes about invoking deployed functions in various contexts, which helps establish how the URL would be used in practice. References that mention invoking deployed functions in general or through webhooks provide contextual support for the overall deployment-invocation workflow, while notes about HTTPS usage and client libraries reinforce the mechanism by which the persistent URL would be accessed. There is no explicit contradicting information in the excerpts about URL persistence. Taken together, these excerpts substantiate the concept of a persistent, public HTTPS URL for deployed modal web endpoints and its role in integrations like Trigger.dev.",
      "confidence": "medium"
    },
    {
      "field": "parallel_ai_task_creation.endpoint",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "h-quickstart)\ncURL Python TypeScript\nCopy\nAsk AI\n```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run\nContent:\nCopy page\nInitiates a task run.\nReturns immediately with a run object in status ‘queued’.\nBeta features can be enabled by setting the ‘parallel-beta’ header.\nCopy page\nPOST\n/\nv1\n/\ntasks\n/"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        }
      ],
      "reasoning": "The finegrained field value identifies the specific API endpoint used to initiate a new task run. Several excerpts demonstrate exactly this endpoint being used for task creation via a POST request to the Parallel API. In the most direct form, the excerpt shows a curl command posting to the URL https://api.parallel.ai/v1/tasks/runs, which is the exact endpoint for starting a task run. Additional excerpts repeat or mirror this same endpoint in their examples of creating a task run, reinforcing that this URL is the designated initiation point for new task runs. The surrounding text also notes that this action initiates a task run and that a run object is returned (indicating the endpoint’s purpose). Although other excerpts discuss related features (such as the resulting run status or webhook options), the core evidence for the specific field value is the explicit use of the endpoint URL in the task-creation context. Therefore, these excerpts collectively corroborate that the endpoint is the correct initiation point for creating a new task run. ",
      "confidence": "high"
    },
    {
      "field": "parallel_ai_api_introduction.asynchronous_nature",
      "citations": [
        {
          "title": "llms.txt - Parallel Documentation",
          "url": "https://docs.parallel.ai/llms.txt",
          "excerpts": [
            "- [Create Task Run](https://docs.parallel.ai/api-reference/tasks-v1/create-task-run.md): Initiates a task run. Returns immediately with a run object in status 'queued'.",
            "- [Retrieve Task Run Result](https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result.md): Retrieves a run result by run_id, blocking until the run is completed.",
            "- [Stream Task Run Events](https://docs.parallel.ai/api-reference/tasks-v1/stream-task-run-events.md): Streams events for a task run. Returns a stream of events showing progress updates and state changes for the task\nrun.",
            "- [Retrieve Task Run](https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run.md): Retrieves run status by run_id.\nThe run result is available from the `/result` endpoint."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run\nContent:\nCopy page\nInitiates a task run.\nReturns immediately with a run object in status ‘queued’.\nBeta features can be enabled by setting the ‘parallel-beta’ header.\nCopy page\nPOST\n/\nv1\n/\ntasks\n/",
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value.",
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs).",
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`",
            "​\ntask_spec\nTaskSpec · object\nTask specification. If unspecified, defaults to auto output schema."
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        },
        {
          "title": "Overview - Parallel Documentation",
          "url": "https://docs.parallel.ai/getting-started/overview",
          "excerpts": [
            "Parallel provides a suite of APIs that combine AI inference with live web data to power research, enrichment, and automation workflows.Read more"
          ]
        },
        {
          "title": "What is AI deep research",
          "url": "https://parallel.ai/articles/what-is-deep-research",
          "excerpts": [
            "Parallel Deep Research API**. Parallel takes a fundamentally different approach by building web research infrastructure specifically for AI ...Read more"
          ]
        }
      ],
      "reasoning": "The most directly relevant excerpts explicitly describe the core asynchronous behavior: new task runs are created and a run object is returned with a status of queued, illustrating the immediate asynchronous response from the API. This aligns with the claim that the API is fundamentally asynchronous and does not immediately produce results. The excerpts that discuss retrieving results by run_id (and that the status can be polled, results retrieved later, or streamed via events) provide concrete mechanisms for how to obtain outcomes after initiation. Webhook support and event streaming are particularly relevant for implementing asynchronous result delivery in a workflow, which matches the user’s goal of building a modal function that coordinates with the API and trigger.dev. Additional excerpts that describe how to initiate a task run, the presence of optional headers or fields, and the ability to receive progress events further corroborate the asynchronous model and provide actionable details for integration. Taken together, these excerpts directly support the field value by confirming (a) the run is created with an immediate queued state, (b) the task is long-running, and (c) results are retrieved later via polling, webhooks, or streaming events. The more general documentation about creating task runs and the existence of endpoints to retrieve status and stream events offer supportive context for implementing the asynchronous workflow in a real system.",
      "confidence": "high"
    },
    {
      "field": "modal_function_implementation.endpoint_decorator",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "This decorator wraps the Modal Function in a FastAPI application .",
            "When using `@modal.fastapi_endpoint` , you can add [query parameters](https://fastapi.tiangolo.com/tutorial/query-params/) which\nwill be passed to your Function as arguments.",
            "This endpoint definition would be called like so:",
            "The easiest way to create a web endpoint from an existing Python function is to use the `@modal.fastapi_endpoint` decorator .",
            "Note that web endpoints, like everything else on Modal, only run when they need\nto. When you hit the web endpoint the first time, it will boot up the container,\nwhich might take a few seconds. Modal keeps the container alive for a short\nperiod in case there are subsequent requests. If there are a lot of requests,\nModal might create more containers running in parallel.",
            "You can also deploy your app and create a persistent web endpoint in the cloud\nby running `modal deploy` :",
            "For ASGI apps, you can create a function decorated with `@modal.asgi_app` that returns a reference to\nyour web app:"
          ]
        },
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "For more detail on setting up functions for invocation over HTTP see the web endpoints guide .\n©",
            "There are two ways of invoking deployed functions."
          ]
        }
      ],
      "reasoning": "The finegrained field value asserts that a Python function is exposed as an HTTP endpoint via the @modal.fastapi_endpoint decorator, which integrates Modal with FastAPI, and that such endpoints are publicly accessible and can respond to HTTP POST requests so external services can invoke them. The most directly supportive excerpt states: the easiest way to create a web endpoint from an existing Python function is to use the @modal.fastapi_endpoint decorator, which directly confirms the mechanism described in the field value. It further notes that the decorator can be configured (for example, method='POST') and that functions decorated in this way become accessible via a public URL that handles HTTP POST requests, aligning exactly with the stated use-case of enabling external callers like Trigger.dev. Additional excerpts elaborate on related aspects: that there are deployments with stable HTTPS URLs for web endpoints, and that you can pass query parameters to the function via FastAPI, which reinforces how such an endpoint can be invoked with external systems. Other excerpts describe how invoking deployed functions and web endpoints works in Modal (e.g., calling deployed functions from other contexts, and the existence of web endpoints and deployment workflows), which corroborates the overall endpoint invocation model and supports understanding of how Trigger.dev would reach the endpoint. Overall, the strongest and most precise support comes from the direct description of the decorator facilitating a public HTTP endpoint and the ability to specify HTTP methods like POST. The surrounding documentation about deployment, HTTPS URLs, and invocation patterns adds contextual support to the mechanism and accessibility of the endpoint.",
      "confidence": "high"
    },
    {
      "field": "modal_deployment.deployment_command",
      "citations": [
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "There are two ways of invoking deployed functions.",
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "For more detail on setting up functions for invocation over HTTP see the web endpoints guide .\n©",
            "HTTPS is used if the invoking client is not running Python and\ntherefore cannot import the Modal client library.",
            "If the invoking client is\nrunning Python, then the same [Modal client library](https://pypi.org/project/modal/) used to write Modal code"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "For ASGI apps, you can create a function decorated with `@modal.asgi_app` that returns a reference to\nyour web app:",
            "This endpoint definition would be called like so:"
          ]
        }
      ],
      "reasoning": "The field value describes using the Modal CLI to deploy a file (modal deploy <filename>.py) to package code, build a container image, and provision cloud infrastructure for hosting a function, resulting in a persistent, publicly accessible endpoint. Excerpts that establish core deployment and invocation concepts support this by showing that deployed functions exist, have endpoints, and can be invoked from different contexts. Specifically, the statement that there are two ways of invoking deployed functions and that a function created by a deployment can be called from other contexts reinforces the deployment model and the role of deployment artifacts in producing invocable endpoints. The note that deployed web endpoint functions have stable HTTPS URLs further corroborates that deployment yields persistent, reachable endpoints. Additional excerpts discussing how to set up functions for invocation over HTTP and how HTTPS is used for non-Python clients provides contextual support for how deployed endpoints are accessed, which aligns with the outcome of deploying code via the CLI. While none of the excerpts quote the exact modal deploy CLI syntax, they collectively support the concept of deploying code to expose a callable endpoint and invoking it. ",
      "confidence": "low"
    },
    {
      "field": "complete_code_examples.0",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "h-quickstart)\ncURL Python TypeScript\nCopy\nAsk AI\n```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n```\n[View ",
            "https://api.parallel.ai/v1/tasks/runs",
            "https://docs.parallel.ai/task-api/task-deep-research"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs).",
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`",
            "Section Title: Create Task Run\nContent:\nCopy page\nInitiates a task run.\nReturns immediately with a run object in status ‘queued’.\nBeta features can be enabled by setting the ‘parallel-beta’ header.\nCopy page\nPOST\n/\nv1\n/\ntasks\n/",
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value.",
            "​\ntask_spec\nTaskSpec · object\nTask specification. If unspecified, defaults to auto output schema."
          ]
        },
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "There are two ways of invoking deployed functions.",
            "If the invoking client is\nrunning Python, then the same [Modal client library](https://pypi.org/project/modal/) used to write Modal code",
            "HTTPS is used if the invoking client is not running Python and\ntherefore cannot import the Modal client library.",
            "all deployed web endpoint functions have a stable HTTPS URL ."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "Note that web endpoints, like everything else on Modal, only run when they need\nto. When you hit the web endpoint the first time, it will boot up the container,\nwhich might take a few seconds. Modal keeps the container alive for a short\nperiod in case there are subsequent requests. If there are a lot of requests,\nModal might create more containers running in parallel.",
            "You can also deploy your app and create a persistent web endpoint in the cloud\nby running `modal deploy` :",
            "When using `@modal.fastapi_endpoint` , you can add [query parameters](https://fastapi.tiangolo.com/tutorial/query-params/) which\nwill be passed to your Function as arguments.",
            "This endpoint definition would be called like so:",
            "For ASGI apps, you can create a function decorated with `@modal.asgi_app` that returns a reference to\nyour web app:",
            "This decorator wraps the Modal Function in a FastAPI application ."
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        }
      ],
      "reasoning": "The most relevant information comes from examples that show how to call the Parallel.ai API to create task runs and to interact with it via HTTP, including the required fields (input, processor), and how to enable beta features like events and webhook endpoints. Direct references describe the API endpoint, headers, and payload structure used in the sample code, which aligns with how the provided code assembles a POST request to the Parallel.ai runs endpoint and handles webhook and SSE configuration. Additional highly relevant pieces describe how to configure the webhook and event streaming features, including beta headers and how to pass them in parallel-beta. The Modal deployment and web endpoint details are also relevant because the code relies on a Modal FastAPI endpoint protected by a bearer token, which matches the deployment and endpoint behavior described in the Modal docs. Other excerpts provide contextual patterns (examples of curl commands, task results, and ASGI endpoints) that corroborate the surrounding implementation specifics but are less central to the exact finegrained field value. Overall, the code’s structure (Modal FastAPI endpoint calling Parallel.ai runs with input, processor, optional webhook, and enable_events) is best supported by the excerpts describing the create-task-run API, its headers, and the use of webhooks and beta features, followed by excerpts detailing how Modal deploys and exposes deployed functions and web endpoints. ",
      "confidence": "high"
    },
    {
      "field": "modal_function_implementation.dynamic_webhook_url_usage",
      "citations": [
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "all deployed web endpoint functions have a stable HTTPS URL ."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "The easiest way to create a web endpoint from an existing Python function is to use the `@modal.fastapi_endpoint` decorator .",
            "This decorator wraps the Modal Function in a FastAPI application .",
            "Note that web endpoints, like everything else on Modal, only run when they need\nto. When you hit the web endpoint the first time, it will boot up the container,\nwhich might take a few seconds. Modal keeps the container alive for a short\nperiod in case there are subsequent requests. If there are a lot of requests,\nModal might create more containers running in parallel.",
            "You can also deploy your app and create a persistent web endpoint in the cloud\nby running `modal deploy` :"
          ]
        }
      ],
      "reasoning": "The field value describes a dynamic webhook URL supplied by the client and wired into a payload sent to Parallel.ai, enabling per-task asynchronous callbacks. The clearest evidence in the excerpts is that Modal supports exposing functions as web endpoints and that webhooks are a feature in this context. Specifically, the documentation notes that you can invoke deployed functions and that there are dedicated paths for web endpoints and webhooks, including a decorator pathway to create a web endpoint for a Python function. This demonstrates the capability to receive a request, inspect its payload, and construct or forward a webhook-like payload to an external service. Supporting excerpts also discuss deploying and invoking deployed functions over HTTP and the existence of stable HTTPS URLs for such endpoints, reinforcing the feasibility of dynamic, externally-addressed callbacks within a function invocation workflow. Taken together, these excerpts substantiate the architectural prerequisites for implementing the dynamic webhook URL usage pattern described: a web endpoint exposed by a function, the ability to receive a request, and the possibility to shape and send a payload to an external service (like Parallel.ai) based on client-provided data.",
      "confidence": "medium"
    },
    {
      "field": "parallel_ai_api_introduction.output_formats",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\ntask_spec\nTaskSpec · object\nTask specification. If unspecified, defaults to auto output schema.",
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`",
            "Section Title: Create Task Run\nContent:\nCopy page\nInitiates a task run.\nReturns immediately with a run object in status ‘queued’.\nBeta features can be enabled by setting the ‘parallel-beta’ header.\nCopy page\nPOST\n/\nv1\n/\ntasks\n/"
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        },
        {
          "title": "llms.txt - Parallel Documentation",
          "url": "https://docs.parallel.ai/llms.txt",
          "excerpts": [
            "- [Create Task Run](https://docs.parallel.ai/api-reference/tasks-v1/create-task-run.md): Initiates a task run. Returns immediately with a run object in status 'queued'."
          ]
        }
      ],
      "reasoning": "The finegrained field value states that there are two primary output formats for the Deep Research API: an auto schema with a structured JSON output suitable for programmatic use, and a text schema that yields a comprehensive markdown report, and that the desired output format is specified in the task_spec object during task creation. The most supporting excerpt explicitly notes that a TaskSpec can define the output schema and that a default is the auto output schema, which directly corroborates the existence and mechanism of the two formats and how to specify them. Other excerpts describe how to initiate a task run and what information can be provided at task creation (such as the input and processor) and that task runs can be created with optional fields, including beta features, which is consistent with configuring task behavior during creation. Collectively, these excerpts establish the relationship between TaskSpec, the auto vs. text output formats, and how the format is selected during task creation, aligning with the field value about output formats and their specification in task creation. The most relevant parts are the explicit mention of the default auto output schema in TaskSpec, and the surrounding descriptions of creating a task run with inputs and processor, which provide the operational context for applying a TaskSpec to choose the output format.",
      "confidence": "medium"
    },
    {
      "field": "trigger_dev_orchestration_logic.initiating_request_to_modal",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run\nContent:\nCopy page\nInitiates a task run.\nReturns immediately with a run object in status ‘queued’.\nBeta features can be enabled by setting the ‘parallel-beta’ header.\nCopy page\nPOST\n/\nv1\n/\ntasks\n/",
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value.",
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs)."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "This decorator wraps the Modal Function in a FastAPI application .",
            "This endpoint definition would be called like so:"
          ]
        },
        {
          "title": "Trigger.dev v4 GA | Trigger.dev",
          "url": "https://trigger.dev/launchweek/0/trigger-v4-ga",
          "excerpts": [
            "Advanced workflow control with waitpoints. V4 introduces \"Waitpoints\" – a powerful primitive that can block runs until conditions are met. A ...Read more"
          ]
        },
        {
          "title": "Wait for token - Trigger.dev",
          "url": "https://trigger.dev/docs/wait-for-token",
          "excerpts": [
            "Waitpoint tokens pause task runs until you complete the token. They’re commonly used for approval workflows and other scenarios where you need to wait for external confirmation, such as human-in-the-loop processes. You can complete a token using the SDK or by making a POST request to the token’s URL.",
            "ST request to the `url` it returns. This is an HTTP callback:\nCopy\nAsk AI\nSection Title: Wait for token > ​\nContent:\n```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; const  token  =  await  wait .createToken ({   timeout :  \"10m\" , }); const  call  =  await  replicate . predictions .create ({   version :  \"27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478\" ,   input :  {     prompt :  \"A painting of a cat by Andy Warhol\" ,   } ,   // pass the provided URL to Replicate's webhook, so they can \"callback\"   webhook :  token .url ,   webhook_events_filter :  [ \"completed\" ] , }); const  prediction  =  await  wait .forToken < Prediction >(token) .unwrap (); // unwrap() throws a timeout error or "
          ]
        }
      ],
      "reasoning": "The finegrained field value describes initiating a process by sending an asynchronous HTTP POST to a Modal function URL, including method, headers (authorization and content-type), and a JSON body with research parameters, to create a Parallel.ai task. Excerpts that show performing a POST to Parallel.ai’s task creation endpoint demonstrate the exact mechanism for starting a Parallel task, including the required URL, HTTP method, headers, and payload structure. Additional excerpts detail enabling webhook callbacks and event tracking for task runs, which align with the idea of triggering a modal-based orchestration and receiving completion updates. Excerpts discussing how to wrap a Modal Function in a web framework and how webhooks are configured for Modal endpoints provide the architectural context for invoking a Modal function via HTTP POST within a workflow. Together, these excerpts support the notion of initiating the Parallel task via a Modal-backed, HTTP POST-based trigger in an orchestrated automation environment like Trigger.dev. Direct references to the POST-based creation of a Parallel task, including the URL, method, headers, and body, and the notes on webhook/callback behavior, are the strongest connections to the finegrained field value. The modal-specific decorator and webhook guidance further reinforce how an HTTP-triggered Modal endpoint can be integrated into a workflow, complementing the Parallel task initiation pattern.",
      "confidence": "high"
    },
    {
      "field": "trigger_dev_orchestration_logic.handling_final_result",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run\nContent:\nCopy page\nInitiates a task run.\nReturns immediately with a run object in status ‘queued’.\nBeta features can be enabled by setting the ‘parallel-beta’ header.\nCopy page\nPOST\n/\nv1\n/\ntasks\n/",
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value.",
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs)."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "This endpoint definition would be called like so:",
            "This decorator wraps the Modal Function in a FastAPI application ."
          ]
        },
        {
          "title": "Wait for token - Trigger.dev",
          "url": "https://trigger.dev/docs/wait-for-token",
          "excerpts": [
            "Waitpoint tokens pause task runs until you complete the token. They’re commonly used for approval workflows and other scenarios where you need to wait for external confirmation, such as human-in-the-loop processes. You can complete a token using the SDK or by making a POST request to the token’s URL.",
            "ST request to the `url` it returns. This is an HTTP callback:\nCopy\nAsk AI\nSection Title: Wait for token > ​\nContent:\n```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; const  token  =  await  wait .createToken ({   timeout :  \"10m\" , }); const  call  =  await  replicate . predictions .create ({   version :  \"27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478\" ,   input :  {     prompt :  \"A painting of a cat by Andy Warhol\" ,   } ,   // pass the provided URL to Replicate's webhook, so they can \"callback\"   webhook :  token .url ,   webhook_events_filter :  [ \"completed\" ] , }); const  prediction  =  await  wait .forToken < Prediction >(token) .unwrap (); // unwrap() throws a timeout error or "
          ]
        },
        {
          "title": "Trigger.dev v4 GA | Trigger.dev",
          "url": "https://trigger.dev/launchweek/0/trigger-v4-ga",
          "excerpts": [
            "Advanced workflow control with waitpoints. V4 introduces \"Waitpoints\" – a powerful primitive that can block runs until conditions are met. A ...Read more"
          ]
        }
      ],
      "reasoning": "The fine-grained field value describes a sequence where a job is paused via a wait-for-token mechanism, resumes upon a webhook callback that provides a run_id, and then performs a second fetch against a Parallel.ai endpoint to retrieve the final result, using that run_id in the request body. The most supportive excerpts explicitly cover creating a Parallel.ai task run, the immediate response (a run object in queued status), and the webhook callback mechanism that delivers a URL for completion. They also discuss how the webhook endpoint (callback URL) is invoked when the run completes and how the final result can be retrieved, including patterns for including the run_id in subsequent requests and using a result endpoint. Additional excerpts describe how to enable webhook callbacks and the structure of the webhook-enabled flow in this orchestration context. Taken together, these excerpts directly align with the described flow: (a) initiating a task run with a webhook callback URL, (b) pausing until the external processing completes and the webhook fires with run metadata, and (c) performing a follow-up request to fetch the final result using the provided run_id. The presence of examples showing a POST to the task-run endpoint, the webhook registration for completion, and the eventual retrieval of results from a /result-like endpoint corroborates the final-stage fetch pattern and the use of the run_id for this purpose, as described in the fine-grained field value.",
      "confidence": "high"
    },
    {
      "field": "complete_code_examples.1",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value.",
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs).",
            "Section Title: Create Task Run\nContent:\nCopy page\nInitiates a task run.\nReturns immediately with a run object in status ‘queued’.\nBeta features can be enabled by setting the ‘parallel-beta’ header.\nCopy page\nPOST\n/\nv1\n/\ntasks\n/",
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`",
            "​\ntask_spec\nTaskSpec · object\nTask specification. If unspecified, defaults to auto output schema."
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "h-quickstart)\ncURL Python TypeScript\nCopy\nAsk AI\n```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n```\n[View ",
            "https://api.parallel.ai/v1/tasks/runs",
            "https://docs.parallel.ai/task-api/task-deep-research",
            "-H  \"x-api-key:  $PARALLEL_API_KEY \""
          ]
        },
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "There are two ways of invoking deployed functions.",
            "If the invoking client is\nrunning Python, then the same [Modal client library](https://pypi.org/project/modal/) used to write Modal code",
            "HTTPS is used if the invoking client is not running Python and\ntherefore cannot import the Modal client library."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "This decorator wraps the Modal Function in a FastAPI application .",
            "Note that web endpoints, like everything else on Modal, only run when they need\nto. When you hit the web endpoint the first time, it will boot up the container,\nwhich might take a few seconds. Modal keeps the container alive for a short\nperiod in case there are subsequent requests. If there are a lot of requests,\nModal might create more containers running in parallel.",
            "You can also deploy your app and create a persistent web endpoint in the cloud\nby running `modal deploy` :",
            "When using `@modal.fastapi_endpoint` , you can add [query parameters](https://fastapi.tiangolo.com/tutorial/query-params/) which\nwill be passed to your Function as arguments.",
            "This endpoint definition would be called like so:",
            "For ASGI apps, you can create a function decorated with `@modal.asgi_app` that returns a reference to\nyour web app:"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        }
      ],
      "reasoning": "The fine-grained field describes a concrete implementation pattern: creating a Parallel task run via a Modal-triggered flow, using a webhook token to wait for completion, and then polling a Modal result endpoint to retrieve the final report. Excerpts that specify how to call the Parallel API to create a task run, including how to pass input and processor parameters and how to enable webhook callbacks, directly support the core API contract used in the code. Details about webhook behavior, such as the webhook endpoint that receives a post when the run completes and the need to include a callback URL, align with the wait-for-token pattern in the code. Excerpts illustrating how to authorize requests with API keys and the exact REST endpoints for creating task runs provide the concrete steps that the code is designed to perform. Additional excerpts describing how to invoke deployed Modal functions or wrap Modal functions in a web framework contextualize the surrounding infrastructure, which is relevant for understanding how the Trigger.dev v4 task would be triggered and how results are fetched from Modal. Related examples showing curl syntax or general Parallel documentation demonstrate the practical command patterns the code could replicate. Together, these excerpts collectively establish the essential mechanics of the integration: (a) initiating a Parallel task run via API, (b) receiving webhook callbacks with run status, (c) fetching final results via a Modal/endpoint, and (d) the surrounding Modal-triggered execution flow and webhooks context that makes this orchestration possible.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.1",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}",
            "The run result is available from the `/result` endpoint.",
            "\"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"status\" :  \"running\" ,   \"is_active\" :  true ,   \"processor\" :  \"core\" ,   \"metadata\" : {     \"my_key\" :  \"my_value\"   },   \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,   \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\" }\n"
          ]
        },
        {
          "title": "Retrieve Task Run Result - Parallel",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result",
          "excerpts": [
            "{   \"run\" : {     \"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"status\" :  \"completed\" ,     \"is_active\" :  false ,     \"processor\" :  \"core\" ,     \"metadata\" : {       \"my_key\" :  \"my_value\"     },     \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,     \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\"   },   \"output\" : {     \"basis\" : [],     \"type\" :  \"json\" ,     \"content\" : {       \"gdp\" :  \"$3.1 trillion (2023)\"     }   }"
          ]
        },
        {
          "title": "Overview - Parallel Documentation",
          "url": "https://docs.parallel.ai/getting-started/overview",
          "excerpts": [
            "Parallel provides a suite of APIs that combine AI inference with live web data to power research, enrichment, and automation workflows.Read more"
          ]
        }
      ],
      "reasoning": "The finegrained field value describes a GET request to the runs endpoint to fetch the status and metadata for a specific task run identified by run_id. Directly supporting this, an excerpt explicitly shows the GET path for retrieving a run by its id, including the nested path elements and run_id placeholder. Additional excerpts reinforce the same concept by stating that the run result is available from a dedicated result endpoint, which aligns with the workflow of polling for status updates. A snippet that presents a sample run object with a status field (e.g., status: running) provides concrete evidence of the type of status information such a request would return, further corroborating the purpose of this endpoint as status retrieval. Another excerpt focuses on the separate “retrieve task run result” pattern, which complements the idea of obtaining the outcome or status after polling. Finally, a broader overview of the API emphasizes that the platform provides task-related endpoints, which contextualizes why a status endpoint exists in the first place. Together, these excerpts coherently map to the idea of using the GET endpoint at /v1/tasks/runs/{run_id} to poll and retrieve the current status and metadata of a specific task run, as well as related endpoints for accessing results and status-related data.",
      "confidence": "high"
    },
    {
      "field": "modal_secret_management.secret_creation",
      "citations": [
        {
          "title": "Secrets | Modal Docs",
          "url": "https://modal.com/docs/guide/secrets",
          "excerpts": [
            "To inject Secrets into the container running your Function, add the `secrets=[...]` argument to your `app.function` or `app.cls` decoration.",
            "You can then use your Secret by constructing it `from_name` when defining a Modal App\nand then accessing its contents as environment variables.",
            "You can create and edit Secrets via\nthe dashboard ,\nthe command line interface ( `modal secret` ), and\nprogrammatically from Python code ( `modal.Secret` ).",
            "Securely provide credentials and other sensitive information to your Modal Functions with Secrets. You can create and edit Secrets via the dashboard.Read more",
            "Securely provide credentials and other sensitive information to your Modal Functions with Secrets.",
            "For example, if you have a Secret called `secret-keys` containing the key `MY_PASSWORD` :",
            "Each Secret can contain multiple keys and values but you can also inject\nmultiple Secrets, allowing you to separate Secrets into smaller reusable units:",
            "The Secrets are applied in order, so key-values from later `modal.Secret` objects in the list will overwrite earlier key-values in the case of a clash.",
            "For example, if both `modal.Secret` objects above contained the key `FOO` , then\nthe value from `\"other-secret\"` would always be present in `os.environ[\"FOO\"]` ."
          ]
        },
        {
          "title": "modal.Secret | Modal Docs",
          "url": "https://modal.com/docs/reference/modal.Secret",
          "excerpts": [
            "Secrets provide a dictionary of environment variables for images. Secrets are a secure way to add credentials and other sensitive information to the containers.Read more",
            "Secrets are a secure way to add credentials and other sensitive information\nto the containers your functions run in. You can create and edit secrets on [the dashboard](https://modal.com/secrets) , or programmatically from Python code.",
            "See [the secrets guide page](https://modal.com/docs/guide/secrets) for more information.",
            "In contrast to most other Modal objects, named Secrets must be provisioned\nfrom the Dashboard. See other methods for alternate ways of creating a new\nSecret from code.",
            "Secrets provide a dictionary of environment variables for images.",
            "Section Title: modal.Secret > from_name"
          ]
        }
      ],
      "reasoning": "The field value outlines securely managing the Parallel.ai API key using Modal secrets, including creating a secret named parallel-api, placing PARALLEL_API_KEY inside it, and optionally a second secret for an AUTH_TOKEN. The most directly supportive points are: creating and editing Secrets via the dashboard, CLI, or programmatically (modal.Secret); injecting Secrets into the container by adding a secrets argument to app.function or app.cls; using a Secret by constructing it from_name and accessing its contents as environment variables; and the notion that Secrets can contain multiple keys and values, with the ordering semantics affecting values in case of clashes. These aspects match the described workflow for secret creation and usage to securely store API keys and tokens. The excerpts collectively corroborate how to implement the described secret-based approach and how to reference secret contents at runtime within a Modal app, aligning with the modal_secret_management.secret_creation field value. There is no conflicting information in the excerpts; they consistently describe the mechanics needed to support the stated approach with PARALLEL_API_KEY and AUTH_TOKEN as environment variables accessible to the app. The combination of dashboard/CLI/programmatic creation, injection into the container, and environment-variable access directly supports the fine-grained field value.",
      "confidence": "high"
    },
    {
      "field": "parallel_ai_authentication.key_acquisition",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "h-quickstart)\ncURL Python TypeScript\nCopy\nAsk AI\n```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`"
          ]
        }
      ],
      "reasoning": "The core assertion in the field value is that an API key authenticates API calls to the Parallel.ai endpoints and is supplied in the request headers (for example, in a header labeled x-api-key with a placeholder like PARALLEL_API_KEY). The most directly relevant material shows explicit examples of including an API key in the request header when sending a task-run request, using a header entry like x-api-key: $PARALLEL_API_KEY. This demonstrates the exact mechanism of authentication via a header-based API key. The accompanying excerpts also consistently present this same pattern across multiple instances, reinforcing that header-based key transmission is the intended method for authentication in these API interactions. A less direct but potentially related point is the reference to the need for an API key in the context of the documented workflow (e.g., tasks/runs), which aligns with the overall authentication model but does not by itself provide steps for obtaining the key. The excerpts do not provide explicit steps for how a user signs up on the developer platform or how to securely store the key, so those aspects cannot be fully corroborated by the excerpts alone. Overall, the strongest, directly supported claim is that the API key is transmitted via the x-api-key header in API requests; the broader aspects of acquisition and storage can be inferred from the field value but are not fully substantiated by the excerpts themselves.",
      "confidence": "medium"
    },
    {
      "field": "modal_function_implementation.request_payload_handling",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "The easiest way to create a web endpoint from an existing Python function is to use the `@modal.fastapi_endpoint` decorator .",
            "This decorator wraps the Modal Function in a FastAPI application .",
            "When using `@modal.fastapi_endpoint` , you can add [query parameters](https://fastapi.tiangolo.com/tutorial/query-params/) which\nwill be passed to your Function as arguments.",
            "This endpoint definition would be called like so:",
            "Note that web endpoints, like everything else on Modal, only run when they need\nto. When you hit the web endpoint the first time, it will boot up the container,\nwhich might take a few seconds. Modal keeps the container alive for a short\nperiod in case there are subsequent requests. If there are a lot of requests,\nModal might create more containers running in parallel.",
            "You can also deploy your app and create a persistent web endpoint in the cloud\nby running `modal deploy` :"
          ]
        },
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "For more detail on setting up functions for invocation over HTTP see the web endpoints guide .\n©",
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "There are two ways of invoking deployed functions."
          ]
        }
      ],
      "reasoning": "The finegrained field value describes how a Modal function handles a JSON payload in the body of a POST request, using a FastAPI Request object and robust data extraction with dictionary access (e.g., body.get(\"input\")). Relevant excerpts establish the context that Modal web endpoints are implemented via FastAPI, including the use of a @modal.fastapi_endpoint decorator to wrap the function in a FastAPI app, and that web endpoints can receive query parameters and be invoked over HTTP. These excerpts support the idea that a Modal function can operate as an HTTP endpoint and receive JSON payloads, which aligns with the stated payload-handling approach. One excerpt notes that the decorator wraps the function in a FastAPI application, directly tying Modal function deployment to FastAPI request handling. Another excerpt confirms that web endpoints are created via this decorator and may boot containers on demand, which is consistent with HTTP request processing in a serverless/modal context. Additional excerpts mention that query parameters can be passed to the function, illustrating how inputs from an HTTP call can be routed as arguments, which complements the concept of receiving and parsing a JSON body. While the excerpts do not explicitly show the exact string body.get(\"input\") pattern, they collectively corroborate the architectural pattern of a Modal HTTP endpoint backed by FastAPI, capable of receiving and processing JSON payloads in POST requests. Taken together, these excerpts support the field value’s core claim about JSON payload handling in a Modal function endpoint, including the use of FastAPI and HTTP invocation semantics. ",
      "confidence": "medium"
    },
    {
      "field": "modal_secret_management.attaching_to_function",
      "citations": [
        {
          "title": "Secrets | Modal Docs",
          "url": "https://modal.com/docs/guide/secrets",
          "excerpts": [
            "You can create and edit Secrets via\nthe dashboard ,\nthe command line interface ( `modal secret` ), and\nprogrammatically from Python code ( `modal.Secret` ).",
            "To inject Secrets into the container running your Function, add the `secrets=[...]` argument to your `app.function` or `app.cls` decoration.",
            "You can then use your Secret by constructing it `from_name` when defining a Modal App\nand then accessing its contents as environment variables.",
            "For example, if you have a Secret called `secret-keys` containing the key `MY_PASSWORD` :",
            "Securely provide credentials and other sensitive information to your Modal Functions with Secrets. You can create and edit Secrets via the dashboard.Read more",
            "Securely provide credentials and other sensitive information to your Modal Functions with Secrets."
          ]
        },
        {
          "title": "modal.Secret | Modal Docs",
          "url": "https://modal.com/docs/reference/modal.Secret",
          "excerpts": [
            "Secrets are a secure way to add credentials and other sensitive information\nto the containers your functions run in. You can create and edit secrets on [the dashboard](https://modal.com/secrets) , or programmatically from Python code."
          ]
        }
      ],
      "reasoning": "The most directly relevant information shows that secrets can be injected into the function’s runtime by providing a secrets argument to the function decorator, which matches the need to attach secrets to the Modal function. This is evidenced by explicit statements about injecting Secrets into the container running your Function via the secrets argument on the app.function or app.cls decoration, which aligns with attaching secrets to the specific function. Further, the mechanism for referencing and using those secrets at runtime is described by constructing a Secret with from_name when defining a Modal App and then accessing its contents as environment variables, which directly supports the idea of making the secret values available to the function at runtime. The example snippet demonstrates attaching multiple secrets by listing them in secrets=[modal.Secret.from_name(\"parallel-api\"), modal.Secret.from_name(\"my-web-auth-token\")], which shows how to attach and expose the environment variables to the decorated function’s runtime environment. Additional excerpts expand on how Secrets are created, edited, or provided via the dashboard, CLI, or programmatically, reinforcing the practical workflow for managing and attaching secrets to functions. The combination of these points—injecting via the secrets argument, using from_name to reference secrets, and the resulting environment-variable exposure—collectively supports the stated fine-grained field value about attaching secrets to a Modal function so it can access them at runtime.",
      "confidence": "high"
    },
    {
      "field": "parallel_ai_api_introduction.key_features",
      "citations": [
        {
          "title": "What is AI deep research",
          "url": "https://parallel.ai/articles/what-is-deep-research",
          "excerpts": [
            "Parallel Deep Research API**. Parallel takes a fundamentally different approach by building web research infrastructure specifically for AI ...Read more"
          ]
        },
        {
          "title": "Overview - Parallel Documentation",
          "url": "https://docs.parallel.ai/getting-started/overview",
          "excerpts": [
            "Parallel provides a suite of APIs that combine AI inference with live web data to power research, enrichment, and automation workflows.Read more"
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        }
      ],
      "reasoning": "The most directly relevant excerpt discusses Parallel's Deep Research API, explicitly signaling that the API is designed around a research-oriented infrastructure for AI, which aligns with the feature of natural language prompts and objective-driven research workflows. The second excerpt describes Parallel as providing a suite of APIs that fuse AI inference with live web data to power research, enrichment, and automation, which supports multi-step web exploration and the broader output/automation aspects. The third excerpt provides a concrete example of using a natural language prompt to generate a research report, illustrating the natural-language input capability and the end goal of a structured research output. Taken together, these excerpts map onto the described features: natural language input, declarative/objective-driven research, multi-step web exploration, and outputs designed for traceability (citations) and varied schemas, including auto JSON style and markdown-style results. The remaining excerpts describe task-run plumbing (headers, tokens, webhook features, and statuses) which are instrumental for implementation but do not directly illustrate the stated feature set; they thus have lower relevance to the finegrained field value about feature descriptions.",
      "confidence": "high"
    },
    {
      "field": "parallel_ai_result_retrieval_methods.recommended_for_this_solution",
      "citations": [
        {
          "title": "llms.txt - Parallel Documentation",
          "url": "https://docs.parallel.ai/llms.txt",
          "excerpts": [
            "- [Retrieve Task Run](https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run.md): Retrieves run status by run_id.\nThe run result is available from the `/result` endpoint."
          ]
        },
        {
          "title": "Parallel Web Systems | Web Search & Research APIs Built for AI Agents ",
          "url": "https://parallel.ai/blog/sse-for-tasks",
          "excerpts": [
            "SSE for Task Runs is available now in beta across all Parallel Task API processors. Dive into our [documentation](https://docs.parallel.ai/task-api/task-sse) [[documentation] (https://docs.parallel.ai/task-api/task-sse)](https://docs.parallel.ai/task-api/task-sse) to integrate real-time streaming into your application.",
            "To receive live updates from a task run, establish an SSE connection using the run ID:\n### Establish an SSE connection",
            "SSE streams deliver four categories of real-time updates:\n**** Progress Statistics **** : Live counts of sources scanned, selected, and processed during web research execution.\n**** Message Updates **** : Model reasoning and thought processes as the task progresses through complex multi-hop research.\n**** Status Changes **** : Clear signals when tasks start, complete, or encounter errors.\n**** Error Details **** : Specific error information when issues arise, enabling immediate debugging."
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Webhook Setup - Parallel",
          "url": "https://docs.parallel.ai/resources/webhook-setup",
          "excerpts": [
            "Webhooks allow you to receive real-time notifications when events occur in your Parallel API operations, eliminating the need for constant polling. ... Task API ...Read more"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "Parallel sends a POST request to your URL when the task finishes. Key points: Webhooks notify you when the task completes—they don't send the actual results. ...Read more"
          ]
        }
      ],
      "reasoning": "The finegrained field path points to a retrieval method for the parallel_ai_result_retrieval_methods and expects a boolean value of true, indicating that retrieval methods are recommended for this solution. The most directly relevant information comes from excerpts that explicitly discuss how to retrieve task results or access results via endpoints. In particular, a line states that you can Retrieve Task Run and that the run result is available from the /result endpoint, which directly supports the concept of programmatic retrieval of results. Beyond explicit retrieval endpoints, other excerpts describe real-time or ongoing retrieval-related mechanisms, such as establishing an SSE connection to receive live updates about task runs, including status changes and updates during processing. This provides a broader view of retrieval modalities (on-demand result endpoints and streaming updates) that could be recommended for this solution. Additional excerpts discuss webhooks and how to trigger endpoints, which are related to retrieval workflows in that they enable notifications when results or task states change, but they are secondary to the explicit result retrieval path. Taken together, the strongest support comes from the explicit retrieval endpoint information, complemented by streaming update mechanisms that further augment retrieval capabilities. The combination of an explicit /result retrieval path and real-time streaming notifications aligns with a positive recommendation for retrieval methods in this solution.",
      "confidence": "high"
    },
    {
      "field": "parallel_ai_result_retrieval_methods.method_name",
      "citations": [
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Webhook Setup - Parallel",
          "url": "https://docs.parallel.ai/resources/webhook-setup",
          "excerpts": [
            "Webhooks allow you to receive real-time notifications when events occur in your Parallel API operations, eliminating the need for constant polling. ... Task API ...Read more"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "Parallel sends a POST request to your URL when the task finishes. Key points: Webhooks notify you when the task completes—they don't send the actual results. ...Read more"
          ]
        },
        {
          "title": "llms.txt - Parallel Documentation",
          "url": "https://docs.parallel.ai/llms.txt",
          "excerpts": [
            "- [Retrieve Task Run](https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run.md): Retrieves run status by run_id.\nThe run result is available from the `/result` endpoint."
          ]
        },
        {
          "title": "Parallel Web Systems | Web Search & Research APIs Built for AI Agents ",
          "url": "https://parallel.ai/blog/sse-for-tasks",
          "excerpts": [
            "To receive live updates from a task run, establish an SSE connection using the run ID:\n### Establish an SSE connection",
            "SSE streams deliver four categories of real-time updates:\n**** Progress Statistics **** : Live counts of sources scanned, selected, and processed during web research execution.\n**** Message Updates **** : Model reasoning and thought processes as the task progresses through complex multi-hop research.\n**** Status Changes **** : Clear signals when tasks start, complete, or encounter errors.\n**** Error Details **** : Specific error information when issues arise, enabling immediate debugging.",
            "SSE for Task Runs is available now in beta across all Parallel Task API processors. Dive into our [documentation](https://docs.parallel.ai/task-api/task-sse) [[documentation] (https://docs.parallel.ai/task-api/task-sse)](https://docs.parallel.ai/task-api/task-sse) to integrate real-time streaming into your application."
          ]
        }
      ],
      "reasoning": "To support the concept of result retrieval methods, the most directly relevant parts describe Webhooks: one excerpt provides a concrete webhook setup with a sample request and instructions, and another summarizes how webhooks notify you of task runs, illustrating a pull/push pattern for result delivery. Additional context on webhooks setup reinforces how to integrate this method. For SSE, multiple excerpts explain establishing an SSE connection and detail the four categories of real-time updates SSE delivers, which maps to continuous delivery of results. The mention of a retrieve-task-run pathway and accessing results via a /result endpoint indicates an explicit pull-based retrieval mechanism, which aligns with Polling or manual polling-like retrieval. Taken together, these excerpts connect to the field value by outlining the three modalities: Webhooks, SSE, and a direct retrieval endpoint, with Webhooks and SSE having the strongest, explicit coverage, and the direct retrieve endpoint offering a related pull-based alternative.",
      "confidence": "medium"
    },
    {
      "field": "modal_secret_management.accessing_in_code",
      "citations": [
        {
          "title": "Secrets | Modal Docs",
          "url": "https://modal.com/docs/guide/secrets",
          "excerpts": [
            "You can then use your Secret by constructing it `from_name` when defining a Modal App\nand then accessing its contents as environment variables.",
            "To inject Secrets into the container running your Function, add the `secrets=[...]` argument to your `app.function` or `app.cls` decoration.",
            "For example, if you have a Secret called `secret-keys` containing the key `MY_PASSWORD` :",
            "Each Secret can contain multiple keys and values but you can also inject\nmultiple Secrets, allowing you to separate Secrets into smaller reusable units:",
            "For example, if both `modal.Secret` objects above contained the key `FOO` , then\nthe value from `\"other-secret\"` would always be present in `os.environ[\"FOO\"]` .",
            "Securely provide credentials and other sensitive information to your Modal Functions with Secrets. You can create and edit Secrets via the dashboard.Read more",
            "Securely provide credentials and other sensitive information to your Modal Functions with Secrets.",
            "You can create and edit Secrets via\nthe dashboard ,\nthe command line interface ( `modal secret` ), and\nprogrammatically from Python code ( `modal.Secret` )."
          ]
        },
        {
          "title": "modal.Secret | Modal Docs",
          "url": "https://modal.com/docs/reference/modal.Secret",
          "excerpts": [
            "Secrets provide a dictionary of environment variables for images. Secrets are a secure way to add credentials and other sensitive information to the containers.Read more",
            "Secrets are a secure way to add credentials and other sensitive information\nto the containers your functions run in. You can create and edit secrets on [the dashboard](https://modal.com/secrets) , or programmatically from Python code.",
            "See [the secrets guide page](https://modal.com/docs/guide/secrets) for more information.",
            "Secrets provide a dictionary of environment variables for images.",
            "In contrast to most other Modal objects, named Secrets must be provisioned\nfrom the Dashboard. See other methods for alternate ways of creating a new\nSecret from code.",
            "Section Title: modal.Secret > from_name"
          ]
        }
      ],
      "reasoning": "The finegrained field value describes accessing secret values within a function's code through environment variables, specifically retrieving an API key via an environment variable and optionally using an authorization token from an environment variable. The most directly supporting information comes from excerpts that state: secrets are injected into the container and accessed as environment variables, and that you can obtain a secret value via standard environment variable access (for example, using os.environ to read PARALLEL_API_KEY). Additional support comes from examples showing that secrets can contain multiple keys and that their values are exposed to the running process as environment variables, which aligns with how the code would retrieve PARALLEL_API_KEY and AUTH_TOKEN. The surrounding guidance about injecting secrets into the container (via the secrets argument) and managing secrets (creating, editing, and using from_name) provides context that this environment-based access pattern is the intended usage, even though the core claim is the in-code access via environment variables. The content also notes that later secret definitions can overwrite earlier values if keys clash, which is relevant for understanding potential behavior when multiple secrets define the same environment key. Overall, the strongest alignment is with statements that secrets are injected into the runtime environment and accessed through standard environment variable lookups, followed by examples and management practices that contextualize this pattern.",
      "confidence": "high"
    },
    {
      "field": "modal_setup_and_configuration.project_setup",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "The easiest way to create a web endpoint from an existing Python function is to use the `@modal.fastapi_endpoint` decorator .",
            "This decorator wraps the Modal Function in a FastAPI application .",
            "For ASGI apps, you can create a function decorated with `@modal.asgi_app` that returns a reference to\nyour web app:",
            "This endpoint definition would be called like so:",
            "Note that web endpoints, like everything else on Modal, only run when they need\nto. When you hit the web endpoint the first time, it will boot up the container,\nwhich might take a few seconds. Modal keeps the container alive for a short\nperiod in case there are subsequent requests. If there are a lot of requests,\nModal might create more containers running in parallel.",
            "You can also deploy your app and create a persistent web endpoint in the cloud\nby running `modal deploy` :",
            "When using `@modal.fastapi_endpoint` , you can add [query parameters](https://fastapi.tiangolo.com/tutorial/query-params/) which\nwill be passed to your Function as arguments."
          ]
        }
      ],
      "reasoning": "To support the target field, the most relevant excerpts describe how to expose a Modal function through a FastAPI-wrapped web endpoint. One excerpt notes that using a particular decorator wraps the Modal function in a FastAPI application, which directly corresponds to creating a FastAPI-based endpoint that could interact with an external API such as Parallel.ai. This is aligned with the idea of having a main application file that sets up a Modal app and defines endpoints that will call external services, which is exactly the kind of setup described in the field value. Another excerpt confirms that a decorator can wrap a Modal function in a FastAPI app, reinforcing the concept of an HTTP-accessible endpoint created from a Modal deployment, suitable for integration with other services like Parallel.ai. Additional excerpts discuss deploying the app, creating persistent web endpoints, and using query parameters in FastAPI endpoints, which are all relevant steps in wiring up a Modal-based project to call external APIs. Moreover, one excerpt illustrates how an endpoint would be invoked, which is useful for understanding how the final integration should be consumed by the parallel.ai API client code. Together, these excerpts provide the procedural cues for starting with a main Python file, creating a Modal App object to host functions, and exposing HTTP/FastAPI endpoints that can interact with an external API, which matches the described field value intent. However, none of the excerpts explicitly mention file names like server.py or the exact import list (modal, os, httpx, fastapi), so while the guidance is highly relevant, it is not perfectly prescriptive for those exact specifics.",
      "confidence": "medium"
    },
    {
      "field": "trigger_dev_orchestration_logic.passing_callback_url",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value.",
            "Section Title: Create Task Run\nContent:\nCopy page\nInitiates a task run.\nReturns immediately with a run object in status ‘queued’.\nBeta features can be enabled by setting the ‘parallel-beta’ header.\nCopy page\nPOST\n/\nv1\n/\ntasks\n/",
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs)."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "This decorator wraps the Modal Function in a FastAPI application .",
            "This endpoint definition would be called like so:"
          ]
        },
        {
          "title": "Trigger.dev v4 GA | Trigger.dev",
          "url": "https://trigger.dev/launchweek/0/trigger-v4-ga",
          "excerpts": [
            "Advanced workflow control with waitpoints. V4 introduces \"Waitpoints\" – a powerful primitive that can block runs until conditions are met. A ...Read more"
          ]
        },
        {
          "title": "Wait for token - Trigger.dev",
          "url": "https://trigger.dev/docs/wait-for-token",
          "excerpts": [
            "Waitpoint tokens pause task runs until you complete the token. They’re commonly used for approval workflows and other scenarios where you need to wait for external confirmation, such as human-in-the-loop processes. You can complete a token using the SDK or by making a POST request to the token’s URL.",
            "ST request to the `url` it returns. This is an HTTP callback:\nCopy\nAsk AI\nSection Title: Wait for token > ​\nContent:\n```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; const  token  =  await  wait .createToken ({   timeout :  \"10m\" , }); const  call  =  await  replicate . predictions .create ({   version :  \"27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478\" ,   input :  {     prompt :  \"A painting of a cat by Andy Warhol\" ,   } ,   // pass the provided URL to Replicate's webhook, so they can \"callback\"   webhook :  token .url ,   webhook_events_filter :  [ \"completed\" ] , }); const  prediction  =  await  wait .forToken < Prediction >(token) .unwrap (); // unwrap() throws a timeout error or "
          ]
        }
      ],
      "reasoning": "The most directly supportive information comes from the code snippet that shows creating a token with a timeout, capturing the generated token URL, and wiring that URL into the webhook field in a subsequent call to a downstream service. This demonstrates the essential flow: generate a unique callback URL via a wait mechanism, expose that URL to the initial fetch/payload (webhookUrl or webhook.url), and then propagate that same URL to the Parallel.ai task creation step where the webhook endpoint will receive completion events. Complementary excerpts describe that a webhook callback URL is provided to the endpoint for task runs and that the webhook endpoint will receive an HTTP POST when the run completes, which confirms the lifecycle of using a callback URL in this integration. Additional context from the Modal documentation clarifies how a webhook endpoint is consumed within a Modal function, which is exactly the binding point where the orchestration (Trigger.dev) supplies the callback URL to Modal, and Modal then ensures it is forwarded to Parallel.ai in the task creation call. The aggregation of these pieces directly supports the field value’s claim about enabling a webhook callback mechanism by threading the token-derived URL through the fetch payload and into the webhook.url field of the Deep Research task creation.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.6",
      "citations": [
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'",
            "Webhook Payload Structure\nEach webhook payload contains:\n`timestamp` : ISO 8601 timestamp of when the event occurred\n`type` : Event type\n`data` : Event-specific payload. For the ‘task_run.status’ event, it is the complete [Task Run object](https://docs.parallel.ai/api-reference/task-api-v1/retrieve-task-run)\n"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`",
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value."
          ]
        }
      ],
      "reasoning": "The most relevant content directly addresses how webhooks are configured and how a webhook-driven callback is triggered in the Parallel task API flow. The discussion of including a webhook parameter in a task run creation request shows how to register a callback URL that Parallel will invoke on certain events, which aligns with the idea of a dynamic URL (the Waitpoint) being posted to by Parallel upon completion. The webhook payload structure excerpt further clarifies what the callback will deliver (timestamp, event type, and data), which supports understanding how the Trigger.dev resume action would be driven by the POST to the dynamic URL. Additional context about creating task runs and their input/authorization headers provides necessary details for implementing a similar callback mechanism in an integration, reinforcing how an endpoint reference would be wired up in practice. These pieces together support the concept of a dynamic, externally invoked completion callback via webhook as described in the finegrained field value.",
      "confidence": "medium"
    },
    {
      "field": "parallel_ai_result_retrieval_methods.how_it_works",
      "citations": [
        {
          "title": "llms.txt - Parallel Documentation",
          "url": "https://docs.parallel.ai/llms.txt",
          "excerpts": [
            "- [Retrieve Task Run](https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run.md): Retrieves run status by run_id.\nThe run result is available from the `/result` endpoint."
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "Parallel sends a POST request to your URL when the task finishes. Key points: Webhooks notify you when the task completes—they don't send the actual results. ...Read more"
          ]
        },
        {
          "title": "Webhook Setup - Parallel",
          "url": "https://docs.parallel.ai/resources/webhook-setup",
          "excerpts": [
            "Webhooks allow you to receive real-time notifications when events occur in your Parallel API operations, eliminating the need for constant polling. ... Task API ...Read more"
          ]
        },
        {
          "title": "Parallel Web Systems | Web Search & Research APIs Built for AI Agents ",
          "url": "https://parallel.ai/blog/sse-for-tasks",
          "excerpts": [
            "To receive live updates from a task run, establish an SSE connection using the run ID:\n### Establish an SSE connection",
            "SSE streams deliver four categories of real-time updates:\n**** Progress Statistics **** : Live counts of sources scanned, selected, and processed during web research execution.\n**** Message Updates **** : Model reasoning and thought processes as the task progresses through complex multi-hop research.\n**** Status Changes **** : Clear signals when tasks start, complete, or encounter errors.\n**** Error Details **** : Specific error information when issues arise, enabling immediate debugging.",
            "SSE for Task Runs is available now in beta across all Parallel Task API processors. Dive into our [documentation](https://docs.parallel.ai/task-api/task-sse) [[documentation] (https://docs.parallel.ai/task-api/task-sse)](https://docs.parallel.ai/task-api/task-sse) to integrate real-time streaming into your application."
          ]
        }
      ],
      "reasoning": "The finegrained field value asserts three primary mechanisms for obtaining results from Parallel.ai: (1) Webhooks where a callback URL is notified of task state changes and a subsequent call to a result endpoint fetches the final output; (2) Polling where the run status is periodically checked until it completes and then the final result is retrieved; and (3) Server-Sent Events (SSE) for real-time progress updates with a final state that includes the output. The most directly supportive content comes from explicit references to a result retrieval flow: retrieving the run status and then calling the result endpoint to obtain the final output, which underpins the polling pattern and the explicit /result fetch. Supporting webhook-based behavior includes examples showing how to register a webhook, include a callback URL, and that the webhook notifies on run status changes (and that the final output is obtained separately via /result). Additional excerpts discuss the general webhook setup to receive real-time notifications and the existence of SSE streams for live progress messages, including the final state that contains the output. Together, these excerpts substantiate the three-retrieval-method narrative and the specific endpoints and flows involved, including the separation of notification and result-fetch for webhooks and the dedicated /result endpoint as the source of final output. SSE-related excerpts describe real-time streaming of progress messages and conclude with an output in the final event, which aligns with the SSE method described in the field value.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.3",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs).",
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`"
          ]
        },
        {
          "title": "Retrieve Task Run Result - Parallel",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result",
          "excerpts": [
            "{   \"run\" : {     \"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"status\" :  \"completed\" ,     \"is_active\" :  false ,     \"processor\" :  \"core\" ,     \"metadata\" : {       \"my_key\" :  \"my_value\"     },     \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,     \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\"   },   \"output\" : {     \"basis\" : [],     \"type\" :  \"json\" ,     \"content\" : {       \"gdp\" :  \"$3.1 trillion (2023)\"     }   }"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "\"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"status\" :  \"running\" ,   \"is_active\" :  true ,   \"processor\" :  \"core\" ,   \"metadata\" : {     \"my_key\" :  \"my_value\"   },   \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,   \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\" }\n"
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        }
      ],
      "reasoning": "The strongest support comes from the excerpt that explicitly discusses enabling events and progress tracking for task runs, including the recommended header value to enable SSE-like behavior and the concept of a dedicated Task Run events endpoint for progress updates. This directly aligns with the finegrained field value which describes an endpoint used to stream real-time progress updates via SSE and requires an enable_events flag at task creation. The next strongest support comes from excerpts describing the status and lifecycle of a task run retrieval, including completed status and run metadata, which provide necessary context for where progress data would appear and how to interpret its lifecycle. Additional evidence comes from excerpts detailing task run creation and the ability to specify inputs and processors, which is relevant because enabling events is tied to the creation of a run and its capabilities. Contextual references to the general Task API, API usage examples, and webhook-related content supply supporting background but do not directly assert SSE streaming behavior. Overall, the most convincing support is the explicit guidance on enabling events and the existence of a Task Run events pathway, followed by concrete task run lifecycle references and creation parameters.",
      "confidence": "high"
    },
    {
      "field": "modal_function_implementation.api_call_logic",
      "citations": [
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "For more detail on setting up functions for invocation over HTTP see the web endpoints guide .\n©",
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "There are two ways of invoking deployed functions."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "This endpoint definition would be called like so:",
            "When using `@modal.fastapi_endpoint` , you can add [query parameters](https://fastapi.tiangolo.com/tutorial/query-params/) which\nwill be passed to your Function as arguments.",
            "The easiest way to create a web endpoint from an existing Python function is to use the `@modal.fastapi_endpoint` decorator .",
            "This decorator wraps the Modal Function in a FastAPI application .",
            "Note that web endpoints, like everything else on Modal, only run when they need\nto. When you hit the web endpoint the first time, it will boot up the container,\nwhich might take a few seconds. Modal keeps the container alive for a short\nperiod in case there are subsequent requests. If there are a lot of requests,\nModal might create more containers running in parallel.",
            "You can also deploy your app and create a persistent web endpoint in the cloud\nby running `modal deploy` :",
            "For ASGI apps, you can create a function decorated with `@modal.asgi_app` that returns a reference to\nyour web app:"
          ]
        }
      ],
      "reasoning": "The core field value describes a function that builds a JSON payload, retrieves an API key from environment-managed secrets, conditionally includes fields like task_spec or webhook, and makes an asynchronous HTTP POST to a well-defined API endpoint, finally returning a run_id. Excerpts that discuss deploying functions and invoking them over HTTP establish the necessary context for how a function becomes an HTTP-accessible endpoint and how callers will interact with it, which is directly relevant for implementing the described api_call_logic flow. In particular, the statement that deployed web endpoints have stable HTTPS URLs provides the necessary URL stability for the Parallel.ai call. Guidance about setting up functions for HTTP invocation and how an endpoint would be called (for example, showing how an endpoint is invoked) aligns with the need to perform an HTTP POST to the external API with appropriate headers and a JSON payload. The mentions of decorators that expose functions as web endpoints and notes about booting containers and handling requests provide practical constraints and patterns that the api_call_logic would need to conform to when deployed via Modal. While the excerpts do not mention Parallel.ai specifically, they support the structural and invocation patterns required by the finegrained field value, namely constructing a payload, retrieving credentials, choosing conditional parameters, and performing an HTTP call to an external API from within a deployed function, then returning a result such as run_id.",
      "confidence": "medium"
    },
    {
      "field": "error_handling_and_best_practices.idempotency",
      "citations": [
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "Parallel sends a POST request to your URL when the task finishes. Key points: Webhooks notify you when the task completes—they don't send the actual results. ...Read more"
          ]
        },
        {
          "title": "Webhook Setup - Parallel",
          "url": "https://docs.parallel.ai/resources/webhook-setup",
          "excerpts": [
            "Your webhook endpoint will receive requests with these headers:\n`webhook-id` : Unique identifier for each webhook event\n`webhook-timestamp` : Unix timestamp in seconds\n`webhook-signature` : One or more versioned signatures (e.g., `v1,<base64 signature>` )",
            "HMAC Signature Verification",
            "Where:\n`<webhook-id>` : The value of the `webhook-id` header\n`<webhook-timestamp>` : The value of the `webhook-timestamp` header\n`<payload>` : The exact JSON body of the webhook request",
            "<webhook-id>.<webhook-timestamp>.<payload>"
          ]
        },
        {
          "title": "Task Runs Lifecycle - Parallel",
          "url": "https://docs.parallel.ai/task-api/guides/execute-task-run",
          "excerpts": [
            "A Task Run Result can be accessed once the Task Run status becomes completed . ​. Rate Limits. The Task API enforces a limit of 2,000 requests per minute per ...Read more"
          ]
        }
      ],
      "reasoning": "The fine-grained field value describes designing an idempotent workflow for webhook-delivered events, specifically leveraging the run_id from the webhook payload as an idempotency key so that result-fetching and subsequent processing are performed only once per task run. Directly relevant material includes: the webhook setup guidance showing how a webhook is registered for task runs and how the webhook is intended to notify about task_run.status events, which is the event type you’d rely on for idempotent processing since duplicate notifications may occur. The documentation note that webhooks notify you when a task finishes (but do not send the actual results) is crucial context for where and how idempotency would be applied in a consumer system. Additional guidance discusses the structure and verification of webhook requests—headers, a signature mechanism, and the exact payload shape—which informs how a consumer should validate and deduplicate events securely. The example curl snippet demonstrates how a webhook endpoint is wired into the task run creation request, illustrating a practical integration point where idempotent logic would be exercised. Supporting the concept of deduplication, other excerpts describe the typical fields included in the webhook payload and the notion that the payload represents the event data to be acted upon, reinforcing that a stable idempotency key (such as the run_id) is appropriate for guarding against repeated processing. Finally, you can see that the task results are retrieved via a result endpoint after the run completes, which aligns with ensuring that repeated webhook events do not cause repeated fetching or processing of the same task result if the idempotency key has already completed that cycle.",
      "confidence": "high"
    },
    {
      "field": "parallel_ai_api_introduction.purpose",
      "citations": [
        {
          "title": "What is AI deep research",
          "url": "https://parallel.ai/articles/what-is-deep-research",
          "excerpts": [
            "Parallel Deep Research API**. Parallel takes a fundamentally different approach by building web research infrastructure specifically for AI ...Read more"
          ]
        },
        {
          "title": "Overview - Parallel Documentation",
          "url": "https://docs.parallel.ai/getting-started/overview",
          "excerpts": [
            "Parallel provides a suite of APIs that combine AI inference with live web data to power research, enrichment, and automation workflows.Read more"
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        }
      ],
      "reasoning": "The most relevant excerpt directly states that Parallel has a Deep Research API built to create web research infrastructure specifically for AI, which matches the described purpose of handling open-ended research questions and delivering thorough results with citations. The next most relevant excerpt mentions that Parallel provides APIs that combine AI inference with live web data to power research workflows, enrichment, and automation—this supports the notion of end-to-end research activities enabled by the API. The third excerpt demonstrates concrete usage aligned with the described purpose: it discusses creating a research report on recent academic advancements in web search for LLMs, illustrating how a natural-language research objective is transformed into a structured task (and by implication, a report with outputs). Taken together, these excerpts corroborate the field value by outlining the API’s intended purpose, its integration with live data for research, and a concrete example of producing a detailed, citation-enabled report.",
      "confidence": "high"
    },
    {
      "field": "error_handling_and_best_practices.parallel_ai_error_checking",
      "citations": [
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "Parallel sends a POST request to your URL when the task finishes. Key points: Webhooks notify you when the task completes—they don't send the actual results. ...Read more"
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Task Runs Lifecycle - Parallel",
          "url": "https://docs.parallel.ai/task-api/guides/execute-task-run",
          "excerpts": [
            "A Task Run Result can be accessed once the Task Run status becomes completed . ​. Rate Limits. The Task API enforces a limit of 2,000 requests per minute per ...Read more"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "The run result is available from the `/result` endpoint.",
            "\"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"status\" :  \"running\" ,   \"is_active\" :  true ,   \"processor\" :  \"core\" ,   \"metadata\" : {     \"my_key\" :  \"my_value\"   },   \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,   \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\" }\n",
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}"
          ]
        },
        {
          "title": "Webhook Setup - Parallel",
          "url": "https://docs.parallel.ai/resources/webhook-setup",
          "excerpts": [
            "Your webhook endpoint will receive requests with these headers:\n`webhook-id` : Unique identifier for each webhook event\n`webhook-timestamp` : Unix timestamp in seconds\n`webhook-signature` : One or more versioned signatures (e.g., `v1,<base64 signature>` )",
            "HMAC Signature Verification",
            "<webhook-id>.<webhook-timestamp>.<payload>",
            "Where:\n`<webhook-id>` : The value of the `webhook-id` header\n`<webhook-timestamp>` : The value of the `webhook-timestamp` header\n`<payload>` : The exact JSON body of the webhook request"
          ]
        }
      ],
      "reasoning": "The most relevant excerpts directly support the core idea: webhooks notify you when a task completes, rather than delivering results, so you should rely on webhook payloads to determine status before acting. The webhook setup excerpt confirms that you can register for task_run.status events, which is precisely the mechanism to watch for completion or failure. The statement that a Task Run Result can be accessed only after completion directly validates the condition to guard against premature result fetches. The note that the run result is available from the /result endpoint aligns with how you would fetch results once status is completed. A sample task run payload showing a status field (e.g., running) illustrates the kind of status information the webhook payload would contain, which you should inspect before proceeding. Additional GET endpoints for retrieving runs provide context on how run metadata and status can be queried if needed. Webhook-related headers and signatures are relevant for securely receiving and validating webhook events, which is part of robust error handling in a webhook-driven flow. Collectively, these excerpts establish a practical workflow: register for task_run.status webhooks, inspect the status field in the payload, proceed to fetch /result only when status is completed, and gracefully handle failed status cases instead of calling /result, while ensuring webhook integrity through header/signature handling.",
      "confidence": "high"
    },
    {
      "field": "parallel_ai_result_retrieval_methods.best_for_scenario",
      "citations": [
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Webhook Setup - Parallel",
          "url": "https://docs.parallel.ai/resources/webhook-setup",
          "excerpts": [
            "Webhooks allow you to receive real-time notifications when events occur in your Parallel API operations, eliminating the need for constant polling. ... Task API ...Read more"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "Parallel sends a POST request to your URL when the task finishes. Key points: Webhooks notify you when the task completes—they don't send the actual results. ...Read more"
          ]
        },
        {
          "title": "llms.txt - Parallel Documentation",
          "url": "https://docs.parallel.ai/llms.txt",
          "excerpts": [
            "- [Retrieve Task Run](https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run.md): Retrieves run status by run_id.\nThe run result is available from the `/result` endpoint."
          ]
        },
        {
          "title": "Parallel Web Systems | Web Search & Research APIs Built for AI Agents ",
          "url": "https://parallel.ai/blog/sse-for-tasks",
          "excerpts": [
            "To receive live updates from a task run, establish an SSE connection using the run ID:\n### Establish an SSE connection",
            "SSE for Task Runs is available now in beta across all Parallel Task API processors. Dive into our [documentation](https://docs.parallel.ai/task-api/task-sse) [[documentation] (https://docs.parallel.ai/task-api/task-sse)](https://docs.parallel.ai/task-api/task-sse) to integrate real-time streaming into your application.",
            "SSE streams deliver four categories of real-time updates:\n**** Progress Statistics **** : Live counts of sources scanned, selected, and processed during web research execution.\n**** Message Updates **** : Model reasoning and thought processes as the task progresses through complex multi-hop research.\n**** Status Changes **** : Clear signals when tasks start, complete, or encounter errors.\n**** Error Details **** : Specific error information when issues arise, enabling immediate debugging."
          ]
        }
      ],
      "reasoning": "To support the claim that webhooks are the best practice for production backends in this context, the most directly relevant information comes from excerpts describing how to set up and utilize webhooks with the Parallel Task API. One excerpt explains that a webhook can be registered in a task run creation request and provides concrete curl/SDK usage illustrating how to configure a webhook endpoint and event types, demonstrating practical integration into an application. Another excerpt reiterates the webhook setup process and emphasizes the real-time notification capability as part of how webhooks operate, which aligns with production-ready, event-driven architectures. A third excerpt clarifies that webhooks deliver real-time status updates when events occur, supporting the rationale that this mechanism is suitable for production workflows that should react to task state changes as they happen. Additionally, a separate excerpt indicates that the run status and results can be retrieved via a dedicated endpoint, which complements webhook-driven notifications by enabling consumers to fetch detailed outputs when needed. While there are excerpts describing SSE and polling as alternatives, they are framed as alternatives rather than replacements for the webhook pattern, reinforcing the conclusion that webhooks are the preferred approach in production backends for responsive, cost-efficient integrations. Taken together, these excerpts connect the specific field value by showing that webhooks are a recommended, event-driven mechanism for production systems, with clear guidance on setup and expectations, and while outcomes may also be retrieved via a results endpoint, the primary production pattern emphasized is webhook-driven callbacks rather than polling. This combination of direct webhook setup guidance, real-time update behavior, and the acknowledgment of a separate results endpoint provides coherent support for classifying webhooks as the best-for-scenario in production backends with tools like Trigger.dev.",
      "confidence": "medium"
    },
    {
      "field": "error_handling_and_best_practices.trigger_dev_timeouts",
      "citations": [
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "Parallel sends a POST request to your URL when the task finishes. Key points: Webhooks notify you when the task completes—they don't send the actual results. ...Read more"
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Webhook Setup - Parallel",
          "url": "https://docs.parallel.ai/resources/webhook-setup",
          "excerpts": [
            "Your webhook endpoint will receive requests with these headers:\n`webhook-id` : Unique identifier for each webhook event\n`webhook-timestamp` : Unix timestamp in seconds\n`webhook-signature` : One or more versioned signatures (e.g., `v1,<base64 signature>` )",
            "HMAC Signature Verification",
            "<webhook-id>.<webhook-timestamp>.<payload>",
            "Where:\n`<webhook-id>` : The value of the `webhook-id` header\n`<webhook-timestamp>` : The value of the `webhook-timestamp` header\n`<payload>` : The exact JSON body of the webhook request"
          ]
        },
        {
          "title": "Task Runs Lifecycle - Parallel",
          "url": "https://docs.parallel.ai/task-api/guides/execute-task-run",
          "excerpts": [
            "A Task Run Result can be accessed once the Task Run status becomes completed . ​. Rate Limits. The Task API enforces a limit of 2,000 requests per minute per ...Read more"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "The run result is available from the `/result` endpoint.",
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}",
            "\"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"status\" :  \"running\" ,   \"is_active\" :  true ,   \"processor\" :  \"core\" ,   \"metadata\" : {     \"my_key\" :  \"my_value\"   },   \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,   \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\" }\n"
          ]
        }
      ],
      "reasoning": "The finegrained field value concerns ensuring Trigger.dev does not timeout while waiting for a long-running Parallel.ai Deep Research task to complete and callback via webhook. The most relevant excerpts discuss how webhooks are used to notify you when a task finishes (indicating a completion-then-notification pattern) and what webhook headers and verification look like, which are the mechanisms that would be involved if you were to design a timeout-safe flow in Trigger.dev. Specifically, one excerpt notes that webhooks notify you when the task completes but do not deliver the actual results, highlighting the asynchronous completion model that would be affected by timeouts. Related excerpts explain how to register and validate webhooks (headers, signatures, and payload) and show example webhook-related setup, which is directly pertinent to building a robust integration that can withstand long waits and properly handle callback timing. Other excerpts describe how to fetch task results from endpoints after completion, reinforcing that the long-running task requires an asynchronous retrieval step after webhook notification. However, none of the provided excerpts explicitly state a 45-minute limit or give a recommended timeout value for wait.createToken in Trigger.dev, nor do they provide a direct best-practice guideline for setting a very long timeout. Therefore, while the excerpts support the general architecture of asynchronous task completion and webhook-based callbacks, they do not explicitly confirm the specific timeout guidance requested. The conclusion is that the claim about a 45-minute limit and a suggested 45-minute timeout in wait.createToken is not directly supported by the excerpts; the system would require additional authoritative guidance to assert a recommended timeout value with high confidence.",
      "confidence": "low"
    },
    {
      "field": "parallel_ai_task_creation.beta_header_requirement",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value.",
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs).",
            "Section Title: Create Task Run\nContent:\nCopy page\nInitiates a task run.\nReturns immediately with a run object in status ‘queued’.\nBeta features can be enabled by setting the ‘parallel-beta’ header.\nCopy page\nPOST\n/\nv1\n/\ntasks\n/"
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "I\n```\ncurl  https://api.parallel.ai/v1beta/search  \\   -H  \"Content-Type: application/json\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  \"parallel-beta: search-extract-2025-10-10\"  \\   -d  '{     \"objective\": \"Find latest information about Parallel Web Systems. Focus on new product releases, benchmarks, or company announcements.\",     \"search_queries\": [       \"Parallel Web Systems products\",       \"Parallel Web Systems announcements\"     ],     \"max_results\": 10,     \"excerpts\": {       \"max_chars_per_result\": 10000     }   }'\n```\n[View Search Docs →",
            "h-quickstart)\ncURL Python TypeScript\nCopy\nAsk AI\n```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "llms.txt - Parallel Documentation",
          "url": "https://docs.parallel.ai/llms.txt",
          "excerpts": [
            "- [Create Task Run](https://docs.parallel.ai/api-reference/tasks-v1/create-task-run.md): Initiates a task run. Returns immediately with a run object in status 'queued'. Beta features can be enabled by setting the 'parallel-beta' header."
          ]
        }
      ],
      "reasoning": "The most direct support comes from excerpts that explicitly describe enabling beta features via the parallel-beta header and provide concrete values for webhooks, such as webhook-2025-08-12. This aligns with the field value stating that webhooks require the header parallel-beta: webhook-2025-08-12. Additional excerpts discuss enabling beta features generally through the parallel-beta header, which corroborates that a header mechanism governs beta capabilities. Some excerpts also explicitly show a combined usage scenario where a single header value includes multiple features (e.g., a webhook together with a beta flag), which supports the notion that multiple beta features can be requested together and that values can be specified in the header. The presence of SSE-related beta value in another excerpt (events-sse-2025-07-24) supports the part of the field value relating to SSE, even though the exact comma-separated formatting is not always shown in every excerpt. Together, these excerpts directly substantiate the claim that certain advanced features (webhooks and SSE) are in beta and require specific entries in the parallel-beta header to enable them, and that combining features via the header is possible. The excerpts also provide concrete examples of how to format the header and where to apply it in a task-run creation context, which strengthens the practical applicability of the field value.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.0",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`"
          ]
        }
      ],
      "reasoning": "The most directly relevant piece shows a concrete HTTP request to the endpoint for creating a task run, using POST and targeting the exact URL. This excerpt also demonstrates typical request construction, including the use of headers (such as the API key) and a data payload that contains the input and processor fields, which align with the described purpose of initiating a new Deep Research task run and the associated body content. The next excerpt confirms the exact endpoint URL referenced in the field value, reinforcing the alignment between the service name and the endpoint. The third excerpt details the task run creation payload structure, including which fields are expected in the body (processor and input), supporting the notion of what the request body should contain to start the task run and how additional configurations (e.g., webhook) can be included. Taken together, these excerpts corroborate the field value's claims about the endpoint, method, service, and the intended use to initiate a new Deep Research task run with a structured request body.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.2",
      "citations": [
        {
          "title": "Retrieve Task Run Result - Parallel",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result",
          "excerpts": [
            "{   \"run\" : {     \"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"status\" :  \"completed\" ,     \"is_active\" :  false ,     \"processor\" :  \"core\" ,     \"metadata\" : {       \"my_key\" :  \"my_value\"     },     \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,     \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\"   },   \"output\" : {     \"basis\" : [],     \"type\" :  \"json\" ,     \"content\" : {       \"gdp\" :  \"$3.1 trillion (2023)\"     }   }"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "The run result is available from the `/result` endpoint.",
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}",
            "\"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"status\" :  \"running\" ,   \"is_active\" :  true ,   \"processor\" :  \"core\" ,   \"metadata\" : {     \"my_key\" :  \"my_value\"   },   \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,   \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\" }\n"
          ]
        }
      ],
      "reasoning": "The finegrained field describes an API endpoint for retrieving the final output of a completed task run via a GET request to a specific path, and notes that the endpoint blocks until the task is finished. The most directly supporting excerpt explicitly shows a completed run and includes an output payload, illustrating that the endpoint returns the final content and that the run status is completed. This aligns with the described endpoint being used to retrieve the final result once processing is finished. Another excerpt confirms that the run result is accessible via the /result endpoint, which matches the described path for obtaining the final output. Additional excerpts outline how to retrieve a task run via a corresponding endpoint (including the run_id path and the general notion of retrieving task run data), which provides context for how the endpoint is structured and invoked. Collectively, these excerpts corroborate the existence, purpose, and behavior of the endpoint for fetching the final task result, including that it may return structured content (e.g., JSON) and is meant to be called after completion. The ordering reflects that the most specific confirmation of a completed run and its output supports the finegrained value most strongly, with the other excerpts providing supporting context about the endpoint path and retrieval flow.",
      "confidence": "high"
    },
    {
      "field": "modal_setup_and_configuration.required_dependencies",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "The easiest way to create a web endpoint from an existing Python function is to use the `@modal.fastapi_endpoint` decorator .",
            "This decorator wraps the Modal Function in a FastAPI application .",
            "For ASGI apps, you can create a function decorated with `@modal.asgi_app` that returns a reference to\nyour web app:",
            "When using `@modal.fastapi_endpoint` , you can add [query parameters](https://fastapi.tiangolo.com/tutorial/query-params/) which\nwill be passed to your Function as arguments.",
            "This endpoint definition would be called like so:"
          ]
        },
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "For more detail on setting up functions for invocation over HTTP see the web endpoints guide .\n©"
          ]
        }
      ],
      "reasoning": "The finegrained field value states that the Modal application requires specific Python packages in its container image, explicitly naming fastapi[standard] and httpx, and notes that fastapi handles web endpoints while httpx is used for HTTP requests to the Parallel.ai API. The excerpts show that Modal endpoints can be created using a Python function decorated with a FastAPI wrapper, i.e., the web endpoint is implemented via FastAPI, and that such endpoints can be invoked over HTTP/HTTPS. For example, one excerpt explains that the easiest way to create a web endpoint from an existing Python function is to use the @modal.fastapi_endpoint decorator, which implies FastAPI is part of the endpoint implementation. Another excerpt clarifies that this decorator wraps the Modal Function in a FastAPI application, reinforcing the FastAPI-centric workflow. Additional excerpts discuss query parameters passed to the function and how the endpoint would be called, which aligns with HTTP-based invocation semantics. Collectively, these excerpts support the idea that a container image used by Modal web endpoints involves a Python web framework (FastAPI) and HTTP-based calls, which is consistent with the need for an HTTP client like httpx in the container to talk to external APIs (such as Parallel.ai). However, none of the excerpts explicitly list the exact package names (fastapi[standard], httpx) as dependencies. Therefore, the core claim about the dependency names is supported only indirectly by the described architecture (web endpoints via FastAPI and HTTP interactions) rather than by explicit citation of the package names themselves.",
      "confidence": "medium"
    },
    {
      "field": "api_endpoint_reference.4",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`",
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value.",
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs)."
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Overview - Parallel Documentation",
          "url": "https://docs.parallel.ai/getting-started/overview",
          "excerpts": [
            "Parallel provides a suite of APIs that combine AI inference with live web data to power research, enrichment, and automation workflows.Read more"
          ]
        },
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "For more detail on setting up functions for invocation over HTTP see the web endpoints guide .\n©"
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Webhook Payload Structure\nEach webhook payload contains:\n`timestamp` : ISO 8601 timestamp of when the event occurred\n`type` : Event type\n`data` : Event-specific payload. For the ‘task_run.status’ event, it is the complete [Task Run object](https://docs.parallel.ai/api-reference/task-api-v1/retrieve-task-run)\n"
          ]
        },
        {
          "title": "Task Group",
          "url": "https://docs.parallel.ai/task-api/group-api",
          "excerpts": [
            "The API is comprised of the following endpoints: Creation: To run a batch of tasks in a group, you first need to create a task group, after which you can add ...Read more The Parallel Task Group API enables you to batch process hundreds or thousands of Tasks efficiently."
          ]
        }
      ],
      "reasoning": "The most relevant excerpt directly shows a concrete POST call to the Parallel API’s task runs endpoint, including the need to set an API key header and the use of a JSON body with input and processor fields. This aligns with the described Modal proxy that would securely attach the API key and build the appropriate request payload for creating a task run. Additional excerpts provide concrete structure for the Create Task Run operation, including documentation of headers and body fields (such as processor and input) and example payloads, which reinforces how a proxy endpoint should construct and forward the request. Supporting excerpts discuss the exact endpoint paths for creating a task run, authorization details, and the required body structure, which are essential to implementing a modal-based proxy that calls the proper Parallel.ai endpoints. Contextual excerpts about the overall Parallel API ecosystem and the Modal deployment model offer broader validation that such an integration is feasible and follows established patterns for task runs and web-triggered deployment. Webhook-related excerpts, though not describing the proxy itself, illuminate how asynchronous result delivery and lifecycle events are handled in similar flows, informing robust proxy design. The combination of direct endpoint guidance, required headers, and payload schemas directly supports the finegrained field value’s claim about a Modal-based proxy that creates a Parallel.ai task run by POSTing to the correct endpoint with proper authentication and a well-formed payload.",
      "confidence": "medium"
    },
    {
      "field": "api_endpoint_reference.5",
      "citations": [
        {
          "title": "Retrieve Task Run Result - Parallel",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result",
          "excerpts": [
            "{   \"run\" : {     \"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"status\" :  \"completed\" ,     \"is_active\" :  false ,     \"processor\" :  \"core\" ,     \"metadata\" : {       \"my_key\" :  \"my_value\"     },     \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,     \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\"   },   \"output\" : {     \"basis\" : [],     \"type\" :  \"json\" ,     \"content\" : {       \"gdp\" :  \"$3.1 trillion (2023)\"     }   }"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "The run result is available from the `/result` endpoint."
          ]
        },
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "all deployed web endpoint functions have a stable HTTPS URL ."
          ]
        },
        {
          "title": "Overview - Parallel Documentation",
          "url": "https://docs.parallel.ai/getting-started/overview",
          "excerpts": [
            "Parallel provides a suite of APIs that combine AI inference with live web data to power research, enrichment, and automation workflows.Read more"
          ]
        }
      ],
      "reasoning": "The most directly relevant excerpt confirms that the run result is available from a dedicated /result endpoint and shows the structure of the response, which aligns with the idea of retrieving a final result via /result using a run_id. A second excerpt explicitly states that the run result is obtainable from the /result endpoint, reinforcing the same mechanism. Excerpts describing how Modal can invoke deployed functions or trigger endpoints establish that hosting a function/endpoint on Modal is viable and can be triggered to call external services, which supports the plan of creating a Modal-hosted endpoint that POSTs to the Parallel /result endpoint. Additional contextual excerpts summarize that Parallel offers an API surface and that deployed functions have stable HTTPS URLs, which underpins the feasibility and accessibility of such an endpoint. Taken together, these pieces connect the concept of a Modal-hosted endpoint calling Parallel.ai’s /result, using a run_id to retrieve the final result, and being invocable in a triggerable/HTTP-accessible manner.\n",
      "confidence": "medium"
    },
    {
      "field": "error_handling_and_best_practices.webhook_security",
      "citations": [
        {
          "title": "Webhook Setup - Parallel",
          "url": "https://docs.parallel.ai/resources/webhook-setup",
          "excerpts": [
            "HMAC Signature Verification",
            "Your webhook endpoint will receive requests with these headers:\n`webhook-id` : Unique identifier for each webhook event\n`webhook-timestamp` : Unix timestamp in seconds\n`webhook-signature` : One or more versioned signatures (e.g., `v1,<base64 signature>` )",
            "Where:\n`<webhook-id>` : The value of the `webhook-id` header\n`<webhook-timestamp>` : The value of the `webhook-timestamp` header\n`<payload>` : The exact JSON body of the webhook request",
            "<webhook-id>.<webhook-timestamp>.<payload>"
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "Parallel sends a POST request to your URL when the task finishes. Key points: Webhooks notify you when the task completes—they don't send the actual results. ...Read more"
          ]
        },
        {
          "title": "Task Runs Lifecycle - Parallel",
          "url": "https://docs.parallel.ai/task-api/guides/execute-task-run",
          "excerpts": [
            "A Task Run Result can be accessed once the Task Run status becomes completed . ​. Rate Limits. The Task API enforces a limit of 2,000 requests per minute per ...Read more"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "The run result is available from the `/result` endpoint.",
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}",
            "\"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"status\" :  \"running\" ,   \"is_active\" :  true ,   \"processor\" :  \"core\" ,   \"metadata\" : {     \"my_key\" :  \"my_value\"   },   \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,   \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\" }\n"
          ]
        }
      ],
      "reasoning": "The finegrained field value centers on security practices for webhook handling, specifically that the signature is provided in a header and that there is a recommended pattern involving verification. It also asserts that Trigger.dev Waitpoints provide an abstraction that removes the need for manual signature verification. The most directly supportive content states that a webhook delivers a header named webhook-signature (among other headers like webhook-id and webhook-timestamp) and that HMAC Signature Verification is a discussed topic in the webhook setup documentation. This corroborates the emphasis on signature-based integrity checks and the typical header components used to perform such verification. Additional excerpts describe the exact header fields and their roles (webhook-id, webhook-timestamp, and webhook-signature), which aligns with the claim that signatures are part of the security model. Other excerpts illustrate how webhooks are registered for a task run and how the webhook notification is wired to task events, which supports the context of where signatures and webhooks operate within the workflow. An example snippet shows a curl-based registration call that includes a webhook payload and the event type, which reinforces practical usage of webhooks in this ecosystem. Finally, the cited material discusses that webhooks notify you when a task completes, which provides context for the lifecycle of webhook events but does not contradict the signature-focused security practices. The claim about Trigger.dev Waitpoints abstracting signature verification is not directly evidenced in the excerpts provided, so its support is indirect or unconfirmed within this set. In summary, the strongest support comes from explicit mentions of the webhook-signature header and HMAC verification, along with the standard webhook headers and workflow setup; the assertion about Trigger.dev removing the need for manual verification is only partially supported by implication and not explicitly evidenced in the excerpts.",
      "confidence": "medium"
    },
    {
      "field": "api_endpoint_reference.1.http_method",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}"
          ]
        }
      ],
      "reasoning": "The requested field value is the HTTP method for the second API endpoint reference. The clearest support comes from the excerpt that explicitly shows a request line beginning with GET and includes a concrete path structure (the v1 tasks runs endpoint). This directly confirms that the method used for that endpoint is GET. Other excerpts discuss endpoint results, sample JSON payloads, or general documentation but do not specify the HTTP method for the second endpoint, so they provide context without directly asserting the method. Therefore, the most relevant excerpt is the one that plainly states GET in the request sequence, while the others are less directly relevant since they omit the HTTP method or provide only auxiliary details about endpoints and outputs.",
      "confidence": "high"
    },
    {
      "field": "trigger_dev_webhook_handling_with_waitpoints.feature_overview",
      "citations": [
        {
          "title": "Wait for HTTP callback | Trigger.dev",
          "url": "https://trigger.dev/changelog/wait-for-http-callback",
          "excerpts": [
            "Waitpoint token we give you a URL back that can be passed to a 3rd party. When they're done with the work they can make a POST request to that URL and we'll continue the run with the result.",
            "When Replicate has finished processing the image it will make an HTTP POST request to the URL we gave it. That will complete the Waitpoint and the JSON body is set as the output of the Waitpoint. The run is continued with the output of the Waitpoint.",
            "On the Cloud product we pause the run when you call `wait.forToken()` (so you stop being charged) and then continue the run when the HTTP callback comes in.",
            "It's easier to understand with an example. Here we're going to get [Replicate](https://replicate.com) to generate an image for us in the background."
          ]
        },
        {
          "title": "Wait for token - Trigger.dev",
          "url": "https://trigger.dev/docs/wait-for-token",
          "excerpts": [
            "Waitpoint tokens pause task runs until you complete the token. They’re commonly used for approval workflows and other scenarios where you need to wait for external confirmation, such as human-in-the-loop processes. You can complete a token using the SDK or by making a POST request to the token’s URL.",
            "ST request to the `url` it returns. This is an HTTP callback:\nCopy\nAsk AI\nSection Title: Wait for token > ​\nContent:\n```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; const  token  =  await  wait .createToken ({   timeout :  \"10m\" , }); const  call  =  await  replicate . predictions .create ({   version :  \"27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478\" ,   input :  {     prompt :  \"A painting of a cat by Andy Warhol\" ,   } ,   // pass the provided URL to Replicate's webhook, so they can \"callback\"   webhook :  token .url ,   webhook_events_filter :  [ \"completed\" ] , }); const  prediction  =  await  wait .forToken < Prediction >(token) .unwrap (); // unwrap() throws a timeout error or ",
            "Once you have a token, you can wait for it to be completed using the `wait.forToken` function:"
          ]
        }
      ],
      "reasoning": "The most directly relevant content confirms the core mechanism: creating a token yields a unique URL that can be handed to a third party, which then performs a POST to that URL to continue the run. This aligns with the described design where the callback body becomes the wait output. Supporting excerpts provide concrete examples of using the token URL in practice and show how the wait operation is completed and resumed, including code patterns and the relationship between the HTTP callback and the completed wait. The remaining excerpts add context about the token creation, awaiting completion with wait.forToken, and implications for cloud-based pause/resume behavior, which reinforces the mechanism described in the finegrained field value. In short, the excerpts collectively verify: token creation → unique callback URL → third-party POST to resume → callback body as output, with practical usage details and corroborating examples.",
      "confidence": "high"
    },
    {
      "field": "complete_code_examples.1.language",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "h-quickstart)\ncURL Python TypeScript\nCopy\nAsk AI\n```\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        }
      ],
      "reasoning": "To support the value that TypeScript is a language option in the code examples, we rely on the excerpt that shows a code block label indicating multiple languages, including TypeScript, within a curl-based example context. This directly confirms that TypeScript is among the supported languages for code examples in the documentation. Other excerpts discuss webhook features, headers, task run endpoints, and general Modal usage, which do not directly support or describe TypeScript-specific code examples or language usage. Therefore, the cited excerpt provides the clearest connection to the requested field value, while the rest provide contextual background about API usage but not language specificity.",
      "confidence": "high"
    },
    {
      "field": "trigger_dev_webhook_handling_with_waitpoints.wait_for_token_function",
      "citations": [
        {
          "title": "Wait for HTTP callback | Trigger.dev",
          "url": "https://trigger.dev/changelog/wait-for-http-callback",
          "excerpts": [
            "\n`  import { task, wait } from \"@trigger.dev/sdk\"; const replicate = new Replicate({ auth: process.env.REPLICATE_API_KEY, }); export const generateImage = task({ id: \"generate-image\", run: async () => { // You can create this token from your backend or inside a task const token = await wait.createToken({ timeout: \"10m\", }); await replicate.predictions.create({ version: \"27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478\", input: { prompt: \"A painting of a cat by Andy Warhol\", }, // pass the token url to Replicate's webhook, so they can \"callback\" // 👇 webhook: token.url, webhook_events_filter: [\"completed\"], }); const result = await wait.forToken<Prediction>(token).unwrap(); // unwrap() throws a timeout error or returns the result 👆 return result; }, }); ",
            "When Replicate has finished processing the image it will make an HTTP POST request to the URL we gave it. That will complete the Waitpoint and the JSON body is set as the output of the Waitpoint. The run is continued with the output of the Waitpoint.",
            "On the Cloud product we pause the run when you call `wait.forToken()` (so you stop being charged) and then continue the run when the HTTP callback comes in.",
            "Waitpoint token we give you a URL back that can be passed to a 3rd party. When they're done with the work they can make a POST request to that URL and we'll continue the run with the result.",
            "It's easier to understand with an example. Here we're going to get [Replicate](https://replicate.com) to generate an image for us in the background."
          ]
        },
        {
          "title": "Wait for token - Trigger.dev",
          "url": "https://trigger.dev/docs/wait-for-token",
          "excerpts": [
            "ST request to the `url` it returns. This is an HTTP callback:\nCopy\nAsk AI\nSection Title: Wait for token > ​\nContent:\n```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; const  token  =  await  wait .createToken ({   timeout :  \"10m\" , }); const  call  =  await  replicate . predictions .create ({   version :  \"27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478\" ,   input :  {     prompt :  \"A painting of a cat by Andy Warhol\" ,   } ,   // pass the provided URL to Replicate's webhook, so they can \"callback\"   webhook :  token .url ,   webhook_events_filter :  [ \"completed\" ] , }); const  prediction  =  await  wait .forToken < Prediction >(token) .unwrap (); // unwrap() throws a timeout error or ",
            "```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; type  ApprovalToken  =  {   status :  \"approved\"  |  \"rejected\" ; }; // This must be called inside a task run function const  result  =  await  wait .forToken < ApprovalToken >(tokenId); if  ( result .ok) {   console .log ( \"Token completed\" ,  result . output .status);  // \"approved\" or \"rejected\" }  else  {   console .log ( \"Token timed out\" ,  result .error); }\n```\n",
            "Once you have a token, you can wait for it to be completed using the `wait.forToken` function:"
          ]
        }
      ],
      "reasoning": "The target fine-grained field describes pausing a Trigger.dev run by creating a token for an external asynchronous process and then awaiting a callback via wait.forToken(token), with an optional unwrap to obtain the payload or to error on timeout/failure. The most directly supportive excerpts show the exact pattern: creating a token followed by waiting for that token and optionally unwrapping the result to get the callback payload, which clearly maps to the described function and control flow. Specific passages demonstrate creating the token, invoking the wait.forToken mechanism, and then handling the result (either obtaining the payload or handling errors), which directly validates the described behavior. Additional excerpts discuss the HTTP callback mechanism where an external service posts back to a URL to resume the run, reinforcing that the run is paused until the external system signals completion via a webhook. A few excerpts also illustrate the surrounding code context (e.g., how the webhook URL is passed and how the result is processed), all of which corroborate the same sequence of creating a token, waiting for the external callback, and resuming execution. Taken together, these excerpts consistently support the described workflow and its core elements: token creation, awaiting the token with wait.forToken, optional unwrap handling, and resumption upon external callback.",
      "confidence": "high"
    },
    {
      "field": "parallel_ai_webhook_integration.result_retrieval_step",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value."
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Webhook Setup - Parallel",
          "url": "https://docs.parallel.ai/resources/webhook-setup",
          "excerpts": [
            "Webhooks allow you to receive real-time notifications when events occur in your Parallel API operations, eliminating the need for constant polling. ... Task API ...Read more",
            "{   \"Content-Type\" :  \"application/json\" ,   \"webhook-id\" :  \"whevent_abc123def456\" ,   \"webhook-timestamp\" :  \"1751498975\" ,   \"webhook-signature\" :  \"v1,K5oZfzN95Z9UVu1EsfQmfVNQhnkZ2pj9o9NDN/H/pI4=\" }"
          ]
        }
      ],
      "reasoning": "The fine-grained field value specifies a two-step process: first receive a completion notification via a webhook, then use the run_id provided in that webhook payload to issue a blocking GET request to a dedicated endpoint that returns the final data. The most directly relevant excerpt explicitly references a GET request to a runs endpoint, which matches the described retrieval action using a run_id. This excerpt confirms the pattern of querying a run by its identifier to obtain results, which is the core of the fine-grained field. Supporting context comes from excerpts describing webhooks that notify on completion and provide a URL or payload structure containing identifiers (webhook payloads and webhook setup). Those excerpts reinforce that a webhook delivers the necessary run_id and that the system uses webhooks to trigger subsequent retrieval actions. Additional excerpts illustrate how to register and receive webhook callbacks and the general webhook workflow in the Parallel API ecosystem, which corroborates the two-step flow described in the field value.",
      "confidence": "medium"
    },
    {
      "field": "trigger_dev_job_definition.basic_code_template",
      "citations": [
        {
          "title": "Wait for token - Trigger.dev",
          "url": "https://trigger.dev/docs/wait-for-token",
          "excerpts": [
            "To get started using wait tokens, you need to first create a token using the `wait.createToken` function:",
            "```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; // This can be called anywhere in your codebase, either in a task or in your backend code const  token  =  await  wait .createToken ({   timeout :  \"10m\" ,  // you can optionally specify a timeout for the token });\n```",
            "Once you have a token, you can wait for it to be completed using the `wait.forToken` function:",
            "```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; type  ApprovalToken  =  {   status :  \"approved\"  |  \"rejected\" ; }; // This must be called inside a task run function const  result  =  await  wait .forToken < ApprovalToken >(tokenId); if  ( result .ok) {   console .log ( \"Token completed\" ,  result . output .status);  // \"approved\" or \"rejected\" }  else  {   console .log ( \"Token timed out\" ,  result .error); }\n```\n",
            "plete a token, you can use the `wait.completeToken` function:\nCopy\nAsk AI\n```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; // This can be called anywhere in your codebase, or from an external service, // passing in the token ID and the output of the token await  wait .completeToken < ApprovalToken >(tokenId ,  {   status :  \"approved\" , })",
            "ST request to the `url` it returns. This is an HTTP callback:\nCopy\nAsk AI\nSection Title: Wait for token > ​\nContent:\n```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; const  token  =  await  wait .createToken ({   timeout :  \"10m\" , }); const  call  =  await  replicate . predictions .create ({   version :  \"27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478\" ,   input :  {     prompt :  \"A painting of a cat by Andy Warhol\" ,   } ,   // pass the provided URL to Replicate's webhook, so they can \"callback\"   webhook :  token .url ,   webhook_events_filter :  [ \"completed\" ] , }); const  prediction  =  await  wait .forToken < Prediction >(token) .unwrap (); // unwrap() throws a timeout error or "
          ]
        }
      ],
      "reasoning": "The targeted fine-grained field value defines a modern Trigger.dev job written as a task that imports the SDK, creates a wait token, calls an external service, waits for the token’s completion via a callback, and returns a success result. Excerpts that show the creation of a token using the SDK function wait.createToken demonstrate the exact pattern of instantiating a token within a task or backend code. Excerpts that show awaiting a token’s result with wait.forToken illustrate how to pause execution until an external event completes and to process the output. Excerpts that demonstrate completing a token with wait.completeToken reveal how a task may finalize the token lifecycle and report status. Alongside these, excerpts containing concrete code examples of using the SDK inside a task run function align directly with the given field value’s structure and logic, including imports, the task definition shape, and the typical workflow steps (token creation, external call, token wait, result processing). Additional excerpts that discuss token callbacks, HTTP callbacks, and webhook usage further support the pattern of integrating external services and wait-based synchronization inside a Trigger.dev job. Collectively, these excerpts map very closely to the requested deep research job template, demonstrating the exact import usage, token lifecycle methods, and a run function skeleton that mirrors the provided field value’s structure. The more distant excerpts that describe general documentation or waitpoint concepts provide helpful context but do not directly illustrate the code-level pattern being analyzed.",
      "confidence": "high"
    },
    {
      "field": "trigger_dev_webhook_handling_with_waitpoints.resuming_the_run",
      "citations": [
        {
          "title": "Wait for HTTP callback | Trigger.dev",
          "url": "https://trigger.dev/changelog/wait-for-http-callback",
          "excerpts": [
            "When Replicate has finished processing the image it will make an HTTP POST request to the URL we gave it. That will complete the Waitpoint and the JSON body is set as the output of the Waitpoint. The run is continued with the output of the Waitpoint.",
            "It's easier to understand with an example. Here we're going to get [Replicate](https://replicate.com) to generate an image for us in the background.",
            "Waitpoint token we give you a URL back that can be passed to a 3rd party. When they're done with the work they can make a POST request to that URL and we'll continue the run with the result.",
            "On the Cloud product we pause the run when you call `wait.forToken()` (so you stop being charged) and then continue the run when the HTTP callback comes in.",
            "\n`  import { task, wait } from \"@trigger.dev/sdk\"; const replicate = new Replicate({ auth: process.env.REPLICATE_API_KEY, }); export const generateImage = task({ id: \"generate-image\", run: async () => { // You can create this token from your backend or inside a task const token = await wait.createToken({ timeout: \"10m\", }); await replicate.predictions.create({ version: \"27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478\", input: { prompt: \"A painting of a cat by Andy Warhol\", }, // pass the token url to Replicate's webhook, so they can \"callback\" // 👇 webhook: token.url, webhook_events_filter: [\"completed\"], }); const result = await wait.forToken<Prediction>(token).unwrap(); // unwrap() throws a timeout error or returns the result 👆 return result; }, }); "
          ]
        }
      ],
      "reasoning": "The most relevant excerpts directly describe the core mechanism: a token is created for a webhook URL that an external service can POST to in order to resume the paused run, and the HTTP callback’s JSON body becomes the output of the wait.forToken() call. Specifically, one excerpt states that the JSON body is set as the output of the Waitpoint, which exactly aligns with the field value that the third-party makes an HTTP POST to resume the job and that the payload is returned by the wait.forToken() call. Another excerpt demonstrates an HTTP callback flow where an external process (Replicate) is invoked and, upon completion, posts back to the provided webhook URL to continue execution, illustrating the same resume-and-return pattern. A third excerpt explicitly notes that a waitpoint token gives a URL to a third party, which will POST back to continue the run, matching the described Parallel.ai/Modal scenario. A fourth excerpt reinforces the existence of HTTP callback behavior in the cloud product, where the run is continued when the HTTP callback arrives. A fifth excerpt provides concrete code showing how a token is created, a webhook URL is supplied, and the result is retrieved via wait.forToken(token).unwrap(), which corresponds to capturing the POST payload as the return value. Collectively, these excerpts support the exact flow of pausing a job, receiving a callback POST, and resuming with the callback data as the wait.forToken() result.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.6.purpose",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value."
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Webhook Payload Structure\nEach webhook payload contains:\n`timestamp` : ISO 8601 timestamp of when the event occurred\n`type` : Event type\n`data` : Event-specific payload. For the ‘task_run.status’ event, it is the complete [Task Run object](https://docs.parallel.ai/api-reference/task-api-v1/retrieve-task-run)\n",
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        }
      ],
      "reasoning": "The finegrained field value describes a dynamic Waitpoint URL produced by a wait.createToken, which Parallel.ai uses to POST back when a task completes to resume a paused Trigger.dev job. The most directly relevant information shows that a webhook includes a Callback URL that will receive an HTTP POST when the run completes, which aligns with a dynamic completion URL used to resume downstream workflows. Additionally, the payload structure for task_run.status indicates what data is delivered at completion, which is pertinent for understanding how the resume action would be triggered and what information the resume might rely on. Finally, the documentation on registering a webhook and the event types (including task_run.status) corroborates that completion-time callbacks are a supported mechanism, providing the context for how such a dynamic URL would be invoked in practice. Taken together, these excerpts support the concept of a completion-triggered POST to a dynamic wait endpoint and the kinds of data and events involved in that flow. The remaining excerpt discusses general task run creation inputs and does not directly address the completion callback behavior or the dynamic waitpoint mechanism, so it provides only partial, background relevance. ",
      "confidence": "medium"
    },
    {
      "field": "complete_code_examples.0.description",
      "citations": [
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "There are two ways of invoking deployed functions.",
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "HTTPS is used if the invoking client is not running Python and\ntherefore cannot import the Modal client library.",
            "If the invoking client is\nrunning Python, then the same [Modal client library](https://pypi.org/project/modal/) used to write Modal code"
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "https://docs.parallel.ai/task-api/task-deep-research",
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        }
      ],
      "reasoning": "The fine-grained field value discusses implementing a Modal application that exposes secure FastAPI endpoints to interact with the Parallel.ai API, including an endpoint to create a Deep Research task and another to fetch its final result, with secure storage of API keys via Modal Secrets. Excerpts from the Modal documentation directly address how to invoke deployed functions, which is essential for exposing FastAPI endpoints from a deployed Modal function and calling it from other contexts. They discuss the two primary methods of invocation (either via a Modal client or HTTPS for non-Python clients), and note that deployed functions have stable HTTPS URLs, which is critical for secure endpoint exposure. These excerpts also cover how to trigger a task run via an API call pattern (the create-task-run flow) and the role of authentication headers and bodies, which align with the need to call Parallel.ai endpoints from the Modal app. Additional excerpts reference the existence of the Parallel task API endpoints (such as creating a run) and the Deep Research task context, which supports the overall integration narrative of building a Modal-based bridge to Parallel.ai. Taken together, these excerpts directly support the idea of exposing secure endpoints (via Modal) to create and monitor Deep Research tasks against the Parallel.ai API, including considerations for how clients will invoke the endpoints securely and how the task run lifecycle is initiated. The content about invoking deployed functions, HTTPS usage, and the general call pattern to create tasks maps well to implementing the required endpoints and secure interactions described in the field value.",
      "confidence": "medium"
    },
    {
      "field": "parallel_ai_webhook_integration.notification_payload",
      "citations": [
        {
          "title": "Webhook Setup - Parallel",
          "url": "https://docs.parallel.ai/resources/webhook-setup",
          "excerpts": [
            "{   \"Content-Type\" :  \"application/json\" ,   \"webhook-id\" :  \"whevent_abc123def456\" ,   \"webhook-timestamp\" :  \"1751498975\" ,   \"webhook-signature\" :  \"v1,K5oZfzN95Z9UVu1EsfQmfVNQhnkZ2pj9o9NDN/H/pI4=\" }",
            "Webhooks allow you to receive real-time notifications when events occur in your Parallel API operations, eliminating the need for constant polling. ... Task API ...Read more"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value."
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}"
          ]
        },
        {
          "title": "Wait for HTTP callback | Trigger.dev",
          "url": "https://trigger.dev/changelog/wait-for-http-callback",
          "excerpts": [
            "Waitpoint token we give you a URL back that can be passed to a 3rd party. When they're done with the work they can make a POST request to that URL and we'll continue the run with the result.",
            "\n`  import { task, wait } from \"@trigger.dev/sdk\"; const replicate = new Replicate({ auth: process.env.REPLICATE_API_KEY, }); export const generateImage = task({ id: \"generate-image\", run: async () => { // You can create this token from your backend or inside a task const token = await wait.createToken({ timeout: \"10m\", }); await replicate.predictions.create({ version: \"27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478\", input: { prompt: \"A painting of a cat by Andy Warhol\", }, // pass the token url to Replicate's webhook, so they can \"callback\" // 👇 webhook: token.url, webhook_events_filter: [\"completed\"], }); const result = await wait.forToken<Prediction>(token).unwrap(); // unwrap() throws a timeout error or returns the result 👆 return result; }, }); ",
            "On the Cloud product we pause the run when you call `wait.forToken()` (so you stop being charged) and then continue the run when the HTTP callback comes in.",
            "When Replicate has finished processing the image it will make an HTTP POST request to the URL we gave it. That will complete the Waitpoint and the JSON body is set as the output of the Waitpoint. The run is continued with the output of the Waitpoint."
          ]
        },
        {
          "title": "Wait for token - Trigger.dev",
          "url": "https://trigger.dev/docs/wait-for-token",
          "excerpts": [
            "Waitpoint tokens pause task runs until you complete the token. They’re commonly used for approval workflows and other scenarios where you need to wait for external confirmation, such as human-in-the-loop processes. You can complete a token using the SDK or by making a POST request to the token’s URL."
          ]
        }
      ],
      "reasoning": "The most relevant excerpt provides a concrete webhook example context where a webhook is used to deliver results via a callback URL, indicating that a POST is sent when a run completes. This aligns with the notion that the webhook payload is a notification about the run, which is not the full task output, matching the described notification nature of the payload. The next most relevant excerpt discusses a sample webhook delivery that includes a timestamp, a webhook identifier, a signature, and related metadata in the payload headers, which supports understanding part of the payload structure and authenticity checks. Following that, an excerpt describing how to register a webhook for a task run and specify event types such as task_run.status directly supports the idea that the payload is emitted for status events like completed or failed, and that the status field is a part of the event. Additional excerpts provide broader webhook setup and API visibility context, which helps corroborate that the payload is delivered as part of a webhook notification system, including callback semantics when the run finishes. Less directly supportive excerpts discuss related tooling (wait-for-token, trigger.dev callbacks) and endpoints for retrieving task runs, which provide peripheral context but do not directly specify the webhook payload fields. Together, these excerpts corroborate that the webhook notification payload includes timing metadata, identifiers, and status-oriented data, and that the payload arrives via a callback when the run completes.",
      "confidence": "medium"
    },
    {
      "field": "api_endpoint_reference.1.service",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}",
            "The run result is available from the `/result` endpoint.",
            "\"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"status\" :  \"running\" ,   \"is_active\" :  true ,   \"processor\" :  \"core\" ,   \"metadata\" : {     \"my_key\" :  \"my_value\"   },   \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,   \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\" }\n"
          ]
        },
        {
          "title": "Retrieve Task Run Result - Parallel",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result",
          "excerpts": [
            "{   \"run\" : {     \"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"status\" :  \"completed\" ,     \"is_active\" :  false ,     \"processor\" :  \"core\" ,     \"metadata\" : {       \"my_key\" :  \"my_value\"     },     \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,     \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\"   },   \"output\" : {     \"basis\" : [],     \"type\" :  \"json\" ,     \"content\" : {       \"gdp\" :  \"$3.1 trillion (2023)\"     }   }"
          ]
        },
        {
          "title": "Overview - Parallel Documentation",
          "url": "https://docs.parallel.ai/getting-started/overview",
          "excerpts": [
            "Parallel provides a suite of APIs that combine AI inference with live web data to power research, enrichment, and automation workflows.Read more"
          ]
        }
      ],
      "reasoning": "The target field value identifies the service as Parallel.ai. Excerpts that include the API documentation domain parallel.ai (for example, references to the API reference under the path docs.parallel.ai and the domain itself) directly support the association with Parallel.ai as the service behind the endpoints and documentation. Excerpt describing that the run results and task retrieval are part of the Parallel.ai API reference further reinforces that these excerpts pertain to the same service. Additionally, an excerpt titled as an overview of the Parallel documentation confirms that Parallel provides APIs for AI inference with live data, which aligns with the intended identification of Parallel.ai as the service in question. While one excerpt mentions a general concept of Parallel without the exact domain, it still supports the overall attribution to the Parallel.ai ecosystem as the source of the APIs and documentation. Taken together, these pieces of evidence converge to confirm that the field value Parallel.ai is accurately represented by the provided excerpts.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.1.purpose",
      "citations": [
        {
          "title": "Retrieve Task Run Result - Parallel",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result",
          "excerpts": [
            "{   \"run\" : {     \"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"status\" :  \"completed\" ,     \"is_active\" :  false ,     \"processor\" :  \"core\" ,     \"metadata\" : {       \"my_key\" :  \"my_value\"     },     \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,     \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\"   },   \"output\" : {     \"basis\" : [],     \"type\" :  \"json\" ,     \"content\" : {       \"gdp\" :  \"$3.1 trillion (2023)\"     }   }"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "\"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"status\" :  \"running\" ,   \"is_active\" :  true ,   \"processor\" :  \"core\" ,   \"metadata\" : {     \"my_key\" :  \"my_value\"   },   \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,   \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\" }\n",
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}"
          ]
        }
      ],
      "reasoning": "The fine-grained field value specifies that the purpose is to retrieve the current status and metadata of a specific task run identified by run_id, suitable for polling-based workflows. The most directly relevant material shows a run structure containing run_id, status, is_active, created_at, modified_at, and metadata, which confirms that the endpoint provides access to live status and associated metadata for a particular run. Additionally, the guidance that the run can be retrieved via an endpoint using the run_id aligns with the mechanism to poll or fetch updates for that run. Supporting this, the description that the run result is available at a /result endpoint reinforces the idea of checking status or completion through an endpoint. Collectively, these excerpts substantiate that the API endpoint serves to retrieve current status and metadata for a given run, which matches the described purpose for polling-based monitoring. The excerpt that outlines the general overview of the API suite provides supportive context but is less specific to the status-polling use case, thus it is considered supplementary.\n",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.3.endpoint",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs)."
          ]
        }
      ],
      "reasoning": "The finegrained field value refers to the dedicated events endpoint for a Task Run, which is used to access progress or status events for that run. The most directly relevant excerpt explicitly describes that progress events are recorded for a task run and can be accessed via the Task Run events endpoint, which directly supports the existence and purpose of an events endpoint for task runs. This aligns with the field value’s implication of an events endpoint under the runs API (the specific URL pattern in the field value is not stated in the excerpt, but the described endpoint behavior matches). Other excerpts discuss task run creation, retrieval, and inputs but do not reference the events endpoint itself, thus they provide contextual API usage rather than direct evidence for the events endpoint in question.",
      "confidence": "medium"
    },
    {
      "field": "api_endpoint_reference.6.endpoint",
      "citations": [
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value."
          ]
        }
      ],
      "reasoning": "The field value is a URL-like endpoint associated with an API reference item. The most relevant excerpt directly shows a concrete webhook example containing a URL for the webhook target where events are posted, illustrating how endpoints are represented in requests. The second most relevant excerpt discusses a webhook object that includes a Callback URL (the webhook endpoint) for task completion, further tying the concept of an endpoint URL to the webhook workflow. Other excerpts describe task run input and webhook payload structures but do not show explicit endpoint URL values, so they are less relevant for establishing the exact endpoint field value. Together, these excerpts support the idea that the endpoint field would contain a URL coordinating where callbacks or webhooks are delivered, aligning with the notion of token.url as a placeholder for such an endpoint.",
      "confidence": "medium"
    },
    {
      "field": "trigger_dev_webhook_handling_with_waitpoints.create_token_function",
      "citations": [
        {
          "title": "Wait for HTTP callback | Trigger.dev",
          "url": "https://trigger.dev/changelog/wait-for-http-callback",
          "excerpts": [
            "\n`  import { task, wait } from \"@trigger.dev/sdk\"; const replicate = new Replicate({ auth: process.env.REPLICATE_API_KEY, }); export const generateImage = task({ id: \"generate-image\", run: async () => { // You can create this token from your backend or inside a task const token = await wait.createToken({ timeout: \"10m\", }); await replicate.predictions.create({ version: \"27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478\", input: { prompt: \"A painting of a cat by Andy Warhol\", }, // pass the token url to Replicate's webhook, so they can \"callback\" // 👇 webhook: token.url, webhook_events_filter: [\"completed\"], }); const result = await wait.forToken<Prediction>(token).unwrap(); // unwrap() throws a timeout error or returns the result 👆 return result; }, }); ",
            "Waitpoint token we give you a URL back that can be passed to a 3rd party. When they're done with the work they can make a POST request to that URL and we'll continue the run with the result.",
            "When Replicate has finished processing the image it will make an HTTP POST request to the URL we gave it. That will complete the Waitpoint and the JSON body is set as the output of the Waitpoint. The run is continued with the output of the Waitpoint.",
            "On the Cloud product we pause the run when you call `wait.forToken()` (so you stop being charged) and then continue the run when the HTTP callback comes in."
          ]
        },
        {
          "title": "Wait for token - Trigger.dev",
          "url": "https://trigger.dev/docs/wait-for-token",
          "excerpts": [
            "ST request to the `url` it returns. This is an HTTP callback:\nCopy\nAsk AI\nSection Title: Wait for token > ​\nContent:\n```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; const  token  =  await  wait .createToken ({   timeout :  \"10m\" , }); const  call  =  await  replicate . predictions .create ({   version :  \"27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478\" ,   input :  {     prompt :  \"A painting of a cat by Andy Warhol\" ,   } ,   // pass the provided URL to Replicate's webhook, so they can \"callback\"   webhook :  token .url ,   webhook_events_filter :  [ \"completed\" ] , }); const  prediction  =  await  wait .forToken < Prediction >(token) .unwrap (); // unwrap() throws a timeout error or ",
            "```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; type  ApprovalToken  =  {   status :  \"approved\"  |  \"rejected\" ; }; // This must be called inside a task run function const  result  =  await  wait .forToken < ApprovalToken >(tokenId); if  ( result .ok) {   console .log ( \"Token completed\" ,  result . output .status);  // \"approved\" or \"rejected\" }  else  {   console .log ( \"Token timed out\" ,  result .error); }\n```\n",
            "Waitpoint tokens pause task runs until you complete the token. They’re commonly used for approval workflows and other scenarios where you need to wait for external confirmation, such as human-in-the-loop processes. You can complete a token using the SDK or by making a POST request to the token’s URL.",
            "Once you have a token, you can wait for it to be completed using the `wait.forToken` function:"
          ]
        }
      ],
      "reasoning": "The fine-grained field value centers on the createToken function in a task's run method producing a token and a callback URL, and on passing that URL to an external service (as webhook.url) so that the external service can callback later to continue the workflow. The most directly relevant excerpt includes explicit use of createToken and the token’s URL, including the pattern where the webhook URL from the token is provided to an external service (Replicate) for callbacks, and where the code awaits the token’s resolution via forToken. Another highly relevant excerpt shows the explicit wiring of the webhook URL to the external service and the subsequent await/unwrap pattern for the token, including the token’s URL being used in the webhook field. Excerpts describing the general HTTP callback mechanism and how a 3rd party can post back to a provided URL further support the mechanism by which the webhook would signal completion and resume the run. Together these excerpts establish that the token creator yields a token and URL, that the URL is supplied to an external service via a webhook, and that the system waits for a callback to continue, which matches the described field value. The remaining excerpts provide broader context on waiting behavior and token handling, reinforcing the pattern but contributing less directly to the exact URL webhook wiring or the specific createToken invocation details. ",
      "confidence": "high"
    },
    {
      "field": "complete_code_examples.1.description",
      "citations": [
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "There are two ways of invoking deployed functions.",
            "If the invoking client is\nrunning Python, then the same [Modal client library](https://pypi.org/project/modal/) used to write Modal code",
            "HTTPS is used if the invoking client is not running Python and\ntherefore cannot import the Modal client library."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "Note that web endpoints, like everything else on Modal, only run when they need\nto. When you hit the web endpoint the first time, it will boot up the container,\nwhich might take a few seconds. Modal keeps the container alive for a short\nperiod in case there are subsequent requests. If there are a lot of requests,\nModal might create more containers running in parallel.",
            "You can also deploy your app and create a persistent web endpoint in the cloud\nby running `modal deploy` :",
            "This decorator wraps the Modal Function in a FastAPI application .",
            "This endpoint definition would be called like so:",
            "When using `@modal.fastapi_endpoint` , you can add [query parameters](https://fastapi.tiangolo.com/tutorial/query-params/) which\nwill be passed to your Function as arguments.",
            "For ASGI apps, you can create a function decorated with `@modal.asgi_app` that returns a reference to\nyour web app:"
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "-H  \"x-api-key:  $PARALLEL_API_KEY \"",
            "https://api.parallel.ai/v1/tasks/runs",
            "https://docs.parallel.ai/task-api/task-deep-research"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        }
      ],
      "reasoning": "The finegrained field describes a specific orchestration workflow: a Trigger.dev v4 task that uses Modal to trigger Parallel.ai Deep Research API, leveraging a webhook generated via wait.createToken, routing the webhook to a Modal /create endpoint, pausing with wait.forToken, and then resuming to fetch results via the Modal /result endpoint. Excerpts that discuss invoking deployed functions and how webhooks and endpoints are structured provide direct support for these components: a. Modal exposes deployed functions via stable HTTPS endpoints, which is essential for triggering the Parallel.ai call from Trigger.dev. b. The webhooks mechanism is used to boot, invoke, and resume processing, including notes about how web endpoints are invoked, boot timing, and how persistent endpoints can be deployed. c. Reference material shows how to call a Modal function over HTTPS, including how endpoints are defined and how the function may be invoked from external contexts, which aligns with triggering a /create call and later polling the /result. d. The Parallel API references give the concrete endpoint surface for creating task runs and the required fields like input and processor, which would be used by the Trigger.dev task to request a Parallel.ai run and then fetch the final report. e. Additional excerpts illustrate how to construct the API request to Parallel (including required headers and payload shape) and how to wire in the webhook URL to receive completion signals, which matches the described webhook-based orchestration flow. f. Details about how to access final results via the appropriate endpoint after the webhook signals completion, and how to pass through to the final Modal result call, corroborate the end-to-end narrative. Together, these excerpts substantiate the core mechanisms (Modal deployed functions with HTTPS endpoints, webhooks with token-based pause/resume, and Parallel API task creation and result retrieval) required by the specified finegrained field value. The most relevant portions are those that directly address invoking deployed functions, webhook-based triggers, and the web endpoints' behavior, followed by those that describe the Parallel API call surface and how a final result is retrieved.",
      "confidence": "medium"
    },
    {
      "field": "api_endpoint_reference.3.http_method",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        }
      ],
      "reasoning": "The field value to assess is the HTTP method for the endpoint referenced in the document path. The most relevant content is a concrete example showing how to call the endpoint with an HTTP POST request to /v1/tasks/runs, including the method, header usage, and payload. This directly indicates that the method used for this endpoint in the example is POST, which contradicts the target value of GET. The other excerpt provides a general link to the Parallel API and mentions the endpoint in a curl command context, but it does not specify an HTTP method, so it offers contextual support without confirming GET. Since the analysis focuses on whether the described endpoint uses GET, the explicit POST example is the strongest evidence and should be treated as disconfirming the target value. The contextual reference to the endpoint without a method contributes partial context but does not alter the conclusion drawn from the explicit POST demonstration.",
      "confidence": "low"
    },
    {
      "field": "api_endpoint_reference.1.endpoint",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}",
            "The run result is available from the `/result` endpoint.",
            "\"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"status\" :  \"running\" ,   \"is_active\" :  true ,   \"processor\" :  \"core\" ,   \"metadata\" : {     \"my_key\" :  \"my_value\"   },   \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,   \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\" }\n"
          ]
        },
        {
          "title": "Retrieve Task Run Result - Parallel",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result",
          "excerpts": [
            "{   \"run\" : {     \"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"status\" :  \"completed\" ,     \"is_active\" :  false ,     \"processor\" :  \"core\" ,     \"metadata\" : {       \"my_key\" :  \"my_value\"     },     \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,     \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\"   },   \"output\" : {     \"basis\" : [],     \"type\" :  \"json\" ,     \"content\" : {       \"gdp\" :  \"$3.1 trillion (2023)\"     }   }"
          ]
        },
        {
          "title": "Overview - Parallel Documentation",
          "url": "https://docs.parallel.ai/getting-started/overview",
          "excerpts": [
            "Parallel provides a suite of APIs that combine AI inference with live web data to power research, enrichment, and automation workflows.Read more"
          ]
        }
      ],
      "reasoning": "The target endpoint value corresponds to the pattern used to access a specific task run in the Parallel API. The most directly relevant excerpt explicitly shows a similar endpoint pattern: a GET request to /v1/tasks/runs/{run_id}, which aligns with the base URL structure and resource path in the requested endpoint. This provides the clearest corroboration of the endpoint path, validating the exact style and resource being referenced in the finegrained field. Additional supporting context comes from excerpts describing how to retrieve the task run result and the existence of a dedicated result endpoint, which reinforces the overall flow of obtaining details about a run from the Parallel API. While the other excerpts do not show the exact endpoint, they describe related resources and operations (such as retrieving a run result and the general overview of the API) that contextualize the endpoint within the same task-run lifecycle.",
      "confidence": "medium"
    },
    {
      "field": "complete_code_examples.0.code",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run\nContent:\nCopy page\nInitiates a task run.\nReturns immediately with a run object in status ‘queued’.\nBeta features can be enabled by setting the ‘parallel-beta’ header.\nCopy page\nPOST\n/\nv1\n/\ntasks\n/",
            "​\ntask_spec\nTaskSpec · object\nTask specification. If unspecified, defaults to auto output schema."
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "There are two ways of invoking deployed functions.",
            "If the invoking client is\nrunning Python, then the same [Modal client library](https://pypi.org/project/modal/) used to write Modal code",
            "HTTPS is used if the invoking client is not running Python and\ntherefore cannot import the Modal client library.",
            "all deployed web endpoint functions have a stable HTTPS URL ."
          ]
        }
      ],
      "reasoning": "The finegrained field value is a complete code example for a Modal-based web service that authenticates requests, forwards a payload to the Parallel API to initiate a task run, optionally enables events or a webhook, and streams results. Excerpts that show the exact external API interaction to start a run (the POST to the Parallel API v1/tasks/runs with input and processor fields, plus optional task_spec, enable_events, webhook and beta headers) are directly relevant to implementing the external call path in the Modal function. The most directly relevant pieces demonstrate the endpoint to call, the required headers, the shape of the payload, and how to handle responses, which align with the provided code’s payload construction and API usage. Additional excerpts describe the Parallel API’s task-run lifecycle and the exact fields that can be sent (input, processor, webhook, enable_events, task_spec), which corroborate the field requirements and optional features used in the code. Excerpts discussing how to invoke deployed functions in Modal (and triggering via POST endpoints) provide the orchestration and invocation model that the code relies on, including how to expose a fastapi_endpoint, apply bearer token auth, and return JSON results, which is the surrounding implementation pattern the code fits into. Some excerpts also mention the exact task-run URL and authentication header usage, supporting the idea of wiring an API client from within a Modal function to call the correct endpoint with proper authentication. Other excerpts touching on webhook support and SSE/beta features help justify optional enhancements shown in the code (webhook configuration, events-sse-2025-07-24), even if they are not all exercised in the provided snippet. Finally, one excerpt confirms the existence of the Create Task Run and related fields (processor, input, task_spec, webhook, events, headers) that the code leverages, reinforcing the correctness of the data model used in the request payload.",
      "confidence": "high"
    },
    {
      "field": "complete_code_examples.1.code",
      "citations": [
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "There are two ways of invoking deployed functions.",
            "If the invoking client is\nrunning Python, then the same [Modal client library](https://pypi.org/project/modal/) used to write Modal code",
            "HTTPS is used if the invoking client is not running Python and\ntherefore cannot import the Modal client library."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://modal.com/docs/guide/webhooks",
          "excerpts": [
            "This decorator wraps the Modal Function in a FastAPI application .",
            "Note that web endpoints, like everything else on Modal, only run when they need\nto. When you hit the web endpoint the first time, it will boot up the container,\nwhich might take a few seconds. Modal keeps the container alive for a short\nperiod in case there are subsequent requests. If there are a lot of requests,\nModal might create more containers running in parallel.",
            "You can also deploy your app and create a persistent web endpoint in the cloud\nby running `modal deploy` :",
            "This endpoint definition would be called like so:",
            "For ASGI apps, you can create a function decorated with `@modal.asgi_app` that returns a reference to\nyour web app:",
            "When using `@modal.fastapi_endpoint` , you can add [query parameters](https://fastapi.tiangolo.com/tutorial/query-params/) which\nwill be passed to your Function as arguments."
          ]
        }
      ],
      "reasoning": "The finegrained field value describes a complete implementation pattern: use Trigger/Modal to orchestrate a Parallel task run, provide a webhook URL for the callback, wait for the webhook payload, and finally fetch and return the result via a Modal endpoint. The most relevant excerpts describe invoking deployed functions with Modal, noting that deployed web endpoints have stable HTTPS URLs, and that webhooks wrap Modal functions and trigger/endpoint behavior. Specific excerpts explain: (a) the concept of triggering a deployed function via Modal and the existence of stable HTTPS endpoints, which is essential for the integration pattern in the code; (b) how webhooks are used to receive asynchronous callbacks and how a function endpoint can be wrapped and exposed; (c) how endpoints are deployed and persist as cloud endpoints, which aligns with the need to call a Modal endpoint from Trigger.dev; (d) the mechanics of querying or addressing the endpoint in a real deployment (defining how the endpoint would be called, parameters, and webhook usage); (e) the notion that you can deploy apps and maintain persistent web endpoints in the cloud, which supports the deployment strategy shown in the code. Taken together, these excerpts support the idea of orchestrating a Parallel task via a Modal endpoint, wiring in a webhook for completion notification, and subsequently retrieving results through a Modal-based result endpoint. The remaining excerpts further corroborate the endpoint invocation mechanics and the structure of deployed functions, reinforcing the overall integration pattern demonstrated by the code snippet.",
      "confidence": "high"
    },
    {
      "field": "trigger_dev_job_definition.job_creation_syntax",
      "citations": [
        {
          "title": "Wait for token - Trigger.dev",
          "url": "https://trigger.dev/docs/wait-for-token",
          "excerpts": [
            "```\nimport  { wait }  from  \"@trigger.dev/sdk\" ; // This can be called anywhere in your codebase, either in a task or in your backend code const  token  =  await  wait .createToken ({   timeout :  \"10m\" ,  // you can optionally specify a timeout for the token });\n```"
          ]
        },
        {
          "title": "Welcome to the Trigger.dev docs - Trigger.dev",
          "url": "https://trigger.dev/docs/introduction",
          "excerpts": [
            "Trigger.dev is an open source background jobs framework that lets you write reliable workflows in plain async code.Read more"
          ]
        }
      ],
      "reasoning": "The fine-grained field value describes defining a background job by using the task function imported from the Trigger.dev SDK and exporting a constant assigned to the result of calling that function, passing an object with a unique id and an async run function that accepts io and params. The most directly relevant excerpt confirms that Trigger.dev is a background jobs framework, establishing the context that jobs are a first-class concept in Trigger.dev. It also explicitly notes that code paths may involve a task, as indicated by the statement that the code can be used either in a task or in backend code. The other referenced content reinforces this context by showing typical usage patterns within the Trigger.dev ecosystem (e.g., importing from the Trigger.dev SDK and invoking functions like createToken within a task). Taken together, these excerpts support the idea that a background job in Trigger.dev is defined in code by using a task() constructor from the SDK and then providing the job metadata and run logic, consistent with the described field value.",
      "confidence": "medium"
    },
    {
      "field": "api_endpoint_reference.3.service",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs)."
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Retrieve Task Run Result - Parallel",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result",
          "excerpts": [
            "{   \"run\" : {     \"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"status\" :  \"completed\" ,     \"is_active\" :  false ,     \"processor\" :  \"core\" ,     \"metadata\" : {       \"my_key\" :  \"my_value\"     },     \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,     \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\"   },   \"output\" : {     \"basis\" : [],     \"type\" :  \"json\" ,     \"content\" : {       \"gdp\" :  \"$3.1 trillion (2023)\"     }   }"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "\"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"status\" :  \"running\" ,   \"is_active\" :  true ,   \"processor\" :  \"core\" ,   \"metadata\" : {     \"my_key\" :  \"my_value\"   },   \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,   \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\" }\n"
          ]
        }
      ],
      "reasoning": "The most directly relevant excerpt shows an API call to the Parallel.ai endpoint (https://api.parallel.ai), which explicitly identifies the service at the API host level. Closely related are excerpts that reference Parallel.ai in documentation or task-related pages, confirming the same service context: one excerpt describes the documentation site for Parallel.ai, and another links to Parallel Documentation, which anchors the service identity. Additional excerpts that mention the term Parallel in the context of task runs and retrievals reinforce the association with Parallel.ai as the service powering the endpoints described (even if they don’t show the exact host name, the context of a Parallel.ai task platform is evident). These collectively support the finegrained field value that the referenced service is Parallel.ai. The remaining excerpt that discusses general task input without naming the service provides context for how the API is used but does not directly reinforce the service identity, making it the least supportive among the relevant set.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.6.http_method",
      "citations": [
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value."
          ]
        }
      ],
      "reasoning": "The field seeks to identify the HTTP method used by a particular API endpoint reference. The most direct support comes from an excerpt that shows an explicit HTTP method in a real API call: a curl command that makes a POST request to the Parallel API endpoint for creating task runs (the method visible is POST). This directly confirms that POST is the intended HTTP method for that endpoint. A secondary piece of support comes from another excerpt noting that the API uses HTTP POST as the method for webhook callbacks (the webhook payload is delivered via an HTTP POST when the run completes). This corroborates that POST is a common HTTP method used in related API interactions within this Parallel API context. Taken together, these excerpts align with POST as the HTTP method in the specified API endpoint reference. ",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.0.service",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        }
      ],
      "reasoning": "The fine-grained field value corresponds to the service referenced by the API endpoints. The excerpts collectively confirm details about the Parallel.ai service and its task-endpoint usage. Specifically, the most directly relevant content identifies Parallel Documentation and provides the API URL for Parallel, illustrating how to interact with the service programmatically (for example, the endpoint https://api.parallel.ai/v1/tasks/runs and the general documentation). A subsequent excerpt expands on how to create a task run via the Parallel API and mentions the required headers and body structure, reinforcing the connection to the Parallel.ai service and its task-run interface. Another excerpt reinforces this by referencing the Parallel Documentation and the same API endpoint, underscoring the service context and how a consumer would initiate a task run. Taken together, these excerpts support that the fine-grained field value pertains to the Parallel.ai service and its endpoints used for task runs, which is central to building a modal function that calls the correct parallel.ai endpoints from within a trigger.dev workflow.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.3.purpose",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs)."
          ]
        },
        {
          "title": "Retrieve Task Run Result - Parallel",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result",
          "excerpts": [
            "{   \"run\" : {     \"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"status\" :  \"completed\" ,     \"is_active\" :  false ,     \"processor\" :  \"core\" ,     \"metadata\" : {       \"my_key\" :  \"my_value\"     },     \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,     \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\"   },   \"output\" : {     \"basis\" : [],     \"type\" :  \"json\" ,     \"content\" : {       \"gdp\" :  \"$3.1 trillion (2023)\"     }   }"
          ]
        }
      ],
      "reasoning": "The requested field value asserts that real-time progress updates are streamed via Server-Sent Events (SSE) and that enabling this requires a flag enable_events set to true during task creation. The most relevant excerpt explicitly describes that progress events are recorded and can be accessed via the Task Run events endpoint, and that enabling this feature in requests involves including enable_events (through a specific header or beta flag). This directly supports the idea of streaming progress updates and the need to enable the feature at task creation time. A closely related excerpt reiterates that progress events are recorded and accessible via an endpoint, and it explains how to enable the feature by supplying enable_events as part of the request (e.g., in headers or beta parameters). Both excerpts together establish (a) that progress streaming exists via an events mechanism and (b) that enabling it requires enable_events to be true at task creation. Other excerpts describe task run results, run status, and example payloads which provide peripheral context but do not specifically reinforce the SSE streaming requirement or the enable_events prerequisite. Therefore, the first two excerpts are the strongest support for the finegrained field value, with the remaining excerpts offering ancillary context.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.4.http_method",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        }
      ],
      "reasoning": "The finegrained field value specifies that the HTTP method for a particular API endpoint reference is POST. The most direct support appears in the curl example which explicitly uses -X POST, indicating a POST request to the API endpoint for creating a task run. This aligns with the field path’s focus on the HTTP method for an API endpoint reference. Other excerpts discuss input schemas, headers, or related concepts but do not provide explicit evidence about the HTTP method, so they offer contextual support without contradicting the POST method. Therefore, the POST method is directly supported by the explicit method indication in the curl example, and other excerpts do not undermine this claim.",
      "confidence": "high"
    },
    {
      "field": "parallel_ai_webhook_integration.security_verification",
      "citations": [
        {
          "title": "Webhook Setup - Parallel",
          "url": "https://docs.parallel.ai/resources/webhook-setup",
          "excerpts": [
            "{   \"Content-Type\" :  \"application/json\" ,   \"webhook-id\" :  \"whevent_abc123def456\" ,   \"webhook-timestamp\" :  \"1751498975\" ,   \"webhook-signature\" :  \"v1,K5oZfzN95Z9UVu1EsfQmfVNQhnkZ2pj9o9NDN/H/pI4=\" }",
            "Webhooks allow you to receive real-time notifications when events occur in your Parallel API operations, eliminating the need for constant polling. ... Task API ...Read more"
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}"
          ]
        }
      ],
      "reasoning": "The core of the field value asserts that webhooks from Parallel.ai are signed using a specific HMAC-SHA256 mechanism, with the signature provided in a webhook-signature HTTP header. The excerpts confirm a webhook-signature header is present in practice, illustrating that a signature is indeed transmitted as part of webhook data. This directly supports the concept of signature-based verification. Additionally, the field value notes that verification should compare the computed signature to the header in a timing-safe way, which aligns with standard webhook security patterns discussed in the Parallel webhook context. The excerpts also show practical implementation details for webhooks: how to register a webhook for a task run and specify a webhook URL, as well as example payload headers and how a callback URL is used to receive the webhook, which provides end-to-end context for how the verification workflow fits into actual webhook handling. Taken together, these pieces support the existence of a signed webhook mechanism and the typical verification workflow, even though the exact phrasing about pre-authenticated Trigger.dev token URLs is not exhaustively demonstrated in the excerpts. The combination of a webhook-signature header, explicit webhook registration and a callback URL demonstrates a coherent, verifiable webhook integration story relevant to the field value.",
      "confidence": "medium"
    },
    {
      "field": "api_endpoint_reference.5.endpoint",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "The run result is available from the `/result` endpoint."
          ]
        }
      ],
      "reasoning": "The target field value refers to the endpoint path used to access deep research results. The excerpt states that the run result is available from the '/result' endpoint, which directly aligns with the concept of an endpoint used to retrieve results of a task. This supports the idea that an endpoint exists to fetch results (the same semantic role as the requested path). While other excerpts discuss task retrieval or deployment basics, they do not mention a result-specific endpoint as explicitly as the cited excerpt, making them less directly supportive of the exact endpoint path in question.",
      "confidence": "medium"
    },
    {
      "field": "api_endpoint_reference.2.http_method",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}"
          ]
        }
      ],
      "reasoning": "The field value we are validating is the HTTP method used for a specific API endpoint, identified by the path on the endpoint reference. The most relevant excerpt explicitly presents the HTTP verb and the endpoint path: 'GET / v1 / tasks / runs / {run_id}'. This directly confirms that the method is GET and shows the endpoint pattern used to retrieve run information, which directly supports the field value. Other excerpts discuss the result retrieval or contain the run metadata, but they do not specify the HTTP method for the endpoint, making them less relevant to the exact field value being analyzed.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.0.http_method",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`"
          ]
        }
      ],
      "reasoning": "The specific field value asserts that the HTTP method is POST for the first API endpoint reference. The strongest support comes from the excerpt that shows a curl command with -X POST and the URL https://api.parallel.ai/v1/tasks/runs, which directly demonstrates both the method and the target endpoint. Additional excerpts corroborate this context: one excerpt mentions the same endpoint URL (https://api.parallel.ai/v1/tasks/runs) in a Quickstart context, reinforcing that this endpoint is used to create or run tasks; another excerpt discusses creating a task run with headers and body and references the same endpoint family, indicating the standard way to invoke a task run via the API, including necessary headers and JSON payload. Collectively, these excerpts support that the endpoint is used to initiate task runs and that POST is the appropriate HTTP method for that operation. The direct, explicit POST in the curl invocation is the principal evidence, with the other excerpts providing contextual confirmation of endpoint usage and request structure.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.4.service",
      "citations": [
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "For more detail on setting up functions for invocation over HTTP see the web endpoints guide .\n©"
          ]
        }
      ],
      "reasoning": "The requested fine-grained field value is 'Modal', and the path points to a service description for API endpoint invocation via Modal. Excerpts that discuss Modal as a platform to invoke deployed functions and provide the notion of stable HTTPS endpoints for those functions are directly aligned with the field value. Specifically, one excerpt states that Modal lets you take a function created by a deployment and call it from other contexts, which directly maps to invoking deployed functions. Another excerpt notes that all deployed web endpoint functions have a stable HTTPS URL, reinforcing how Modal serves as an invocation mechanism with HTTP access. A further excerpt suggests consulting additional HTTP invocation details via related web endpoints, which is conceptually connected to triggering Modal-managed functions. Collectively, these excerpts provide strong, direct support for the field value and its use case.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.2.endpoint",
      "citations": [
        {
          "title": "Retrieve Task Run Result - Parallel",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result",
          "excerpts": [
            "{   \"run\" : {     \"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"status\" :  \"completed\" ,     \"is_active\" :  false ,     \"processor\" :  \"core\" ,     \"metadata\" : {       \"my_key\" :  \"my_value\"     },     \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,     \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\"   },   \"output\" : {     \"basis\" : [],     \"type\" :  \"json\" ,     \"content\" : {       \"gdp\" :  \"$3.1 trillion (2023)\"     }   }"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "The run result is available from the `/result` endpoint.",
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}",
            "\"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"status\" :  \"running\" ,   \"is_active\" :  true ,   \"processor\" :  \"core\" ,   \"metadata\" : {     \"my_key\" :  \"my_value\"   },   \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,   \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\" }\n"
          ]
        }
      ],
      "reasoning": "The target value identifies the endpoint for fetching a task run result as the path that includes /result under the parallel.ai API. An excerpt that names the retrieve-task-run-result reference and points to the official document corroborates the existence and purpose of the result endpoint. A second excerpt explicitly states that the run result is available from the /result endpoint, directly aligning with the pattern of accessing results via a dedicated endpoint. A third excerpt shows a concrete HTTP GET path pattern for tasks/runs, illustrating how to address a run by run_id, which supports the general mechanism of accessing a specific run and, by extension, its result via a subsequent endpoint. A fourth excerpt provides live run metadata and status information, which further contextualizes that there is an active run whose result can be retrieved, reinforcing that a result endpoint is the intended access point. Taken together, these excerpts collectively support the existence and usage of a dedicated endpoint for retrieving a task run result, consistent with the requested value. The most direct alignment is with the explicit mention of the retrieve-task-run-result reference, followed by the explicit mention of the /result endpoint, then the concrete run-path pattern, and finally the run state context that reinforces the retrieval flow.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.2.purpose",
      "citations": [
        {
          "title": "Retrieve Task Run Result - Parallel",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result",
          "excerpts": [
            "{   \"run\" : {     \"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"status\" :  \"completed\" ,     \"is_active\" :  false ,     \"processor\" :  \"core\" ,     \"metadata\" : {       \"my_key\" :  \"my_value\"     },     \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,     \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\"   },   \"output\" : {     \"basis\" : [],     \"type\" :  \"json\" ,     \"content\" : {       \"gdp\" :  \"$3.1 trillion (2023)\"     }   }"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "The run result is available from the `/result` endpoint.",
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}",
            "\"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"status\" :  \"running\" ,   \"is_active\" :  true ,   \"processor\" :  \"core\" ,   \"metadata\" : {     \"my_key\" :  \"my_value\"   },   \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,   \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\" }\n"
          ]
        }
      ],
      "reasoning": "The most relevant excerpt explicitly presents a retrieve-task-run-result flow with a completed run and an output structure, including an example where the content is available and the status is completed. This directly aligns with the idea of retrieving the final output of a completed task run. The next relevant excerpt notes that the run result is available from a designated result endpoint, which reinforces the concept of finalizing and retrieving output after completion. A third excerpt provides the general API path pattern for accessing runs, which helps contextualize how an endpoint would be addressed in practice for retrieving results. The least relevant excerpt shows a run in a running state, illustrating the opposite of the target condition (not completed yet), and thus offers useful contrast but does not support the stated purpose as strongly. Altogether, these excerpts coherently map to the field value by illustrating the workflow of completing a task and then retrieving its final output, as well as where to access that output and the blocking nature implied by awaiting completion or a completion state.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.2.service",
      "citations": [
        {
          "title": "Retrieve Task Run Result - Parallel",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result",
          "excerpts": [
            "{   \"run\" : {     \"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"status\" :  \"completed\" ,     \"is_active\" :  false ,     \"processor\" :  \"core\" ,     \"metadata\" : {       \"my_key\" :  \"my_value\"     },     \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,     \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\"   },   \"output\" : {     \"basis\" : [],     \"type\" :  \"json\" ,     \"content\" : {       \"gdp\" :  \"$3.1 trillion (2023)\"     }   }"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "The run result is available from the `/result` endpoint.",
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}",
            "\"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,   \"status\" :  \"running\" ,   \"is_active\" :  true ,   \"processor\" :  \"core\" ,   \"metadata\" : {     \"my_key\" :  \"my_value\"   },   \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,   \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\" }\n"
          ]
        }
      ],
      "reasoning": "The target field value is Parallel.ai, associated with an API endpoint reference. The most relevant excerpt directly references Parallel.ai in the context of an API reference from the provider, demonstrating that the documentation and endpoints belong to Parallel.ai. This supports the notion that the service behind the endpoint is Parallel.ai. The other excerpts discuss API endpoints and run retrieval in a general sense, without explicitly naming Parallel.ai, but they still provide contextual information about the API structure and usage which can corroborate how the service is accessed within the same documentation ecosystem. Therefore, the strongest support comes from the excerpt that explicitly names Parallel.ai, while the remaining excerpts offer supplementary endpoint-related details without asserting the service name.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.5.service",
      "citations": [
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "all deployed web endpoint functions have a stable HTTPS URL ."
          ]
        }
      ],
      "reasoning": "The finegrained field value is Modal, a deployment/trigger mechanism referenced in the excerpts. The most directly relevant excerpt discusses Modal as a tool to invoke deployed functions: it states that ‘Modal lets you take a function created by a deployment and call it from other contexts,’ which explicitly identifies Modal as a platform for triggering deployed functions. This directly supports the notion that Modal is the API/endpoint mechanism being referenced in the field. A closely related excerpt reinforces this by noting that ‘all deployed web endpoint functions have a stable HTTPS URL,’ which provides important operational detail about how Modal-hosted endpoints are exposed and reliably accessible, aligning with how an API endpoint reference would be described in a technical integration context. The combination of these two statements—Modal enabling invocation of deployed functions and providing stable HTTPS URLs for endpoints—collectively supports the field value as it pertains to Modal being the referenced endpoint/trigger framework.",
      "confidence": "high"
    },
    {
      "field": "complete_code_examples.0.language",
      "citations": [
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "If the invoking client is\nrunning Python, then the same [Modal client library](https://pypi.org/project/modal/) used to write Modal code",
            "There are two ways of invoking deployed functions.",
            "HTTPS is used if the invoking client is not running Python and\ntherefore cannot import the Modal client library.",
            "all deployed web endpoint functions have a stable HTTPS URL ."
          ]
        }
      ],
      "reasoning": "The finegrained field value targets the language of the first code example under complete_code_examples, specifically identifying Python as the language. The most relevant excerpts directly discuss how the Modal deployment/invocation workflow varies by the invoking client language. One excerpt explicitly states: \"If the invoking client is running Python, then the same Modal client library used to write Modal code\" which directly confirms Python as a supported and relevant language for the invocation workflow. Another excerpt notes there are two ways of invoking deployed functions, which sets the practical context for choosing language-specific invocation methods. Additionally, another excerpt clarifies that: \"HTTPS is used if the invoking client is not running Python and therefore cannot import the Modal client library,\" reinforcing the language-dependent behavior of the client libraries. A fourth excerpt adds that deployed web endpoints have a stable HTTPS URL, contributing to an understanding of the end-to-end deployment context when using Python-based clients. Collectively, these excerpts support the finegrained field value by illustrating how Python as a client language affects the invocation approach and tooling in the Modal-based deployment flow.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.0.purpose",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`"
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        }
      ],
      "reasoning": "The most directly relevant excerpt explains the creation of a Task Run with a detailed discussion of the request body fields, including the processor to use and the input to the task, which aligns with the idea of initiating a new Deep Research task run and the body containing the research input and processor choice. The second excerpt provides a concrete curl example that targets the task run endpoint and includes the input and processor values, illustrating how to initiate the run in practice. The third excerpt offers a quickstart reference and points to the task run endpoint, reinforcing the existence and usage of the endpoint for initiating a Deep Research task, which supports the overall mechanism described in the field value.",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.4.endpoint",
      "citations": [
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs",
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`"
          ]
        }
      ],
      "reasoning": "The most relevant piece explicitly mentions a Deep Research Quickstart and points to the Parallel Task API surface that orchestrates task runs, aligning with the idea of a dedicated deep-research creation endpoint. The second most relevant piece demonstrates how to create a task run via the API and illustrates the input/output model for initiating a research-oriented task, which is directly supportive of a create operation for a deep-research workflow. The third piece details the standard create-task-run interface, including the JSON body structure and required fields, which underpins how a call to a deep-research create endpoint would be constructed, even if it does not mention the exact deep-research path. Together, these excerpts collectively support the notion of a create operation for deep research in the Parallel API, and provide concrete examples of how to form requests and what kind of response to expect, albeit without stating the exact endpoint path provided in the field value. ",
      "confidence": "medium"
    },
    {
      "field": "api_endpoint_reference.0.endpoint",
      "citations": [
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n",
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`"
          ]
        }
      ],
      "reasoning": "The finest-supported claim is that the endpoint https://api.parallel.ai/v1/tasks/runs is actively used to create a task run via an HTTP POST call, as shown by the explicit curl example invoking that URL. This provides direct evidence of both the endpoint and its usage pattern. A closely related source also references the same endpoint URL in the context of a task-run quickstart, reinforcing that this address is the correct endpoint for initiating task runs. A third excerpt discusses the Create Task Run operation and describes required headers and the request body in the context of a Task Run API, which aligns with how a consumer would interact with the endpoint, even though the exact URL may not be reiterated there. Taken together, these excerpts converge on the endpoint as the correct target for task-run creation and outline how to structure the request (headers and body).",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.4.purpose",
      "citations": [
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "Modal lets you take a function created by a deployment and call it from other contexts.",
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "For more detail on setting up functions for invocation over HTTP see the web endpoints guide .\n©"
          ]
        },
        {
          "title": "Task API Deep Research Quickstart - Parallel Documentation",
          "url": "https://docs.parallel.ai/task-api/task-deep-research",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs"
          ]
        },
        {
          "title": "Parallel Documentation - Parallel",
          "url": "https://docs.parallel.ai/",
          "excerpts": [
            "https://api.parallel.ai/v1/tasks/runs",
            "`\ncurl  -X  POST  \"https://api.parallel.ai/v1/tasks/runs\"  \\   -H  \"x-api-key:  $PARALLEL_API_KEY \"  \\   -H  'Content-Type: application/json'  \\   --data-raw  '{   \"input\": \"Create a research report on the most recent academic research advancements in web search for LLMs.\",   \"processor\": \"ultra\" }'\n"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "Section Title: Create Task Run > Authorizations > Headers > Body\nContent:\napplication/json\nTask run input with additional beta fields.\n​\nprocessor\nstring\nrequired\nProcessor to use for the task.\nExample:\n`\"base\"`\n​\ninput\nstring Input · object string Input · object\nrequired\nInput to the task, either text or a JSON object.\nExample:\n`\"What was the GDP of France in 2023?\"`",
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value.",
            "​\nenable_events\nboolean | null\nSection Title: Create Task Run > Authorizations > Headers > Body\nContent:\nControls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs)."
          ]
        },
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Webhook Payload Structure\nEach webhook payload contains:\n`timestamp` : ISO 8601 timestamp of when the event occurred\n`type` : Event type\n`data` : Event-specific payload. For the ‘task_run.status’ event, it is the complete [Task Run object](https://docs.parallel.ai/api-reference/task-api-v1/retrieve-task-run)\n"
          ]
        },
        {
          "title": "Overview - Parallel Documentation",
          "url": "https://docs.parallel.ai/getting-started/overview",
          "excerpts": [
            "Parallel provides a suite of APIs that combine AI inference with live web data to power research, enrichment, and automation workflows.Read more"
          ]
        },
        {
          "title": "Task Group",
          "url": "https://docs.parallel.ai/task-api/group-api",
          "excerpts": [
            "The API is comprised of the following endpoints: Creation: To run a batch of tasks in a group, you first need to create a task group, after which you can add ...Read more The Parallel Task Group API enables you to batch process hundreds or thousands of Tasks efficiently."
          ]
        }
      ],
      "reasoning": "The most directly relevant content describes Modal. One excerpt states that Modal enables calling a function deployed by a deployment from other contexts, which aligns with the idea of a proxy endpoint. Another excerpt notes that all deployed web endpoint functions have a stable HTTPS URL, which is essential for a publicly accessible proxy. A third excerpt mentions guidance on setting up functions for HTTP invocation, reinforcing the HTTP-based proxy approach. Additional context comes from the Modal documentation's emphasis on deployment-triggered invocation and the stability of web endpoints, which collectively support the concept of a custom proxy endpoint that handles HTTP requests, injects the API key, and forwards a constructed payload to the Parallel.ai API. Supporting context from Parallel documentation covers the existence of a task-run API and how to format requests, which the proxy would need to assemble and forward. There is also broader context about the Parallel task API and webhooks, which helps frame how the proxy would interact with endpoints and handle responses. Taken together, these excerpts provide evidence that a Modal-hosted HTTP endpoint can be used to proxy a Parallel.ai task, including endpoint invocation mechanics and the relevant request structure, even though none explicitly describe the exact proxy behavior with API key injection. This supports the field value as a plausible implementation path, with the strongest support coming from Modal’s HTTP invocation capabilities, followed by the stable HTTPS endpoints, and then Parallel API invocation mechanics.",
      "confidence": "medium"
    },
    {
      "field": "parallel_ai_webhook_integration.setup_process",
      "citations": [
        {
          "title": "Webhooks - Parallel",
          "url": "https://docs.parallel.ai/task-api/webhooks",
          "excerpts": [
            "Setup\nTo register a webhook for a task run, include a `webhook` parameter in your task run creation request:\ncURL TypeScript (SDK) Python\nCopy\nAsk AI\n```\ncurl  --request  POST  \\   --url  https://api.parallel.ai/v1/tasks/runs  \\   --header  \"Content-Type: application/json\"  \\   --header  \"parallel-beta: webhook-2025-08-12\"  \\   --header  \"x-api-key:  $PARALLEL_API_KEY \"  \\   --data  '{     \"task_spec\": {       \"output_schema\": \"Find the GDP of the specified country and year\"     },     \"input\": \"France (2023)\",     \"processor\": \"core\",     \"metadata\": {       \"key\": \"value\"     },     \"webhook\": {       \"url\": \"https://your-domain.com/webhooks/parallel\",       \"event_types\": [\"task_run.status\"]     }   }'"
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/create-task-run",
          "excerpts": [
            "​\nwebhook\nWebhook · object\nCallback URL (webhook endpoint) that will receive an HTTP POST when the run completes.\nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value."
          ]
        },
        {
          "title": "Webhook Setup - Parallel",
          "url": "https://docs.parallel.ai/resources/webhook-setup",
          "excerpts": [
            "{   \"Content-Type\" :  \"application/json\" ,   \"webhook-id\" :  \"whevent_abc123def456\" ,   \"webhook-timestamp\" :  \"1751498975\" ,   \"webhook-signature\" :  \"v1,K5oZfzN95Z9UVu1EsfQmfVNQhnkZ2pj9o9NDN/H/pI4=\" }",
            "Webhooks allow you to receive real-time notifications when events occur in your Parallel API operations, eliminating the need for constant polling. ... Task API ...Read more"
          ]
        },
        {
          "title": "Wait for HTTP callback | Trigger.dev",
          "url": "https://trigger.dev/changelog/wait-for-http-callback",
          "excerpts": [
            "Waitpoint token we give you a URL back that can be passed to a 3rd party. When they're done with the work they can make a POST request to that URL and we'll continue the run with the result.",
            "On the Cloud product we pause the run when you call `wait.forToken()` (so you stop being charged) and then continue the run when the HTTP callback comes in.",
            "\n`  import { task, wait } from \"@trigger.dev/sdk\"; const replicate = new Replicate({ auth: process.env.REPLICATE_API_KEY, }); export const generateImage = task({ id: \"generate-image\", run: async () => { // You can create this token from your backend or inside a task const token = await wait.createToken({ timeout: \"10m\", }); await replicate.predictions.create({ version: \"27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478\", input: { prompt: \"A painting of a cat by Andy Warhol\", }, // pass the token url to Replicate's webhook, so they can \"callback\" // 👇 webhook: token.url, webhook_events_filter: [\"completed\"], }); const result = await wait.forToken<Prediction>(token).unwrap(); // unwrap() throws a timeout error or returns the result 👆 return result; }, }); ",
            "When Replicate has finished processing the image it will make an HTTP POST request to the URL we gave it. That will complete the Waitpoint and the JSON body is set as the output of the Waitpoint. The run is continued with the output of the Waitpoint."
          ]
        },
        {
          "title": "Wait for token - Trigger.dev",
          "url": "https://trigger.dev/docs/wait-for-token",
          "excerpts": [
            "Waitpoint tokens pause task runs until you complete the token. They’re commonly used for approval workflows and other scenarios where you need to wait for external confirmation, such as human-in-the-loop processes. You can complete a token using the SDK or by making a POST request to the token’s URL."
          ]
        },
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "GET\n/\nv1\n/\ntasks\n/\nruns\n/\n{run_id}"
          ]
        }
      ],
      "reasoning": "The field value specifies registering a webhook for a task run by including a webhook object in the POST /v1/tasks/runs request, with a callback URL and an event_types array (typically including 'task_run.status'). It also notes that because the feature is in beta, the request should include the HTTP header 'parallel-beta' with the value 'webhook-2025-08-12'. The recommended solution suggests using Trigger.dev Waitpoint token URL as the webhook URL. Directly supporting details include: - a documentation example showing registering a webhook with a 'webhook' field containing 'url' and 'event_types' within a task run creation request. - explicit mention of the webhook URL and the event_types array, and the required beta header for webhook beta. - an example of the HTTP header usage for the parallel-beta header in the API request. - documentation showing that webhook endpoints include a callback URL that receives an HTTP POST when the run completes, aligning with using a URL as the webhook target. - subsequent notes on how webhook tokens or callbacks can be integrated with Trigger.dev’s Waitpoint URL concept, indicating a method to route external callbacks back into the Trigger.dev workflow. These pieces together support the core idea of registering a webhook for a task run with a URL and event_types array and handling the beta header, as well as the practical note of using a Trigger.dev Waitpoint URL as the webhook destination. ",
      "confidence": "high"
    },
    {
      "field": "api_endpoint_reference.5.purpose",
      "citations": [
        {
          "title": "Fetched web page",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run",
          "excerpts": [
            "The run result is available from the `/result` endpoint."
          ]
        },
        {
          "title": "Retrieve Task Run Result - Parallel",
          "url": "https://docs.parallel.ai/api-reference/tasks-v1/retrieve-task-run-result",
          "excerpts": [
            "{   \"run\" : {     \"run_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"interaction_id\" :  \"trun_9907962f83aa4d9d98fd7f4bf745d654\" ,     \"status\" :  \"completed\" ,     \"is_active\" :  false ,     \"processor\" :  \"core\" ,     \"metadata\" : {       \"my_key\" :  \"my_value\"     },     \"created_at\" :  \"2025-04-23T20:21:48.037943Z\" ,     \"modified_at\" :  \"2025-04-23T20:21:48.037943Z\"   },   \"output\" : {     \"basis\" : [],     \"type\" :  \"json\" ,     \"content\" : {       \"gdp\" :  \"$3.1 trillion (2023)\"     }   }"
          ]
        },
        {
          "title": "Invoking deployed functions | Modal Docs",
          "url": "https://modal.com/docs/guide/trigger-deployed-functions",
          "excerpts": [
            "all deployed web endpoint functions have a stable HTTPS URL .",
            "Modal lets you take a function created by a deployment and call it from other contexts."
          ]
        },
        {
          "title": "Overview - Parallel Documentation",
          "url": "https://docs.parallel.ai/getting-started/overview",
          "excerpts": [
            "Parallel provides a suite of APIs that combine AI inference with live web data to power research, enrichment, and automation workflows.Read more"
          ]
        }
      ],
      "reasoning": "The requested fine-grained field value describes a custom endpoint hosted on Modal that retrieves the final result from Parallel.ai's /result endpoint, identified by the run_id. The most directly supportive evidence is that the fetched run result is available from the /result endpoint, which confirms the existence and use of the /result endpoint to retrieve final results. Additionally, the retrieve-task-run-result reference explicitly points to a task run result retrieval API and includes a run identifier and an output structure, which corroborates the use of a run_id to fetch results and indicates the pattern of retrieving results via an API call. Beyond this core mechanism, documentation about Modal shows that deployed web endpoint functions have a stable HTTPS URL and can be invoked from other contexts, which supports the concept of a custom endpoint hosted on Modal that can trigger or fetch results from a backend service. The general Parallel documentation overview provides context that Parallel APIs are used for AI inference with live data, aligning with the idea of composing a custom endpoint that orchestrates calls to Parallel’s /result endpoint. Together, these excerpts establish: (a) the /result endpoint is used to obtain final results for a given run_id, (b) retrieval can be performed via a custom endpoint hosted on Modal, and (c) deploying and invoking such endpoints is supported by Modal and parallels the described workflow. The combination of these pieces directly addresses the field value’s claim about a Modal-hosted endpoint that retrieves the final result from the /result endpoint using a run_id.",
      "confidence": "high"
    }
  ],
  "outputSchema": {
    "type": "object",
    "properties": {
      "executive_summary": {
        "type": "string",
        "description": "A high-level overview of the entire process, explaining how to orchestrate a Parallel.ai deep research task from a Trigger.dev job by using a Modal function as an intermediary."
      },
      "solution_architecture_overview": {
        "type": "string",
        "description": "A description of the workflow, detailing the sequence of interactions between Trigger.dev, Modal, and Parallel.ai. This explains how a Trigger.dev job initiates the process, calls a Modal function, which in turn starts a Parallel.ai task with a callback URL, and how the Trigger.dev job pauses and resumes upon completion."
      },
      "parallel_ai_api_introduction": {
        "type": "object",
        "properties": {
          "purpose": {
            "type": "string",
            "description": "Describes the primary function of the Deep Research API for handling open-ended research questions."
          },
          "key_features": {
            "type": "string",
            "description": "Lists key features like natural language input, declarative approach, and flexible output structures."
          },
          "asynchronous_nature": {
            "type": "string",
            "description": "Explains that tasks are long-running (up to 45 minutes) and results are not returned immediately."
          },
          "output_formats": {
            "type": "string",
            "description": "Details the available output formats: 'auto' schema for structured JSON and 'text' schema for markdown reports."
          }
        },
        "required": [
          "purpose",
          "key_features",
          "asynchronous_nature",
          "output_formats"
        ],
        "additionalProperties": false
      },
      "parallel_ai_authentication": {
        "type": "object",
        "properties": {
          "method": {
            "type": "string",
            "description": "Describes the authentication method, which is an API Key provided in an HTTP header."
          },
          "header_name": {
            "type": "string",
            "description": "The name of the required HTTP header for authentication, which is 'x-api-key'."
          },
          "key_acquisition": {
            "type": "string",
            "description": "Instructions on how to obtain an API key from the Parallel.ai developer platform."
          }
        },
        "required": [
          "method",
          "header_name",
          "key_acquisition"
        ],
        "additionalProperties": false
      },
      "parallel_ai_task_creation": {
        "type": "object",
        "properties": {
          "http_method": {
            "type": "string",
            "description": "The HTTP method used to create a task, which is 'POST'."
          },
          "endpoint": {
            "type": "string",
            "description": "The API endpoint for creating tasks: 'https://api.parallel.ai/v1/tasks/runs'."
          },
          "request_body_parameters": {
            "type": "string",
            "description": "Description of key parameters in the JSON request body, such as 'input' (the research query), 'processor' (e.g., 'ultra'), and the 'webhook' object."
          },
          "beta_header_requirement": {
            "type": "string",
            "description": "Notes that using webhooks is a beta feature and requires the 'parallel-beta: webhook-2025-08-12' header."
          }
        },
        "required": [
          "http_method",
          "endpoint",
          "request_body_parameters",
          "beta_header_requirement"
        ],
        "additionalProperties": false
      },
      "parallel_ai_result_retrieval_methods": {
        "type": "object",
        "properties": {
          "method_name": {
            "type": "string",
            "description": "The name of the retrieval method (e.g., Polling, Webhooks, SSE)."
          },
          "how_it_works": {
            "type": "string",
            "description": "A brief explanation of how the method functions to retrieve results from an asynchronous task."
          },
          "best_for_scenario": {
            "type": "string",
            "description": "The recommended use case for this method, such as 'simple scripts' for Polling or 'production backends' for Webhooks."
          },
          "recommended_for_this_solution": {
            "type": "boolean",
            "description": "Indicates that the Webhook method is the recommended approach for this specific Trigger.dev integration."
          }
        },
        "required": [
          "method_name",
          "how_it_works",
          "best_for_scenario",
          "recommended_for_this_solution"
        ],
        "additionalProperties": false
      },
      "parallel_ai_webhook_integration": {
        "type": "object",
        "properties": {
          "setup_process": {
            "type": "string",
            "description": "How to register a webhook by including the 'webhook' object with a 'url' in the task creation request."
          },
          "notification_payload": {
            "type": "string",
            "description": "Description of the data sent to the webhook URL, noting it contains task status and metadata (like 'run_id'), but not the full research result."
          },
          "result_retrieval_step": {
            "type": "string",
            "description": "Explains the mandatory subsequent step: making a GET request to the result endpoint using the 'run_id' from the webhook payload to fetch the final data."
          },
          "security_verification": {
            "type": "string",
            "description": "Highlights the security best practice of verifying the HMAC signature sent in the 'webhook-signature' header."
          }
        },
        "required": [
          "setup_process",
          "notification_payload",
          "result_retrieval_step",
          "security_verification"
        ],
        "additionalProperties": false
      },
      "modal_setup_and_configuration": {
        "type": "object",
        "properties": {
          "project_setup": {
            "type": "string",
            "description": "Instructions for creating the main Python file for the Modal application."
          },
          "required_dependencies": {
            "type": "string",
            "description": "A list of Python packages that must be installed in the Modal image, including 'modal', 'fastapi', and 'parallel-web'."
          },
          "image_definition": {
            "type": "string",
            "description": "Code example showing how to define a `modal.Image` and use the `.pip_install()` method to include the necessary dependencies."
          }
        },
        "required": [
          "project_setup",
          "required_dependencies",
          "image_definition"
        ],
        "additionalProperties": false
      },
      "modal_secret_management": {
        "type": "object",
        "properties": {
          "secret_creation": {
            "type": "string",
            "description": "Instructions on how to create a secret in the Modal dashboard or via the CLI to store the Parallel.ai API key."
          },
          "attaching_to_function": {
            "type": "string",
            "description": "The code snippet for attaching the secret to the Modal function: `secrets=[modal.Secret.from_name('secret-name')]`."
          },
          "accessing_in_code": {
            "type": "string",
            "description": "How to access the secret value from environment variables within the function's code, for example: `os.environ['PARALLEL_API_KEY']`."
          }
        },
        "required": [
          "secret_creation",
          "attaching_to_function",
          "accessing_in_code"
        ],
        "additionalProperties": false
      },
      "modal_function_implementation": {
        "type": "object",
        "properties": {
          "endpoint_decorator": {
            "type": "string",
            "description": "Explanation of using the `@modal.fastapi_endpoint(method='POST')` decorator to expose the Python function as an HTTP endpoint."
          },
          "request_payload_handling": {
            "type": "string",
            "description": "How to define the function to accept a JSON body from Trigger.dev, for example using a Pydantic model or a `dict` type hint for flexibility."
          },
          "api_call_logic": {
            "type": "string",
            "description": "Description of the core logic inside the function: initializing the Parallel.ai client with the secret key and calling `client.task_run.create()`."
          },
          "dynamic_webhook_url_usage": {
            "type": "string",
            "description": "How the function extracts the dynamic webhook URL from the incoming request payload and passes it to the Parallel.ai API."
          }
        },
        "required": [
          "endpoint_decorator",
          "request_payload_handling",
          "api_call_logic",
          "dynamic_webhook_url_usage"
        ],
        "additionalProperties": false
      },
      "modal_deployment": {
        "type": "object",
        "properties": {
          "deployment_command": {
            "type": "string",
            "description": "The CLI command used to deploy the function and create a persistent endpoint: `modal deploy <filename>.py`."
          },
          "persistent_url": {
            "type": "string",
            "description": "Explanation that a successful deployment provides a stable, public HTTPS URL that the Trigger.dev job can call."
          },
          "development_server": {
            "type": "string",
            "description": "Information on using the `modal serve` command for a temporary URL and live-reloading during development."
          }
        },
        "required": [
          "deployment_command",
          "persistent_url",
          "development_server"
        ],
        "additionalProperties": false
      },
      "trigger_dev_job_definition": {
        "type": "object",
        "properties": {
          "job_creation_syntax": {
            "type": "string",
            "description": "How to define a background job using the `task` function from the '@trigger.dev/sdk' package."
          },
          "file_structure": {
            "type": "string",
            "description": "The typical location and naming convention for a Trigger.dev job file within a modern web framework project (e.g., `app/jobs/myJob.ts`)."
          },
          "basic_code_template": {
            "type": "string",
            "description": "A minimal code snippet showing the import statements and the structure of a `task` definition with an async `run` function."
          }
        },
        "required": [
          "job_creation_syntax",
          "file_structure",
          "basic_code_template"
        ],
        "additionalProperties": false
      },
      "trigger_dev_webhook_handling_with_waitpoints": {
        "type": "object",
        "properties": {
          "feature_overview": {
            "type": "string",
            "description": "An introduction to Trigger.dev's 'Waitpoints' feature, explaining its purpose for pausing and resuming jobs that depend on external asynchronous callbacks."
          },
          "create_token_function": {
            "type": "string",
            "description": "Details on using `wait.createToken()` to generate a unique callback URL (`token.url`) and an associated token ID."
          },
          "wait_for_token_function": {
            "type": "string",
            "description": "Details on using `await wait.forToken(token)` to pause the job's execution until the callback is received."
          },
          "resuming_the_run": {
            "type": "string",
            "description": "Explanation that the job automatically resumes when the external service (via Modal) makes a POST request to the `token.url`, and the POST body becomes the result of the wait."
          }
        },
        "required": [
          "feature_overview",
          "create_token_function",
          "wait_for_token_function",
          "resuming_the_run"
        ],
        "additionalProperties": false
      },
      "trigger_dev_orchestration_logic": {
        "type": "object",
        "properties": {
          "initiating_request_to_modal": {
            "type": "string",
            "description": "How to use `fetch` to make the initial POST request from the Trigger.dev job to the deployed Modal function's URL."
          },
          "passing_callback_url": {
            "type": "string",
            "description": "How to include the `token.url` from `wait.createToken()` in the JSON body of the request sent to Modal, so it can be used as the webhook URL for Parallel.ai."
          },
          "handling_final_result": {
            "type": "string",
            "description": "How to process the data returned after `wait.forToken()` completes, which contains the Parallel.ai webhook payload, and then make the final call to get the research report."
          }
        },
        "required": [
          "initiating_request_to_modal",
          "passing_callback_url",
          "handling_final_result"
        ],
        "additionalProperties": false
      },
      "end_to_end_implementation_guide": {
        "type": "string",
        "description": "A comprehensive, step-by-step walkthrough that ties all the components together, from triggering the job in Trigger.dev to receiving the final research report from Parallel.ai after the callback is received."
      },
      "complete_code_examples": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "file_name": {
              "type": "string",
              "description": "The name of the file, such as 'triggerDevJob.ts' or 'modalFunction.py'."
            },
            "language": {
              "type": "string",
              "description": "The programming language of the code (e.g., 'TypeScript', 'Python')."
            },
            "description": {
              "type": "string",
              "description": "A brief description of the role of this code file in the overall solution."
            },
            "code": {
              "type": "string",
              "description": "The complete, runnable code block for the file."
            }
          },
          "required": [
            "file_name",
            "language",
            "description",
            "code"
          ],
          "additionalProperties": false
        },
        "description": "An array of strings containing the complete, final code for each part of the solution. This will include the Trigger.dev job file (`*.ts`) and the Modal function file (`*.py`)."
      },
      "api_endpoint_reference": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "service": {
              "type": "string",
              "description": "The service the endpoint belongs to (e.g., 'Parallel.ai', 'Modal')."
            },
            "endpoint": {
              "type": "string",
              "description": "The full URL or path of the endpoint."
            },
            "http_method": {
              "type": "string",
              "description": "The HTTP method for the endpoint (e.g., 'POST', 'GET')."
            },
            "purpose": {
              "type": "string",
              "description": "A short description of what the endpoint is used for in this solution."
            }
          },
          "required": [
            "service",
            "endpoint",
            "http_method",
            "purpose"
          ],
          "additionalProperties": false
        },
        "description": "A quick reference list of the key API endpoints used in this solution, including Parallel.ai's task creation and result retrieval endpoints, and the example URL for the deployed Modal function."
      },
      "error_handling_and_best_practices": {
        "type": "object",
        "properties": {
          "parallel_ai_error_checking": {
            "type": "string",
            "description": "Recommendation to check the 'status' field in the Parallel.ai webhook payload for 'failed' and handle it appropriately."
          },
          "trigger_dev_timeouts": {
            "type": "string",
            "description": "The importance of setting a reasonable `timeout` in `wait.createToken` to prevent jobs from waiting indefinitely for a callback that may never arrive."
          },
          "webhook_security": {
            "type": "string",
            "description": "Best practice of verifying webhook signatures from Parallel.ai to ensure the request is authentic."
          },
          "idempotency": {
            "type": "string",
            "description": "Considerations for making the workflow idempotent to handle potential duplicate webhook deliveries."
          }
        },
        "required": [
          "parallel_ai_error_checking",
          "trigger_dev_timeouts",
          "webhook_security",
          "idempotency"
        ],
        "additionalProperties": false
      }
    },
    "required": [
      "executive_summary",
      "solution_architecture_overview",
      "parallel_ai_api_introduction",
      "parallel_ai_authentication",
      "parallel_ai_task_creation",
      "parallel_ai_result_retrieval_methods",
      "parallel_ai_webhook_integration",
      "modal_setup_and_configuration",
      "modal_secret_management",
      "modal_function_implementation",
      "modal_deployment",
      "trigger_dev_job_definition",
      "trigger_dev_webhook_handling_with_waitpoints",
      "trigger_dev_orchestration_logic",
      "end_to_end_implementation_guide",
      "complete_code_examples",
      "api_endpoint_reference",
      "error_handling_and_best_practices"
    ],
    "additionalProperties": false
  }
}