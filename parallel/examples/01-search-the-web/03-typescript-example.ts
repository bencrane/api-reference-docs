// @ts-nocheck
import Parallel from "parallel-web";

const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

async function main() {
    const search = await client.beta.search({
        objective: "Find latest information about Parallel Web Systems. Focus on new product releases, benchmarks, or company announcements.",
        search_queries: [
            "Parallel Web Systems products",
            "Parallel Web Systems announcements"
        ],
        mode: "fast",
        excerpts: { max_chars_per_result: 10000 }
    });

    console.log(search.results);
}

main().catch(console.error);