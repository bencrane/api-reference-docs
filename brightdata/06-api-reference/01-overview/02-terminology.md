> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Terminology

## Zones

Zones are the foundation for how you configure and manage Bright Data products. Each zone represents a specific product or setup, such as Residential, Mobile, Datacenter, or Unlocker API. Access your zones [here](https://brightdata.com/cp/zones).

### What is a zone?

A zone is a logical container that defines how a Bright Data product behaves. When you enable a product, a corresponding zone is created. Each zone includes its own configuration settings, such as:

* Targeting rules (e.g., country, city, ASN)
* Output format
* Headers and request behavior
* Access permissions

### Using zones in your workflow

You can create multiple zones for the same product to support different use cases, targets, or operational needs. This gives you more control and flexibility when managing traffic.

Example use cases:

* `zone_1` for targeting example.com
* `zone_2` for targeting anotherexample.com

By separating traffic into different zones, you can:

* Apply unique settings per target or workflow
* Monitor usage and performance independently
* Simplify debugging and optimization
* Maintain cleaner, more organized configurations

<Tip>
  You can rename your zones at any time to better reflect their purpose or target.
</Tip>

## Snapshot

Snapshot in Bright Data represent saved state of data collection at the time of trigger. It is used to track, manage, and retrieve the exact data that was collected during a specific run of a dataset.

### What is Snapshot?

A snapshot is a record of a single data collection event. Each time a dataset is triggered—whether manually or via API, a snapshot is created to store the results and the inputs used for that specific run.

Snapshots are especially useful when:

* You need to retrieve historical data from previous runs
* You want to verify what inputs were used to trigger a collection
* You are delivering data in batches and need to track how many parts were generated

### Example Scenarios

* You've triggered a dataset to collect product listings from an e-commerce site. A snapshot is automatically created, capturing the results and the inputs (e.g., URL, filters, headers).
* You've requested the data to be delivered in batches. You can use the snapshot to check how many parts were generated and ensure the delivery settings match your request.

### Snapshot ID

A Snapshot ID is a unique identifier assigned to a specific data [snapshot](#Snapshot).
Example: `s_manlyn268d2p9hdmx`

## Dataset

A [dataset](https://brightdata.com/products/datasets) in the context of Bright Data refers to a structured collection of data that has been gathered and organized for specific use cases, such as eCommerce, social media, real estate, etc. These datasets are available in the Dataset Marketplace.

### Dataset ID

A Dataset ID is a unique identifier assigned to each [dataset](#dataset) in the Dataset Marketplace. It helps in identifying and accessing specific datasets for data retrieval and management.

You can find all Dataset IDs of all Scraper APIs, you can use the [dataset lists API endpoint](/api-reference/marketplace-dataset-api/get-dataset-list) to retrieve a list of available datasets.