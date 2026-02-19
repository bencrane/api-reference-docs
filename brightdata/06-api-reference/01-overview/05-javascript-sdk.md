> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.

# JavaScript SDK

### Install the package

Open the terminal and run:

```javascript  theme={null}
npm install @brightdata/sdk
```

**In your code file**, import the package - and launch your first requests:

```javascript  theme={null}
import { bdclient } from '@brightdata/sdk';

const client = new bdclient({
    apiKey: '[your_api_key_here]' // can also be defined as BRIGHTDATA_API_KEY env variable
});
const result = await client.search('pizza restaurants');

console.log(result);
```

### Launch scrapes and web searches

Try these examples to search or scrape the internet from your IDE

<CodeGroup>
  ```javascript search(...) theme={null}
  import { bdclient } from '@brightdata/sdk';

  const client = new bdclient({
      apiKey: '[your_api_key_here]' // can also be defined as BRIGHTDATA_API_KEY env variable
  });
  const result = await client.search('pizza restaurants');

  console.log(result);
  ```

  ```javascript scrape(...) theme={null}
  import { bdclient } from '@brightdata/sdk';

  const client = new bdclient({
      apiKey: '[your_api_key_here]' // can also be defined as BRIGHTDATA_API_KEY env variable
  });
  const result = await client.scrape('https://docs.brightdata.com/api-reference/SDK');

  console.log(result);
  ```
</CodeGroup>

### Acsses our Linkedin datasets

Try these examples to use Bright Data's Linkedin Datasets from your IDE

<CodeGroup>
  ```javascript discoverCompanyPosts(...) theme={null}
  import { bdclient } from '@brightdata/sdk';

  const client = new bdclient({
      apiKey: 'YOUR_API_KEY_HERE',
      logLevel: 'INFO',
      structuredLogging: true,
      verbose: false
  });

  const res = await client.datasets.linkedin.discoverCompanyPosts([
      { url: 'https://www.linkedin.com/company/bright-data' },
  ]);

  // it will poll if snapshot is ready, and once it is - download it
  const filePath = await client.datasets.snapshot.download(res.snapshot_id, {
      filename: './brd_posts.jsonl',
      format: 'jsonl',
  });

  console.log(`Content saved to: ${filePath}`);
  ```

  ```javascript collectCompanies(...) theme={null}
  import { bdclient } from '@brightdata/sdk';

  const client = new bdclient({
      apiKey: 'YOUR_API_KEY_HERE',
      logLevel: 'INFO',
      structuredLogging: true,
      verbose: false
  });

  const result = await client.datasets.linkedin.collectCompanies([
      { url: 'https://www.linkedin.com/company/bright-data' },
  ])

  console.log(result);
  ```

  ```javascript collectProfiles(...) theme={null}
  import { bdclient } from '@brightdata/sdk';

  const client = new bdclient({
      apiKey: 'YOUR_API_KEY_HERE',
      logLevel: 'INFO',
      structuredLogging: true,
      verbose: false
  });import { bdclient } from '@brightdata/sdk';

  const client = new bdclient({
      apiKey: <yourApiKey>,
      logLevel: 'INFO',
      structuredLogging: true,
      verbose: false
  });

  const result = await client.datasets.linkedin.collectProfiles([
      'https://www.linkedin.com/in/shahar-cohen-a667a218a/'
  ]);

  console.log(result);
  ```

  ```javascript discoverProfiles(...) theme={null}
  import { bdclient } from '@brightdata/sdk';

  const client = new bdclient({
      apiKey: 'YOUR_API_KEY_HERE',
      logLevel: 'INFO',
      structuredLogging: true,
      verbose: false
  });

  const res = await client.datasets.linkedin.discoverProfiles([
  	{
       	first_name: 'Shahar',
          last_name: 'Cohen'
       },{
          first_name: 'Joe',
          last_name: 'Smith'
       }
  ]);

  // it will poll if snapshot is ready, and once it is - download it
  const filePath = await client.datasets.snapshot.download(res.snapshot_id, {
      filename: './linkedin_profiles.jsonl',
      format: 'jsonl',
  });

  console.log(`Content saved to: ${filePath}`);
  ```

  ```javascript collectJobs(...) theme={null}
  import { bdclient } from '@brightdata/sdk';

  const client = new bdclient({
      apiKey: 'YOUR_API_KEY_HERE',
      logLevel: 'DEBUG',
      structuredLogging: true,
      verbose: true
  });

  const result = await client.datasets.linkedin.collectJobs([
          { url: "https://www.linkedin.com/jobs/view/4274718051/?alternateChannel=search&eBP=CwEAAAGZ5_dwUKImLTD5nZGyBMSLXoT3RerpGWFzUZCrU4k55F3iwvqsfV1ydiCxQKKfDrkRYfjR3qmSf--I70njKohHVkfG3IP5sonpG0Jv9gXJtGow0RcT8hzan6Cu_BurZh369VhQTYP-1axId7G2lo151UVdDBD3A627brsE5cxp4MzvOAPsOS1gzJq_jNjchUi7zAoMTtezp8WW9hBSQ833SPYfGp4F0k4QQGr0Jo06mM4k7cjIqaGx6UQ9DNdMAE4eEnMWIj6ZJLM4c8V_Q-Zl58HASzETNka6AB47bwLnvUVqByBs2Mqt7qXX08Tm2wLg-Kn61m8GoL0i2KkOAIL1UMuYE3F5bOfC_kJbHWv2MjgPgaL7BqylxW8bRni8bVUXRGeuVvKyw_cXxiLGg-ACdAGm1gax9Ew-UDNhExf66DPMdejUiDPQZ4vBAeKczn3W46QQ03YNkpV6oZtzReZhfZYR_v0NGXqopH2DyTs&trk=undefined&refId=%2BnUwi2ZKY5aaWVisHeFwkg%3D%3D&trackingId=IdPgALlth%2BlI7M5xde6nsg%3D%3D" }
  	]);

  console.log('result:', result);
  ```

  ```javascript discoverJobs(...) theme={null}
  import { bdclient } from '@brightdata/sdk';

  const client = new bdclient({
      apiKey: 'YOUR_API_KEY_HERE',
      logLevel: 'DEBUG',
      structuredLogging: true,
      verbose: true
  });
      
  const searchParams = [{
              location: "Paris",
              keyword: "product manager",
              country: "FR",
              time_range: "Past month",
              job_type: "Full-time",
          }
      ];
  const result = await client.datasets.linkedin.discoverJobs(searchParams);

  console.log(result)
  ```

  ```
  ```
</CodeGroup>

<AccordionGroup>
  <Accordion title="Client" description="Add client parameters" icon="circle-info">
    ```javascript  theme={null}
    const client = new bdclient({
        apiKey: 'string', // Your API key
        autoCreateZones: true, // Auto-create zones if they don't exist
        webUnlockerZone: 'string', // Custom web unlocker zone name
        serpZone: 'string', // Custom SERP zone name
        logLevel: 'INFO', // Log level
        structuredLogging: true, // Use structured JSON logging
        verbose: false, // Enable verbose logging
    });
    ```
  </Accordion>

  <Accordion title="Search" description="Add advanced search parameters" icon="magnifying-glass-chart">
    Search the web using the SERP API

    | Name                   | Type          | Description                               | Default                                 |                         |            |
    | ---------------------- | ------------- | ----------------------------------------- | --------------------------------------- | ----------------------- | ---------- |
    | `query`                | \`string      | string\[]\`                               | Search query string or array of queries | —                       |            |
    | `options.searchEngine` | \`"google"    | "bing"                                    | "yandex"\`                              | Search engine           | `"google"` |
    | `options.zone`         | `string`      | Zone identifier (auto-configured if null) | —                                       |                         |            |
    | `options.format`       | \`"json"      | "raw"\`                                   | Response format                         | `"raw"`                 |            |
    | `options.method`       | `string`      | HTTP method                               | `"GET"`                                 |                         |            |
    | `options.country`      | `string`      | Two-letter country code                   | `""`                                    |                         |            |
    | `options.dataFormat`   | \`"markdown"  | "screenshot"                              | "html"\`                                | Returned content format | `"html"`   |
    | `options.concurrency`  | `number`      | Max parallel workers                      | `10`                                    |                         |            |
    | `options.timeout`      | `number (ms)` | Request timeout                           | `30000`                                 |                         |            |
  </Accordion>

  <Accordion title="Scrape" description="Add advanced scrape parameters" icon="spider">
    Scrape a single URL or list of URLs using the Web Unlocker API.

    | Name                  | Type          | Description                               | Default                            |                         |          |
    | --------------------- | ------------- | ----------------------------------------- | ---------------------------------- | ----------------------- | -------- |
    | `url`                 | \`string      | string\[]\`                               | Single URL string or array of URLs | —                       |          |
    | `options.zone`        | `string`      | Zone identifier (auto-configured if null) | —                                  |                         |          |
    | `options.format`      | \`"json"      | "raw"\`                                   | Response format                    | `"raw"`                 |          |
    | `options.method`      | `string`      | HTTP method                               | `"GET"`                            |                         |          |
    | `options.country`     | `string`      | Two-letter country code                   | `""`                               |                         |          |
    | `options.dataFormat`  | \`"markdown"  | "screenshot"                              | "html"\`                           | Returned content format | `"html"` |
    | `options.concurrency` | `number`      | Max parallel workers                      | `10`                               |                         |          |
    | `options.timeout`     | `number (ms)` | Request timeout                           | `30000`                            |                         |          |
  </Accordion>

  <Accordion title="saveResults" description="Save content to local file." icon="floppy-disk">
    **Parameters:**

    | Name               | Type     | Description                              | Default |             |   |
    | ------------------ | -------- | ---------------------------------------- | ------- | ----------- | - |
    | `content`          | `any`    | Content to save                          | —       |             |   |
    | `options.filename` | `string` | Output filename (auto-generated if null) | —       |             |   |
    | `options.format`   | \`"json" | "csv"                                    | "txt"\` | File format | — |
  </Accordion>
</AccordionGroup>

### Error handling

<AccordionGroup>
  <Accordion title="Logging" description="Enable advence logging" icon="ballot">
    Enable `VERBOSE` in the Client for advenced logging (see Client parameters) Use the `listZones()` func to check available zones
  </Accordion>

  <Accordion title="Authentication" description="Bright Data Auth" icon="rectangle-barcode">
    Create a [Bright Data](https://brightdata.com/) account and copy your API key Go to [account settings](https://brightdata.com/cp/setting/users), and make sure that your API key have **admin permissions**
  </Accordion>
</AccordionGroup>

### Resources

<CardGroup cols="3">
  <Card title="GitHub" icon="github" iconType="light" color="#NaNNaNNaN" href="https://github.com/brightdata/bright-data-sdk-js?tab=readme-ov-file" cta>
    Visit the Bright Data SDK GitHub repository
  </Card>
</CardGroup>