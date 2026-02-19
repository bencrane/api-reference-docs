> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Filter Dataset (BETA)

> Create a dataset snapshot based on a provided filter

<Tip>
  Paste your API key to the authorization field. To get an API key, [Create an account](https://brightdata.com/?hs_signup=1\&utm_source=docs\&utm_campaign=playground) and learn [how to generate an API key](/api-reference/authentication#how-do-i-generate-a-new-api-key%3F)
</Tip>

## General Description

* A call to this endpoint starts the async job of filtering the dataset and creating a snapshot with filtered data in your account.
* The maximum amount of time for the job to finish is 5 minutes. If the job doesn't finish in this timeframe it will be cancelled.
* Creating the dataset snapshot is subject to charges based on the snapshot size and record price.
* The maximum depth of nesting the filter groups is 3.

## Modes of Use

### 1. JSON Mode (No File Uploads)

Use this when you are not uploading any files.

* All parameters (`dataset_id`, `records_limit`, and `filter`) are sent in the JSON request body.
* `Content-Type` must be `application/json`.
* No query parameters are used.

```bash Example theme={null}
curl --request POST \
  --url https://api.brightdata.com/datasets/filter \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
    "dataset_id": "gd_l1viktl72bvl7bjuj0",
    "records_limit": 100,
    "filter": {
      "name": "name",
      "operator": "=",
      "value": "John"
    }
  }'
```

***

### 2. Multipart/Form-Data Mode (File Uploads)

Use this when uploading CSV or JSON files containing filter values.

* `dataset_id` and `records_limit` must be sent as **query parameters** in the URL.
* The `filter` and any uploaded files are included in the **form-data body**.
* `Content-Type` must be `multipart/form-data`.

```bash Example theme={null}
curl --request POST \
  --url "https://api.brightdata.com/datasets/filter?dataset_id=gd_l1vijqt9jfj7olije&records_limit=100" \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: multipart/form-data' \
  --form 'filter={"operator":"and","filters":[{"name":"industries:value","operator":"includes","value":"industries.csv"}]}' \
  --form 'files[]=@/path/to/industries.csv'
```

***

## Filter Syntax

### Operators

The following table shows operators that can be used in the field filter.

| Operator             | Field Types  | Description                                                                                                                                                                                                                                                                                                         |
| -------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| =                    | Any          | Equal to                                                                                                                                                                                                                                                                                                            |
| !=                   | Any          | Not equal to                                                                                                                                                                                                                                                                                                        |
| \<                   | Number, Date | Lower than                                                                                                                                                                                                                                                                                                          |
| \<=                  | Number, Date | Lower than or equal                                                                                                                                                                                                                                                                                                 |
| >                    | Number, Date | Greater than                                                                                                                                                                                                                                                                                                        |
| >=                   | Number, Date | Greater than or equal                                                                                                                                                                                                                                                                                               |
| in                   | Any          | Tests if field value is equal to any of the values provided in filter's value                                                                                                                                                                                                                                       |
| not\_in              | Any          | Tests if field value is not equal to all of the values provided in filter's value                                                                                                                                                                                                                                   |
| includes             | Array, Text  | Tests if the field value contains the filter value. If the filter value is a single string, it matches records where the field value contains that string. If the filter value is an array of strings, it matches records where the field value contains a least one string from the array.                         |
| not\_includes        | Array, Text  | Tests if the field value does not contain the filter value. If the filter value is a single string, it matches records where the field value does not contain that string. If the filter value is an array of strings, it matches records where the field value does not contain any of the strings from the array. |
| array\_includes      | Array        | Tests if filter value is in field value (exact match)                                                                                                                                                                                                                                                               |
| not\_array\_includes | Array        | Tests if filter value is not in field value (exact match)                                                                                                                                                                                                                                                           |
| is\_null             | Any          | Tests if the field value is equal to NULL. Operator does not accept any value.                                                                                                                                                                                                                                      |
| is\_not\_null        | Any          | Tests if the field value is not equal to NULL. Operator does not accept any value.                                                                                                                                                                                                                                  |

### Combining Multiple Filters

Multiple field filters can be combined into the filter group using 2 logical operators: 'and', 'or'.
API supports filters with a maximum nesting depth of 3.
Example of filter group:

```json  theme={null}
{
    // operator can be one of ["and", "or"]
    "operator": "and",
    // an array of field filters
    "filters": [
        {
            "name": "reviews_count",
            "opeartor": ">",
            "value": "200"
        },
        {
            "name": "rating",
            "operator": ">",
            "value": "4.5"
        }
    ]
}
```


## OpenAPI

````yaml dca-api POST /datasets/filter
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
          in: query
          description: ID of the dataset to filter (required in multipart/form-data mode)
          required: false
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
          application/json:
            schema:
              type: object
              required:
                - dataset_id
                - filter
              properties:
                dataset_id:
                  type: string
                  description: ID of the dataset to filter
                  example: gd_l1viktl72bvl7bjuj0
                records_limit:
                  type: integer
                  description: Limit the number of records to be included in the snapshot
                  example: 1000
                filter:
                  $ref: '#/components/schemas/DatasetFilter'
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
    DatasetFilter:
      anyOf:
        - $ref: '#/components/schemas/DatasetFilterItem'
          title: Single field filter
        - $ref: '#/components/schemas/DatasetFilterGroup'
          title: Filters group
        - $ref: '#/components/schemas/DatasetFilterItemNoVal'
          title: Single field filter w/out value
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