// @ts-nocheck
import Parallel from "parallel-web";

const client = new Parallel({
  apiKey: process.env.PARALLEL_API_KEY,
});

async function main() {
  const taskRun = await client.taskRun.create({
    input: "Extract key company information including recent product announcements, CEO profile, and funding details. Company name: Parallel Web Systems. Company website: parallel.ai",
    task_spec: {
      output_schema: {
        type: "json",
        json_schema: {
          type: "object",
          properties: {
            product_announcements: {
              type: "string",
              description: "Most recent product announcements."
            },
            ceo_profile: {
              type: "string",
              description: "Summary of the CEO's background and profile."
            },
            funding_summary: {
              type: "string",
              description: "Summary of the company's funding history and current funding status"
            }
          },
          required: ["product_announcements", "ceo_profile", "funding_summary"],
          additionalProperties: false
        }
      }
    },
    processor: "base",
  });

  console.log(`Task Created. Run ID: ${taskRun.run_id}`);

  // Poll for results
}

main().catch(console.error);