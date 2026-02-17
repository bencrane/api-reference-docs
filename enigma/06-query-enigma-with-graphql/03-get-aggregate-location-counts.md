# Get Aggregate Location Counts

URL: https://documentation.enigma.com/guides/graphql/aggregation

The `aggregate` query is for getting the count of operating locations as well as their associated brands or legal entities, rather than retrieving detailed entity information.

## SearchInput

The `aggregate` query only supports the `entityType``OPERATING_LOCATION` .

For `conditions` , the only filter `aggregate` supports is:

```json
{
    "filter": {"EQ": ["operatingStatuses.operatingStatus", "Open"] }
}
```

indicating a filter for open operating locations.

## Count

The `field` input in `count` only accepts the following:

- `brand`

Example
```graphql
query Aggregate {
    aggregate(
        searchInput: {
            entityType: OPERATING_LOCATION,
            address: {
                city: "NEW YORK",
                state: "NY"
            }
        }
    ) {
        brandsCount: count(field: "brand")
    }
}
```
- `operatingLocation`

Example
```graphql
query Aggregate {
    aggregate(
        searchInput: {
            entityType: OPERATING_LOCATION,
            address: {
                city: "NEW YORK",
                state: "NY"
           }
        }
    ) {
        operatingLocationsCount: count(field: "operatingLocation")
    }
}
```
- `operatingLocation`

legalEntity
```graphql
query Aggregate {
    aggregate(
        searchInput: {
            entityType: OPERATING_LOCATION,
            address: {
                city: "ALBANY",
                state: "NY"
           }
       }
    ) {
        legalEntitiesCount: count(field: "legalEntity")
    }
}
```

## Common Use Cases

The following are common use cases to use the `aggregate` query:

- Count the total brands particular to a certain area
- Count the total brands of operating locations matching your criteria
- Count the total operating locations matching your criteria
- Count the total open operating locations matching your criteria
- Count the legal entities of operating locations matching your criteria

## Examples

Use the `aggregate` query in any case in which you want the count of operating locations that match a certain criteria, such as:

- "How many tech companies with operating locations are there in San Francisco?"
- "Count all open operating locations in New York."