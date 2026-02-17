# Growth & GTM Solutions - Search for a Specific Business

> Source: https://documentation.enigma.com/growth/search

When you're looking for information about a specific business, the [Enigma Console](https://console.enigma.com/explore/search) is the place to start.

When people think of a business, they tend to think of its brand - McDonald's brings to mind the golden arches, not a corporate registration. Accordingly, Enigma defaults to *brand* search. See [understanding the Enigma data model](/getting_started/data_model) for more information about how Enigma structures business data.

You can search brands in Enigma with any one of the following pieces of information:

- The brand name
- The primary website associated with the brand
- Any address associated with the brand

To search, simply navigate to the [Enigma Console search page](https://console.enigma.com/explore/search), enter the information that you have about the brand, and hit enter. Search results are returned in order of most to least relevant. The more information you include, the more relevant your search results will be.

The behavior of each search field is optimized for the expected input(s).

---

### Brand Name

This search parameter is optimized for the name a business uses when it presents itself to customers. It's the name that a business would use in an advertisement, rather than legal document (i.e. "Google" rather than "Alphabet Inc."). When specifying this parameter, keep in mind:

- Capitalization will not impact your results.
- Words with similar characters in similar orders will rank higher in your results. This makes the search more tolerant to typos.

### Website

This search parameter is optimized for the primary domain associated with a brand (e.g. enigma.com). It is not optimized for subdomains or specific pages on a website (e.g. mail.enigma.com or enigma.com/data). When specifying this parameter, keep in mind:

- Any characters following a `/` will be excluded from your query.
- Common prefixes, such as `https` and `www`, are removed from your query. Including them will not impact your search results.
- Top-level domains such as `.com` and `.org` are important for search result relevance. Brands for top-level domains other than the one you specify in your query will not be included in your results. For example, a search for a website ending in `.org` will exclude all brands with websites that only end in `.com`.

### Address

This set of search parameters is optimized for US addresses. You can include values for one or many of these parameters:

- **Street Address 1** - Primary information, like the address number and street name.
- **Street Address 2** - Secondary information like apartment or suite numbers.
- **City** - The name of the locality the location is in.
- **State** - The full name of the state the location is in.

Note that, because some brands are associated with multiple addresses, a brand may be included in the results if any of its associated addresses meet the search criteria.

---

## Example: Qualify an Inbound Lead

Learn more about using the Enigma Console to find information on a specific brand, by walking through the process of [qualifying an inbound lead](/growth/lead-qualification).