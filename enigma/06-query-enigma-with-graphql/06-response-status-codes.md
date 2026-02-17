# Response Status Codes

URL: https://documentation.enigma.com/guides/graphql/response-status-codes

Enigma's GraphQL API returns the following HTTP response codes:

### 2XX Success Codes

| **Status Code** | **Reason(s)** 
| **200 OK** | A successful request 
| **202 Accepted** | For asynchronous requests. See [here](/guides/graphql/api-search#segmentation) for more details 

### 3XX Redirection Codes

| **Status Code** | **Reason(s)** 
| **302 Found** | Responses over 6 MB are delivered via **HTTP 302** to a pre-signed AWS S3 URL (in the **Location** header). Many HTTP clients follow redirects automatically. You can also make a `GET` request to the provided URL. 

### 4XX Client Error Codes

| **Status Code** | **Reason(s)** 
| **400 Bad Request** | Request has invalid and/or unsupported input. Additional error message may be present in the body under `errors` 
| **401 Unauthorized** | Request is missing the **`x-api-key`** request header or api key is invalid/disabled 
| **402 Payment Required** | Request encountered billing errors, such as insufficient credits. Add more credits through [billing](https://console.enigma.com/billing)