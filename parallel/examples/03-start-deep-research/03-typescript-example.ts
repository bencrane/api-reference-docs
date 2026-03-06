// @ts-nocheck
import Parallel from "parallel-web";

const client = new Parallel({
  apiKey: process.env.PARALLEL_API_KEY,
});

async function main() {
  const taskRun = await client.taskRun.create({
    input:
      "Create a research report the most recent academic research advancements in web search for LLMs.",
    processor: "ultra",
  });

  console.log(`Task Created. Run ID: ${taskRun.run_id}`);

  // Poll for results
}

main().catch(console.error);