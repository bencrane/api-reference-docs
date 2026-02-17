# REOON - BULK EMAIL VERIFICATION - STEPS 1 AND 2

---

## Step 1: Submit the Emails & Create Task

In this step, the emails need to be submitted, which will create a task and Reoon's servers will start verifying them internally. Submit a POST request with a JSON body containing `name`, `emails`, and `key`.

### POST Request URL (HTTPS)

```
https://emailverifier.reoon.com/api/v1/create-bulk-verification-task/
```

### Request Body (JSON)

```json
{
    "name": "Task Name",
    "emails": ["test1@example.com", "test2@example.com", "test3@example.com"],
    "key": "Your_API_Key"
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | String | No | Name of the task. Max 25 characters. |
| `emails` | Array of Strings | Yes | Email addresses to verify. Up to 50,000 emails. |
| `key` | String | Yes | Active API key. |

### Success Response (Status 201)

```json
{
    "status": "success",
    "task_id": 123456,
    "count_submitted": 3,
    "count_duplicates_removed": 0,
    "count_rejected_emails": 0,
    "count_processing": 3
}
```

| Field | Type | Description |
|-------|------|-------------|
| `status` | String | `"success"` if task was created successfully |
| `task_id` | Integer | Unique ID of the created task |
| `count_submitted` | Integer | Number of emails submitted |
| `count_duplicates_removed` | Integer | Number of duplicate emails removed |
| `count_rejected_emails` | Integer | Number of emails rejected for incorrect formatting |
| `count_processing` | Integer | Number of unique emails being processed |

### Error Response

```json
{
    "status": "error",
    "reason": "Error description"
}
```

### Python Example

```python
import requests

url = "https://emailverifier.reoon.com/api/v1/create-bulk-verification-task/"

payload = {
    "name": "Task via API",
    "emails": [
        "jhon200@outlook.com",
        "test1@yahoo.com",
        "TESt2@yahoo.com",
        "test3@yahoo.com",
        "test4@outlook.com",
        "test3@hotmail.com",
        "asdfkhl22dh@hotmail.com"
    ],
    "key": "your_api_key"
}

response = requests.post(url, json=payload)

if response.status_code == 201:
    print("Task created successfully.")
    print(response.json())
else:
    print("Task creation failed.")
    print(response.json())
```

---

## Step 2: Get Verified Results

This endpoint retrieves the results of a previously created bulk email verification task. The results include the overall status of the task and, if completed, the verification results.

### GET Request URL (HTTPS)

```
https://emailverifier.reoon.com/api/v1/get-result-bulk-verification-task/?key=<Your_API_Key>&task_id=<Task_ID>
```

Replace `<Your_API_Key>` with your active API key and `<Task_ID>` with the `task_id` obtained in Step 1.

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `task_id` | String | ID of the task |
| `name` | String | Name of the task |
| `status` | String | `waiting`, `running`, `completed`, `file_not_found`, `file_loading_error`, or other |
| `count_total` | Integer | Total emails submitted |
| `count_checked` | Integer | Emails checked so far |
| `progress_percentage` | Float | Percentage of emails checked |
| `results` | Object | *(Only when completed)* Keyed by email address, each containing full verification details |

### Python Example

```python
import requests

key = 'your_api_key'   # Replace with your actual API key
task_id = 40675         # Replace with task_id from Step 1

url = f'https://emailverifier.reoon.com/api/v1/get-result-bulk-verification-task/?key={key}&task-id={task_id}'

response = requests.get(url)
print(response.json())
```

### Example Completed Response

```json
{
    "count_checked": 7,
    "count_total": 7,
    "name": "API: Task via API",
    "progress_percentage": 100.0,
    "results": {
        "jhon200@outlook.com": {
            "can_connect_smtp": true,
            "domain": "outlook.com",
            "email": "jhon200@outlook.com",
            "has_inbox_full": false,
            "is_catch_all": false,
            "is_deliverable": true,
            "is_disabled": false,
            "is_disposable": false,
            "is_role_account": false,
            "is_safe_to_send": true,
            "is_spamtrap": false,
            "is_valid_syntax": true,
            "mx_accepts_mail": true,
            "mx_records": [
                "outlook-com.olc.protection.outlook.com"
            ],
            "status": "safe",
            "username": "jhon200"
        },
        "test1@yahoo.com": {
            "can_connect_smtp": true,
            "domain": "yahoo.com",
            "email": "test1@yahoo.com",
            "has_inbox_full": false,
            "is_catch_all": false,
            "is_deliverable": false,
            "is_disabled": false,
            "is_disposable": false,
            "is_role_account": false,
            "is_safe_to_send": false,
            "is_spamtrap": "None",
            "is_valid_syntax": true,
            "mx_accepts_mail": true,
            "mx_records": [
                "mta5.am0.yahoodns.net",
                "mta6.am0.yahoodns.net",
                "mta7.am0.yahoodns.net"
            ],
            "status": "invalid",
            "username": "test1"
        }
    },
    "status": "completed",
    "task_id": "40676"
}
```

### Extracting a Specific Result

```python
response = requests.get(url)
response_json = response.json()
results = response_json.get('results')

specific_result = results.get('test1@yahoo.com')
print(specific_result)
```

> **Tip:** Write a polling loop that checks the status every few seconds until it changes from `"waiting"` / `"running"` to `"completed"` or another terminal status.