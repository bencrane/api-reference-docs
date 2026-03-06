import os
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

search = client.beta.search(
    objective="Find latest information about Parallel Web Systems. Focus on new product releases, benchmarks, or company announcements.",
    search_queries=[
        "Parallel Web Systems products",
        "Parallel Web Systems announcements"
    ],
    mode="fast",
    excerpts={"max_chars_per_result": 10000}
)

print(search.results)