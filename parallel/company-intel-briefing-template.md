# Company Intel Briefing — Parallel Deep Research Template

## Dynamic Variables

From cumulative context / prior steps:
- `{client_company_name}` — the client whose product is being sold (e.g., SecurityPal)
- `{client_company_description}` — what the client sells
- `{target_company_name}` — the prospect company being researched (e.g., CoreWeave)
- `{target_company_domain}` — prospect's domain
- `{target_company_description}` — what the prospect does
- `{target_company_industry}` — prospect's industry
- `{target_company_size}` — prospect's employee count
- `{target_company_funding}` — prospect's funding/valuation info
- `{target_company_competitors}` — formatted competitor block (name, domain, description per competitor)

## Templated CURL

```bash
curl -X POST https://api.parallel.ai/v1/tasks/runs \
  -H 'x-api-key: REDACTED' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "input": "#CONTEXT#\nYou are a B2B sales intelligence researcher. You will receive inputs about a client company (the seller) and a target company (the prospect). Your job is to produce structured, verified intelligence about the target company that the client company'\''s sales team can use to prepare for outreach.\n\n#INPUTS#\nclient_company_name: {client_company_name}\nclient_company_description: {client_company_description}\ntarget_company_name: {target_company_name}\ntarget_company_domain: {target_company_domain}\ntarget_company_description: {target_company_description}\ntarget_company_industry: {target_company_industry}\ntarget_company_size: {target_company_size}\ntarget_company_funding: {target_company_funding}\ntarget_company_competitors:\n{target_company_competitors}\n\n#OBJECTIVE#\nProduce structured intelligence about the target company that covers their business context, financial position, strategic initiatives, posture and gaps in the domain relevant to what the client company sells, operational bottlenecks the client company'\''s product addresses, and detailed competitor profiles. All claims must be cited with source URLs. Do not fabricate specific metrics, deal details, or quotes.\n\n#INSTRUCTIONS#\nResearch and populate every field in the output schema. For each field:\n- Use only verifiable, publicly available information\n- Cite sources with URLs\n- Assign a confidence score (high/medium/low)\n- If information cannot be verified, state that explicitly rather than inferring\n\nFocus research effort on:\n1. Current business status, funding, and financial metrics\n2. Strategic initiatives that expand the target company'\''s need for what the client company sells\n3. Key customer relationships and concentration risk\n4. Where the target company'\''s operations create bottlenecks that the client company'\''s product category directly addresses\n5. Current certifications, capabilities, and gaps in the domain relevant to the client company'\''s product\n6. Competitor positioning — pricing, procurement advantages, and posture in the client company'\''s domain — with specifics\n\n## OUTPUT SCHEMA\n\n```json\n{\n  \"type\": \"object\",\n  \"properties\": {\n    \"target_business_summary\": {\n      \"type\": \"string\",\n      \"description\": \"Overview of the target company'\''s current business status, market position, strategic focus, key partnerships, and recent developments.\"\n    },\n    \"target_financial_highlights\": {\n      \"type\": \"object\",\n      \"description\": \"Key financial metrics including revenue, funding, valuation, growth trajectory, and any publicly available financial data.\"\n    },\n    \"target_strategic_initiatives\": {\n      \"type\": \"array\",\n      \"items\": {\n        \"type\": \"object\",\n        \"properties\": {\n          \"initiative\": { \"type\": \"string\" },\n          \"description\": { \"type\": \"string\" },\n          \"expanded_risk_surface\": { \"type\": \"string\", \"description\": \"New risks or needs this initiative creates that are relevant to what the client company sells.\" }\n        }\n      }\n    },\n    \"target_key_customers_and_concentration_risk\": {\n      \"type\": \"array\",\n      \"items\": {\n        \"type\": \"object\",\n        \"properties\": {\n          \"customer_name\": { \"type\": \"string\" },\n          \"contract_details\": { \"type\": \"string\" },\n          \"concentration_risk_analysis\": { \"type\": \"string\" }\n        }\n      }\n    },\n    \"target_operational_bottlenecks\": {\n      \"type\": \"string\",\n      \"description\": \"Analysis of where the target company'\''s operations create pain points or bottlenecks that the client company'\''s product category directly addresses.\"\n    },\n    \"target_relevant_posture_and_gaps\": {\n      \"type\": \"string\",\n      \"description\": \"Assessment of the target company'\''s current capabilities, certifications, and gaps in the domain relevant to what the client company sells.\"\n    },\n    \"competitor_profiles\": {\n      \"type\": \"array\",\n      \"items\": {\n        \"type\": \"object\",\n        \"properties\": {\n          \"competitor_name\": { \"type\": \"string\" },\n          \"key_differentiators\": { \"type\": \"string\" },\n          \"procurement_and_pricing_advantages\": { \"type\": \"string\" },\n          \"relevant_posture\": { \"type\": \"string\", \"description\": \"How this competitor positions in the domain relevant to the client company'\''s product.\" }\n        }\n      }\n    },\n    \"client_strategic_relevance\": {\n      \"type\": \"string\",\n      \"description\": \"2-4 sentences explaining how the client company'\''s product directly ties to the target company'\''s chief strategic objectives, revenue goals, or critical operational needs identified in this research. Frame as what adopting the client'\''s product unlocks for the target — in terms of revenue acceleration, risk reduction, or strategic execution.\"\n    }\n  }\n}\n```",
  "processor": "ultra"
}'
```

## Test Values (SecurityPal → CoreWeave)

For validation testing, use these values:

- `client_company_name`: SecurityPal
- `client_company_description`: Assurance Management Platform that automates security questionnaires and vendor risk assessments using AI and certified security experts. Used by security, GRC, and sales teams to accelerate deal cycles.
- `target_company_name`: CoreWeave
- `target_company_domain`: coreweave.com
- `target_company_description`: CoreWeave is a specialized cloud provider built on GPU-accelerated infrastructure, primarily serving AI/ML workloads, VFX rendering, and other compute-intensive applications. They differentiate from hyperscalers by offering bare-metal GPU access at lower cost with faster provisioning. Their infrastructure runs on Kubernetes-native architecture with NVIDIA GPU clusters. They've raised significant funding and secured major enterprise contracts for AI training compute.
- `target_company_industry`: Cloud Computing / AI Infrastructure
- `target_company_size`: 1000+
- `target_company_funding`: $12B+ total funding, $19B valuation
- `target_company_competitors`:
  - AWS (aws.amazon.com) — Amazon Web Services is the world's largest cloud computing platform...
  - Lambda (lambda.ai) — Lambda is a GPU cloud platform purpose-built for AI training and inference...
  - Crusoe (crusoe.ai) — Crusoe is the industry's first vertically integrated, purpose-built AI cloud platform...
