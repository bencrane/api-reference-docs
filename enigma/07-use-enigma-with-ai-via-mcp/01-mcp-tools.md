# MCP Tools

URL: https://documentation.enigma.com/guides/ai-mcp/tools

Beta
Enigma's remote MCP server is currently in beta.

Enigma's MCP server exposes tools to your AI so that it can perform business intelligence tasks with [Enigma's data](/getting_started/data_model/) . With these tools, your AI becomes a business research expert, perfect for analysis, due diligence, and strategic decision-making.

## Business Intelligence Tools

| Tool | Inputs | Outputs 
| `search_business` | Business name (required), Website/phone/address (optional), Address (optional) | Revenue data (12m), Transaction count (12m), YoY Growth (12m), NAICS codes & industry, Technology stack, Location count & samples, Matching brands, Matching legal entities 
| `get_brand_locations` | Enigma Brand ID (required) | Full street addresses, 12m card revenue per location, Geographic coordinates (lat/lng) 
| `get_brand_card_analytics` | Enigma Brand ID (required) | Past 60 months of card transaction data, including: Revenue, YoY growth, Avg daily customers, Transaction count, Avg transaction amount, Refunds 
| `get_brand_legal_entities` | Enigma Brand ID (required) | All legal entities linked to the brand with Legal Entity IDs, State-by-state registrations, Active/Inactive status, Formation dates, DBA names, Filing numbers, Domestic vs. foreign patterns 
| `search_negative_news` | Business name (required), Business address (required) | Risk level and detailed findings by category: Legal issues, Financial problems, Labor disputes, Management issues, Environmental violations, Customer complaints, Product recalls, Cybersecurity incidents, Source URLs for verification 
| `search_gov_archive` | Business name (required), Prompt context (recommended) | Business registrations, permits & licenses (e.g. Cannabis, Liquor), Health inspections and violations, Court filings & liens, Environmental records, Professional licensing 
| `search_kyb` | Business name (required), Business address (optional) | Matching brands and registered (legal) entities, Address verification (SoS-specific or any source), Name verification (SoS-specific or any source) 

## Screening & Compliance Tools

For sanctions screening and compliance workflows, see the [Screening MCP Tools](/guides/ai-mcp/screening-tools) documentation.

| Tool | Inputs | Outputs 
| `screen_customer` | Name (required), DOB (optional), Country (optional), Passport info (optional) | Match confidence scores, Potential matches with details, Hit/alert status, Source list information (SDN, Non-SDN, etc.) 
| `screen_business` | Org name (required), Country (optional), Address (optional), BIC (optional) | Match confidence scores, Potential matches with details, Hit/alert status, Source list information (SDN, Non-SDN, etc.) 
| `screen_entity_search` | Entity ID (required), Format (optional) | Full entity profile from sanctions lists with all available attributes 
| `find_decision` | Request ID (required) | Decision details including status, assignee, alert status, tags, and notes 
| `find_decisions` | Date range, Status, Alert, Assignee, Tag (all optional) | Paginated list of screening decisions with filters 
| `update_decision` | Request ID (required), User ID (required), Status/Assignee/Note (optional) | Updated decision confirmation