import os
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

task_run = client.task_run.create(
    input="Create a research report the most recent academic research advancements in web search for LLMs.",
    processor="ultra"
)
print(f"Task Created. Run ID: {task_run.run_id}")

run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
print(run_result.output)