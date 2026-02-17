# Getting Started - The Enigma Data Model

> Source: https://documentation.enigma.com/getting_started/data_model

## What Exactly Is a Business?

It's not as simple as it seems. Beneath familiar names and storefronts lies a web of identities, relationships, and operations that defy simple definitions:

- What is a business's name? (Legal names, trade names, and more.)
- How do franchises or multi-brand corporations fit into a single definition?
- What about businesses sharing addresses or operating multiple locations?

At Enigma, we model businesses to capture this complexity:

**A business has two core identities:**

- **Brand:** How a business presents itself to customers.
- **Legal Entity:** How a business is recognized by governments.

For example, a bird seed business might be branded as "Wild Birds" but legally operate as "Feathers, LLC."

**Operating Locations** bridge these identities with physical spaces—stores, warehouses, or offices. One address might house multiple brands, or one brand might span many locations.

---

## The Complex Nature of Businesses

Businesses often include:

- **Multiple Legal Entities:** A company may establish separate legal entities for different locations or functions.
- **Multiple Brands:** Corporations like Gap Inc. operate distinct brands like Old Navy and Banana Republic.
- **Affiliated Brands:** Dealers (e.g., Curry Honda) or co-locations (e.g., Sephora at JCPenney).
- **Franchises:** Independent operators under a shared brand, such as McDonald's franchisees.
- **Agents and Professionals:** Individuals operating under umbrella brands (e.g., "James Lavelle, State Farm Agent").
- **Medical Providers:** Patients often seek specific doctors who work within practices owned by larger health systems, blending individual and institutional branding.
- **People as Brands:** In services like hairstyling or therapy, individuals *are* the brand.
- **Legal Entities as Brands:** Some businesses use their legal name as their brand.

This framework—Brands, Legal Entities, and Operating Locations—forms the backbone of Enigma's data model, designed to capture how businesses truly operate. The next sections will explore how these components work together.

---

## Enigma's Data Model

Enigma's data model is built upon three **Core Entity Types**:

- **Brands:** How a business presents itself to customers.
- **Legal Entities:** How a business is recognized by the government.
- **Operating Locations:** Sites where a business conducts its activities.

These are connected to one another behind the scenes through multiple Relationships. Entities and relationships are created when Enigma observes activity from the business based on real-world records.

---

## Core Entity Types: A Deeper Dive

### Brands

A brand is the face of a business as seen by its customers. It includes trade names, logos, and marketing identities. Brands may:

- Operate across multiple locations.
- Be owned by one or more legal entities.
- Coexist with other brands under a shared corporate structure.

**Example:** Starbucks is a global brand known for coffee shops. Each store represents the same brand but is tied to distinct operating locations and potentially different legal entities in each country.

### Legal Entities

Legal entities are how businesses are recognized by governments and regulatory bodies. They are the backbone for taxation, compliance, and legal accountability. A single legal entity can own multiple brands or operate many locations.

**Example:** Starbucks Corporation is the legal entity behind the Starbucks brand. It ensures compliance with laws, pays taxes, and manages corporate governance.

### Operating Locations

Operating locations represent the physical or virtual spaces where a business interacts with customers or conducts activities. Locations connect brands to legal entities, grounding abstract concepts in specific places.

**Example:** A single Starbucks store at 123 Main St. is an operating location. It's tied to the Starbucks brand and operates under a local legal entity.

---

## Relationships Between Entities

Enigma's data model captures the relationships that connect these core entities, such as:

- **Brand-to-Location:** Which brands operate at which locations.
- **Brand-to-Legal Entity:** Which legal entities own or manage a brand.
- **Location-to-Legal Entity:** Which legal entities are responsible for specific operating locations.