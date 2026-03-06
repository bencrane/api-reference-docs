// @ts-nocheck
// npm install parallel-web
import Parallel from "parallel-web";

const client = new Parallel({
  apiKey: process.env.PARALLEL_API_KEY,
});

async function main() {
  const run = await client.beta.findall.create({
    objective: "Find all startups in SF",
    entity_type: "startups",
    match_conditions: [
      {
        name: "san_francisco_location_check",
        description: "Startup must be located in San Francisco."
      }
    ],
    generator: "core",
    match_limit: 100
  });

  console.log(`Findall run created: ${run.findall_id}`);
}

main().catch(console.error);