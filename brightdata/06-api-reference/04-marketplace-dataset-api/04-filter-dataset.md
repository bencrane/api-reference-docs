> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Filter Dataset (JSON or File Uploads)

> Create a dataset snapshot based on a provided filter

<Tip>
  Paste your API key into the authorization field. To get an API key, [Create an account](https://brightdata.com/?hs_signup=1\&utm_source=docs\&utm_campaign=playground) and learn [how to generate an API key](/api-reference/authentication#how-do-i-generate-a-new-api-key%3F).
</Tip>

## General Description

* This endpoint filters a dataset and creates a snapshot of the filtered data in your account.
* The job runs asynchronously and can take up to 5 minutes to complete. If it exceeds this time, it will be cancelled.
* Charges apply based on the size of the snapshot and per-record pricing.
* Filters can have up to 3 levels of nested filter groups.
* You can upload CSV or JSON files for efficient filtering when handling large sets of values.

***

## File Format Requirements

<Tabs>
  <Tab title="CSV">
    * First line must be a header matching the field name in your filter.
    * Each following line contains a single value.

    ```csv Example: industries.csv theme={null}
    industries:value
    Accounting
    Ad Network
    Advertising
    ```
  </Tab>

  <Tab title="JSON">
    * Must be an array of objects, each with a key matching the field name in your filter.

    ```json Example industries.json theme={null}
    [
      {"industries:value": "Accounting"},
      {"industries:value": "Ad Network"},
      {"industries:value": "Advertising"}
    ]
    ```
  </Tab>
</Tabs>

***

## Filter Syntax with File References

When using file uploads, reference the filename in the filter's `value` field.

```json Example theme={null}
{
  "operator": "and",
  "filters": [
    {
      "name": "industries:value",
      "operator": "includes",
      "value": "industries.csv"
    }
  ]
}
```

### **Supported Operators for File References**

| Operator             | Field Types | Description                                    |
| :------------------- | :---------- | :--------------------------------------------- |
| `in`                 | Any         | Field value equals any value in file           |
| `not_in`             | Any         | Field value does not equal any value in file   |
| `includes`           | Array, Text | Field value contains any value in file         |
| `not_includes`       | Array, Text | Field value does not contain any value in file |
| `array_includes`     | Array       | Any value in file exists in field value        |
| `not_array_includes` | Array       | No values in file exist in field value         |

***

## Example: Filtering with Multiple Files

```bash  theme={null}
curl \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F "files[]=@/path/to/industries.csv" \
  -F "files[]=@/path/to/regions.csv" \
  -F "filter={\"operator\":\"and\",\"filters\":[{\"name\":\"industries:value\",\"operator\":\"includes\",\"value\":\"industries.csv\"},{\"name\":\"region\",\"operator\":\"in\",\"value\":\"regions.csv\"}]}" \
  "api.brightdata.com/datasets/filter?dataset_id=gd_l1vijqt9jfj7olije"
```

## Troubleshooting

| Issue                     | Possible Solution                                                                                                        |
| :------------------------ | :----------------------------------------------------------------------------------------------------------------------- |
| **"File not found"**      | Make sure the filename in your filter exactly matches the uploaded file name.                                            |
| **"Invalid file format"** | Check CSV header matches the filter field name, or ensure JSON is an array of objects.                                   |
| **"Field not found"**     | Verify field exists in dataset. Use [Get Dataset Metadata](/api-reference/marketplace-dataset-api/get-dataset-metadata). |

## Related Documentation

* [Get Dataset List](/api-reference/marketplace-dataset-api/get-dataset-list)
* [Get Dataset Metadata](/api-reference/marketplace-dataset-api/get-dataset-metadata)


## OpenAPI

````yaml filter-csv-json POST /datasets/filter
openapi: 3.1.0
info:
  title: Brightdata API
  description: API for interaction with datasets marketplace
  version: 1.0.0
servers:
  - url: https://api.brightdata.com
security:
  - bearerAuth: []
paths:
  /datasets/filter:
    post:
      description: Create a dataset snapshot based on a provided filter
      parameters:
        - name: dataset_id
          required: true
          in: query
          description: ID of the dataset to filter (required in multipart/form-data mode)
          schema:
            type: string
            example: gd_l1viktl72bvl7bjuj0
        - name: records_limit
          description: Limit the number of records to be included in the snapshot
          in: query
          required: false
          schema:
            type: integer
            example: 1000
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/FilterDatasetBody'
      responses:
        '200':
          description: Job of creating the snapshot successfully started
          content:
            application/json:
              schema:
                type: object
                properties:
                  snapshot_id:
                    type: string
                    description: ID of the snapshot
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ValidationErrorBody'
              example:
                validation_errors:
                  - '"filter.filters[0].invalid_prop" is not allowed'
                  - '"records_limit" must be a positive number'
        '402':
          description: Not enough funds to create the snapshot
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorBody'
              example:
                error: >-
                  Your current balance is insufficient to process this data
                  collection request. Please add funds to your account or adjust
                  your request to continue. ($1 is missing)
        '422':
          description: Provided filter did not match any records
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorBody'
              example:
                error: Provided filter did not match any records
        '429':
          description: Too many parallel jobs
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorBody'
              example:
                error: Maximum limit of 100 jobs per dataset has been exceeded
components:
  schemas:
    FilterDatasetBody:
      type: object
      required:
        - filter
      properties:
        filter:
          $ref: '#/components/schemas/DatasetFilter'
    ValidationErrorBody:
      type: object
      properties:
        validation_errors:
          type: array
          items:
            type: string
    ErrorBody:
      type: object
      properties:
        error:
          type: string
    DatasetFilter:
      anyOf:
        - $ref: '#/components/schemas/DatasetFilterItem'
          title: Single field filter
        - $ref: '#/components/schemas/DatasetFilterGroup'
          title: Filters group
        - $ref: '#/components/schemas/DatasetFilterItemNoVal'
          title: Single field filter w/out value
    DatasetFilterItem:
      type: object
      required:
        - name
        - operator
        - value
      additionalProperties: false
      properties:
        name:
          type: string
          description: Field name to filter by
        operator:
          type: string
          enum:
            - '='
            - '!='
            - '>'
            - <
            - '>='
            - <=
            - in
            - not_in
            - includes
            - not_includes
            - array_includes
            - not_array_includes
        value:
          description: Value to filter by
          oneOf:
            - type: string
            - type: number
            - type: boolean
            - type: object
            - type: array
              items:
                oneOf:
                  - type: string
                  - type: number
                  - type: boolean
      example:
        name: name
        operator: '='
        value: John
    DatasetFilterGroup:
      type: object
      required:
        - operator
        - filters
      additionalProperties: false
      properties:
        operator:
          type: string
          enum:
            - and
            - or
        combine_nested_fields:
          type: boolean
          description: >-
            For arrays of objects: if true, all filters must match within a
            single object
        filters:
          type: array
          items:
            $ref: '#/components/schemas/DatasetFilter'
      example:
        operator: and
        filters:
          - name: name
            operator: '='
            value: John
          - name: age
            operator: '>'
            value: '30'
    DatasetFilterItemNoVal:
      type: object
      required:
        - name
        - operator
      additionalProperties: false
      properties:
        name:
          type: string
          description: Field name to filter by
        operator:
          type: string
          enum:
            - is_null
            - is_not_null
      example:
        name: reviews_count
        operator: is_not_null
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      description: >-
        Use your Bright Data API Key as a Bearer token in the Authorization
        header.


        **How to authenticate:**

        1. Obtain your API Key from the Bright Data account settings at
        https://brightdata.com/cp/setting/users

        2. Include the API Key in the Authorization header of your requests

        3. Format: `Authorization: Bearer YOUR_API_KEY`


        **Example:**

        ```

        Authorization: Bearer
        b5648e1096c6442f60a6c4bbbe73f8d2234d3d8324554bd6a7ec8f3f251f07df

        ```


        Learn how to get your Bright Data API key:
        https://docs.brightdata.com/api-reference/authentication
      bearerFormat: API Key

````