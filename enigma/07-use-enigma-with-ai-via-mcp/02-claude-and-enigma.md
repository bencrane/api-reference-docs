# Claude + Enigma

URL: https://documentation.enigma.com/guides/ai-mcp/claude

Beta

- Claude's Custom Connectors feature is currently in beta.
- Enigma's remote MCP server is currently in beta.

Give Claude the power of Enigma's comprehensive business intelligence. Through MCP, Claude becomes a business research expert, perfect for analysis, due diligence, and strategic decision-making.

## Prerequisites

- An [Enigma account](https://console.enigma.com/register)
- A Claude account that is either:
- An individual account with the [Pro plan](https://www.anthropic.com/pricing) , or
- A [Claude for Work](https://www.anthropic.com/learn/claude-for-work) (Team and Enterprise) account with Primary Owner or Owner permissions

## Installation

info
**For Teams:** Claude for Work accounts only need setup once by a Primary Owner or Owner. All organization users can then access Enigma.

**Step 1: Access Connectors**

1. In [Claude](https://claude.ai/new) , open the user menu (bottom left) and select **Settings**
2. Navigate to [Connectors](https://claude.ai/settings/connectors) page
3. Scroll to the bottom and select **Add custom connector**
**Step 2: Add Enigma** In the **Add custom connector** dialog, enter:

- **Name** : `Enigma`
- **Remote MCP Server URL** : `https://mcp.enigma.com/http`
**Step 3: Connect & Authenticate**

1. Select **Connect** for the newly added Enigma connector
2. A browser window opens for authentication
3. Use the same login method you use for Enigma Console
4. Close the auth window when complete
5. A browser window opens. Select the same authentication method you use for the Enigma Console and complete login. You'll be routed back to Claude. You can close the auth window.

## Verify Your Setup

1. Start a new conversation and look for the **Enigma** connector toggle.
2. Test the connection by trying this example:

> "Analyze Tacombi's business performance and competitive position"

You should see your Claude intelligently using Enigma's business intelligence to provide comprehensive analysis with revenue data, location insights, and competitive context.

## Troubleshooting

**Connection drops during use?**

- Claude's Custom Connectors are in beta - occasional disconnections may occur
- **Quick fix** : Disable and re-enable the Enigma connector in Settings → Connectors
**Connector not showing up in conversations?**

- Ensure you're using Claude Pro or Claude for Work account
- Check that the Enigma connector is enabled in your Connectors settings
**Authentication failed?**

- Verify you're logged into [Enigma Console](https://console.enigma.com) in the same browser
- Try the authentication flow again, clear browser cache if needed
**Tools not working as expected?**

- Some business queries require multiple tools working together
- Be specific in your requests (e.g., "Analyze Tacombi's financial performance" vs "Tell me about Tacombi")

## Resources

- [Getting Started with Custom Connectors Using Remote MCP | Anthropic Help Center](https://support.anthropic.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp)
- [Pre-built Web Connectors Using Remote MCP | Anthropic Help Center](https://support.anthropic.com/en/articles/11176164-pre-built-web-connectors-using-remote-mcp)