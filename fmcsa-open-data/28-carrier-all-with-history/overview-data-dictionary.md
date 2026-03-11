# FMCSA Dataset Description and Data Definitions — Explainer

**Source:** FMCSA (Federal Motor Carrier Safety Administration)  
**Catalog:** [DOT Open Data Catalog](https://data.transportation.gov)  
**Pages:** 15  
**Update Frequency:** Daily by 9:30 AM US Eastern Time

---

## What This Document Is

This is the schema reference for **16 FMCSA datasets** published on the Department of Transportation's Open Data Catalog. These datasets cover the full lifecycle of motor carrier/broker/freight forwarder registration: entity census data, operating authority history, insurance policies (active, pending, historical, and rejected), BOC3 process agent filings, and authority revocations.

If you're building data pipelines against DOT's open data, doing carrier due diligence, monitoring insurance compliance, or tracking authority changes — this document defines every field in every dataset.

---

## Dataset Naming Convention

Each of the 8 core datasets comes in two flavors:

**`[Name]`** (Daily Difference) — Only records updated or added since the previous run. In some cases includes other records for the same entity for completeness. The `Insur` daily difference represents policy removals as blank records (all empty/00000 except docket number).

**`[Name] – All With History`** (Full/Baseline) — Complete snapshot of all records including historical values as of the latest update.

This gives you 16 total datasets (8 × 2 variants).

---

## The 8 Core Datasets

### 1. Carrier (43 fields)

The master entity dataset. One record per carrier/broker/freight forwarder with active, inactive, or pending authorities (common or contract).

**What's in it:** Docket number (MC/FF/MX), USDOT number, Mexican carrier info (MX Type, RFC Number), authority statuses (common/contract/broker — each with active/inactive/pending/revocation flags), carrier type flags (property, passenger, household goods, private, enterprise), insurance requirements vs. insurance on file (BI&PD amounts, cargo Y/N, bond/surety Y/N), address deliverability status, DBA name, legal name, and full business + mailing addresses with phone/fax.

**Key fields for filtering:**
- `Common Authority` / `Contract Authority` / `Broker Authority` — A/I/N tells you if the entity is authorized
- `BIPD Required` vs. `BIPD on File` — quick insurance compliance check (both in thousands)
- `Address Status` — Y = deliverable, N = undeliverable (useful for mail/outreach)
- `Pending *` fields — signals new entrants to the market

### 2. Insur (9 fields)

Active or pending individual insurance policies. Linked to entities by **docket number** (not USDOT). One entity can have multiple policies, so expect multiple rows per docket.

**Key details:**
- `Insurance Type` — 1 (BI&PD), 2 (Cargo), 3 (Bond), 4 (Trust Fund). Dollar amounts in fields 4/5 only apply to Type 1; Types 2–4 show 0.
- `BI&PD Class` — P (Primary), E (Excess), 1 or 2 (Full Security Limits under specific sections)
- `Form Code` — Maps to insurance form types (34/83=Cargo, 82/91/91X=BI&PD, 84=Broker Surety Bond, 85=Trust Fund)

### 3. ActPendInsur (11 fields)

Implementation dates for active/pending insurance policies. This is where you get the **posted date** (when FMCSA received it), **effective date**, and **cancel effective date** — the lifecycle timestamps the `Insur` dataset doesn't carry.

Also includes both USDOT and Docket numbers (unlike `Insur` which only has Docket), making it easier to join to census data.

**Dollar amount note:** BI&PD amounts (fields 8–9) are only populated for Form Codes 91, 91X, and 82. All other form codes show 0.

### 4. AuthHist (9 fields)

Authority history — the full timeline of each operating authority granted to an entity. Shows the **original action** (e.g., "granted") and the **final action** (e.g., "revoked") with dates for each.

Multiple rows per entity are common since carriers can hold multiple authority types and each goes through its own lifecycle.

**Key date fields:**
- `Original Authority Action Served Date` — when the initial action took effect
- `Final Authority Decision Date` — when the final action was decided
- `Final Authority Served Date` — when the final action became effective

### 5. BOC3 (9 fields, numbered 1–10 with gap at #3)

BOC3 process agent records. Every entity must designate a process agent (for legal service) to obtain operating authority. Some entities designate themselves.

Contains the agent's company name, contact, and full address. Useful for identifying who represents a carrier in legal matters, or for detecting entities that self-represent.

### 6. InsHist (17 fields, with gaps at #16)

**Historical** (previous) insurance policies. This is the record of policies that are no longer active — they've been cancelled, replaced, had a name change, or been transferred.

**Critical distinction:** All data here describes the policy being cancelled/replaced — NOT the replacement policy.

**Key fields:**
- `Cancellation Method` — "cancelled", "replaced", "name change", or "transferred"
- `Specific Cancellation Method` — More granular: `TERM/CANCL` (FMCSA-executed cancellation) vs. `Term/REPL` (replacement by new policy submission)
- `Cancel/Replace/Name Change/Transfer Form` — The form that executed the action. Cancellation forms: 35 (BMC Cancellation), 36 (BMC Surety Bond Cancellation), 85C (Trust Fund Cancellation). Replacements use the same form codes as field #3. Name changes use "NC", transfers use "TR".
- `Insurance Class Code` — P (Primary) or E (Excess). When E, the `BI&PD Underlying Limit Amount` represents the primary insurance value.

### 7. Rejected (15 fields, with gap at #12)

Insurance forms that FMCSA rejected. Contains the policy info, rejection date, and a free-text reason field (up to 300 characters) explaining why.

The `Form Code` field here is expanded to include cancellation form codes (35, 36, 85C) in addition to the standard insurance form codes, since both insurance filings and cancellation filings can be rejected.

**`Rejected Reason`** (Text 300) is the most interesting field — gives you the actual rejection rationale (e.g., "Policy is already cancelled").

### 8. Revocation (6 fields)

Authority revocations by FMCSA. Simple structure: entity identifiers, what type of authority was revoked (common/contract/broker), the serve date (when the revocation letter was sent), the revocation type, and the effective date.

---

## Common Form Codes Across Datasets

These form codes appear in `Insur`, `ActPendInsur`, `InsHist`, and `Rejected`:

| Code | Meaning |
|------|---------|
| 34 | Cargo |
| 82 | BI&PD |
| 83 | Cargo |
| 84 | Property Broker's Surety Bond |
| 85 | Property Broker's Trust Fund Agreement |
| 91 | BI&PD |
| 91X | BI&PD/Primary or BI&PD/Excess |

Additionally, cancellation-related datasets (`InsHist`, `Rejected`) include: 35 (BMC Cancellation Form), 36 (BMC Surety Bond Cancellation Form), 85C (BMC Cancellation for Trust Funds).

---

## How the Datasets Relate

The **Docket Number** (MC/FF/MX + 6 digits) is the primary join key across all datasets. The **USDOT Number** appears in most but not all datasets (notably absent from `Insur`).

A typical entity lifecycle flows through these datasets:
1. **Carrier** — entity appears with pending authority flags
2. **AuthHist** — authority granted action recorded
3. **BOC3** — process agent designated
4. **Insur** / **ActPendInsur** — insurance policies filed and accepted
5. **InsHist** — policies cancelled/replaced over time
6. **Rejected** — any insurance filings that FMCSA bounced back
7. **Revocation** — authority revoked (if applicable)

---

## Companion JSON File

The `fmcsa_dataset_definitions.json` file contains all 8 dataset schemas with every field's order, name, format, definition, and allowed values in a machine-readable format. Use it for schema validation, automated documentation, or building ingestion pipelines against DOT's open data catalog.