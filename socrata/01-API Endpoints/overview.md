# API Endpoints

## What is an API Endpoint?

The "endpoint" of a SODA API is simply a unique URL that represents an object or collection of objects. Every Socrata dataset, and even every individual data record, has its own endpoint. The endpoint is what you'll point your HTTP client at to interact with data resources.

All resources are accessed through a common endpoint of `/api/v3/views/IDENTIFIER/query.json` along with their dataset identifier. This paradigm holds true for every dataset in every SODA API. All datasets have a unique identifier - eight alphanumeric characters split into two four-character phrases by a dash. For example, `ydr8-5enu` is the identifier for the Building Permits. This identifier can then be inserted into the `/api/v3/views/IDENTIFIER/query` endpoint to construct the API endpoint.

Once you've got your API endpoint, you can make requests with SoQL to filter and manipulate your dataset.

## Locating the API Endpoint for a Dataset

You can also find API endpoints, and links to detailed developer documentation for each dataset, in a number of different places, depending on where you are:

- If you're viewing a dataset listing within the **Open Data Network**, there will be a prominent "API" button that will take you directly to the API documentation for that dataset.
- If you're viewing a dataset directly, there will be an **"API Documentation"** button under "Export" and then "SODA API".

## Endpoint Versioning

SODA and SoQL are very flexible and allow us to add functionality over time without needing to completely deprecate and replace our APIs. We can do so in several different ways:

- By introducing new SoQL functions that provide new functionality. We could, for example, add a new function that allows you to filter or aggregate a dataset in a new way.
- By adding new datatypes to represent new data, like a new datatype for a new class of geospatial data.

This allows us to introduce additional capabilities while still allowing you to issue the same kinds of queries in a backwards-compatible manner. We can extend SODA APIs without needing all developers to migrate their code to a new version.

However, some functionalities are not available on all of our API endpoints, which is why we differentiate between versions of a dataset's API. Functions made available on a newer version might not be available on an API endpoint of an older version. In the sidebar of our automatic API documentation, we list the version that that endpoint complies with, as well as other useful information.

Throughout the documentation on this developer portal you'll notice version toggles and info boxes that will help you understand the difference between SODA endpoint versions.

---

### Version 3.0 (Latest)

The next iteration of SODA will be released in 2025 and changes the endpoint from `/resource/IDENTIFIER.json` to `/api/v3/IDENTIFIER/query.json`. Notable changes:

- Query requests must be either authenticated by a user or marked with a valid application token.
- We have separated the endpoint into two:
  - `/query` for querying (e.g., `https://data.cityofchicago.org/api/v3/views/ydr8-5enu/query.json`) — Query primarily supports machine-readability and has more options for customizing the request.
  - `/export` for exports (e.g., `https://data.cityofchicago.org/api/v3/views/ydr8-5enu/export.csv`) — Export supports more formats and focuses on generating something readable by humans.
- We strongly prefer that you use the HTTP POST method when requesting queries, as this allows for longer queries and clearer options.

---

### Version 2.1

The first SODA 2.1 APIs (previously referred to as our "high-performance Socrata Open Data APIs") were released in April of 2015, and in November of 2015 they received the "2.1" version designation for clarity. SODA 2.1 introduces a number of new datatypes as well as numerous new SoQL functions:

- Tons of new advanced SoQL functions to introduce powerful filtering and analysis into your queries
- New geospatial datatypes like `Point`, `Line`, and `Polygon` replace the `Location` datatype
- Support for the standardized GeoJSON output format, for direct use within geospatial tools like Leaflet
- Closer compliance with SQL semantics, such as `Text` comparisons becoming case-sensitive
- Currently only the JSON, CSV, and GeoJSON output formats are supported
- New functionality will be added to this version over time

**For more information:**

- SoQL functions that work with version 2.1
- Datatypes that are available in version 2.1

---

### Version 2.0

SODA 2.0 was originally released in 2011. Although 2.1 is backwards-compatible with 2.0, there are a number of differences between the two APIs:

- 2.0 supports fewer SoQL functions than 2.1.
- The only geospatial datatype supported is the `Location` datatype
- `Text` comparisons are case-insensitive

**For more information:**

- SoQL functions that work with version 2.0
- Datatypes that are available in version 2.0

---

### Versioning HTTP Headers

The simplest way to tell the difference between a 2.0 API and a 2.1 API is via the `X-SODA2-Legacy-Types` header, which will be `true` if you're accessing a legacy 2.0 API.

### When We Will Increment Endpoint Versions

From time to time, we'll introduce new SoQL functions and datatypes to the latest version of the SODA API. Those changes will be non-breaking, and old queries and applications will continue to function unchanged. The SODA API is designed to make it easy to introduce new functionality over time without making breaking changes.