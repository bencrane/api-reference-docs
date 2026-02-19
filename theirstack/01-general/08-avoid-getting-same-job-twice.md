# TheirStack - General - Guides - Avoid Getting the Same Job Twice

Learn how to avoid duplicate jobs when making repeated calls to the Job Search endpoint.

We don't cache results, so making repeated calls without using these filters will charge you API credits for the same jobs multiple times. Using one of the filters below ensures you only pay for new or different jobs.

**Use the `discovered_at_gte` filter**: Passing a value higher than the last time you made a call will return jobs that were discovered only after that timestamp. This is useful when you want to fetch only new jobs since your last request.

**Use the `job_id_not` filter**: Passing a list of job IDs that you don't want to get will return jobs that are not in that list. This gives you more control over which specific jobs to exclude from your results.