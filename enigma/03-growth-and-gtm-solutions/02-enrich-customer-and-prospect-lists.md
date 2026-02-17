# Growth & GTM Solutions - Enrich Customer and Prospect Lists

> Source: https://documentation.enigma.com/growth/enrichment

Use Enigma's Enrichment tool to append data to your existing lists of prospects or customers. This allows you to:

- **Prioritize prospects:** Sort leads by revenue or growth, or verify they match your target industries.
- **Assign sales territories:** Segment prospects by geography or revenue size.
- **Identify growth potential:** Compare your observed transaction processing volume for a customer against the total card spend Enigma observes for its business.

---

## Step 1: Prepare Your Input List

Create a CSV or Parquet file with one row per brand, operating location, or legal entity.

To match your accounts to Enigma data, the list must include at least one of these identifiers:

- Brand Name, Store Name, or Legal Name
- Address (broken out into `street_address1`, `street_address2`, `city`, `state`, `zip`)
- Website

> **Tip:** Include internal IDs (such as customer or account IDs) in your input file to easily map the enriched output back to your system, such as a CRM. Once you download the completed list from Enigma, you may need to re-upload it into your system.

**Example input list** — a few rows from an input list for a customer using Enigma to enrich a list of fast casual restaurant and coffee shop locations in New York:

| account_id | account_name | website | street_address1 | street_address2 | city | state | zip |
|---|---|---|---|---|---|---|---|
| 577830 | Sweetgreen | https://www.sweetgreen.com/ | 1164 Broadway |  | New York | NY | 10001 |
| 425368 | Sweetgreen | https://www.sweetgreen.com/ | 311 Amsterdam Ave |  | New York | NY | 10023 |
| 501534 | Sweetgreen | https://www.sweetgreen.com/ | 3 World Trade Center | Space 1300 | New York | NY | 10007 |
| 532440 | TACOMBI | https://www.tacombi.com/ | 23 W 33rd St |  | New York | NY | 10018 |
| 686624 | TACOMBI | https://www.tacombi.com/ | 25 Lafayette Ave |  | Brooklyn | NY | 11217 |
| 798834 | Blank Street Coffee | https://www.blankstreet.com/ | 300 Bleecker St |  | New York | NY | 10014 |
| 769 | DEVOCIÓN | https://www.devocion.com/ | 69 Grand Street |  | Brooklyn | NY | 11249 |
| 440882 | Casasalvo | https://www.casasalvonyc.com/ | 473 Amsterdam Ave |  | New York | NY | 10024 |
| 432780 | Now or Never Coffee | https://www.nowornevercoffee.com/ | 30 Grand St |  | New York | NY | 10013 |
| 575429 | Copper Mug Coffee | https://thecoppermugcoffee.com/ | 131 N 4th St |  | Brooklyn | NY | 11249 |

---

## Step 2: Import Your List

1. Open the [Enigma Console](https://console.enigma.com/) and navigate to **Lists**.
2. Click **Imports > + Import List**.
3. Upload your CSV or Parquet file.

---

## Step 3: Configure Enrichment Settings

1. In the **Imports** section, locate your uploaded list and click **Enrich**.
2. Select the entity type layout that matches your goal:

| Layout | Description |
|---|---|
| **Brands** | Enriches accounts at the overall corporate brand level. |
| **Operating Locations** | Enriches accounts at the store level (for example, for direct mail campaigns or store-specific sales). |
| **People/Contacts** | Identifies key contact information (email addresses or phone numbers) for operating locations. |
| **Legal Entities** | Identifies the relevant legal entity and associated registrations. |

3. Click **Next**.
4. Enter a name for your output list and select the desired file format.

---

## Step 4: Monitor and Download

After configuration, the console redirects you to the **Lists** tab. Your new list appears under the output name you specified.

- **Monitor progress:** The progress bar indicates the completion percentage. Most enrichments take 5–20 minutes. Lists with more than one million rows may take longer.
- **Download:** When the progress bar reaches 100%, click the list name to download the file.

> **Note:** If the status indicates **Paused**, click the list name to view the error. If the pause is due to insufficient credits, you can purchase additional credits immediately. For other errors, contact support@enigma.com.

---

## Step 5: Review Enriched Data

The downloaded file contains your original data followed by the appended Enigma data.

- **Input columns:** Your original data columns appear first, with the prefix `input_`.
- **Enigma ID:** Rows successfully matched to an entity contain an Enigma ID.
- **Attributes:** Columns following the ID contain Enigma attributes, such as card revenues or operating status. Verify the name, address, or website fields to ensure the match is accurate.

---

## Troubleshooting

### Job Pauses Before Completion

If the progress bar stops before reaching 100%, click the list name to expand the row and view the specific error message.

- **Insufficient credits:** If the job paused because you ran out of credits, the console lets you purchase additional credits to resume the process.
- **Other errors:** For any other error types, contact support@enigma.com or your account manager for assistance.

### Slow Processing Times

Most enrichment jobs complete between 5 and 20 minutes. However, processing may take significantly longer if your input list is very large (more than one million rows).

### Verify Successful Matches

To check whether a specific row was successfully enriched, review the downloaded output file for the **Enigma ID** column.

- **Matched:** Rows with a value in the Enigma ID column have been successfully matched to an entity.
- **Unmatched:** Rows without an Enigma ID could not be matched based on the provided input criteria (name, address, or website).