# SODA3 Query Syntax

## Queries using SODA3

The Socrata APIs provide rich query functionality through a query language we call the "Socrata Query Language" or "SoQL". As its name might suggest, it borrows heavily from Structured Query Language (SQL), used by many relational database systems. Its paradigms should be familiar to most developers who have previously worked with SQL, and are easy to learn for those who are new to it.

Requests must be either authenticated by a user or marked with a valid application token. Developers should now use the HTTP POST method when requesting queries, as this allows for longer queries and clearer options.

The endpoints are split into two:

- `/query` for querying (e.g., `https://data.cityofchicago.org/api/v3/views/ydr8-5enu/query.json`) — Query has more options for customizing the request so that you can fine-tune what data you want back.
- `/export` for exports (e.g., `https://data.cityofchicago.org/api/v3/views/ydr8-5enu/export.csv`) — Export focuses on providing the entire dataset to be consumed by humans or Microsoft Excel or similar programs.

## Request Options

| Request Option | `/query` | `/export` | Description |
|---|---|---|---|
| `query` | available | available | The SoQL query to run |
| `page` | available | not available | `{ pageNumber: 1, pageSize: 1000 }` to indicate which page (1-indexed) and how many rows per page |
| `parameters` | available | available | Some views require parameters to be provided by the user. Details to be provided at a later date |
| `timeout` | default: `600` | default: `600` | The number of seconds before timing out the request. Default: 600 (10 minutes) |
| `includeSystem` | default: `true` | not available | Whether or not to include system columns |
| `includeSynthetic` | default: `true` | not available | Whether or not to include not-explicitly-requested columns, such as system fields |
| `orderingSpecifier` | default: `total` | default: `total` | Can be set to `discard` if you do not care about order and just want the data. Can improve performance significantly |
| `serializationOptions` | not available | available | Different formats have specific customization options |

## Examples

You might use the popular program cURL to make the request with the appropriate payload, or use an appropriate HTTP client library in your preferred programming language.

### Query for the first 100 rows of a dataset

```shell
curl --header 'X-App-Token: your-application-token' \
     --json '{
        "query": "SELECT *",
        "page": {
            "pageNumber": 1,
            "pageSize": 100
        },
        "includeSynthetic": false
     }' \
     https://soda.demo.socrata.com/api/v3/views/4tka-6guv/query.json
```

### Export the dataset as CSV with a byte-order mark and a TAB separator

```shell
curl --header 'X-App-Token: your-application-token' \
     --json '{
       "serializationOptions": {
         "separator": "\t",
         "bom": true
       }
     }' \
     https://soda.demo.socrata.com/api/v3/views/4tka-6guv/export.csv
```