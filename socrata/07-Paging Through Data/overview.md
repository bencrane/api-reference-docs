# Paging Through Data

## The `page` Option

You may specify a page of results to request, only when using the `/query` endpoint. When you do this, we also impose an ordering upon the results to make sure you're paging through a consistent set of rows.

> **Heads Up!** Paging through a dataset is fine for the first several pages, but as the page number rises, query performance will decrease drastically. It is advised that you try to use filters to find the information you want, rather than requesting individual pages.

---

## Example

Here we choose the 5th page, where there are 10 rows per page, thereby retrieving rows 41–50:

```shell
curl --header 'X-App-Token: your-application-token' \
     --json '{
        "query": "SELECT *",
        "page": {
            "pageNumber": 5,
            "pageSize": 10
        },
        "includeSynthetic": false
     }' \
     https://soda.demo.socrata.com/api/v3/views/4tka-6guv/query.json
```