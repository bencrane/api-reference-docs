import os
from parallel import Parallel
from parallel.types import TaskSpecParam

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

task_run = client.task_run.create(
    input="Extract key company information including recent product announcements, CEO profile, and funding details. Company name: Parallel Web Systems. Company website: parallel.ai",
    task_spec=TaskSpecParam(
        output_schema={
            "type": "json",
            "json_schema": {
                "type": "object",
                "properties": {
                    "product_announcements": {
                        "type": "string",
                        "description": "Most recent product announcements."
                    },
                    "ceo_profile": {
                        "type": "string",
                        "description": "Summary of the CEO's background and profile."
                    },
                    "funding_summary": {
                        "type": "string",
                        "description": "Summary of the company's funding history and current funding status"
                    }
                },
                "required": ["product_announcements", "ceo_profile", "funding_summary"],
                "additionalProperties": False
            }
        }
    ),
    processor="base"
)

print(f"Task Created. Run ID: {task_run.run_id}")
run_result = client.task_run.result(task_run.run_id, api_timeout=3600)
print(run_result.output)