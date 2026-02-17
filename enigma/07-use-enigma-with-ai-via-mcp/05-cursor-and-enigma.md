# Cursor + Enigma

URL: https://documentation.enigma.com/guides/ai-mcp/cursor

Beta
Enigma's remote MCP server is currently in beta.

Give Cursor the power of Enigma's business intelligence. Through MCP, your coding assistant gains comprehensive business knowledge perfect for building data-driven applications.

## Prerequisites

- An Enigma API key, which you can find in the settings menu of the [Enigma Console](https://console.enigma.com/)
- A Cursor account that is either:
- An individual account with the [Pro Plan](https://cursor.com/pricing) , or
- A team account with Admin permissions
- [Cursor IDE installed](https://cursor.com/downloads)

## Installation

**One-Click Install (Recommended)**

Open this link to automatically add Enigma to Cursor:

[**🚀 Add Enigma MCP to Cursor**](cursor://anysphere.cursor-deeplink/mcp/install?name=enigma&config=eyJ1cmwiOiJodHRwczovL21jcC5lbmlnbWEuY29tL2h0dHAifQ==)

**Manually Configure**

1. Open Cursor Settings (gear icon) → **MCP & Integrations** → **MCP Tools**
2. Click **New MCP Server**
3. Replace `<your-api-key>` with your API key from the [Enigma Console homepage](https://console.enigma.com/) :

```json
{
  "mcpServers": {
    "enigma": {
      "command": "npx",
      "args": [
        "-y", "-p",
        "@enigma-com/enigma-mcp-remote@latest",
        "enigma-mcp-remote",
        "https://mcp.enigma.com/http-key",
        "--header",
        "x-api-key:<your-api-key>"
      ]
    }
  }
}
```

## Verify Your Setup

1. In MCP Tools, ensure the `enigma` server is listed and toggled on
2. Select **Needs login** when prompted
3. A browser window opens for Enigma Console authentication
4. Complete login and close the auth window
**Test the connection:** Try this example in Cursor chat:

> "Analyze Tacombi's business model and revenue trends"

You should see your Cursor AI intelligently using Enigma's business intelligence to provide comprehensive analysis.

## What Your Cursor AI Can Do

With Enigma's business intelligence, your Cursor AI can:

- **Research any company** while you build B2B applications
- **Validate market assumptions** with real data during development
- **Analyze competitive landscapes** while planning product features
- **Access compliance data** for building due diligence and risk assessment tools
Your coding assistant becomes a business expert, seamlessly integrating market research into your development workflow.

## Troubleshooting

**One-click install not working?**

- Ensure you have Cursor Pro Plan activated
- Try the manual configuration method instead
**Getting constantly disconnected / OAuth issues?**

- Use API key authentication instead for more reliable connections
- Get your API key from [Enigma Console](https://console.enigma.com/)
- Replace your configuration with:

```json
{
  "mcpServers": {
    "enigma": {
      "command": "npx",
      "args": [
        "-y", "-p", "@enigma-com/enigma-mcp-remote@latest",
        "enigma-mcp-remote",
        "https://mcp.enigma.com/http-key",
        "--header", "x-api-key:YOUR_API_KEY"
      ]
    }
  }
}
```

**Tools not appearing in chat?**

- Check that the `enigma` server is enabled in MCP Tools settings
- Restart Cursor after configuration changes
**Need better context management?**

- Add our [Cursor rules file](https://ai.enigma.com/static/enigma-mcp.mdc) to your project for optimized LLM context

## Resources

- [Cursor – Model Context Protocol (MCP)](https://docs.cursor.com/en/context/mcp#installing-mcp-servers)
- [Enigma Cursor Rules File](https://ai.enigma.com/static/enigma-mcp.mdc)