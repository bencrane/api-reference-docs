# Claude Code + Enigma

URL: https://documentation.enigma.com/guides/ai-mcp/claude-code

Beta
Enigma's remote MCP server is currently in beta.

Give your Claude Code the power of Enigma's business intelligence with a single command. Supercharge your development with real business data.

## Prerequisites

- An Enigma API key, which you can find in the settings menu of the [Enigma Console](https://console.enigma.com/)
- [Claude Code installed](https://docs.anthropic.com/en/docs/claude-code/setup)
- A [Claude API key](https://console.anthropic.com/settings/keys)

## Installation

**API Key (Recommended)**

To add the Enigma MCP with API key authentication, run:

```bash
claude mcp add --transport http enigma https://mcp.enigma.com/http-key --header "x-api-key:<your_api_key>"
```

You can find your API key on the [Enigma Console homepage](https://console.enigma.com/) .

**Browser Authentication**

To add the Enigma MCP with browser authentication, run:

```bash
claude mcp add --transport http enigma https://mcp.enigma.com/http
```

Claude Code will open a window in your default web browser for authentication when it first uses an Enigma tool.

## Verify Your Setup

Test the connection with a quick business lookup:

```bash
# In Claude Code, try this example:
"Find basic information about Tacombi's business"
```

You should see Enigma tools being used to fetch business data, location counts, and financial metrics.

## What Your Claude Code Can Do

With Enigma's business intelligence, your Claude Code can:

- **Research any company** while you build business applications
- **Validate market assumptions** with real data during development
- **Analyze competitive landscapes** when you're designing features
- **Access compliance data** for due diligence and risk assessment workflows
Your AI assistant becomes a business intelligence expert, seamlessly integrating company research into your coding sessions.

## Troubleshooting

**Authentication issues?**

- Ensure you're logged into [Enigma Console](https://console.enigma.com)
- The OAuth flow will open automatically on first use
**No tools showing up?**

- Restart Claude Code after adding the MCP server
- Check that your Claude API key is properly configured

## Resources

- [Remote MCP support in Claude Code](https://www.anthropic.com/news/claude-code-remote-mcp)
- [Connect Claude Code to tools via MCP](https://docs.anthropic.com/en/docs/claude-code/mcp)