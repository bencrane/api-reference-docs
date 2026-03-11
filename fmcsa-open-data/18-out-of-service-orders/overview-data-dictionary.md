# OOS Data Dictionary — Explained

**Source Document:** OOS Data Dictionary Rev03 (2025-01-24)
**Source Agency:** FMCSA (Federal Motor Carrier Safety Administration)

---

## What Is This File?

This data dictionary describes the schema for **`out_of_service_orders.csv`** — a comma-delimited file published by FMCSA as part of the **New Entrant Safety Assurance Program**. Each row in the CSV represents a single Out of Service (OOS) order issued to a motor carrier or other regulated entity.

An OOS order means FMCSA has determined that the entity is not fit to operate and has ordered it to cease operations until the issues are resolved.

---

## Fields

The file contains **7 fields**:

### 1. `DOT_NUMBER` — Long Integer
The unique US DOT Number assigned to the entity. This is the primary identifier used across all FMCSA datasets to link records back to a specific carrier or registrant.

### 2. `LEGAL_NAME` — Short Text
The official legal name of the entity that holds the USDOT number. This is the name on file with FMCSA, not necessarily the name the company markets under.

### 3. `DBA_NAME` — Short Text
The "Doing Business As" name — a trade name or alternate name the entity uses commercially. This field may be empty if the entity only operates under its legal name.

### 4. `OOS_DATE` — Short Text (YYYY-MM-DD)
The date the OOS order was issued. Stored as text in `YYYY-MM-DD` format rather than as a native date type.

### 5. `OOS_REASON` — Short Text
A text description of why the OOS order was issued. Common reasons include failure to comply with safety requirements, insurance lapses, or New Entrant program failures.

### 6. `STATUS` — Short Text (ACTIVE / INACTIVE)
The current status of the entity's USDOT number. **Important caveat:** An `ACTIVE` status does **not** mean the entity is authorized to operate. A carrier can be placed OOS (i.e., prohibited from operating) and still have an active USDOT number. The OOS order itself is what restricts operations — not the USDOT status.

### 7. `OOS_RESCIND_DATE` — Short Text (YYYY-MM-DD)
The date the OOS order was rescinded (lifted). If this field is empty, the OOS order is still in effect. Format matches `OOS_DATE`.

---

## Key Notes

- **One row = one OOS order.** A single entity (DOT number) can appear multiple times if it has received more than one OOS order.
- **Active ≠ Authorized.** The `STATUS` field reflects the USDOT registration status, not operating authority. Always cross-reference with the OOS order status.
- **Date fields are text.** Both `OOS_DATE` and `OOS_RESCIND_DATE` are stored as Short Text, so downstream consumers should parse them explicitly.
- **File format:** CSV (comma delimited).
- **Revision:** 3 — dated January 24, 2025.