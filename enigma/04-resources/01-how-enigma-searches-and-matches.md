# Resources - How Enigma Searches & Matches

> Source: https://documentation.enigma.com/resources/search-match

## Overview

Enigma's search system finds the entity in [Enigma's data](/getting_started/data_model) that best matches the information you have — whether it's a **brand**, an **operating location**, or a **legal entity**.

To search, you provide identifying information about the entity, such as its **name**, **address**, or **website**. Enigma then returns the best-matching entity based on your input.

Under the hood, the search process combines a **retrieval engine** with a **ranking model**:

1. **Retrieval** surfaces potential candidate entities from Enigma's database.
2. **Ranking** evaluates and scores those candidates to determine how likely they are to represent the same real-world entity.

Together, these components balance [recall and precision](https://en.wikipedia.org/wiki/Precision_and_recall) to return accurate, high-confidence results.

> **Matching is Searching with One Result:** Whether you type your inputs into the search bar in the [Enigma Console](https://console.enigma.com/console) or submit them to one of Enigma's APIs, the underlying search system is the same. The general process is typically referred to as "Searching," whereas programmatically retrieving the first result of a search is typically referred to as "Matching."

---

## Entity Linking and Search Flexibility

To search, you first specify the **type of entity** you want to retrieve — a brand, an operating location, or a legal entity. You can then search for that entity using **any identifying information** you have available, even if that information originates from another related entity type. For instance, you can search for:

- A **brand** using the name of the legal entity that owns it.
- A **brand** using the address of one of its operating locations.
- A **legal entity** using the brand name it operates under.

This flexibility is made possible by the links within [Enigma's data model](/getting_started/data_model). Using these relationships, the search system can interpret your input holistically and surface the most relevant results — even when the information provided describes a related aspect of the business rather than the exact entity type requested.

---

## Input Fields

Enigma can search for entities with any of the following inputs:

| Category | Input Fields | Brand | Operating Location | Legal Entity |
|---|---|---|---|---|
| **Business Name** | Name | ✅ | ✅ | ✅ |
| **Address** | streetAddress1, streetAddress2, city, state, zip | ✅ | ✅ | ✅ |
| **Person Name** | firstName, lastName | ✅ | ✅ | ✅ |
| **Website** | Website | ✅ | ✅ | ❌ |
| **Phone Number** | Phone Number | ✅ | ✅ | ❌ |

Every search request must include at least one of the following identifying fields: a **business name**, a **website**, or a **person's first and last name**. All other inputs are optional, but more complete and representative data typically improves the quality and confidence of the results.

---

## The Matching Process

You don't need perfect information to find the right business.

Enigma's search system is designed to match imperfect or partial inputs — like a misspelled name, an incomplete address, or a missing website — to the correct entity. It then evaluates a combination of features to measure how closely your input matches what's in Enigma's data — for instance, by comparing similarities across names, websites, and addresses. Finally, it returns the results that best match your input and chosen entity type, filtered by accuracy standards.

When there isn't enough evidence to suggest a good match, the system returns no result — in order to avoid false positives (incorrect matches).

> **Optimized for precision:** Based on labeled evaluation data, Enigma's search precision is about 94% for searches of all three entities. The precision of your results largely depends on the quality and completeness of your input data. The cleaner and more representative the inputs, the more precise the results. Reach out to us for best practices if you're working with dirty input data.

When a search request is submitted, Enigma's system performs a two-stage process: **retrieval** and **ranking**.

### Retrieval

The query first passes through Enigma's *retrieval service*, which uses a fast search index to identify a broad set of potential candidate records from Enigma's database.

Before the search begins, the system cleans and standardizes all input fields to ensure consistent, high-quality results:

- **Text fields** are normalized — extra spaces are removed, and casing is standardized for uniform comparison.
- **Addresses** are parsed and standardized into consistent components such as street, city, state, and postal code.
- **Website URLs** are decomposed into their core parts (domain, subdomain, top-level domain) to improve recognition across variations.
- **Phone numbers** are normalized into a canonical format.

This preprocessing step ensures that even if your input data varies in formatting or structure, the retrieval service can surface the most relevant candidate records for scoring. These candidates represent entities that are likely to correspond to your input based on attributes like name, address, and website.

### Ranking

**1. Model Evaluation**

Once candidate records are retrieved, each is evaluated by Enigma's *ranking service* — a machine-learning system that estimates how likely each candidate refers to the same entity as the user's input.

For every input–candidate pair, the system computes a series of similarity measures across key fields such as:

- How closely the business names align (including shared words and variants)
- Whether phone numbers are identical or closely related
- How similar the websites or domains are
- Geographic consistency — whether they appear in the same city or state
- Address structure and text overlap

These similarity values capture the degree of alignment between your input and each candidate, and they form the raw ingredients for the model's decision-making. The ranking model then uses the learned weights to calculate a match probability, representing how likely it is that the input and candidate refer to the same underlying entity. This approach allows the system to balance multiple signals and produce consistent, data-driven match scores across a wide range of input types and data qualities.

**2. Ranking & Output**

After probabilities are computed for all candidates, results are ranked in descending order of their match probability. The top-ranked entities are those with the highest likelihood of being true positive (correct) matches.

Enigma's search models continuously evolve as new data is incorporated and more links are added to [Enigma's Data Model](/getting_started/data_model), increasing both recall (match rate) and precision (match correctness).