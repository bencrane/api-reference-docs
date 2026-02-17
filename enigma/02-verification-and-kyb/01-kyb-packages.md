# Verification & KYB - KYB Packages

> Source: https://documentation.enigma.com/kyb/kyb-packages

Enigma offers two packages for business verification and KYB compliance. Each package is composed of attributes, the foundational business identity information for the best matching businesses, and [tasks](/kyb/response/), which evaluate how those attributes compare to the information provided.

The right KYB package depends on what you're trying to accomplish:

- **Choose `identify`** if you need basic identity matching and data enrichment workflows such as data enrichment, onboarding pre-fill, and third party verification.
- **Choose `verify`** if you need compliance validation and registration status for workflows such as payment processing, lending, and business banking.

If you're not sure, start with the default package, `verify`.

---

## Attribute and Task Comparison

|  | **Identify** | **Verify** |
|---|---|---|
| **Registered (legal) entity attributes** |  |  |
| Entity name(s) | ✓ | ✓ |
| Entity type | ✓ | ✓ |
| Formation date | ✓ | ✓ |
| **Registration attributes** |  |  |
| Registration state | ✓ | ✓ |
| Date issued | ✓ | ✓ |
| File number | ✓ | ✓ |
| Registered name | ✓ | ✓ |
| Registered person name and title(s) | ✓ | ✓ |
| Registered addresses | ✓ | ✓ |
| Jurisdiction type | ✗ | ✓ |
| Home jurisdiction state | ✗ | ✓ |
| Registration status, sub status, and status detail | ✗ | ✓ |
| **Brand attributes** |  |  |
| Brand name(s) | ✓ | ✓ |
| High risk activities | ✓ | ✓ |
| Industry classification | ✓ | ✓ |
| Website(s) | ✓ | ✓ |
| Operating location names and addresses | ✓ | ✓ |
| **Tasks** |  |  |
| Name verification (SoS-specific or any source) | ✓ | ✓ |
| Address verification (SoS-specific or any source) | ✓ | ✓ |
| Person verification | ✗ | ✓ |
| Domestic registration verification | ✗ | ✓ |

---

## Add-On Tasks

All add-on tasks work with both the Identify and Verify packages. Choose the add-on tasks that match your verification requirements.

| **Task** | **Description** |
|---|---|
| TIN (EIN) Verification | Checks that the submitted EIN is valid and that it matches the business name submitted |
| Watchlist (OFAC Sanctions) Screening | Checks that the provided business appears on any U.S. government sanctions lists, including the Office of Foreign Assets Control (OFAC) list |
| SSN Verification | Checks that the SSN is valid and that it matches the submitted person's name |

See [add-on tasks](/kyb/response/tasks#add-on-tasks) for more information.

> **Add-on attributes:** You can also request attributes that are not included in either package. See [add-on attributes](/kyb/response/data#available-add-on-attributes) for more information.

---

## When to Choose Identify

### Marketplace Seller Verification

When onboarding sellers to your marketplace, you need to confirm they're real businesses and match submitted information to public records—but registration status may not be critical for your risk model.

**Example workflow:**

- Seller submits "Brooklyn Pizza" as business name
- Identify matches to "JPR Holdings LLC" in state records
- Returns registration data, address, and entity type
- You verify name and address match your application
- Seller approved for basic marketplace access

**Why Identify works:** You're validating identity and enriching your seller database, not making compliance decisions based on active state filing status.

### B2B SaaS Onboarding

SaaS platforms need to verify business customers are legitimate and match submitted details—primarily for fraud prevention and data quality, not regulatory compliance.

**Example workflow:**

- Customer signs up with company name and address
- Identify confirms business exists in public records
- Returns entity details for account enrichment
- You populate CRM with verified business information
- Customer onboarded with high confidence in identity

**Why Identify works:** You need accurate business data for your systems, not compliance certification of registration status.

---

## When to Choose Verify

### Payment Processing

Payment processors must verify merchant legitimacy and compliance status to meet network requirements and prevent fraud. Active state registration is often required.

**Example workflow:**

- Merchant applies with business name and EIN
- Verify confirms business is actively registered
- Returns status: "Active" with domestic registration confirmed
- You validate merchant meets underwriting requirements
- Merchant approved for payment processing

**Why Verify is required:** Payment networks and acquiring banks often require confirmation of active state registration. Status fields prove compliance.

### Business Onboarding

Enterprises, especially financial institutions, can reduce risk and facilitate compliance by verifying the identity and standing of the businesses that they serve.

**Example workflow:**

- Business applies for checking account
- Verify confirms active registration status
- Returns jurisdiction type and registration state
- Account opened with full audit trail

**Why Verify is required:** Bank compliance teams must document active registration status for regulatory audits.

### Business Lending

Lenders need to verify borrower legitimacy and registration status as part of underwriting—lending to dissolved or suspended entities creates legal and credit risks.

**Example workflow:**

- Business applies for $50,000 line of credit
- Verify confirms active registration and jurisdiction
- Returns status: "Active - Good Standing"
- Underwriter confirms entity is legally operating
- Credit decision made with confidence in entity legitimacy

**Why Verify is required:** Lending agreements require active legal entities. Status fields protect against lending to dissolved or suspended businesses.

---

## FAQ

### Is there a difference in response time between the packages?

**No.** Both packages usually return results in less than 2 seconds.

### Can I add TIN, EIN, or SSN verification to Identify?

**Yes.** All add-ons work with both packages. TIN, EIN, and SSN verification are independent of your package choice — add them to Identify or Verify as needed.

### Can I add Watchlist (OFAC Sanctions) screening to Identify?

**Yes.** All add-ons work with both packages. Watchlist (OFAC Sanctions) screening is independent of your package choice — add it to Identify or Verify as needed.

### How do I switch packages?

Changing your package is as simple as changing the `package` parameter in the URL you make your request to. See [advanced query parameters](https://documentation.enigma.com/kyb/verify-identity#advanced-query-parameters) for more information.