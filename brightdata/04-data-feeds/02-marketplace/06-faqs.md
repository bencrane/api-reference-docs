# FAQs

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.

## What are some of the datasets available on the Dataset Marketplace?

The following is a partial list of datasets available for immediate download from the Datasets Marketplace:

**Popular Datasets:** Amazon products, Crunchbase companies information, Facebook - Posts by group URL, Github repository, Glassdoor companies overview information, LinkedIn company information, LinkedIn people profiles, LinkedIn posts, Reuters news, Zillow properties listing information.

**eCommerce Data:** amazon.com, amazon.co.uk, amazon.de, amazon.es, amazon.fr, amazon.in, amazon.it, homedepot.com, homedepot.ca, lazada.com.my, lazada.sg, lazada.vn

**Real Estate Data:** Bayut UAE Property Listings, Booking.com Property Listings, Dubizzle UAE Property Listings, PropertyFinder Property Listings, US Consumer Property, ZoomProperty UAE Property Listings, infocasas.com.uy, inmuebles24.com, metrocuadrado.com, otodom.pl, properati.com.co, realestate.com.au, toctoc.com, zillow.com, zonaprop.com.ar, zoopla.co.uk

**Social Media Data:** facebook.com, instagram.com, linkedin.com, pinterest.com, reddit.com, tiktok.com, quora.com, vimeo.com, x.com, youtube.com

**Travel Data:** Booking.com Hotel Room Pricing and Availability, Deliveroo Restaurant Listings, OpenTable Restaurant Listings, Short-Term Rental Occupancy & Pricing Dataset, Talabat Restaurant Listings, Tripadvisor Restaurant Listings, Zomato UAE Restaurant Listings, airbnb.com

**B2B Data:** Business Contacts Dataset, Business Firmographic Data, Business Intelligence Dataset, Business Location (POI) Dataset, Companies Hierarchy Dataset, Online Intent Data, Politically Exposed Persons List, Tech Install base Data Feed, US B2B Employees, US Consumer Demographics, crunchbase.com, g2.com, glassdoor.com, google.com, indeed.com, linkedin.com, manta.com, owler.com, slintel.com, stackoverflow.com, trustpilot.com, ventureradar.com, xing.com, yelp.com

The datasets marketplace is continuously updated with fresh datasets. If the domains you need don't exist in the Marketplace, you can request them through the Custom Dataset (CDS).

## Do you offer any free datasets?

Yes! Free datasets available: espn.com (NBA data), goodreads.com, imdb.com, worldpopulationreview.com

## Why does the timestamp differ from the delivery date in the marketplace dataset?

The schedule run is designed to ensure timely delivery. The delivery deadline is calculated based on previous collection cycles and the estimated refresh duration. Therefore, the collection may start earlier than the delivery date to guarantee that the data is delivered on time.

## How do I see data snapshots that are ready?

You can find your data snapshots under the "My datasets" tab. There, you'll see a table with information about each snapshot, including its status: ready, failed, or in building.

## What do I do with the Snapshot ID?

A Snapshot ID is a unique identifier assigned to a specific data snapshot, formatted as "snap_XXXXXX". You should use the Snapshot ID whenever there is an issue with a particular data snapshot. Including this ID in your support ticket helps the support team quickly identify the exact snapshot in question, leading to faster issue resolution.

## How do you set the record limit?

You can set a record limit in two ways:

- **Using the control panel:** Before purchasing a dataset, click "Proceed to purchase." On the "Choose delivery frequency" page, select the "Too pricey? Limit dataset records" option to specify your desired record limit.
- **Through the Filter API:** Add a parameter to limit the number of records returned by the API. See: [Dataset Filter API - records_limit](https://docs.brightdata.com/api-reference/marketplace-dataset-api/filter-dataset#body-records-limit).

## What is a commitment cost for the Dataset (Filter) API?

Currently, there is no monthly commitment or minimum order of $250 required when using the Dataset Filter API. You only pay based on your actual record consumption.

## I ran a filter request and was charged before buying the data. What's going on?

When you submit a dataset filter API request, compute resources are used to identify records matching your filter criteria. If matching records are found, you will be charged based on the amount of these matched records. However, if no matching records are found, you will not be charged. To avoid charges while exploring your filter criteria, you can test filters through the dataset preview table in the control panel, which offers up to 10 free filters per day.

## Why are some fields not fully fillable?

Some fields may have lower fill rates due to limitations or gaps in the publicly available source data. Fill rates vary depending on dataset type and source quality — which can result in partial coverage for specific attributes. Detailed fill rates and statistics are provided for each dataset to help you evaluate completeness before purchasing.

## I need datasets

Bright Data offers several services for accessing and managing datasets:

1. **Dataset Marketplace** — Discover, customize, and purchase high-quality datasets from over 120 domains. [Explore here](https://brightdata.com/datasets/marketplace/browse).
2. **Dataset APIs** — Request, initiate, and manage data collections. [Learn more](https://brightdata.com/api-reference/marketplace-dataset-api/request-a-collection).
3. **Deep Lookup** — A more granular and streamlined way to request and manage data collections. [Explore here](https://docs.brightdata.com/datasets/deep-lookup/overview).

---

## LinkedIn People Profiles — Contact Data

### Does the "LinkedIn People Profiles" dataset include email addresses or phone numbers?

- By default, standard LinkedIn profile records **do not** include email addresses or phone numbers.
- However, Bright Data offers an **enriched business contact** solution (in partnership with RevenueBase) that adds business emails and phone numbers — fully GDPR-compliant and sourced via third-party validation.
- Contact data coverage may vary by profile and use case.

### How can I request enriched records with email and phone?

In the Dataset Marketplace, after selecting "LinkedIn People Profiles", use the **Contact filters** button to choose your contact data options:
- **Standard LinkedIn profile data:** No contact info.
- **Enriched business contact info:** Select "Standard Profiles + Enriched with Business Contact Info" or "Only Profiles with Business Contact Info" to receive available business emails and phone numbers.

Click "Apply filter" to preview and purchase the dataset with your chosen contact enrichment.

### Is the enrichment GDPR-compliant?

Yes. All provided business contact data is sourced and processed according to GDPR and other compliance requirements, using approved partners such as RevenueBase.

### Can I get contact info using Deep Lookup?

Yes. Bright Data's [Deep Lookup](https://brightdata.com/cp/deep-lookup) can search for people and return available business contact details (email/phone), where legally sourced and compliant.

### How do I check what fields are included before purchase?

Go to Control Panel → Dataset Marketplace → LinkedIn People Profiles. Click "Preview sample" to review all available fields. For enriched datasets, use the Contact filters panel and preview sample rows before placing your order.

### What if I have a compliance or usage question?

Contact your Bright Data account manager or reach out via [Support](https://brightdata.com/cp/support).

**Summary:**
- Standard LinkedIn profiles don't include emails/phones.
- Enriched business contact info (email/phone) is available via the Contact filters button.
- Deep Lookup is another route for contact discovery.
- Always review the filtered sample before purchasing.

---

## API Limits

### What is the API rate limit?

The Filter API rate limit is 120 requests per hour. This applies to all API calls and snapshot triggers within the specified time frame. Plan your API calls accordingly and consider implementing retry logic with exponential backoff.

### What is the maximum number of values I can send to the API filters?

You can send up to 10,000 input lines in a single API request when using list filters or include filters. For large datasets, consider batching your requests.

### What is the maximum input file size for the API?

The maximum input file size is 200 MiB for any single API request. Files exceeding 200 MiB will be rejected — compress your data or split large files into smaller chunks.

### What is the maximum snapshot size for single-file downloads?

You can download snapshots up to 5 GB as a single file. For snapshots larger than 5 GB, the API will automatically provide chunked download options or streaming capabilities.

### Quick Reference

| Limit Type        | Value    | Description                            |
| :---------------- | :------- | :------------------------------------- |
| Rate Limit        | 120/hour | Maximum API calls per hour             |
| Input Lines       | 10,000   | Maximum values in list/include filters |
| Input File Size   | 200 MiB  | Maximum size for uploaded files        |
| Snapshot Download | 5 GB     | Maximum size for single-file download  |

> **Need Higher Limits?** Contact the Enterprise team for custom rate limits and increased capacity options.