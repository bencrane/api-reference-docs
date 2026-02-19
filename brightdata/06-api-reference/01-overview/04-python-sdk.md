> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Python SDK

### Install the package

Open the terminal and run:

```python  theme={null}
pip install brightdata-sdk
```

**In your code file**, import the package and launch your first requests:

```python  theme={null}
from brightdata import BrightDataClient

# Initialize client (auto-loads from BRIGHTDATA_API_TOKEN env var)
client = BrightDataClient()

# Search Google
results = client.search.google(query="best selling shoes")

if results.success:
    print(f"Found {len(results.data)} results")
    for item in results.data[:5]:
        print(f"{item['position']}. {item['title']}")
```

<Tip>
  The SDK automatically loads your API token from the `BRIGHTDATA_API_TOKEN` environment variable or `.env` file. You can also pass it directly: `BrightDataClient(token="your_token")`
</Tip>

### Launch scrapes and web searches

Try these examples to use Bright Data's SDK functions from your IDE

<CodeGroup>
  ```python Search Engines theme={null}
  from brightdata import BrightDataClient

  client = BrightDataClient()

  # Google search
  results = client.search.google(
      query="best shoes of 2025",
      location="United States",
      language="en",
      num_results=20
  )

  # Bing search
  results = client.search.bing(
      query="python tutorial",
      location="United States"
  )

  # Yandex search
  results = client.search.yandex(
      query="latest news",
      location="Russia"
  )

  if results.success:
      print(f"Cost: ${results.cost:.4f}")
      print(f"Time: {results.elapsed_ms():.2f}ms")
  ```

  ```python Web Scraping theme={null}
  from brightdata import BrightDataClient

  client = BrightDataClient()

  # Scrape single URL
  result = client.scrape.generic.url("https://example.com")

  # Scrape multiple URLs concurrently
  urls = [
      "https://example1.com",
      "https://example2.com",
      "https://example3.com"
  ]
  results = client.scrape.generic.url(urls)

  for result in results:
      if result.success:
          print(f"Success: {result.data[:200]}...")
          result.save_to_file(f"result_{hash(result.data)}.json")
  ```
</CodeGroup>

<Check>
  When working with multiple queries or URLs, requests are handled concurrently for optimal performance.
</Check>

### Use platform-specific scrapers for structured data

Extract structured data from popular platforms like Amazon, LinkedIn, ChatGPT, Facebook, and Instagram

<CodeGroup>
  ```python Amazon Products theme={null}
  from brightdata import BrightDataClient
  from brightdata.payloads import AmazonProductPayload

  client = BrightDataClient()

  # Scrape Amazon product with type-safe payload
  payload = AmazonProductPayload(
      url="https://amazon.com/dp/B0CRMZHDG8",
      reviews_count=50
  )

  result = client.scrape.amazon.products(**payload.to_dict())

  if result.success:
      product = result.data[0]
      print(f"Title: {product['title']}")
      print(f"Price: ${product['final_price']}")
      print(f"Rating: {product['rating']}")

  # Scrape reviews with filters
  result = client.scrape.amazon.reviews(
      url="https://amazon.com/dp/B0CRMZHDG8",
      pastDays=30,
      keyWord="quality",
      numOfReviews=100
  )
  ```

  ```python LinkedIn - Search & Scrape theme={null}
  from brightdata import BrightDataClient
  from brightdata.payloads import LinkedInJobSearchPayload

  client = BrightDataClient()

  # Search LinkedIn jobs (discovery)
  payload = LinkedInJobSearchPayload(
      keyword="python developer",
      location="New York",
      remote=True,
      experienceLevel="mid"
  )

  result = client.search.linkedin.jobs(**payload.to_dict())

  # Scrape LinkedIn profiles (URL-based)
  result = client.scrape.linkedin.profiles(
      url="https://www.linkedin.com/in/shahar-cohen-a667a218a/"
  )

  # Scrape LinkedIn company
  result = client.scrape.linkedin.companies(
      url="https://linkedin.com/company/bright-data"
  )

  # Search posts by profile with date range
  result = client.search.linkedin.posts(
      profile_url="https://linkedin.com/in/bettywliu",
      start_date="2024-01-01",
      end_date="2024-12-31"
  )

  if result.success:
      print(f"Found {len(result.data)} results")
  ```

  ```python Facebook & Instagram theme={null}
  from brightdata import BrightDataClient

  client = BrightDataClient()

  # Scrape Facebook posts from profile
  result = client.scrape.facebook.posts_by_profile(
      url="https://facebook.com/profile",
      num_of_posts=10,
      start_date="01-01-2024",
      end_date="12-31-2024",
      timeout=240
  )

  # Scrape Facebook comments
  result = client.scrape.facebook.comments(
      url="https://facebook.com/post/123456",
      num_of_comments=100,
      timeout=240
  )

  # Scrape Instagram profile
  result = client.scrape.instagram.profiles(
      url="https://instagram.com/username",
      timeout=240
  )

  # Search Instagram posts with filters
  result = client.search.instagram.posts(
      url="https://instagram.com/username",
      num_of_posts=10,
      post_type="reel",
      start_date="01-01-2024",
      timeout=240
  )
  ```

  ```python ChatGPT Prompts theme={null}
  from brightdata import BrightDataClient
  from brightdata.payloads import ChatGPTPromptPayload

  client = BrightDataClient()

  # Single prompt with web search
  payload = ChatGPTPromptPayload(
      prompt="What are the top 3 programming languages in 2024?",
      web_search=True
  )

  result = client.scrape.chatgpt.prompt(**payload.to_dict())

  # Batch prompts
  result = client.scrape.chatgpt.prompts(
      prompts=[
          "What is Python?",
          "What is JavaScript?",
          "Compare them"
      ],
      web_searches=[False, False, True]
  )

  if result.success:
      print(f"Response: {result.data[0]['response']}")
      print(f"Cost: ${result.cost:.4f}")
  ```
</CodeGroup>

<Tip>
  In your IDE, hover over the `BrightDataClient` class or **any of its methods** to view available parameters, type hints, and usage examples. The SDK provides full IntelliSense support!
</Tip>

### Use dataclass payloads for type safety

The SDK includes dataclass payloads with runtime validation and helper properties

```python  theme={null}
from brightdata import BrightDataClient
from brightdata.payloads import (
    AmazonProductPayload,
    LinkedInJobSearchPayload,
    ChatGPTPromptPayload
)

client = BrightDataClient()

# Amazon product with validation
amazon_payload = AmazonProductPayload(
    url="https://amazon.com/dp/B123456789",
    reviews_count=50  # Runtime validated!
)
print(f"ASIN: {amazon_payload.asin}")  # Helper property
print(f"Domain: {amazon_payload.domain}")

# LinkedIn job search
linkedin_payload = LinkedInJobSearchPayload(
    keyword="python developer",
    location="San Francisco",
    remote=True
)
print(f"Remote search: {linkedin_payload.is_remote_search}")

# Use with client
result = client.scrape.amazon.products(**amazon_payload.to_dict())
```

### Connect to scraping browser

Use the SDK to easily connect to Bright Data's scraping browser

```python  theme={null}
from brightdata import BrightDataClient
from playwright.sync_api import Playwright, sync_playwright

client = BrightDataClient(
    token="your_api_token",
    browser_username="username-zone-browser_zone1",
    browser_password="your_password"
)

def scrape(playwright: Playwright, url='https://example.com'):
    browser = playwright.chromium.connect_over_cdp(client.connect_browser())
    try:
        print(f'Connected! Navigating to {url}...')
        page = browser.new_page()
        page.goto(url, timeout=2*60_000)
        print('Navigated! Scraping page content...')
        data = page.content()
        print(f'Scraped! Data length: {len(data)}')
    finally:
        browser.close()

def main():
    with sync_playwright() as playwright:
        scrape(playwright)

if __name__ == '__main__':
    main()
```

### Use the CLI tool

The SDK includes a powerful command-line interface for terminal usage

```bash  theme={null}
# Search operations
brightdata search google "python tutorial" --location "United States"
brightdata search linkedin jobs --keyword "python developer" --remote

# Scrape operations
brightdata scrape amazon products "https://amazon.com/dp/B123"
brightdata scrape linkedin profiles "https://linkedin.com/in/johndoe"

# Generic web scraping
brightdata scrape generic "https://example.com" --output-format pretty

# Save results to file
brightdata search google "AI news" --output-file results.json
```

### Async usage for better performance

For concurrent operations, use the async API:

```python  theme={null}
import asyncio
from brightdata import BrightDataClient

async def scrape_multiple():
    # Use async context manager
    async with BrightDataClient() as client:
        # Scrape multiple URLs concurrently
        results = await client.scrape.generic.url_async([
            "https://example1.com",
            "https://example2.com",
            "https://example3.com"
        ])
        
        for result in results:
            if result.success:
                print(f"Success: {result.elapsed_ms():.2f}ms")

asyncio.run(scrape_multiple())
```

<Warning>
  When using `*_async` methods, always use the async context manager (`async with BrightDataClient() as client`). Sync wrappers handle this automatically.
</Warning>

### Resources

<CardGroup cols="3">
  <Card title="GitHub Repository" icon="github" iconType="light" horizontal href="https://github.com/brightdata/sdk-python">
    View source code, examples, and contribute
  </Card>

  <Card title="Code Examples" icon="code" iconType="light" horizontal href="https://github.com/brightdata/sdk-python/tree/main/examples">
    10+ working examples for all features
  </Card>

  <Card title="API Documentation" icon="book" iconType="light" horizontal href="https://github.com/brightdata/sdk-python/blob/main/README.md">
    Comprehensive API reference and guides
  </Card>
</CardGroup>

### What's New in v2.0.0

<AccordionGroup>
  <Accordion title="🎨 Dataclass Payloads" description="Type-safe request payloads" icon="check">
    * Runtime validation with helpful error messages
    * IDE autocomplete support
    * Helper properties (`.asin`, `.is_remote_search`, `.domain`)
    * Consistent with result models
  </Accordion>

  <Accordion title="🖥️ CLI Tool" description="Command-line interface" icon="terminal">
    * `brightdata` command for terminal usage
    * Scrape and search operations
    * Multiple output formats (JSON, pretty, minimal)
    * File output support
  </Accordion>

  <Accordion title="📓 Jupyter Notebooks" description="Interactive tutorials" icon="book-open">
    * 5 comprehensive notebooks
    * Pandas integration examples
    * Data analysis workflows
    * Batch processing guides
  </Accordion>

  <Accordion title="🆕 New Platforms" description="Facebook & Instagram" icon="layer-plus">
    * Facebook scraper (posts, comments, reels)
    * Instagram scraper (profiles, posts, comments, reels)
    * Instagram search (posts and reels discovery)
  </Accordion>

  <Accordion title="⚡ Performance" description="Architecture improvements" icon="bolt">
    * Single shared AsyncEngine (8x efficiency)
    * Reduced memory footprint
    * Better resource management
    * 502+ comprehensive tests
  </Accordion>
</AccordionGroup>

<Check>
  **Enterprise-grade SDK** with 100% type safety, async-first architecture, and comprehensive testing. Built for data scientists and developers.
</Check>