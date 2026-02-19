> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Dataset Metadata

<Tip>
  Paste your API key to the authorization field. To get an API key, [Create an account](https://brightdata.com/?hs_signup=1\&utm_source=docs\&utm_campaign=playground) and learn [how to generate an API key](/api-reference/authentication#how-do-i-generate-a-new-api-key%3F).
</Tip>

## General Description

* This endpoint retrieves detailed metadata for a specific dataset.
* Metadata includes available fields, data types, and descriptions.
* Use this endpoint to understand the structure of a dataset before querying or downloading it.

## Request

### **Endpoint**

```
GET http://api.brightdata.com/datasets/{dataset_id}/metadata
```

### **Path Parameters**

| Parameter    | Type     | Description                          |
| ------------ | -------- | ------------------------------------ |
| `dataset_id` | `string` | The unique identifier of the dataset |

### **Headers**

| Header          | Type   | Description                     |
| --------------- | ------ | ------------------------------- |
| `Authorization` | string | Your API key for authentication |

## Response

### **Response Example**

```json  theme={null}
{
    "id": "gd_l1vijqt9jfj7olije",
    "fields": {
        "name": {
            "type": "text",
            "active": true,
            "description": "The name of the company"
        },
        "url": {
            "type": "url",
            "required": true,
            "description": "The URL or web address associated with the company"
        },
        "cb_rank": {
            "type": "number",
            "description": "Crunchbase rank assigned to the company"
        }
    }
}
```

### **Response Fields**

| Field    | Type     | Description                                       |
| -------- | -------- | ------------------------------------------------- |
| `id`     | `string` | Unique identifier for the dataset                 |
| `fields` | `object` | Contains metadata about each field in the dataset |

### **Field Metadata**

Each field in the `fields` object contains the following attributes:

| Attribute     | Type      | Description                                            |
| ------------- | --------- | ------------------------------------------------------ |
| `type`        | `string`  | Data type of the field (e.g., `text`, `number`, `url`) |
| `active`      | `boolean` | Indicates if the field is currently active             |
| `required`    | `boolean` | Indicates if the field is mandatory (if applicable)    |
| `description` | `string`  | Brief description of the field                         |

## Example Use Case

### **Fetching Dataset Metadata**

To retrieve metadata for the "Crunchbase companies information" dataset:

#### **Request**

```
GET http://api.brightdata.com/datasets/gd_l1vijqt9jfj7olije/metadata
```

#### **Response**

```json  theme={null}
{
    "id": "gd_l1vijqt9jfj7olije",
    "fields": {
        "name": {
            "type": "text",
            "active": true,
            "description": "The name of the company"
        },
        "url": {
            "type": "url",
            "required": true,
            "description": "The URL or web address associated with the company"
        },
        "cb_rank": {
            "type": "number",
            "description": "Crunchbase rank assigned to the company"
        }
    }
}
```

## Troubleshooting & FAQs

### **Issue: "Unauthorized" response**

**Solution**: Ensure you have included a valid API key in the request header.

### **Issue: "Dataset not found"**

**Solution**: Verify that the `dataset_id` is correct and exists in the dataset list.

### **Issue: "Field missing in metadata"**

**Solution**: Some fields may be inactive or unavailable for certain datasets.

## Related Documentation

* [Get Dataset List](/api-reference/marketplace-dataset-api/get-dataset-list)
* [Dataset Filtering API](/api-reference/marketplace-dataset-api/filter-dataset-with-csv-json-files)