# ICP Job Titles — Parallel Deep Research CURL

Paste the exact CURL from the Parallel UI that produced good results below.

curl -X POST https://api.parallel.ai/v1/tasks/runs \
  -H 'x-api-key: REDACTED' \
  -H 'Content-Type: application/json' \
  --data-raw '{
  "input": "CONTEXT\nYou are a B2B buyer persona researcher. You will be given a company name, domain, and optionally a company description. Your job is to research this company thoroughly and produce an exhaustive list of job titles that represent realistic buyers, champions, evaluators, and decision-makers for this company'\''s product(s).\n\nINPUTS\ncompanyName: Vanta\ndomain: vanta.com\ncompanyDescription: Vanta is a security and compliance platform that automates the process of achieving and maintaining certifications such as SOC 2, HIPAA, ISO 27001, PCI, and GDPR. It offers AI-powered evidence collection, continuous monitoring, vendor risk management, and audit preparation to help startups and enterprises build trust and scale their compliance programs globally. The platform emphasizes unified governance, risk, and compliance workflows, with a focus on simplifying security posture management across multiple frameworks. Headquartered in the United States, Vanta serves organizations ranging from startups to large enterprises.\n\nRESEARCH INSTRUCTIONS\n\n1. Research the company\n   - Visit the company website to understand what they sell, who they sell to, and how they position their product.\n   - Review case studies, testimonials, and customer logos to identify real buyers and users.\n   - Check G2, TrustRadius, Capterra, and similar review platforms. Look specifically at reviewer job titles.\n   - Review the company'\''s LinkedIn presence and any published ICP or buyer persona content.\n   - Search: \"[Vanta] case study\" \"[Vanta] customer story\"\n   - Capture any named roles or titles.\n\n2. Identify the buying committee\n   Determine realistic roles for:\n   - **Champions** — Day-to-day users or people experiencing the problem directly. They discover, evaluate, and advocate internally.\n   - **Evaluators** — Technical or operational stakeholders who run POCs or compare alternatives.\n   - **Decision makers** — Budget owners and signers. Only include if appropriate for this product category and price point.\n\n3. Generate title variations\n   For each persona:\n   - Include realistic seniority variants (Manager, Senior Manager, Director, Head, VP, Lead) only where appropriate.\n   - Include function-specific variants where relevant (e.g., Security, Compliance, GRC, IT, Engineering, Legal, Risk).\n\nCRITICAL GUARDRAILS\n- Every title must be grounded in evidence from the company website, reviews, case studies, or known buyer patterns for this category.\n- Do not guess or hallucinate titles.\n- Exclude roles that would reasonably not care about or buy this product.\n- Do not include generic functional labels (e.g., \"Information Security\").\n- Quantity target: 30–60 titles. More is fine if grounded. Fewer is fine if narrow. Never pad.\n\nOUTPUT FORMAT\ncompanyName: Vanta\ndomain: vanta.com\ninferredProduct: One sentence describing what the company sells and to whom, based on your research.\nbuyerPersonaSummary: 2–3 sentences describing the buying committee — who champions it, who evaluates it, who signs off.\ntitles: For each title include the title, buyerRole (champion | evaluator | decision_maker), and reasoning (one sentence grounding this title in research evidence).",
  "processor": "pro"
}'


---

```bash

```
