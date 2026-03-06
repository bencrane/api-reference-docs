# pip install parallel-web
import os
from parallel import Parallel

client = Parallel(api_key=os.environ["PARALLEL_API_KEY"])

# Create FindAll Run
findall_run = client.beta.findall.create(
    objective="Find all startups in SF",
    entity_type="startups",
    match_conditions=[
        {
            "name": "san_francisco_location_check",
            "description": "Startup must be located in San Francisco."
        }
    ],
    generator="core",
    match_limit=100,
)

print(f"Created findall run with ID: {findall_run.findall_id}")