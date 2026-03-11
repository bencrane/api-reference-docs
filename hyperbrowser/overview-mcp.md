> ## Documentation Index
> Fetch the complete documentation index at: https://hyperbrowser.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Model Context Protocol

> Use Hyperbrowser with the Model Context Protocol (MCP) to enable web automation tools for AI models

## Overview

The Hyperbrowser MCP server provides a standardized interface for AI models to access powerful web automation capabilities like scraping, structured extraction, and crawling.

You can find the server implementation on GitHub: [hyperbrowserai/mcp](https://github.com/hyperbrowserai/mcp).

![With the Hyperbrowser MCP, Claude can browse the web](https://4095930873-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FfwZVRs9Jmwzw9cfbchYG%2Fuploads%2Fs8PH64mIx6TMQxQQyz2Q%2FScreenshot%202025-03-12%20at%2014.30.07.png?alt=media\&token=6ff6268d-924b-47f0-98ea-e17afde47554)

*With the Hyperbrowser MCP, Claude can browse the web.*

## Installation

### Prerequisites

* Node.js (v14 or later)
* npm or yarn

### Setup

1. Install the Hyperbrowser MCP server:

```bash  theme={null}
npx hyperbrowser-mcp
```

## Configuration

### Client Setup

Configure your MCP client to launch the Hyperbrowser MCP server:

```json  theme={null}
{
  "mcpServers": {
    "hyperbrowser": {
      "command": "npx",
      "args": ["hyperbrowser-mcp"],
      "env": {
        "HYPERBROWSER_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Alternative: Shell Script Wrapper

For clients that don't support an `env` field (for example, Cursor):

```json  theme={null}
{
  "mcpServers": {
    "hyperbrowser": {
      "command": "bash",
      "args": ["/path/to/hyperbrowser-mcp/run_server.sh"]
    }
  }
}
```

Create `run_server.sh` and add your API key:

```bash  theme={null}
#!/bin/bash
export HYPERBROWSER_API_KEY="your-api-key"
npx hyperbrowser-mcp
```

## Tools

### Scrape Webpage

Retrieve content from a URL in various formats.

* **Method**: `scrape_webpage`
* **Parameters**:
  * `url`: `string` – The URto scrape
  * `outputFormat`: `string[]` – Output formats (`markdown`, `html`, `links`, `screenshot`)
  * `apiKey`: `string` (optional) – API key override
  * `sessionOptions`: `object` (optional) – Browser session configuration

Example:

```json  theme={null}
{
  "url": "https://example.com",
  "outputFormat": ["markdown", "screenshot"],
  "sessionOptions": {
    "useStealth": true,
    "acceptCookies": true
  }
}
```

### Extract Structured Data

Extract data from webpages according to a prompt and optional schema.

* **Method**: `extract_structured_data`
* **Parameters**:
  * `urls`: `string[]` – URLs to extract from (supports wildcards)
  * `prompt`: `string` – Instructions for extraction
  * `schema`: `object` (optional) – JSON schema for extracted data
  * `apiKey`: `string` (optional) – API key override
  * `sessionOptions`: `object` (optional) – Browser session configuration

Example:

```json  theme={null}
{
  "urls": ["https://example.com/products/*"],
  "prompt": "Extract productd description",
  "schema": {
    "type": "object",
    "properties": {
      "name": { "type": "string" },
      "price": { "type": "number" },
      "description": { "type": "string" }
    }
  },
  "sessionOptions": {
    "useStealth": true
  }
}
```

### Crawl Webpages

Navigate through multiple pages on a site, optionally following links.

* **Method**: `crawl_webpages`
* **Parameters**:
  * `url`: `string` – Starting URL
  * `outputFormat`: `string[]` – Desired output formats
  * `followLinks`: `boolean` – Whether to follow links
  * `maxPages`: `number` (default: 10) – Max pages to crawl
  * `ignoreSitemap`: `boolean` (optional) – Skip the site's sitemap
  * `apiKey`: `string` (optional) – API key override
  * `sessionOptions`: `object` (optional) – Browser session configuration

Example:

```json  theme={null}
{
  "url": "https://example.com",
  "outputFormat": ["markdown", "links"],
  "followLinks": true,
  "maxPages": 5,
  "sessionOptions": {
    "acceptCookies": true
  }
}
```

## Session Options

All tools support these common session configuration options:

* `useStealth`: `boolean` – Make browser detection more difficult
* `useProxy`: `boolean` – Route traffic through proxies
* `solveCaptchas`: `boolean` – Automatically solve CAPTCHA challenges
* `acceptCookies`: `boolean` – Automatically handle cookie consent popups
