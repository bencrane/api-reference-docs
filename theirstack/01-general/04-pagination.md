# TheirStack - General - Pagination

Learn how to paginate API responses using page-based or offset-based methods for both GET and POST requests.

Responses that return a list of items are paginated. We offer two different pagination strategies:

- **Page-based**: This method allows you to navigate through paginated data by specifying the `page` and `limit` parameters. The `page` parameter indicates the page number you wish to retrieve, while the `limit` parameter specifies the maximum number of items to return per page. For POST requests, include these parameters in the request body. For GET requests, use them as query parameters.

- **Offset-based**: This method allows you to navigate through paginated data by specifying the `offset` and `limit` parameters. The `offset` parameter indicates the starting point within the collection of results, while the `limit` parameter specifies the maximum number of items to return. For POST requests, include these parameters in the request body. For GET requests, use them as query parameters. Some of these endpoints also support the `include_total_results` body or query parameter. If you set it to `false`, the responses will be faster, and the field `total_results` of the response will be `null`.