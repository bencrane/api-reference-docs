# Directives

URL: https://documentation.enigma.com/guides/graphql/directives

Directives let you transform and compose field values directly within your GraphQL query. They are applied to a special `_fn` field and can be **chained** left-to-right so that the output of one directive becomes the input of the next.

## How Directives Work

Every directive is attached to a virtual `_fn` field inside a selection set. The **first** directive in the chain specifies where to pull input data using one of two arguments:

| Argument | Type | Description 
| `ref` | `String` | A single dot-notation path to a field in the current object. Returns **one** value. 
| `refs` | `[String!]` | A list of dot-notation paths. Returns an **array** of values (one per path). 

Subsequent directives in the chain ignore `ref` / `refs` and instead operate on the value returned by the previous directive.

tip
You can alias the `_fn` field (e.g. `displayName: _fn @upper(ref: "names.edges.0.node.name")` ) to give the computed value a meaningful key in the response.

## @coalesce

Returns the **first non-null** value from the referenced fields. Useful for falling back to alternative fields when the primary one is missing.

**Arguments:**`ref` | `refs`

Request
```graphql
query {
    search(
        searchInput: {
            name: "Enigma Technologies"
            entityType: BRAND
            conditions: { limit: 1 }
        }
    ) {
        ... on Brand {
            primaryIdentifier: _fn @coalesce(refs: [
                "websites.edges.0.node.website",
                "names.edges.0.node.name"
            ])
            websites {
                edges {
                    node {
                        website
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
                "primaryIdentifier": "enigma.com",
                "websites": {
                    "edges": [
                        {
                            "node": {
                                "website": "enigma.com"
                            }
                        }
                    ]
                },
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "ENIGMA TECHNOLOGIES"
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

## @compact

Removes **null** values from an array. Non-array values pass through unchanged.

**Arguments:**`ref` | `refs`

Request
```graphql
query {
    search(
        searchInput: {
            name: "McDonald's"
            entityType: BRAND
            conditions: { limit: 1 }
        }
    ) {
        ... on Brand {
            nonNullNames: _fn @compact(refs: [
                "names.edges.0.node.name",
                "names.edges.1.node.name",
                "names.edges.2.node.name"
            ])
            names(first: 3) {
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
                "nonNullNames": [
                    "MCDONALD'S",
                    "MCDONALD'S RESTAURANT"
                ],
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "MCDONALD'S"
                            }
                        },
                        {
                            "node": {
                                "name": "MCDONALD'S RESTAURANT"
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

## @slice

Returns a subset of an **array** or **string** by start and end index. Supports negative indices (e.g. `end: -1` to exclude the last element).

**Arguments:**

| Argument | Type | Description 
| `start` | `Int` | Start index (inclusive, defaults to `0` ). 
| `end` | `Int` | End index (exclusive, defaults to length). Negative values count from the end. 

Request
```graphql
query {
    search(
        searchInput: {
            name: "McDonald's"
            entityType: BRAND
            conditions: { limit: 1 }
        }
    ) {
        ... on Brand {
            abbreviated: _fn @slice(ref: "names.edges.0.node.name", end: 8)
            names(first: 1) {
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
                "abbreviated": "MCDONAL",
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

## @trim

Strips leading and trailing whitespace from a string, or from **each string** in an array.

**Arguments:**`ref` | `refs`

Request
```graphql
query {
    search(
        searchInput: {
            name: "Enigma Technologies"
            entityType: BRAND
            conditions: { limit: 1 }
        }
    ) {
        ... on Brand {
            cleanName: _fn @trim(ref: "names.edges.0.node.name")
            names(first: 1) {
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
                "cleanName": "ENIGMA TECHNOLOGIES",
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "ENIGMA TECHNOLOGIES"
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

## @upper

Converts a string to **UPPERCASE** , or each string in an array to uppercase.

**Arguments:**`ref` | `refs`

Request
```graphql
query {
    search(
        searchInput: {
            name: "Enigma Technologies"
            entityType: BRAND
            conditions: { limit: 1 }
        }
    ) {
        ... on Brand {
            shout: _fn @upper(ref: "websites.edges.0.node.website")
            websites(first: 1) {
                edges {
                    node {
                        website
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
                "shout": "ENIGMA.COM",
                "websites": {
                    "edges": [
                        {
                            "node": {
                                "website": "enigma.com"
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

## @lower

Converts a string to **lowercase** , or each string in an array to lowercase.

**Arguments:**`ref` | `refs`

Request
```graphql
query {
    search(
        searchInput: {
            name: "McDonald's"
            entityType: BRAND
            conditions: { limit: 1 }
        }
    ) {
        ... on Brand {
            loweredName: _fn @lower(ref: "names.edges.0.node.name")
            names(first: 1) {
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
                "loweredName": "mcdonald's",
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

## @map

Extracts a nested field from **each element** in an array. The `field` argument is a dot-separated path. Returns `null` for elements where the path does not exist.

**Arguments:**

| Argument | Type | Description 
| `ref` | `refs` | `String` | `[String!]` | The source array to iterate over. 
| `field` | `String` | Dot-notation path to extract from each element (e.g. `"node.name"` ). 

This example pulls from two sources ( `websites` and `operatingLocations` ), extracts the first technology from each, removes nulls with `@compact` , and joins them into a comma-separated string. The raw source fields are hidden from the response using `@skip(if: true)` .

Request
```graphql
query Search {
    search(
        searchInput: {
            name: "TATSU SUSHI"
            entityType: BRAND
            address: {
                street1: ""
                street2: null
                city: "WALNUT CREEK"
                state: "CA"
                postalCode: "94598"
            }
        }
    ) {
        ... on Brand {
            id
            technologies: _fn
                @map(refs: ["websites", "operatingLocations"], field: "edges.0.node.technologiesUseds.edges.0.node.technology")
                @compact
                @join(sep: ",")
            websites(conditions: {filter: {HAS: ["technologiesUseds"]}}) @skip(if: true) {
                edges {
                    node {
                        technologiesUseds {
                            edges {
                                node {
                                    technology
                                }
                            }
                        }
                    }
                }
            }
            operatingLocations(conditions: {filter: {HAS: ["technologiesUseds"]}}) @skip(if: true) {
                edges {
                    node {
                        technologiesUseds {
                            edges {
                                node {
                                    technology
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

Response
```json
{
    "data": {
        "search": [
            {
                "id": "some-brand-id",
                "technologies": "SQUARE,DOORDASH"
            }
        ]
    }
}
```

tip
Use `@skip(if: true)` on the source fields to keep your response clean — the directives still read from those fields before they are stripped from the output.

## @join

Joins array elements into a **single string** using the specified separator. Null values become empty strings; non-string values are stringified.

**Arguments:**

| Argument | Type | Description 
| `ref` | `refs` | `String` | `[String!]` | The source values to join. 
| `sep` | `String` | Separator inserted between elements (defaults to `""` ). 

Request
```graphql
query {
    search(
        searchInput: {
            name: "McDonald's"
            entityType: BRAND
            conditions: { limit: 1 }
        }
    ) {
        ... on Brand {
            nameList: _fn @join(refs: [
                "names.edges.0.node.name",
                "names.edges.1.node.name",
                "names.edges.2.node.name"
            ], sep: " | ")
            names(first: 3) {
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
                "nameList": "MCDONALD'S | MCDONALD'S RESTAURANT | MCDONALDS",
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "MCDONALD'S"
                            }
                        },
                        {
                            "node": {
                                "name": "MCDONALD'S RESTAURANT"
                            }
                        },
                        {
                            "node": {
                                "name": "MCDONALDS"
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

## @include

Includes a field or fragment **only when** the `if` argument is `true` . This is a standard GraphQL directive that works on fields and fragments directly (not via `_fn` ).

**Arguments:**

| Argument | Type | Description 
| `if` | `Boolean!` | When `true` , the annotated field is included in the response. 

Request
```graphql
query {
    search(
        searchInput: {
            name: "McDonald's"
            entityType: BRAND
            conditions: { limit: 1 }
        }
    ) {
        ... on Brand {
            names(first: 1) {
                edges {
                    node {
                        name
                    }
                }
            }
            websites(first: 1) @include(if: true) {
                edges {
                    node {
                        website
                    }
                }
            }
            operatingLocations(first: 1) @include(if: false) {
                edges {
                    node {
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
                                "name": "MCDONALD'S"
                            }
                        }
                    ]
                },
                "websites": {
                    "edges": [
                        {
                            "node": {
                                "website": "mcdonalds.com"
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

note
`operatingLocations` is completely absent from the response because `@include(if: false)` excluded it. In practice, `@include` is most useful when the `if` value is driven by a query variable (e.g. `@include(if: $withLocations)` ).

## @skip

Excludes a field or fragment **when** the `if` argument is `true` . This is the inverse of `@include` and is a standard GraphQL directive that works on fields and fragments directly (not via `_fn` ).

**Arguments:**

| Argument | Type | Description 
| `if` | `Boolean!` | When `true` , the annotated field is **omitted** from the response. 

Request
```graphql
query {
    search(
        searchInput: {
            name: "McDonald's"
            entityType: BRAND
            conditions: { limit: 1 }
        }
    ) {
        ... on Brand {
            names(first: 1) {
                edges {
                    node {
                        name
                    }
                }
            }
            websites(first: 1) @skip(if: true) {
                edges {
                    node {
                        website
                    }
                }
            }
            operatingLocations(first: 1) @skip(if: false) {
                edges {
                    node {
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
                                "name": "MCDONALD'S"
                            }
                        }
                    ]
                },
                "operatingLocations": {
                    "edges": [
                        {
                            "node": {
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "106 WOLF RD ALBANY NY 12205"
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

note
`websites` is absent from the response because `@skip(if: true)` excluded it, while `operatingLocations` is present because `@skip(if: false)` kept it. In practice, `@skip` is most useful when the `if` value is driven by a query variable (e.g. `@skip(if: $hideWebsites)` ).

## Chain Directives Together

Directives can be **chained** on a single `_fn` field. When chained, the output of each directive is passed as input to the next one, left-to-right. Only the **first** directive in the chain uses `ref` / `refs` to read from the response data — the rest operate on the previous directive's output.

### Extract, lowercase, trim, and join brand names

This example uses `@map` to extract each name from the edges array, then `@lower` to lowercase them, `@trim` to strip whitespace, and finally `@join` to combine them into a single comma-separated string.

Request
```graphql
query {
    search(
        searchInput: {
            name: "McDonald's"
            entityType: BRAND
            conditions: { limit: 1 }
        }
    ) {
        ... on Brand {
            combinedNames: _fn
                @map(ref: "names.edges", field: "node.name")
                @lower
                @trim
                @join(sep: ", ")
            names(first: 3) {
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
                "combinedNames": "mcdonald's, mcdonald's restaurant, mcdonalds",
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "MCDONALD'S"
                            }
                        },
                        {
                            "node": {
                                "name": "MCDONALD'S RESTAURANT"
                            }
                        },
                        {
                            "node": {
                                "name": "MCDONALDS"
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

### Extract addresses, uppercase, and take the first two

This example extracts the `fullAddress` from each operating location's address edges, uppercases them, and slices to keep only the first two results.

Request
```graphql
query {
    search(
        searchInput: {
            name: "McDonald's"
            entityType: BRAND
            conditions: { limit: 1 }
        }
    ) {
        ... on Brand {
            topTwoAddresses: _fn
                @map(ref: "operatingLocations.edges", field: "node.addresses.edges.0.node.fullAddress")
                @compact
                @upper
                @slice(start: 0, end: 2)
            operatingLocations(
                conditions: {
                    filter: {
                        AND: [
                            { EQ: ["addresses.city", "ALBANY"] }
                            { EQ: ["addresses.state", "NY"] }
                        ]
                    }
                }
            ) {
                edges {
                    node {
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
                "topTwoAddresses": [
                    "106 WOLF RD ALBANY NY 12205",
                    "161 WASHINGTON EXT AVE ALBANY NY 12205"
                ],
                "operatingLocations": {
                    "edges": [
                        {
                            "node": {
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "106 WOLF RD ALBANY NY 12205"
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "node": {
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "161 WASHINGTON EXT AVE ALBANY NY 12205"
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "node": {
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "256 OSBORNE RD ALBANY NY 12211"
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

### Coalesce with a fallback, then uppercase

Pick the website if available, otherwise fall back to the brand name, then uppercase the result.

Request
```graphql
query {
    search(
        searchInput: {
            name: "Enigma Technologies"
            entityType: BRAND
            conditions: { limit: 1 }
        }
    ) {
        ... on Brand {
            displayLabel: _fn
                @coalesce(refs: [
                    "websites.edges.0.node.website",
                    "names.edges.0.node.name"
                ])
                @upper
            websites(first: 1) {
                edges {
                    node {
                        website
                    }
                }
            }
            names(first: 1) {
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
                "displayLabel": "ENIGMA.COM",
                "websites": {
                    "edges": [
                        {
                            "node": {
                                "website": "enigma.com"
                            }
                        }
                    ]
                },
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "ENIGMA TECHNOLOGIES"
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```