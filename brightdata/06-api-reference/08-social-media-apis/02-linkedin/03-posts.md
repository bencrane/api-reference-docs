# Social Media Scrapers API - LinkedIn - Posts API

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.brightdata.com/llms.txt
> Use this file to discover all available pages before exploring further.

> Collect detailed LinkedIn post data by post URL.

## Posts API

The Posts API allows you to collect detailed information from a **single LinkedIn post or article** by providing its direct URL.

---

## Collect by URL

This endpoint allows users to collect comprehensive data from a specific LinkedIn post, including content, media, engagement metrics, and author information.

### Input Parameters

| Parameter | Type   | Required | Description                       |
|-----------|--------|----------|-----------------------------------|
| `URL`     | string | Yes      | The LinkedIn post or article URL. |

### Output Structure

Includes comprehensive data points across multiple categories.

### Post details

* `id`
* `title`
* `headline`
* `post_text`
* `post_text_html`
* `date_posted`
* `hashtags`
* `embedded_links`
* `images`
* `videos`
* `post_type`
* `account_type`
* and more

> For the complete list of supported fields,
> [View full output reference](https://brightdata.com/cp/data_api/gd_lyy3tktm25m4avu764?tab=overview)

---

### Engagement metrics

* `num_likes`
* `num_comments`
* `top_visible_comments`

---

### User details

* `user_id`
* `user_url`
* `user_followers`
* `user_posts`
* `user_articles`

---

### Related content

* `more_articles_by_user`
* `more_relevant_posts`

---

This endpoint provides **deep insight into individual LinkedIn posts**, making it suitable for:

* Content analysis
* Engagement tracking
* Market research
* Brand monitoring
* Author-level insights

---

## OpenAPI

```yaml
openapi: 3.0.3
info:
  title: Web Scraper IDE REST API
  description: >-
    APIs for scraping and collecting structured data from web sources including
    social media platforms.
  version: 1.0.0
servers:
  - url: https://api.brightdata.com
security:
  - bearerAuth: []
tags:
  - name: Instagram
    description: Instagram scraping endpoints
paths:
  /linkedin/posts/collect:
    post:
      tags:
        - LinkedIn
      summary: Collect LinkedIn post by URL
      description: >-
        Collect detailed data from a single LinkedIn post or article using its
        URL.
      operationId: collectLinkedInPost
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LinkedInPostCollectRequest'
            example:
              url: https://www.linkedin.com/posts/example-post-id
      responses:
        '200':
          description: Post data collected successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LinkedInPostCollectResponse'
              example:
                id: post_12345
                title: Excited to share an update
                headline: Product launch announcement
                post_text: We are thrilled to announce our new product...
                post_text_html: <p>We are thrilled to announce...</p>
                date_posted: '2024-01-18'
                hashtags:
                  - product
                  - launch
                embedded_links:
                  - https://example.com
                images:
                  - https://cdn.linkedin.com/image1.jpg
                videos: []
                post_type: post
                account_type: personal
                num_likes: 320
                num_comments: 45
                top_visible_comments: 3
                user_id: user_9876
                user_url: https://www.linkedin.com/in/example-user/
                user_followers: 5600
                user_posts: 120
                user_articles: 14
                more_articles_by_user: []
                more_relevant_posts: []
        '400':
          description: Invalid LinkedIn post URL
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                error: Invalid input
                message: The provided LinkedIn post URL is not valid.
        '401':
          description: Unauthorized
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                error: Unauthorized
                message: Invalid or missing API token.
components:
  schemas:
    LinkedInPostCollectRequest:
      type: object
      required:
        - url
      properties:
        url:
          type: string
          format: uri
          description: LinkedIn post or article URL
    LinkedInPostCollectResponse:
      type: object
      properties:
        id:
          type: string
        title:
          type: string
        headline:
          type: string
        post_text:
          type: string
        post_text_html:
          type: string
        date_posted:
          type: string
        hashtags:
          type: array
          items:
            type: string
        embedded_links:
          type: array
          items:
            type: string
        images:
          type: array
          items:
            type: string
        videos:
          type: array
          items:
            type: string
        post_type:
          type: string
        account_type:
          type: string
        num_likes:
          type: integer
        num_comments:
          type: integer
        top_visible_comments:
          type: integer
        user_id:
          type: string
        user_url:
          type: string
        user_followers:
          type: integer
        user_posts:
          type: integer
        user_articles:
          type: integer
        more_articles_by_user:
          type: array
          items:
            type: string
        more_relevant_posts:
          type: array
          items:
            type: string
    ErrorResponse:
      type: object
      properties:
        error:
          type: string
        message:
          type: string
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
```