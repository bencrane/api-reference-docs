# twilio/catalog

## Overview

The twilio/catalog content type is used to send products or services to your customers. WhatsApp offers three ways to send advertise, recommend, and facilitate checkout for items or services you may have for sale. These messages can be sent in and out of session in three variations: single product, multi product, and whole catalog messages. Twilio has simplified all of this into one content template. Depending on the number of items you send, Twilio will automatically select the appropriate type of WhatsApp Product Message to deliver your message. This removes the need to build and understand WhatsApp's custom logic to choose the type of product message to send.

End users can do the following:

- View a list of products (multi-product message, catalog)
- View one product (single product message).
- Ask questions about specific products.
- Add products to a cart.
- Send a shopping cart to the business.

## Supported channels

- WhatsApp

## Message preview

### Single product message (SPM)

Strawberry priced at $4.00 with fresh fruit deals by the kilo.

*Expand image*

- Sends one product and information about that product to your customers.
- Only available within a 24 hour customer service window.
- One product can be sent out of session as part of a multi-product catalog content template but the end user experience will be different.
- Clicking the message redirects directly to the item.

### Multi-product message (MPM)

Message preview with strawberry, titled 'The Menu: Tropical Fruits', 2 items.

*Expand image*

- Sends 1 to 30 products and information about those products to your customers.
- Available in session and as an out of session approve content template.
- One product can be sent out of session as part of a multi-product catalog content template but the end user experience will be different.
- Clicking the message button redirects to a list of products.

### Full catalog message

WhatsApp message preview of Twilio's fruit menu catalog with a strawberry.

*Expand image*

- Sends all product and information about that product to your customers.
- This functionality must be enabled for your sender

## Create and configure your catalog

### Create your catalog in WhatsApp Business Account

1. Navigate to your WhatsApp Business Account (WABA).

   WhatsApp senders page showing business verification and sender details with status online.
   
   *Expand image*

2. In your WhatsApp Business Account, click the three horizontal lines in the left navigation bar and go to your Commerce Manager.

   Meta Business Suite showing Commerce Manager shortcut and WhatsApp account limits.
   
   *Expand image*

3. In the Catalogs section, click Add catalog and select the relevant catalog type. You will then be asked to give the catalog a name. Select the catalog use case and once the catalog is created, click View Catalog. Do not edit the Catalog owner.

   Commerce Manager showing strawberries item with content ID fhoQqwubgd, in stock for $1.00.
   
   *Expand image*

### Add items to your catalog

1. Next we will add items to the catalog. Click into the catalog.

   content api - message preview.
   
   *Expand image*

2. Meta offers multiple ways to upload items. The easiest way to get started is to manually add items in the UI. In addition, Meta allows you to add items in more advanced scalable ways. You can upload a sheet using data feeds where you can provide a template to fill out. Partner platforms connect your catalog directly to your Shopify/BigCommerce site. If you choose to do manual upload or data feed, you will be can add a SKU number item ID called content id in the UI. These must be unique values in each catalog. Additionally you will need to add a title, description, availability status, condition of item, price, link to item, link to image of item, and brand of item for each item in the catalog.

3. You will need to take note of the item's "Content ID".

> ℹ️ **Info**
> In Meta's UI, the item ID is called "Content ID".
>
> In their developer docs, it's referred to as "Item ID" and "Product Retailer ID".
>
> In our webhook, it's exposed as "Product Retailer ID" but we will soon change this to standardize the field.

content api - message preview.

*Expand image*

### Connect your Catalog to your WhatsApp Business Manager

1. Go back to the WhatsApp Manager. One way to get back here is to navigate back to the Console and click into your WABA ID like in the first step of "Create your catalog in WhatsApp Business Account".

2. Under Account tools, go to Catalog to connect your Catalog. The same catalog can't be used by multiple WhatsApp Business Accounts.

   WhatsApp Manager interface with option to connect a catalog.
   
   *Expand image*

> ℹ️ **Info**
> Before creating a catalog template, you must create a catalog in your Meta Commerce Manager which can be found in your Meta Business Manager.
>
> During a 24-hour user-initiated session, content template approval isn't required by WhatsApp for twilio/catalog content templates.
>
> For out of session (business-initiated) catalog templates, you will need to submit the content template for approval.

## Create and configure your content template

Now, let's create your content template, so you can send product messages to your end users.

First, find the Catalog ID in your Meta Commerce Manager in the Catalogs section. You will need this ID to create your content template with Twilio.

content api - message preview.

*Expand image*

> ⚠️ **Warning**
> If you are sending one item in an approved templated message, it will be sent and approved as a multi-product message.
>
> Single product messages are only available in session.

## Data parameters

To create the actual body of the message you will need to specify body, subtitle, and title to define what the message actually resembles.

The thumbnail_id is the item ID from the list of items you specify. This ID will be needed for multi-product and full catalog messages to define the cover photo of the message.

You will also need to define the items you will send. You can either do this by denoting that you will send the items later, you can define a static list now, or do a combination of both. When you define items you will need to use the item ID (found as Content ID in the catalog in the Meta Commerce Manager). If you are defining multiple items, you will need to add section titles to organize your items into sections.

WhatsApp catalog preview with fruit menu and great deals subtitle.

*Expand image*

Menu displaying tropical fruits with prices, including strawberry for $4 and lychee for $8.

*Expand image*

| Parameter | Type | Required | Variable support | Description |
|---|---|---|---|---|
| id | string | Yes | Yes for in-session. No for WhatsApp approved templates. | ID for the catalog you want to use for this message. You can retrieve this ID via Commerce Manager. |
| title | string | No, except for WhatsApp MPM. | Yes | Required for WhatsApp MPM. Controls the bolded title text above the body of the message. Maximum length: 60 characters |
| body | string | No, only required to get content template approved by WhatsApp | Yes | The content of the message. Emojis and markdown are supported. Maximum length: 1,024 characters |
| subtitle | string | No, only required to get content template approved by WhatsApp | Yes | The content of the message. Emojis and markdown are supported. Maximum length: 1,024 characters |
| items | array | Yes, if dynamic_items isn't defined. | No | Array of static items to be sent. |
| dynamic_items | array | Yes, if items isn't defined. | Yes | Rule: It should only have a placeholder. Required for dynamic catalog items. At the time of content creation, customers can mention a placeholder for example {{products}}. At the time of sending a message, customers can pass products as variables. |

### items and dynamic_items properties

| Property | Type | Required | Variable support | Description |
|---|---|---|---|---|
| id | string | No | Yes | Required for Single-Product Messages and Multi-Product Messages. Must be defined in either CatalogItem during create or in the variable for dynamic items at time of send. Unique identifier of the product in a catalog. Maximum length: 100 characters for SPM and MPM. |
| section_title | string | No | Yes | Title of the section. Maximum length: 24 characters |

## Code examples and responses

### Product message with fixed items

This request creates a content template that will send a fixed list. You can use thumbnail_item_id to define what product's picture is shown on the message. You can also have some items can be fixed for a message and others can be dynamic if you add `"dynamic_items": "{{products}}"` in the twilio/catalog definition.

If dynamic items is defined in creation, at least one additional dynamic item must be added to send. For this example, if more than one dynamic items are added, the item with id value of 48rme2i4po will always be sent first and all items defined in {{products}} at send will follow.

#### Create static catalog template

**curl**

```bash
curl -X POST 'https://content.twilio.com/v1/Content' \
-H 'Content-Type: application/json' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
-d '{
   "friendly_name": "fixedproducts",
   "language": "en",
   "variables": {"1": "menu_ad", "2": "menu_name"},
   "types": {
   "twilio/catalog": {
     "id": "1017234312776586",
     "body": "Hi, check out this menu {{1}}",
     "subtitle": "Great deals",
     "title": "The Menu: {{2}}",
     "thumbnail_item_id": "48rme2i4po",
     "items": [ {"id": "48rme2i4po", "section_title": "veggies"}]
 }
}
}'
```

**Output**

```json
{
    "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "date_created": "2024-06-10T22:16:39Z",
    "date_updated": "2024-06-10T22:16:39Z",
    "friendly_name": "fixedproducts",
    "language": "en",
    "links": {
        "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",
        "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"
    },
    "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "types": {
        "twilio/catalog": {
            "body": "Hi, check out this menu {{1}}",
            "dynamic_items": null,
            "id": "1017234312776586",
            "items": [
                {
                    "description": null,
                    "id": "48rme2i4po",
                    "media_url": null,
                    "name": null,
                    "price": null,
                    "section_title": "veggies"
                }
            ],
            "subtitle": "Great deals",
            "thumbnail_item_id": "48rme2i4po",
            "title": "The Menu: {{2}}"
        }
    },
    "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "variables": {
        "1": "menu_ad",
        "2": "menu_name"
    }
}
```

### Product messages with the entire product catalog

This request will send an end user your entire catalog. The title is prefixed by Meta as: "View {Business's name} Catalog on WhatsApp". No items need to be defined.

> ⚠️ **Warning**
> This feature requires sender configuration. Please reach out to your Twilio point of contact or support to enable it.

#### Create full catalog template

**curl**

```bash
curl -X POST 'https://content.twilio.com/v1/Content' \
-H 'Content-Type: application/json' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
-d '{
   "friendly_name": "Catalog - all products",
   "language": "en",
   "variables": {"1": "menu_title", "2": "menu_name"},
   "types": {
    "twilio/catalog": {
      "id": "1017234312776586",
      "title": "The Menu: {{1}}",
      "body": "Hi, check out this menu {{2}}",
      "subtitle": "Great deals",
      "thumbnail_item_id": "48rme2i4po"
      }
    }
  }'
```

**Output**

```json
{
    "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "date_created": "2024-06-10T22:02:53Z",
    "date_updated": "2024-06-10T22:02:53Z",
    "friendly_name": "Catalog - all products",
    "language": "en",
    "links": {
        "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",
        "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"
    },
    "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "types": {
        "twilio/catalog": {
            "body": "Hi, check out this menu {{2}}",
            "dynamic_items": null,
            "id": "1017234312776586",
            "items": null,
            "subtitle": "Great deals",
            "thumbnail_item_id": "48rme2i4po",
            "title": "The Menu: {{1}}"
        }
    },
    "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "variables": {
        "1": "menu_title",
        "2": "menu_name"
    }
}
```

### Product message with dynamically set items

If you want to send a variable number of items, we recommend you send a content template.

If you are sending one item, Meta considers this a "single-product message" and only supports it in-session. When sending one product out of session, the message the end user receives will be slightly different.

If you are sending within a 24 hour session, we recommend creating one content template with all fields set as variables. You can then dynamically define each field at send time so you can minimize the number of content templates you need to create.

#### Create catalog template with dynamic items

**curl**

```bash
curl -X POST 'https://content.twilio.com/v1/Content' \
-H 'Content-Type: application/json' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
-d '{
   "friendly_name": "dynamicproducts",
   "language": "en",
   "variables": {"1": "Hi, check out this menu menu_name", "2": "footer text"},
   "types": {
   "twilio/catalog": {
     "id": "1017234312776586",
     "title": "The Menu: {{1}}",
     "body": "{{2}}",
     "subtitle": "{{3}}",
     "dynamic_items": "{{products}}"
 }
}
}'
```

**Output**

```json
{
    "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "date_created": "2024-06-10T22:25:37Z",
    "date_updated": "2024-06-10T22:25:37Z",
    "friendly_name": "dynamicproducts",
    "language": "en",
    "links": {
        "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",
        "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"
    },
    "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "types": {
        "twilio/catalog": {
            "body": "{{2}}",
            "dynamic_items": "{{products}}",
            "id": "1017234312776586",
            "items": null,
            "subtitle": "{{3}}",
            "thumbnail_item_id": null,
            "title": "The Menu: {{1}}"
        }
    },
    "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "variables": {
        "1": "Hi, check out this menu menu_name",
        "2": "footer text"
    }
}
```

## Sending your message template

You can approve your product messages as WhatsApp templates to initiate a session. The approval process is the same as all other templates.

You can prefix items by specifying product IDs at the time of creation. If you choose to send dynamic items, you will need the item's SKU ID, known in your WABA as the Content ID. You do not need to set this product ID at the time of template creation, but you will need it at the time of sending.

content api - message preview.

*Expand image*

### Send message using dynamic catalog template

The following code sample sends a Product Message with the dynamically set items defined above.

**bash**

```bash
CONTENTVARIABLES=$(cat << EOF
{
"1": "not veggies", 
"2": "Here we have some amazing and delicious fruits", 
"3": "Vitamin C",
"products": "[{\"id\": \"r1cjin3eff\", \"section_title\": \"Fruits\"},{\"id\": \"d6swgbljv8\", \"section_title\": \"Fruits\"}]"
}
EOF
)

curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "ContentSid=HXXXXXXXXX" \
--data-urlencode "From=MGXXXXXXXX" \
--data-urlencode "ContentVariables=$CONTENTVARIABLES" \
--data-urlencode "To=whatsapp:+15551234567" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Receiving webhooks

### Response 1: Ask for more information about a product

| Component | Description |
|---|---|
| Messagetype | When customers ask a question Messagetype will be set to "text". |
| Body | The question and/or comments raised by the customer. |
| ProductRetailerId | Information about the product being mentioned by the customer. You can see a product's unique identifier as well as their catalog ID. |

### Response 2: Add products to a shopping cart and place an order

| Component | Description |
|---|---|
| Messagetype | When customers ask a question Messagetype will be set to "order". |
| Body | The question and/or comments raised by the customer. |
| ProductRetailerId | Information about the products added to the customer's shopping cart. The order object contains the catalog ID and an array called product_item, inside which you can find the list of products added to cart. Ex: `{"catalog_id" : "xxx", "text" : "", "product_items" : [ { "product_retailer_id" : "id1", "quantity" : x, "item_price" : y, "currency" : "USD" }, { "product_retailer_id" : "id2", "quantity" : a, "item_price" : b, "currency" : "USD" } ] }` |