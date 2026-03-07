> ## Documentation Index
> Fetch the complete documentation index at: https://trigger.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> Using the Trigger.dev management API

## Installation

The management API is available through the same `@trigger.dev/sdk` package used in defining and triggering tasks. If you have already installed the package in your project, you can skip this step.

<CodeGroup>
  ```bash npm theme={"theme":"css-variables"}
  npm i @trigger.dev/sdk@latest
  ```

  ```bash pnpm theme={"theme":"css-variables"}
  pnpm add @trigger.dev/sdk@latest
  ```

  ```bash yarn theme={"theme":"css-variables"}
  yarn add @trigger.dev/sdk@latest
  ```
</CodeGroup>

## Usage

All `v3` functionality is provided through the `@trigger.dev/sdk` module. You can import the entire module or individual resources as needed.

```ts  theme={"theme":"css-variables"}
import { configure, runs } from "@trigger.dev/sdk";

configure({
  // this is the default and if the `TRIGGER_SECRET_KEY` environment variable is set, can omit calling configure
  secretKey: process.env["TRIGGER_SECRET_KEY"],
});

async function main() {
  const runs = await runs.list({
    limit: 10,
    status: ["COMPLETED"],
  });
}

main().catch(console.error);
```
