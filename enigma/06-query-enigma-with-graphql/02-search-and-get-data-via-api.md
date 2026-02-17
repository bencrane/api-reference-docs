# Search and Get Data via API

URL: https://documentation.enigma.com/guides/graphql/api-search

The `search` query is for discovering and retrieving entities from Enigma's data.

## SearchInput

`SearchInput` is a required input field for the search query. This table describes the input fields in `SearchInput` :

| **Input Field** | **Description** | **Example** 
| `prompt` | A description of the business. The description should contain only attributes of the business, such as "fast food", "pizza restaurant", "bar", "mexican restaurant in new york" etc. Prompt search is only supported for the entity type ( `entityType` ) `BRAND` . | - "fast food"
- "pizza" 
| `id` | The ID of the entity. Takes precedence over all other input fields. `id` should be used in conjunction with `entityType` to specify which entity this ID belongs to. | 2daa02e4-f887-40f5-8bd2-c00764b91e76 
| `name` | The name of the business. | McDonald's 
| `address` | The various components of an address to filter by:- `id` (optional): ID of the address- `street1` (optional): the first part of a street address (e.g. 123 Main St.)- `street2` (optional): the second part of a street address (e.g. Fl 8)- `city` (optional): the city name- `state` (optional): the two letter state abbreviation- `postalCode` (optional): the ZIP code | `{ "street1": "123 Main St.", "street2": "Apt. 8", "city": "NEW YORK", "state": "NY", "postalCode": "10013" }` 
| `addresses` | A list of `addresses` . Either `address` or `addresses` can be specified, not both. This input field is only supported for `aggregate` . | `[{ "street1": "123 Main St.", "street2": "Apt. 8", "city": "New York", "state": "NY", "postalCode": "10013" }, { "street1": "456 Main St.", "city": "New York", "state": "NY", "postalCode": "10013" }]` 
| `person` | A person's information to search by, such as:- `firstName` (optional)- `lastName` (optional)- `dateOfBirth` (optional): date of birth in ISO 8601 date format (i.e. YYYY-MM-DD)- `address` (optional)- `tin` (optional): the TIN of the person. The inner `tin` number (9-digit string) is required. If provided, `firstName` and `lastName` must also be specified. | `{ "firstName": "John", "lastName": "Doe", "dateOfBirth": "1980-01-01", "address": { "street1": "123 Main St.", "city": "New York", "state": "NY", "postalCode": "10013" }, "tin": { "tin": "123456789", "tinType": "SSN" } }` 
| `phoneNumber` | A 10-digit U.S. phone number in the format ########## (e.g. 1234567890) or ###-###- # (e.g. 123-456-7890) | - 1234567890
- 123-456-7890 
| `website` | A website (Can search by just website) | - enigma.com
- [www.enigma.com](http://www.enigma.com)
- [https://www.enigma.com/](https://www.enigma.com/) 
| `conditions` | Conditions to customize the result by, including:- `filter` (optional): a JSON object to specify filtering of attributes- `orderBy` (optional): a list of attributes and sort ordering- `limit` (optional): an integer to limit the top-level result by- `pageToken` (optional): a numeric offset represented as a string to start returning results from (e.g. a `pageToken` of "8" would indicate to start from the eighth element of the resulting list). | `{ "filter": { AND: [ {EQ: ["field1", 123] }, {EQ: ["field2", "abc"] }, ] }, "orderBy": ["field1 asc", "field2 desc"], "limit": 3, "pageToken": "3" }` 
| `tin` | The TIN of the business. The `name` field must also be provided. | `{ "tin": "123456789", "tinType": "TIN" }` 
| `matchThreshold` | The confidence threshold the result must meet (0.0 - 1.0). | - 0.0
- 0.8
- 1.0 
| `entityType` | The entity type to search for. Defaults to `BRAND` . | - `BRAND`
- `LEGAL_ENTITY`
- `OPERATING_LOCATION` 
| `output` | Specifies the result should be a background task instead of an immediate result. Configuration includes:- `filename` (required): the name of the resulting file- `format` (optional): the format of the resulting file- `s3Path` (optional): the AWS S3 path of the resulting file. If `format` is `CSV` , the AWS S3 path must be a unique path to the CSV file. If `format` is `PARQUET` , the AWS S3 path must be a directory. | - `{ "filename": "my_csv", "format": "CSV", "s3Path": "s3://bucket/path/to/my_csv.csv" }`
- `{ "filename": "my_parquet", "format": "PARQUET", "s3Path": "s3://bucket/path/to/my/parquet/" }` 

## Conditions and ConnectionConditions

[`Conditions`](/reference/graphql_api/inputs/conditions) and [`ConnectionConditions`](/reference/graphql_api/inputs/connection-conditions) is used for filtering and ordering data in connection-based (i.e. list-based) queries. It provides a standardized way to apply conditions to lists, particularly useful for pagination and data filtering. The following can be specified as conditions:

1. `filter`
2. `orderBy`

### Filter

`filter` is a JSON object containing filtering criteria. It supports complex filtering options including logical operators and field comparisons. See the table below on what is supported:

| **Operator** | **Desc** | **Number of Arguments** | **Examples** 
| `EQ` | Equals comparison | 2 | `filter: {EQ: ["name", "McDonald's"] }` 
| `NE` | Not equals comparison | 2 | `filter: {NE: ["state", "NY"] }` 
| `GT` | Greater than | 2 | `filter: {GT: ["firstObservedDate", "2025-01-01"] }` 
| `GTE` | Greater than or equal | 2 | `filter: {GTE: ["firstObservedDate", "2025-01-01"] }` 
| `LT` | Less than | 2 | `filter: {LT: ["firstObservedDate", "2025-01-01"] }` 
| `LTE` | Less than or equal | 2 | `filter: {LTE: ["firstObservedDate", "2025-01-01"] }` 
| `IN` | Value is in a list | 2 | `filter: {IN: ["operatingStatus", ["Open", "Closed"]] }` 
| `NOT_IN` | Value is not in a list | 2 | `filter: {NOT_IN: ["operatingStatus", ["Open", "Closed"]] }` 
| `LIKE` | Case-sensitive string matching. Use `%` inside the pattern string as in SQL | 2 | `filter: {LIKE: ["name", "%Pizza%"] }` 
| `ILIKE` | Case-insensitive string matching. Use `%` inside the pattern string as in SQL | 2 | `filter: {iLIKE: ["name", "%PiZza%"] }` 
| `AND` | Logical AND operation | ≥2 | `filter: { AND: [ expr1, expr2, ...] }filter: { AND: [ {EQ: ["name", "McDonald's"] }, {NE: ["state", "NY"]] }` 
| `OR` | Logical OR operation | ≥2 | `filter: { OR: [ expr1, expr2, ...] }filter: { OR: [ {EQ: ["name", "McDonald's"] }, {EQ: ["state", "NY"]] }` 
| `NOT` | Logical Negation | 1 | `filter: { NOT: [ expr ] }filter: { NOT: [ {EQ: ["name", "McDonald's"] } ]}` 
| `ADD` | Addition | 2 | `filter: { ADD: [ "monthlySales", 123 ] }` 
| `SUB` | Subtraction | 2 | `filter: { SUB: [ "monthlySales", 123 ] }` 
| `MUL` | Multiplication | 2 | `filter: { MUL: [ "monthlySales", 12 ] }` 
| `DIV` | Division | 2 | `filter: { MUL: [ "annualSales", 12 ] }` 
| `HAS` | Checks if value is present | 1 | `filter: {HAS: ["roles.emailAddresses"] }` 
| `IS_NULL` | Checks if value is null | 1 | `filter: {IS_NULL: ["website"] }` 
| `IS_NOT_NULL` | Checks if value is not null | 1 | `filter: {IS_NOT_NULL: ["website"] }` 

#### Example

Request
```graphql
query Search {
    search(searchInput: { name: "McDonald's", entityType: OPERATING_LOCATION }) {
        ... on OperatingLocation {
            addresses {
                edges {
                    node {
                        fullAddress
                    }
                }
            }
            cardTransactions(
                conditions: {
                    filter: {
                        AND: [
                            { EQ: ["period", "1m"] },
                            { EQ: ["quantity_type", "card_revenue_amount"] }
                        ]
                    }
                }
            ) {
                edges {
                    node {
                        quantityType
                        projectedQuantity
                        rawQuantity
                        periodStartDate
                        periodEndDate
                        period
                    }
                }
            }
            names {
                edges {
                    node {
                        name
                    }
                }
            }
        }
    }
}
```

Response
```json
{
    "data": {
        "search": [
            {
                "addresses": {
                    "edges": [
                        {
                            "node": {
                                "fullAddress": "225 MARY GRUBBS HWY WALTON KY 41094"
                            }
                        }
                    ]
                },
                "cardTransactions": {
                    "edges": [
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 188939,
                                "rawQuantity": 67375,
                                "periodStartDate": "2025-06-01",
                                "periodEndDate": "2025-06-30",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 198123,
                                "rawQuantity": 68809,
                                "periodStartDate": "2025-05-01",
                                "periodEndDate": "2025-05-31",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 187506,
                                "rawQuantity": 65938,
                                "periodStartDate": "2025-04-01",
                                "periodEndDate": "2025-04-30",
                                "period": "1m"
                            }
                        }
                    ]
                },
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "MCDONALD'S"
                            }
                        }
                    ]
                }
            },
            {
                "addresses": {
                    "edges": [
                        {
                            "node": {
                                "fullAddress": "2502 SE DELAWARE AVE ANKENY IA 50021"
                            }
                        }
                    ]
                },
                "cardTransactions": {
                    "edges": [
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 117712,
                                "rawQuantity": 36313,
                                "periodStartDate": "2025-06-01",
                                "periodEndDate": "2025-06-30",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 125336,
                                "rawQuantity": 36407,
                                "periodStartDate": "2025-05-01",
                                "periodEndDate": "2025-05-31",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 122000,
                                "rawQuantity": 35474,
                                "periodStartDate": "2025-04-01",
                                "periodEndDate": "2025-04-30",
                                "period": "1m"
                            }
                        }
                    ]
                },
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "MCDONALD'S"
                            }
                        }
                    ]
                }
            },
            {
                "addresses": {
                    "edges": [
                        {
                            "node": {
                                "fullAddress": "DEKALB IL 60115"
                            }
                        }
                    ]
                },
                "cardTransactions": {
                    "edges": []
                },
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "MCDONALD'S"
                            }
                        }
                    ]
                }
            },
            {
                "addresses": {
                    "edges": [
                        {
                            "node": {
                                "fullAddress": "2642 SANTA ROSA AVE SANTA ROSA CA 95407"
                            }
                        }
                    ]
                },
                "cardTransactions": {
                    "edges": [
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 151212,
                                "rawQuantity": 41109,
                                "periodStartDate": "2025-06-01",
                                "periodEndDate": "2025-06-30",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 160633,
                                "rawQuantity": 41802,
                                "periodStartDate": "2025-05-01",
                                "periodEndDate": "2025-05-31",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 159208,
                                "rawQuantity": 42807,
                                "periodStartDate": "2025-04-01",
                                "periodEndDate": "2025-04-30",
                                "period": "1m"
                            }
                        }
                    ]
                },
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "MCDONALD'S"
                            }
                        }
                    ]
                }
            },
            {
                "addresses": {
                    "edges": [
                        {
                            "node": {
                                "fullAddress": "1717 W BATTLEFIELD ST SPRINGFIELD MO 65807"
                            }
                        }
                    ]
                },
                "cardTransactions": {
                    "edges": [
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 231018,
                                "rawQuantity": 65062,
                                "periodStartDate": "2025-06-01",
                                "periodEndDate": "2025-06-30",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 243734,
                                "rawQuantity": 68490,
                                "periodStartDate": "2025-05-01",
                                "periodEndDate": "2025-05-31",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 234450,
                                "rawQuantity": 65714,
                                "periodStartDate": "2025-04-01",
                                "periodEndDate": "2025-04-30",
                                "period": "1m"
                            }
                        }
                    ]
                },
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "MCDONALD'S"
                            }
                        }
                    ]
                }
            },
            {
                "addresses": {
                    "edges": [
                        {
                            "node": {
                                "fullAddress": "550 COURTHOUSE RD GULFPORT MS 39507"
                            }
                        }
                    ]
                },
                "cardTransactions": {
                    "edges": [
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 48371,
                                "rawQuantity": 11942,
                                "periodStartDate": "2025-06-01",
                                "periodEndDate": "2025-06-30",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 51520,
                                "rawQuantity": 11620,
                                "periodStartDate": "2025-05-01",
                                "periodEndDate": "2025-05-31",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 52035,
                                "rawQuantity": 11263,
                                "periodStartDate": "2025-04-01",
                                "periodEndDate": "2025-04-30",
                                "period": "1m"
                            }
                        }
                    ]
                },
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "MCDONALD'S"
                            }
                        }
                    ]
                }
            },
            {
                "addresses": {
                    "edges": [
                        {
                            "node": {
                                "fullAddress": "808 S COLUMBIA DR WEST COLUMBIA TX 77486"
                            }
                        }
                    ]
                },
                "cardTransactions": {
                    "edges": [
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 146039,
                                "rawQuantity": 35715,
                                "periodStartDate": "2025-06-01",
                                "periodEndDate": "2025-06-30",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 175843,
                                "rawQuantity": 41151,
                                "periodStartDate": "2025-05-01",
                                "periodEndDate": "2025-05-31",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 156760,
                                "rawQuantity": 39294,
                                "periodStartDate": "2025-04-01",
                                "periodEndDate": "2025-04-30",
                                "period": "1m"
                            }
                        }
                    ]
                },
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "MCDONALD'S"
                            }
                        }
                    ]
                }
            },
            {
                "addresses": {
                    "edges": [
                        {
                            "node": {
                                "fullAddress": "10260 GRIFFIN RD FORT LAUDERDALE FL 33328"
                            }
                        }
                    ]
                },
                "cardTransactions": {
                    "edges": [
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 277587,
                                "rawQuantity": 84323,
                                "periodStartDate": "2025-06-01",
                                "periodEndDate": "2025-06-30",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 296827,
                                "rawQuantity": 88822,
                                "periodStartDate": "2025-05-01",
                                "periodEndDate": "2025-05-31",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 281555,
                                "rawQuantity": 87665,
                                "periodStartDate": "2025-04-01",
                                "periodEndDate": "2025-04-30",
                                "period": "1m"
                            }
                        }
                    ]
                },
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "MCDONALD'S"
                            }
                        }
                    ]
                }
            },
            {
                "addresses": {
                    "edges": [
                        {
                            "node": {
                                "fullAddress": "2080 CROWELL RD N STE A COVINGTON GA 30014"
                            }
                        }
                    ]
                },
                "cardTransactions": {
                    "edges": [
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 124874,
                                "rawQuantity": 34977,
                                "periodStartDate": "2025-06-01",
                                "periodEndDate": "2025-06-30",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 138962,
                                "rawQuantity": 37023,
                                "periodStartDate": "2025-05-01",
                                "periodEndDate": "2025-05-31",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 130421,
                                "rawQuantity": 36720,
                                "periodStartDate": "2025-04-01",
                                "periodEndDate": "2025-04-30",
                                "period": "1m"
                            }
                        }
                    ]
                },
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "MCDONALD'S"
                            }
                        }
                    ]
                }
            },
            {
                "addresses": {
                    "edges": [
                        {
                            "node": {
                                "fullAddress": "1200 N LACROSSE ST RAPID CITY SD 57701"
                            }
                        }
                    ]
                },
                "cardTransactions": {
                    "edges": [
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 308110,
                                "rawQuantity": 110039,
                                "periodStartDate": "2021-06-01",
                                "periodEndDate": "2021-06-30",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 274141,
                                "rawQuantity": 97907,
                                "periodStartDate": "2021-05-01",
                                "periodEndDate": "2021-05-31",
                                "period": "1m"
                            }
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 237229,
                                "rawQuantity": 84725,
                                "periodStartDate": "2021-04-01",
                                "periodEndDate": "2021-04-30",
                                "period": "1m"
                            }
                        }
                    ]
                },
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "MCDONALD'S"
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

#### Filtering by Field Paths

When referencing nested fields in filters, use dot notation, for example:

- `operatingStatuses.operatingStatus` : Access nested operating status
- `addresses.state` : Access address state
- `cardTransactions.period` : Access card transaction period
- `industries.industryType` : Access industry type

### orderBy

A list of sort expressions that define how results should be ordered. Each string follows the format: `<field_name> [ASC|DESC]`

The ordering pertains to the requested field only. In the example below, the names will be returned in descending order:

Request
```graphql
query Search {
    search(
        searchInput: {
            name: "pizza"
            entityType: BRAND
            address: { city: "NEW YORK", state: "NY" }
        }
    ) {
        ... on Brand {
            names(conditions: { orderBy: ["name DESC"] }) {
                edges {
                    node {
                        name
                    }
                }
            }

        }
    }
}
```

Response
```json
{
    "data": {
        "search": [
            {
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "PIZZA HUT EXPRESS"
                            }
                        },
                        {
                            "node": {
                                "name": "PIZZA HUT"
                            }
                        },
                        {
                            "node": {
                                "name": "CENTER PIZZA"
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

Multiple ordering patterns are also possible:

Request
```graphql
query Search {
    search(
        searchInput: {
            name: "pizza"
            entityType: OPERATING_LOCATION
            address: { state: "NEW YORK" }
        }
    ) {
        ... on OperatingLocation {
            addresses
            (conditions: { orderBy: ["streetAddress1 ASC", "city ASC"] }) {
                edges {
                    node {
                        streetAddress1
                        city
                    }
                }
            }

        }
    }
}
```

Response
```json
{
    "data": {
        "search": [
            {
                "addresses": {
                    "edges": [
                        {
                            "node": {
                                "streetAddress1": "364 7TH AVE",
                                "city": "BRONX"
                            }
                        }
                    ]
                }
            },
            {
                "addresses": {
                    "edges": [
                        {
                            "node": {
                                "streetAddress1": "921 E 174TH ST",
                                "city": "NEW YORK"
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

Multiple `orderBy` s can also be specified:

Request
```graphql
query Search {
    search(
        searchInput: {
            name: "pizza"
            entityType: BRAND
            address: { city: "NEW YORK", state: "NY" }
        }
    ) {
        ... on Brand {
            names(conditions: { orderBy: ["name desc"] }) {
                edges {
                    node {
                        name
                    }
                }
            }
            operatingLocations(conditions:{orderBy: ["addresses.city asc"]}) {
                edges {
                    node {
                        addresses {
                            edges {
                                node {
                                    city
                                    state
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
```

## Math Functions

Math functions (i.e. [`NodeFunctions`](/reference/graphql_api/interfaces/node-functions) ) provides aggregate mathematical operations on related data. It allows you to perform calculations like counting, summing, finding minimum/maximum values, and collecting values from related entities.

Here is a table of available math functions:

| **Function** | **Return Type** | **Description** | **Parameters** 
| `count` | Int | Counts the number of related records | - `field` (required)
- `conditions` (optional) 
| `sum` | Int | Sums numeric values from related records | - `field` (required)
- `conditions` (optional) 
| `min` | Int | Finds the minimum numeric value | - `field` (required)
- `conditions` (optional) 
| `max` | Int | Finds the maximum numeric value | - `field` (required)
- `conditions` (optional) 
| `avg` | Float | Calculates the average of numeric values | - `field` (required)
- `conditions` (optional) 
| `collect` | String | Collects values into a concatenated string | - `field` (required)
- `conditions` (optional)
- `separator` (optional) 
| `minDateTime` | DateTime | Finds the minimum datetime value | - `field` (required)
- `conditions` (optional) 
| `maxDateTime` | DateTime | Finds the maximum datetime value | - `field` (required)
- `conditions` (optional) 

### Math Function Parameters

- `field` (required)
- Type: `String`
- Description: The path to the field to apply the math function
- Examples
- `websites` : Count all related websites
- `names.rank` : Sum the rank values of related names
- `operatingLocations.brands.id` : Count brands within operating locations
- `conditions` (optional)
- Type: [`Conditions`](https://documentation.enigma.com/reference/graphql_api/inputs/conditions)
- Description: Conditions in which to apply for the input of the math function
- Properties:
- `filter` (optional): a JSON object to specify filtering of attributes
- `orderBy` (optional): a list of attributes and sort ordering
- `limit` (optional): an integer to limit the top-level result by
- `pageToken` (optional): a numeric offset represented as a string to start returning results from (e.g. a `pageToken` of "8" would indicate to start from the eighth element of the resulting list).
- `separator` (optional) (only for the `collect` math function)
- Type: `String`
- Description: A separator when joining values (e.g. ",", ";", "|", etc.)
- Default: "," (i.e. comma)

### Examples

#### Count

Count the number of names and websites for the brand "McDonald's".

Request
```graphql
query Search {
  search(searchInput: { name: "McDonald's", entityType: BRAND }) {
	  ... on Brand {
		  id
	    websitesCount: count(field: "websites")
	    namesCount: count(field: "names")
    }
  }
}
```

Response
```json
{
    "data": {
        "search": [
            {
                "id": "2daa02e4-f887-40f5-8bd2-c00764b91e76",
                "websitesCount": 14482,
                "namesCount": 3
            }
        ]
    }
}
```

#### Sum

Get the total number of reviews for McDonald's operating locations.

Request
```graphql
query Search {
  search(searchInput: { name: "McDonald's", entityType: OPERATING_LOCATION }) {
    ... on OperatingLocation {
        totalReviews: sum(field: "reviewSummaries.reviewCount")
    }
  }
}
```

Response
```json
{
    "data": {
        "search": [
            {
                "totalReviews": 16323
            },
            {
                "totalReviews": 20660
            },
            {
                "totalReviews": 1427
            },
            {
                "totalReviews": 23860
            },
            {
                "totalReviews": 18539
            },
            {
                "totalReviews": 11330
            },
            {
                "totalReviews": 20853
            },
            {
                "totalReviews": 11339
            },
            {
                "totalReviews": 33452
            },
            {
                "totalReviews": 1725
            }
        ]
    }
}
```

#### Min/Max

Get the minimum, maximum, and average number of reviews for McDonald's operating locations.

Request
```graphql
query Search {
    search(searchInput: { name: "McDonald's", entityType: OPERATING_LOCATION }) {
        ... on OperatingLocation {
            minReviewCount: min(field: "reviewSummaries.reviewCount")
            maxReviewCount: max(field: "reviewSummaries.reviewCount")
            avgReviewCount: avg(field: "reviewSummaries.reviewCount")

        }
    }
}
```

Response
```json
{
    "data": {
        "search": [
            {
                "minReviewCount": 641,
                "maxReviewCount": 1017,
                "avgReviewCount": 859.1052631578947
            },
            {
                "minReviewCount": 1491,
                "maxReviewCount": 1896,
                "avgReviewCount": 1721.6666666666667
            },
            {
                "minReviewCount": 124,
                "maxReviewCount": 269,
                "avgReviewCount": 203.85714285714286
            },
            {
                "minReviewCount": 1469,
                "maxReviewCount": 1852,
                "avgReviewCount": 1704.2857142857142
            },
            {
                "minReviewCount": 1908,
                "maxReviewCount": 2173,
                "avgReviewCount": 2059.8888888888887
            },
            {
                "minReviewCount": 930,
                "maxReviewCount": 1140,
                "avgReviewCount": 1030
            },
            {
                "minReviewCount": 918,
                "maxReviewCount": 1121,
                "avgReviewCount": 1042.65
            },
            {
                "minReviewCount": 750,
                "maxReviewCount": 923,
                "avgReviewCount": 872.2307692307693
            },
            {
                "minReviewCount": 1556,
                "maxReviewCount": 2018,
                "avgReviewCount": 1858.4444444444443
            },
            {
                "minReviewCount": 428,
                "maxReviewCount": 435,
                "avgReviewCount": 431.25
            }
        ]
    }
}
```

#### MinDateTime/MaxDateTime

Get the first and last observed date for McDonald's operating locations.

Request
```graphql
query Search {
    search(searchInput: { name: "McDonald's", entityType: OPERATING_LOCATION }) {
        ... on OperatingLocation {
            firstObservedDateTime: minDateTime(field: "addresses.firstObservedDate")
            lastObservedDateTime: maxDateTime(field: "addresses.lastObservedDate")
        }
    }
}
```

Response
```json
{
    "data": {
        "search": [
            {
                "firstObservedDateTime": "2020-07-04T01:00:00",
                "lastObservedDateTime": "2025-08-16T09:59:51"
            },
            {
                "firstObservedDateTime": "2020-07-04T01:00:00",
                "lastObservedDateTime": "2025-08-13T07:29:01"
            },
            {
                "firstObservedDateTime": "2020-07-04T01:00:00",
                "lastObservedDateTime": "2025-08-19T00:00:00"
            },
            {
                "firstObservedDateTime": "2020-07-04T01:00:00",
                "lastObservedDateTime": "2025-08-14T08:38:52"
            },
            {
                "firstObservedDateTime": "2020-07-04T01:00:00",
                "lastObservedDateTime": "2025-06-30T07:00:00"
            },
            {
                "firstObservedDateTime": "2020-07-04T01:00:00",
                "lastObservedDateTime": "2025-08-06T14:12:59"
            },
            {
                "firstObservedDateTime": "2020-07-04T01:00:00",
                "lastObservedDateTime": "2025-08-08T22:59:39"
            },
            {
                "firstObservedDateTime": "2020-07-04T01:00:00",
                "lastObservedDateTime": "2025-07-09T00:00:00"
            },
            {
                "firstObservedDateTime": "2020-07-04T01:00:00",
                "lastObservedDateTime": "2025-07-16T22:13:52"
            },
            {
                "firstObservedDateTime": "2015-05-15T08:28:06",
                "lastObservedDateTime": "2025-07-18T08:46:04"
            }
        ]
    }
}
```

#### Collect

Get the collection of Enigma industry descriptions of McDonald's operating locations.

Note: `collect` must be output to a file (i.e. `output` in `SearchInput` must be specified).

Request
```graphql
query Search {
    search(
        searchInput: {
            address: { city: "NEW YORK", state: "NY" }
            entityType: OPERATING_LOCATION
            output: { filename: "09edc744-e3ca-415b-8b5a-4a8149f3167b" }
        }
    ) {
        ... on OperatingLocation {
            addresses(first: 1) {
                edges {
                    node {
                        fullAddress
                    }
                }
            }
            brands(first: 1) {
                edges {
                    node {
                        names(first: 1) {
                            edges {
                                node {
                                    name
                                }
                            }
                        }
                        brandIndustries: collect(
                            field: "industries.industryDesc"
                            separator: ","
                            conditions: {
                                filter: {
                                    EQ: ["industryType", "enigma_industry_description"]
                                }
                            }
                        )
                    }
                }
            }
        }
    }
}
```

Response
```json
{
    "extensions": {
        "backgroundTasks": [
            {
                "id": "849e8c2f-2562-4fc0-8359-826f20ce36cf",
                "status": "SUCCESS",
                "result": ["<URL_TO_RESULT_FILE>"]
            }
        ]
    },
    "data": {
        "search": null
    }
}
```

## Pagination

The Enigma's GraphQL schema implements cursor-based pagination following the [Relay Connection specification](https://relay.dev/graphql/connections.htm) .

### Core Concepts

#### Connection Pattern

All paginated queries return a `Connection` object that contains:

- `edges` : Array of edge objects containing the actual data
- `pageInfo` : Metadata about the current page and navigation options

#### Edge Structure

Each edge contains:

- `node` : The actual data object
- `cursor` : A string representing the position in the result set

#### PageInfo Structure

The `pageInfo` object provides:

- `hasNextPage` : Boolean indicating if more results are available after the current page
- `hasPreviousPage` : Boolean indicating if results exist before the current page
- `startCursor` : Cursor for the first item in the current page
- `endCursor` : Cursor for the last item in the current page

### Pagination Parameters

#### Forward Pagination

- `first` : Number of items to return from the beginning
- `after` : Cursor to start after (exclusive)

#### Backward Pagination

- `last` : Number of items to return from the end
- `before` : Cursor to end before (exclusive)

### Pagination Validation Rules

- Cannot specify both `first` and `last` in the same query
- `after` requires `first` to be specified
- `before` requires `last` to be specified
- All pagination parameters must be >= 0

### Example

This example searches the next eight card transactions for McDonald's operating locations after the node with cursor `eyJpZHgiOjd9` .

Request
```graphql
query Search {
    search(searchInput: { name: "McDonald's", entityType: OPERATING_LOCATION }) {
        ... on OperatingLocation {
            cardTransactions(first: 8, after: "eyJpZHgiOjd9") {
                edges {
                    node {
                        quantityType
                        projectedQuantity
                        rawQuantity
                        periodStartDate
                        periodEndDate
                        period
                    }
                    cursor
                }
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                }
            }
        }
    }
}
```

Response
```json
{
    "data": {
        "search": [
            {
                "cardTransactions": {
                    "edges": [
                        {
                            "node": {
                                "quantityType": "avg_transaction_size",
                                "projectedQuantity": 12,
                                "rawQuantity": 12,
                                "periodStartDate": "2025-06-01",
                                "periodEndDate": "2025-06-30",
                                "period": "1m"
                            },
                            "cursor": "eyJpZHgiOjh9"
                        },
                        {
                            "node": {
                                "quantityType": "refunds_amount",
                                "projectedQuantity": -125,
                                "rawQuantity": -44,
                                "periodStartDate": "2025-06-01",
                                "periodEndDate": "2025-06-30",
                                "period": "1m"
                            },
                            "cursor": "eyJpZHgiOjl9"
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_prior_period_growth",
                                "projectedQuantity": 0.0061,
                                "rawQuantity": 0.0124,
                                "periodStartDate": "2025-04-01",
                                "periodEndDate": "2025-06-30",
                                "period": "3m"
                            },
                            "cursor": "eyJpZHgiOjEwfQ=="
                        },
                        {
                            "node": {
                                "quantityType": "card_customers_average_daily_count",
                                "projectedQuantity": 516,
                                "rawQuantity": 184,
                                "periodStartDate": "2025-06-01",
                                "periodEndDate": "2025-06-30",
                                "period": "1m"
                            },
                            "cursor": "eyJpZHgiOjExfQ=="
                        },
                        {
                            "node": {
                                "quantityType": "refunds_amount",
                                "projectedQuantity": -1357,
                                "rawQuantity": -472,
                                "periodStartDate": "2024-07-01",
                                "periodEndDate": "2025-06-30",
                                "period": "12m"
                            },
                            "cursor": "eyJpZHgiOjEyfQ=="
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_prior_period_growth",
                                "projectedQuantity": 0.0023,
                                "rawQuantity": 0.0022,
                                "periodStartDate": "2024-07-01",
                                "periodEndDate": "2025-06-30",
                                "period": "12m"
                            },
                            "cursor": "eyJpZHgiOjEzfQ=="
                        },
                        {
                            "node": {
                                "quantityType": "card_customers_average_daily_count",
                                "projectedQuantity": 521,
                                "rawQuantity": 183,
                                "periodStartDate": "2025-04-01",
                                "periodEndDate": "2025-06-30",
                                "period": "3m"
                            },
                            "cursor": "eyJpZHgiOjE0fQ=="
                        },
                        {
                            "node": {
                                "quantityType": "card_revenue_amount",
                                "projectedQuantity": 2216172,
                                "rawQuantity": 769903,
                                "periodStartDate": "2024-07-01",
                                "periodEndDate": "2025-06-30",
                                "period": "12m"
                            },
                            "cursor": "eyJpZHgiOjE1fQ=="
                        }
                    ],
                    "pageInfo": {
                        "hasNextPage": true,
                        "hasPreviousPage": true,
                        "startCursor": "eyJpZHgiOjh9",
                        "endCursor": "eyJpZHgiOjE1fQ=="
                    }
                }
            }
        ]
    }
}
```

## Usage

The `search` query supports four main search patterns:

1. Text Search
2. Lookup
3. Prompt Search
4. Segmentation

### Text Search

Text search uses the business name, person information (e.g. first name, last name, etc.), and/or address to make a search against Enigma's business data.

#### Example

Request
```graphql
query Search {
    search(
        searchInput: {
            name: "Enigma"
            person: {firstName: "Joe", lastName: "Smith"}
            entityType: BRAND
            address: {city: "NEW YORK", state:"NY"}
        }
    ) {
        ... on Brand {
            id
            names {
                edges {
                    node {
                        name
                    }
                }
            }
        }
    }
}
```

Response
```json
{
    "data": {
        "search": [
            {
                "id": "5f53e079-c66a-487e-8a9d-08efc39652ee",
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "ENIGMA TECHNOLOGIES"
                            }
                        },
                        {
                            "node": {
                                "name": "ENIGMA TECHNOLOGIES, INC."
                            }
                        },
                        {
                            "node": {
                                "name": "ENIGMA COMPUTER SOLUTION"
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

### Lookup

Lookup uses a entity's unique ID to search Enigma's business data.

#### Example

Request
```graphql
query Search {
    search(
        searchInput: {
            id: "5f53e079-c66a-487e-8a9d-08efc39652ee"
        }
    ) {
        ... on Brand {
            id
            names {
                edges {
                    node {
                        name
                    }
                }
            }
        }
    }
}
```

Response
```json
{
    "data": {
        "search": [
            {
                "id": "5f53e079-c66a-487e-8a9d-08efc39652ee",
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "ENIGMA TECHNOLOGIES"
                            }
                        },
                        {
                            "node": {
                                "name": "ENIGMA TECHNOLOGIES, INC."
                            }
                        },
                        {
                            "node": {
                                "name": "ENIGMA COMPUTER SOLUTION"
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

### Prompt Search

Prompt search uses natural language (e.g. "grocery stores in New York") to search against Enigma's business data.

#### Example

Request
```graphql
query Search {
    search(
        searchInput: {
            prompt: "Mexican restaurants"
            entityType: BRAND
            conditions: {limit: 3}

        }
    ) {
        ... on Brand {
            names {
                edges {
                    node {
                        name
                    }
                }
            }
        }
    }
}
```

Response
```json
{
    "data": {
        "search": [
            {
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "TAQUERIA CDMX"
                            }
                        }
                    ]
                }
            },
            {
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "DON TEQUILAS MEXICAN GRILL & CANTINA"
                            }
                        }
                    ]
                }
            },
            {
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "ANGIE'S COCINA"
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

### Segmentation

Segmentation searches resulting in a large dataset should be performed asynchronously. This is particularly useful for comprehensive data analysis. To output the results of a search as a file, specify the `output` parameter in the input. The system will create a background task instead of returning immediate results.

#### Example

Request
```graphql
query Search {
    search(
        searchInput: {
            prompt: "Mexican restaurants"
            entityType: OPERATING_LOCATION
            output: { filename: "mexican_resuaturants_search_query_1" }
        }
    ) {
        ... on OperatingLocation {
            addresses(first: 1) {
                edges {
                    node {
                        fullAddress
                    }
                }
            }
        }
    }
}
```

Response
```json
{
    "extensions": {
        "backgroundTasks": [
            {
                "id": "849e8c2f-2562-4fc0-8359-826f20ce36cf",
                "status": "SUCCESS",
                "result": ["<URL_TO_RESULT_FILE>"]
            }
        ]
    },
    "data": {
        "search": null
    }
}
```

Segmentation searches will return a `202 Accepted` response status code. The response will include an ID associated with the result.

Example Response
```json
# Below is a the response of search query request which was deemed to return a very large response.

# Response code: 202
# Response body:
{
    "extensions": {
	      "backgroundTasks": [
	          {
	              "id": "285b6f06-c532-4969-bcfd-cdd82f5de373",
	              "status": "PROCESSING"
	          }
        ]
    },
    "data": {
		    # note how "data.search" is not populated, but
		    # extensions.backgroundTasks: [...] is.
				# This allows the flexibility for Engima's GraphQL api to return certain data if available,
				# and provide addtional data for the request in the future via background_tasks
        "search": null
    }
}
```

To check the status of the result after receiving a `202 Accepted` response, make a request to the `backgroundTask` GraphQL query.

Polling Status Example Request
```graphql
# Use this query to poll for result
query BackgroundTask {
    backgroundTask(id: "285b6f06-c532-4969-bcfd-cdd82f5de373") {
        status
        result
    }
}
```

Polling Status Example Response
```json
# Example of a successful completion of a background task
{
    "data": {
        "backgroundTask": {
            "id": "285b6f06-c532-4969-bcfd-cdd82f5de373",
            "status": "SUCCESS",
            "result": [
                "https://S3_PRESIGNED_DOWNLOAD_URL_HERE"
            ]
        }
    }
}
```

Here is a table listing the possible values for `status` :

| **Status** | **Desc** | **Terminal State** 
| `PROCESSING` | Background task is currently executing | No 
| `CANCELLED` | Background task execution aborted/cancelled. No results will ever be available | Yes 
| `FAILED` | Background task execution failed after possible re-tries. No results will ever be available | Yes 
| `SUCCESS` | Background task execution succeeded. Results are immediately available | Yes 

## Common Use Cases

The following are common use cases to use the `search` query for:

- Find businesses by industry, location, or name
- Look up specific companies by ID
- Generate market research datasets
- Discover competitors in specific markets
- Find businesses with specific characteristics (revenue, size, etc.)

## Example Use Cases

The following are example use cases to use the `search` query for:

- "Find all grocery stores in New York that are currently open"
- "Look up the brand 'Apple Inc.' and get its operating locations"
- "Generate a list of all restaurants in California with their revenue data"

## Best Practices and Useful Information

Keep in mind the following best practices and information:

- Entity types:
- **Brand** : A customer-facing business identity
- **Legal Entity** : How a business is recognized by governments, such as registrations
- **Operating Location** : A physical business location with an address
- `search` requests should have either `id` , `name` , or `website` specified; otherwise, specify `prompt` with `output`