// @ts-nocheck
import Parallel from "parallel-web";

const client = new Parallel({ apiKey: process.env.PARALLEL_API_KEY });

async function main() {
    const extract = await client.beta.extract({
        urls: ["https://parallel.ai/blog/search-api-benchmark"],
        objective: "How does Parallel perform on search benchmarks?",
        excerpts: true,
        full_content: false
    });

    console.log(extract.results);
}

main().catch(console.error);