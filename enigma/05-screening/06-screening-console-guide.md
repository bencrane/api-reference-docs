# Screening Console Guide

URL: https://documentation.enigma.com/screening/console-guide

This guide walks you through how to use our customer screening console as an evaluation tool for searching prospective or existing customers for potential matches against US government sanctions lists via our screening API endpoint.

Searches are run against Enigma's "Open Data" source, which currently ingests and indexes all OFAC SDN and non-SDN entities. Our screening endpoint also offers industry-leading transaction screening.

As a client, you can configure our screening endpoint to work with any 3rd party and custom lists of your choosing, as well as any case manager that suits your preference. To learn more about how our screening API endpoint works, please refer to our [API Reference](/screening/api) .

## Getting Started

### Create a Console Account

1. If you do not already have an Enigma Console account, proceed to step 2. If you have an existing account, skip to "Quick Start".
2. Create an account on our [Console](https://console.enigma.com/) .
3. Go to **Quick Start** . If you do not see Quick Start, go to **Enigma Technologies / Switch to Legacy** .
4. Navigate to **Customer and Transaction Screening / Make a Request** .
![Enigma Quick Start](/assets/images/screening_api_console-1cf749768b4f57aef5d7771cc364f5c9.png)

1. This takes you to the screening API console. Here, you will see fields and system parameters on the left that you can enter and adjust, and on the right is the corresponding request JSON, which is sent to the screening endpoint to process the request.
![Screening Console Interface](/assets/images/screening_interface-d2d22049c9ed10c0c2fc30a760aec4aa.png)

## Using the Console

### Step 1: Select Entity Type

The first step of a screening search is selecting the entity type - either a **person** or an **organization** - and then inputting their name.

![Screening Entity Type Selection](/assets/images/screening_entity_type-f41e697a7d64bd0d95eaa1f53dbce5e8.png)

### Step 2: Enter Additional Details

Enter any further details you have available on the customer being screened. This is optional but the more information provided in the screening request the more precise the results will be.

**Person-type** screening requests can include:

- DOB (date of birth)
- Address
- Country
**Organization-type** screening requests can include:

- Address
- Country
![Screening Address Input](/assets/images/screening_address_input-2d321e2ac4f5f564030496ed1f23348c.png)

### Step 3: Set Relevance Weights

Our screening service allows you to set relevance weights for each attribute included in your request. These weights indicate the degree to which a match on an attribute value contributes to the overall hit score.

If you have low confidence in the accuracy of an attribute (either from your research or from customer input), you may want to lower that attribute's effect on the overall score.

![Screening Relevance Weights](/assets/images/screening_relevance_weights-c0a9a02dcde7709c4f56219ff775ef46.png)

### Step 4: Configure System Parameters

The evaluation console allows you to alter certain system parameters that influence screening behavior to suit your specific needs and risk tolerance:

| Parameter | Description 
| **Alert Threshold** | Score (0-1) above which a hit triggers an alert 
| **Hit Threshold** | Minimum score (0-1) for a result to be considered a hit 
| **Max Results** | Maximum number of underlying hits to consider 
| **List Source** | Which watchlists to screen against 
| **Overrides Toggle** | Whether to apply custom override rules 

Trial Limitations
In trial mode, the list source is limited to Open Data (OFAC SDN and non-SDN lists). As a client, you can specify any number of 3rd party or custom lists. The overrides toggle doesn't point to any active rules in trial mode.

![Screening Results](/assets/images/screening_results-2a64351ea21622a7160ab7584b689515.png)

### Step 5: Submit the Search

When you are done entering all entity details and adjusting parameters, click **Search** to submit your request to the screening endpoint.

## Understanding Results

### Results Summary

The top of the response page summarizes the results:

- **Alert status** : Whether any hits were above the alert threshold
- **Total hits** : Number of results above the hit threshold
- **Cleared percentage** : Percentage of hits below the alert threshold
![Screening Results Summary](/assets/images/screening_results_summary-7f4d1b3d20e5fc0afee1a3118a763f38.png)

### Hits Table

Below the summary is a table of all hits, ranked by overall score. The overall score is calculated using the weighted average of matching attribute sub-scores.

- **Red text** : Hits that scored above the alert threshold
- **Blue columns** : Attribute sub-scores for each searched attribute
- **Dashes (-)** : No match for that attribute (score = 0)
![Screening Result Hits](/assets/images/screening_result_hits-c04ada22171f4c867d5eb2641bc5f70c.png)

### Entity Details

Click the blue link under the Entity ID column to view the full entity profile, showing all sourced data on that entity.

![Screening Entity Profile](/assets/images/screening_entity_profile-077a73f23a498bfbf831810d45e974ba.png)

### Response JSON

Toggle **Show Response Code** to view the raw JSON response from the screening endpoint. This helps you understand how to integrate with the API programmatically.

![Screening JSON Response](/assets/images/screening_json_response-899d6aef2db0c917c003fc982bae3e1a.png)

## Additional API Capabilities

Beyond the console functionality, the API provides additional endpoints:

| Capability | Description 
| [Decision Management](/screening/api/decisions) | Retrieve and update screening decisions for case management 
| [Batch Processing](/screening/api/batch) | Upload Excel files for high-volume screening (available on request) 

## Learn More

For more information on our Customer and Transaction Screening endpoint, integration, and pricing, please [contact our sales team](https://enigma.com/contact-us) .