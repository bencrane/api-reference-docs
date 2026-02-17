# SCREENING - Customer & Transaction Screening

URL: https://documentation.enigma.com/screening/

## Overview

Enigma's screening API endpoint enables you to programmatically screen customers and transactions against sanctions and other watchlists. Using your provided Enigma API key, you can submit requests directly to our screening endpoint. All of the functionality available through the sanctions evaluation console is available via the API.

Once you become a customer or integration partner, Enigma will guide you through the steps towards integrating with any watchlists of your choosing, including custom lists, as well as any case manager that suits your preference. The API is list- and case manager-agnostic, allowing clients to tailor the screening service to satisfy their needs, budget and volume demands. Through the screening API, Enigma currently processes over 1 billion requests per month and counting.

---

## Screening Advantages

Enigma offers industry leading performance in customer and transaction screening against sanctions and other watchlists, helping institutions to achieve compliance with greater confidence, speed and control, all for a fraction of the cost of leading competitors.

### Reduced Operational and IT Costs

Enigma has a proven track record of reducing false positive sanctions alert volumes (estimated to be >99% false positives) by at least 80%, relative to conventional screening solutions. This means dramatically fewer manual reviews, translating to millions of dollars in savings in operational overhead alone.

The system is a cloud-based managed service, which eliminates the need for costly infrastructure, IT and support resources on your part.

### First Class Match Performance

The screening service assures alerting on all expected matches, including complex fuzzy matching variations, according to your needs and risk appetite. The API's screening results include details on what spans of text in the request matched to which terms or values related to the sanctioned entity, assuring explainability of results.

---

## Documentation

| Resource | Description |
|---|---|
| [API Reference](/screening/api) | Complete API documentation for screening endpoints |
| [Console Guide](/screening/console-guide) | How to use the screening evaluation console |
| [MCP Tools](/guides/ai-mcp/screening-tools) | AI/MCP tools for screening integration |

---

## Quick Start

To make a screening API request, ensure that you include your API key in the designated request header:

```bash
curl --location 'https://api.enigma.com/evaluation/sanctions/screen' \
--header 'x-api-key: <YOUR API KEY>' \
--header 'Content-Type: application/json' \
--header 'Account-Name: <YOUR ACCOUNT NAME>' \
--data '{
  "tag": "example screening request",
  "query_type": "enigma_data",
  "searches": [
    {
      "type": "ENTITY",
      "entity_description": {
        "person_name": ["John Hanafin"],
        "country_of_affiliation": ["Ireland"]
      }
    }
  ]
}'
```

For complete request and response documentation, see the Core Screening API reference.

---

## Learn More

For more information on Customer and Transaction Screening endpoint, integration, and pricing, please [contact the sales team](https://enigma.com/contact-us).