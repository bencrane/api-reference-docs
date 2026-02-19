# TheirStack - General - Features - Free Count

Learn how to get the count of records that match your search criteria without consuming API credits.

Our Job Search and Company Search endpoints include a free count feature that allows you to estimate the number of records that match your search criteria without consuming API credits.

## Steps to use free count

To effectively use the Free Count feature, follow these steps:

1. **Enable Total Results**: Set the `include_total_results` field to `true`. This will ensure that the total number of matching records is included in the response.
2. **Blur Company Data**: Set the `blur_company_data` field to `true`. This makes the request free for you. When `blur_company_data` is true, all company identifiers are blurred and the request doesn't cost any credits.
3. **Limit Results**: Set the `limit` field to `1`. This minimizes the data returned and makes the request faster, focusing solely on the count.

By following these steps, you can efficiently estimate the number of records that match your search criteria without consuming any API credits.