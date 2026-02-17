# Enigma Data Attribute Reference

Enigma organizes business data into **attributes** — structured data points like names, addresses, revenue metrics, and industry classifications. Each attribute belongs to an entity (Brand, Legal Entity, or Operating Location).

> **Using the Enigma Console?**
> If you're generating lists in the Console, the output columns map directly to these attributes. Select a layout (Brands, Operating Locations, etc.) and your CSV will contain the corresponding attribute data.

---

## Attributes by Entity

The table below groups attributes by their parent entity. The **Available Under** column shows which entities can access each attribute (useful when building API queries that traverse relationships).

| Column | Meaning |
|---|---|
| Entity | The data object this attribute belongs to |
| Available Under | Which core entities can reach this attribute (highlighted = direct access) |
| Tier | Pricing tier required (Core, Plus, or Premium) |

---

### Brand

| Available Under | Attribute | Description | Tier |
|---|---|---|---|
| Brand | Brand Activity | Identifies businesses that engage in activities with a high compliance risk. | Plus |
| Brand | Brand Location Description | A summary of where a brand operates geographically, showing either the top states for brands with multiple locations or the specific city and state for brands with a single location. | Core |
| Brand | Brand Revenue Quality | Warnings and issues related to the revenue of this brand. | Plus |
| Brand | Card Transactions (Brand) | Contains quantitative information about the card transactions processed by the brand. | Plus |
| Brand | Is Marketable (Brand) | Contains a boolean value indicating whether the brand is marketable. | Core |
| Brand | Name | The customer-facing version of the name that best represents the business. | Core |

### Legal Entity

| Available Under | Attribute | Description | Tier |
|---|---|---|---|
| Legal Entity | Bankruptcy | The bankruptcy filing of the legal entity. | Premium |
| Legal Entity | Name | A legal entity is an entity which U.S. law recognizes as having an identity and rights. | Free |
| Legal Entity | Type | A legal entity is an entity which U.S. law recognizes as having an identity and rights. | Free |

### Operating Location

| Available Under | Attribute | Description | Tier |
|---|---|---|---|
| Operating Location | Card Transactions (Operating Location) | Contains quantitative information about the card transactions processed by the operating location. | Plus |
| Operating Location | Is Marketable (Operating Location) | Contains a boolean value indicating whether the operating location is marketable. | Core |
| Operating Location | Name | The name of the operating location. | Core |
| Operating Location | Operating Location Location Type | The type of operating location (e.g. retail, office, etc.) | Core |
| Operating Location | Operating Location Revenue Quality | Warnings and issues related to the revenue of this operating location. | Plus |
| Operating Location | Operating Status | Indicates whether a location is Open, Temporarily Closed, Closed, or its status is Unknown. | Core |
| Operating Location | Rank | Indicates how the card revenue of this operating location compares to other operating locations of the same enigma industry within the geographical area. | Plus |
| Operating Location | Technologies Used | Indicates third-party technologies being used at a particular operating location. | Premium |

### Shared Attributes

| Entity | Available Under | Attribute | Description | Tier |
|---|---|---|---|---|
| Address | Brand, Legal Entity, Operating Location | Address | A physical street address for the business. | Core |
| Address | Brand, Legal Entity, Operating Location | Address Deliverability | The delivery properties of an address. | Plus |
| Email Address | Brand, Legal Entity, Operating Location | Email Address | An email address for the business or a person associated with the business. | Core |
| Industry | Brand | Industry | The industry within which the business operates. | Core |
| Person | Legal Entity | Name | Persons, who may be associated with a business as an owner, officer or contact. | Core |
| Phone Number | Brand, Legal Entity, Operating Location | Phone Number | The phone number for a particular business entity. | Core |
| Registered Entity | Brand, Legal Entity, Operating Location | Registered Entity | Businesses which have become legal entities by registering with a U.S. Secretary of State (SoS). | Premium |
| Registration | Brand, Legal Entity, Operating Location | Registration | Business registrations filed with a Secretary of State (or equivalent) in a U.S. state or territory. | Premium |
| Review Summary | Operating Location | Review Summary | Summary of publicly available customer reviews for this entity. | Plus |
| Role | Brand, Legal Entity, Operating Location | Role | These are roles which people (and other legal entities) hold at U.S. businesses. | Plus |
| TIN | Legal Entity | Taxpayer Identification Number (TIN) | Identification number used by the Internal Revenue Service (IRS) in the administration of tax laws. | Premium |
| Watchlist Entry | Brand, Legal Entity, Operating Location | Watchlist Entry | A watchlist entry for the entity. | Premium |
| Website | Brand, Operating Location | Online Presence | Indicates whether a website is an e-commerce website that sells products directly online. | Core |
| Website | Brand, Operating Location | Technologies Used | Indicates third-party technologies used by a website. | Premium |
| Website | Brand, Operating Location | Website | A website associated with a business. | Core |
| Website Content | Brand, Operating Location | Website Content | The state of the website at a particular time. | Plus |

---

*Generated: 2026-02-14T16:18:02.488Z*
*Entities: 16 | Relationships: 0 | Total Attributes: 33*