# FMCSA Select Datasets — Data Definitions

**Source:** FMCSA Dataset Description and Data Definitions for Select Datasets on DOT's Open Data Catalog  
**Portal:** https://data.transportation.gov  
**Update Frequency:** Daily by 9:30 AM US Eastern Time

---

## Naming Convention

Each dataset comes in two variants:

- **[Name]** — "Daily Difference" dataset. Contains only records updated or added since the previous run. May also include sibling records for the same entity for completeness.
- **[Name] – All With History** — "Full/Baseline" dataset. Contains all records including historical values as of the latest update.

---

## 1. Carrier / Carrier – All With History

The master entity file. One record per carrier/broker/freight forwarder with active, inactive, or pending authorities (common or contract). This is the census + authority + insurance summary rolled into one.

### Fields (43 columns)

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 1 | Docket Number | Text 8 | Unique FMCSA ID (MC000000, FF000000, MX000000) |
| 2 | USDOT Number | Text 8 | Official DOT registration number |
| 3 | MX Type | Text 1 | Mexican carrier flag: X=OP-1 (full US), Z=OP-2 (commercial zones) |
| 4 | RFC Number | Text 17 | Mexican government registration code |
| 5 | Common Authority | Text 1 | A=Active, I=Inactive, N=None |
| 6 | Contract Authority | Text 1 | A=Active, I=Inactive, N=None |
| 7 | Broker Authority | Text 1 | A=Active, I=Inactive, N=None |
| 8 | Pending Common Authority | Text 1 | Y/N |
| 9 | Pending Contract Authority | Text 1 | Y/N |
| 10 | Pending Broker Authority | Text 1 | Y/N |
| 11 | Common Authority Revocation | Text 1 | Y=In Revocation, N=Not |
| 12 | Contract Authority Revocation | Text 1 | Y=In Revocation, N=Not |
| 13 | Broker Authority Revocation | Text 1 | Y=In Revocation, N=Not |
| 14 | Property | Text 1 | Y/N |
| 15 | Passenger | Text 1 | Y/N |
| 16 | Household Goods | Text 1 | Y/N |
| 17 | Private Check | Text 1 | Y/N |
| 18 | Enterprise Check | Text 1 | Y/N |
| 19 | BIPD Required | Text 5 | BI&PD insurance required (in thousands) |
| 20 | Cargo Required | Text 1 | Y/N |
| 21 | Bond/Surety Required | Text 1 | Y/N |
| 22 | BIPD on File | Text 5 | BI&PD insurance on file (in thousands) |
| 23 | Cargo on File | Text 1 | Y/N |
| 24 | Bond/Surety on File | Text 1 | Y/N |
| 25 | Address Status | Text 1 | Y=Deliverable, N=Undeliverable |
| 26 | DBA Name | Text 60 | Doing Business As name |
| 27 | Legal Name | Text 120 | Company legal name |
| **Business Address** | | | |
| 28 | PO Box/Street | Text 50 | |
| 29 | Colonia | Text 30 | |
| 30 | City | Text 30 | |
| 31 | State Code | Text 2 | |
| 32 | Country Code | Text 2 | |
| 33 | Zip Code | Text 10 | |
| 34 | Telephone Number | Text 14 | If on file |
| 35 | Fax Number | Text 14 | If on file |
| **Mailing Address** | | | |
| 36 | PO Box/Street | Text 50 | |
| 37 | Colonia | Text 30 | |
| 38 | City | Text 30 | |
| 39 | State Code | Text 2 | |
| 40 | Country Code | Text 2 | |
| 41 | Zip Code | Text 10 | |
| 42 | Telephone Number | Text 14 | If on file |
| 43 | Fax Number | Text 14 | If on file |

### Key Signals
- Compare BIPD Required (#19) vs BIPD on File (#22) to find **under-insured** carriers.
- Pending authority flags (#8-10) indicate **new entrants** shopping for insurance.
- Address Status = N means **undeliverable** — useful for direct mail filtering.

---

## 2. Insur / Insur – All With History

Individual active or pending insurance policies. Linked to entities by docket number. One entity can have multiple policies = multiple rows.

### Fields (9 columns)

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 1 | Docket Number | Text 8 | Entity identifier |
| 2 | Insurance Type | Text 1 | 1=BI&PD, 2=Cargo, 3=Bond, 4=Trust Fund |
| 3 | BIPD Class | Text 1 | P=Primary, E=Excess, 1=Full Security §1043.2(b)(1), 2=Full Security §1043.2(b)(2) |
| 4 | BIPD Maximum Dollar Limit | Text 5 | Max liability (thousands). Zero for non-BIPD types. |
| 5 | BIPD Underlying Dollar Limit | Text 5 | Underlying limit (thousands). Zero for non-BIPD types. |
| 6 | Policy Number | Text 25 | Policy identifier |
| 7 | Effective Date | Text 10 | Policy effective date |
| 8 | Form Code | Text 3 | 34=Cargo, 82=BIPD, 83=Cargo, 84=Broker Surety Bond, 85=Broker Trust Fund, 91/91X=BIPD variants |
| 9 | Insurance Company Name | Text 45 | Insurer name (may differ from administering branch) |

### Notes
- Daily difference variant shows policy **removals** as blank records (only docket number populated, rest empty/zeroed).
- Dollar amounts only populated for Insurance Type 1 (BI&PD). Types 2-4 show 0.

---

## 3. ActPendInsur / ActPendInsur – All With History

Active or pending insurance policies with **lifecycle dates**: when FMCSA received the policy (posted), when it takes effect, and when it's set to cancel. This is the key dataset for detecting insurance shopping, lapses, and upcoming cancellations.

### Fields (11 columns)

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 1 | Docket Number | Text 8 | Entity identifier |
| 2 | USDOT Number | Text 8 | DOT number |
| 3 | Form Code | Text 3 | 34=Cargo, 82=BIPD, 83=Cargo, 84=Broker Surety Bond, 85=Broker Trust Fund, 91/91X=BIPD variants |
| 4 | Insurance Type Description | Text 21 | Human-readable description of form/class |
| 5 | Insurance Company Name | Text 45 | Insurer name |
| 6 | Policy Number | Text 25 | Policy identifier |
| 7 | Posted Date | Text 10 | Date FMCSA received the policy |
| 8 | BIPD Underlying Limit | Text 5 | Underlying limit (thousands). Zero for non-BIPD form codes. |
| 9 | BIPD Maximum Limit | Text 5 | Max liability (thousands). Zero for non-BIPD form codes. |
| 10 | Effective Date | Text 10 | Policy effective date |
| 11 | Cancel Effective Date | Text 10 | Date policy effectively cancels |

### Key Signals
- **Cancel Effective Date** approaching = carrier needs new insurance. Prime outreach window for insurance brokers.
- **Posted Date** vs **Effective Date** gap = how quickly new policies are being filed.
- Cross-reference with InsHist to see the full churn picture.

---

## 4. AuthHist / AuthHist – All With History

Complete authority grant/revoke history per entity. Shows the original action (e.g., "granted") and final action (e.g., "revoked") with dates. Multiple authorities per entity = multiple rows.

### Fields (9 columns)

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 1 | Docket Number | Text 8 | Entity identifier |
| 2 | USDOT Number | Text 8 | DOT number |
| 3 | Sub Number | Text 4 | Action sequence number (rarely used) |
| 4 | Operating Authority Type | VARCHAR 128 | Type of authority |
| 5 | Original Authority Action Description | Text 60 | Starting action (e.g., "granted") |
| 6 | Original Authority Action Served Date | Text 10 | Date starting action executed |
| 7 | Final Authority Action Description | Text 60 | Final action (e.g., "revoked") |
| 8 | Final Authority Decision Date | Text 10 | Date final action determined |
| 9 | Final Authority Served Date | Text 10 | Date final action became effective |

### Key Signals
- New grants = new entrants needing insurance, compliance services, etc.
- Revoked → re-granted patterns = carriers getting back on the road.

---

## 5. BOC3 / BOC3 – All With History

Process agent (BOC3) records. Every entity needs a BOC3 agent to obtain operating authority. Contains agent name and address.

### Fields (9 columns, note: source PDF skips #3)

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 1 | Docket Number | Text 8 | Entity identifier |
| 2 | USDOT Number | Text 8 | DOT number |
| 4 | Company Name | Text 60 | Process agent company name |
| 5 | Attention to or Title | Text 45 | Process agent contact |
| 6 | Street or PO Box | Text 35 | Agent address street |
| 7 | City | Text 30 | Agent address city |
| 8 | State | Text 2 | Agent address state |
| 9 | Country | Text 3 | Agent address country |
| 10 | Zip Code | Text 10 | Agent address zip code |

### Key Signals
- BOC3 agent concentration = which agents dominate specific regions.
- New BOC3 filings = new entrants in the pipeline.

---

## 6. InsHist / InsHist – All With History

Historical (previous) insurance policies. Shows policies that were cancelled, replaced, name-changed, or transferred. All data relates to the **outgoing** policy, NOT the replacement.

### Fields (16 columns, note: source PDF skips #16)

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 1 | Docket Number | Text 8 | Entity identifier |
| 2 | USDOT Number | Text 8 | DOT number |
| 3 | Form Code | Text 3 | 34=Cargo, 82=BIPD, 83=Cargo, 84=Broker Surety Bond, 85=Broker Trust Fund, 91/91X=BIPD variants |
| 4 | Cancellation Method | Text 12 | "cancelled", "replaced", "name change", or "transferred" |
| 5 | Cancel/Replace/NC/TR Form | Text 6 | Form that executed the action. Cancelled: 35/36/85C. Replaced: uses form codes from #3. NC=Name Change. TR=Transferred. |
| 6 | Insurance Type Indicator | Text 1 | " "=BIPD, "*"=Not BIPD |
| 7 | Insurance Type Description | Text 12 | Description of form/class |
| 8 | Policy Number | Text 25 | Policy identifier |
| 9 | Minimum Coverage Amount | Text 5 | Minimum required insurance (thousands) |
| 10 | Insurance Class Code | Text 1 | P=Primary, E=Excess |
| 11 | Effective Date | Text 10 | Policy effective date |
| 12 | BIPD Underlying Limit Amount | Text 10 | Underlying limit (thousands). For excess policies, this equals the primary policy value. |
| 13 | BIPD Max Coverage Amount | Text 10 | Maximum coverage (thousands) |
| 14 | Cancel Effective Date | Text 10 | Date policy cancelled |
| 15 | Specific Cancellation Method | Text 10 | TERM/CANCL=FMCSA executed, Term/REPL=replaced by new submission |
| 17 | Insurance Company Branch | Text 2 | Branch number |
| 18 | Insurance Company Name | Text 45 | Insurer name |

### Key Signals
- **Cancellation Method = "cancelled"** (not replaced) = carrier lost coverage and may be shopping.
- **TERM/CANCL** vs **Term/REPL** distinguishes forced cancellations from voluntary switches.
- High churn on a single docket = unstable carrier or hard-to-place risk.

---

## 7. Rejected / Rejected – All With History

Insurance forms rejected by FMCSA. Contains rejection reason, which can reveal compliance issues, paperwork problems, or carriers struggling to get coverage.

### Fields (15 columns, note: source PDF skips #12)

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 1 | Docket Number | Text 8 | Entity identifier |
| 2 | USDOT Number | Text 8 | DOT number |
| 3 | Form Code (Insurance or Cancel) | Text 3 | Includes all insurance form codes plus cancellation forms (35, 36, 85C) |
| 4 | Insurance Type Description | Text 12 | Insurance type for the rejected form |
| 5 | Policy Number | Text 25 | Policy identifier |
| 6 | Received Date | Text 10 | Date FMCSA received the form |
| 7 | Insurance Class Code | Text 1 | P=Primary, E=Excess (when available) |
| 8 | Insurance Type Code | Text 1 | " "=BIPD, "*"=Not BIPD |
| 9 | Underlying Limit Amount | Text 10 | Underlying limit (thousands) |
| 10 | Maximum Coverage Amount | Text 10 | Maximum coverage (thousands) |
| 11 | Rejected Date | Text 10 | Date the form was rejected |
| 13 | Insurance Branch | Text 2 | Insurance company branch number |
| 14 | Company Name | Text 45 | Insurance company name |
| 15 | Rejected Reason | Text 300 | Free text explaining rejection |
| 16 | Minimum Coverage Amount | Text 5 | Minimum required (thousands) |

### Key Signals
- Repeated rejections on a docket = carrier having trouble getting/maintaining coverage.
- Rejection reasons reveal systemic issues (wrong forms, cancelled policies, etc.).

---

## 8. Revocation / Revocation – All With History

Authorities revoked by FMCSA. Shows which entities lost operating authority, why, and when.

### Fields (6 columns)

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 1 | Docket Number | Text 8 | Entity identifier |
| 2 | USDOT Number | Text 8 | DOT number |
| 3 | Operating Authority Registration Type | VARCHAR 128 | common, contract, or broker |
| 4 | Serve Date | Text 10 | Date first revocation letter sent |
| 5 | Revocation Type | Text 60 | Type of revocation action |
| 6 | Effective Date | Text 10 | Date revocation takes effect |

### Key Signals
- Revocation serve date vs effective date = window where carrier knows they're losing authority.
- Cross-reference with AuthHist to see if they later regain authority.

---

## Common Form Codes (Reference)

| Code | Type |
|------|------|
| 34 | Cargo |
| 35 | BMC Cancellation Form |
| 36 | BMC Surety Bond Cancellation Form |
| 82 | BI&PD |
| 83 | Cargo |
| 84 | Property Broker's Surety Bond |
| 85 | Property Broker's Trust Fund Agreement |
| 85C | BMC Cancellation for Trust Funds |
| 91 | BI&PD |
| 91X | BI&PD/Primary or BI&PD/Excess |

---

## Content Disclaimer

These datasets are provided by FMCSA as a public service. They are point-in-time snapshots, not legal documents. FMCSA is not liable for any use of or reliance on this data.