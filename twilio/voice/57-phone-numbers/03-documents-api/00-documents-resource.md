# Documents API - Documents Resource

> **Public Beta:** The Documents API is in Public Beta. The information in this document could change. We might add or update features before the product becomes Generally Available. Beta products don't have a Service Level Agreement (SLA). Learn more about beta product support.

The Documents API allows you to upload documents for use with other Phone Number APIs.

Some Twilio processes require supporting documents. Use the Documents API to upload the following types of documents.

| Twilio process | Required document types | Description |
|----------------|------------------------|-------------|
| Port in a phone number | Utility bill | PortIn resource: A port-in request for a US phone number requires a utility bill to prove phone number ownership. The utility bill must be dated within the last 30 days, and include the account, owner or authorized user name, and address information. |

## Upload a document

`POST https://numbers-upload.twilio.com/v1/Documents`

> ⚠️ **Warning:** The base URL for the Documents API is different from other Phone Number APIs.

### Request body parameters

| Parameter | Required | Data type | Description |
|-----------|----------|-----------|-------------|
| `document_type` | Yes | String | Type of document to create. For the port-in process, you should use the document type `utility_bill`. |
| `friendly_name` | No | String | The name to identify the document. |
| `File` | Yes | File | The document to upload. It should be an image or PDF document and should not be password protected. The maximum size allowed is 10MB. |

### Sample request

```bash
curl -X POST 'https://numbers-upload.twilio.com/v1/Documents' \
--form 'friendly_name="Your document name"' \
--form 'File=@"/Users/your_user/Documents/doc.pdf"' \
--form 'document_type="utility_bill"'
```

## Response

The API responds with the following properties. Use the returned document SID as the unique identifier for the document to use in your port-in request.

> ⚠️ **Warning:** Check the value of the `mime_type` property in the response. If empty, the document didn't upload or didn't have any content.

| Parameter | Data type | Description |
|-----------|-----------|-------------|
| `sid` | String | Document SID. This is the Document's identifier. |
| `account_sid` | String | Document owner's account. |
| `document_type` | String | Document type. |
| `version` | Number | Document version. |
| `status` | String | The current status of a Document. Can be one of: `DRAFT`, `PENDING_REVIEW`, `REJECTED`, `APPROVED`, `EXPIRED`. |
| `date_created` | Date | Date the document was created. |
| `date_updated` | Date | The date the Document was most recently updated. |
| `friendly_name` | String | Name of the document. |
| `mime_type` | String | File type (`image` or `pdf`). |
| `failure_reason` | String | Reason why the process failed, if an error occurred. |
| `created_by` | String | Account SID for the user who created the Document. |

The following sections provide some example responses.

### Response to a successful request

| HTTP status code | Next steps |
|------------------|------------|
| `201` | File was successfully created. You can use this Document with other Phone Numbers APIs. |

```json
{
  "sid": "RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa01",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa01",
  "document_type": "utility_bill",
  "version": 1,
  "status": "DRAFT",
  "date_created": "2023-11-02T19:21:32Z",
  "date_updated": "2023-11-02T19:21:32Z",
  "friendly_name": "Utility Bill",
  "mime_type": "application/pdf",
  "failure_reason": null,
  "created_by": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa01",
  "reviewer": null,
  "attributes": [
    {
      "name": "address_sids",
      "value": null
    }
  ]
}
```

### Response to a failed request

| HTTP status code | Next steps |
|------------------|------------|
| `400` | A value in the request was invalid or missing. Review the request and the error codes returned. Correct any mistakes and try resubmitting the request. |

```json
{
  "message": "Document type not found",
  "code": 70002,
  "user_error": true,
  "http_status_code": 400,
  "params": {}
}
```