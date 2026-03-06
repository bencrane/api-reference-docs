import os
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

extract = client.beta.extract(
    urls=["https://parallel.ai/blog/search-api-benchmark"],
    objective="How does Parallel perform on search benchmarks?",
    excerpts=True,
    full_content=False
)

print(extract.results)