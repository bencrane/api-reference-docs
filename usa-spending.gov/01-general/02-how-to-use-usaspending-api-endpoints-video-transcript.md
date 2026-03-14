# How to Use USAspending API Endpoints Video Transcript

# TUTORIAL: How to Use USAspending API Endpoints

## Introduction

**[00:00:05]**

Hello and welcome to this USAspending API webinar video. This video will show you how to access the API endpoints powering the web page through the inspect feature.

The video will be broken into three parts:
1. First, we'll discuss what an API is
2. Then we'll go over a GET request example
3. And finally a POST request example

Let's get started.

---

## When to Use the API

**[00:00:46]**

The USAspending API powers all functionality on the website. Anything you can do on the site, you can do in the API. The API has some functionality not available on the site.

For example, you can search for new awards with the API, but not on the site.

For many simple and one-off tasks, it's often easier to use the website, but you may want to consider using the USAspending API if:

- You need functionality which is only available through the API
- You need to automate a report that you'll need to run periodically
- You want to automate a repetitive task which would otherwise require manual work on the website
- You want to build a workflow that allows you to do more of your tasks in tools like Excel

---

## What is an API?

**[00:01:21]**

A useful analogy when imagining an API is the workflow of a restaurant:

- **The backend** is the kitchen where they transform the raw ingredients (or data) into simple and digestible formats
- **The frontend** designs beautiful ways to present the data to help humans consume it and gain insights from it
- **An API** bridges this gap by providing the data curated by the backend team in a standard format for presentation on the website or other tools

USAspending uses REST API endpoints to transfer formatted data from the server to client browsers.

**[00:01:58]**

A REST API endpoint uses a set of defined rules to share or access this formatted data through an HTTP request.

USAspending endpoints each present different data elements with different levels of aggregation, then enable different sets of filters. For example, the set of endpoints used to power state profile pages are different from the set of endpoints used to power advanced search.

---

## GET vs POST Requests

**[00:02:39]**

GET and POST are two different types of REST API requests. Certain endpoints require you to use either a GET or POST request.

### GET Requests
- Used to get data on a specific record with a known numerical identifier
- On USAspending, they are typically used when little to no filtering is required
- Example: the total dollar amount of obligations for a specific state in the last 12 months

### POST Requests
- Used in USAspending to support more advanced filtering
- Example: a list of all of the awards that were awarded to a specific congressional district in a specific fiscal year

---

## Example 1: GET Request

**[00:03:15]**

Now that we've talked about what an API is, you can dig into how you can use USAspending's API to answer your federal spending questions.

Our first example will use a GET request to find out how much money went to a certain state in the last 12 months.

### Steps:

1. Navigate to your desired state's profile page on USAspending to see the total award amount in a period (for this video, we will look at California State Profile Page)

2. Right-click on the web page to inspect it — an inspect window will pop up on your screen

**[00:03:57]**

3. Click the **Network** tab and refresh the page

4. Make sure you are looking at the paths of the API calls instead of the name or URL:
   - Right-click on the box that says "Name" or "URL"
   - Deselect "Name" and/or "URL"
   - Select "Path"

5. Once you've done this, you will see different API calls powering the page

**[00:04:44]**

> **Helpful Tip:** When looking for a specific call, use the filter box in the upper left-hand corner. Type in `api.usaspending.gov` into this box and it will greatly reduce the amount of API calls you see.

6. For this example, click on the `API V2 recipient state 06` request

7. There are multiple tabs, but focus on the **Headers** tab. Three things to notice:
   - **Request URL** — a combination of the API's URL along with the specific endpoint
   - **Request Method** — indicates this is a GET request
   - **Status Code** — 200 means the endpoint is functioning properly

**[00:05:31]**

8. Copy the request URL and open it in a new tab on your browser

9. Compare the output in this tab to the original website to make sure you have the desired API call

---

## Example 2: POST Request

**[00:06:20]**

This example will focus on POST requests. We'll be looking into how to find how much money a specific congressional district received in a specific fiscal year from the U.S. government.

In this video, we'll be looking at the **8th Congressional District in Florida** and **Fiscal Year 2021**.

We are going to use USAspending's Advanced Search tool to find this API call.

### Steps:

1. Start off similarly to the GET request example:
   - Travel to Advanced Search
   - Input the desired filters
   - Click Search
   - Inspect the web page

**[00:07:03]**

2. Click on the **Network** tab and refresh the web page

3. Your filter search should still be present in the upper left-hand corner (if it isn't, add it again)

4. Once your Network tab is loaded, look back to the Advanced Search screen and:
   - Click on **Map**
   - Select **Recipient Location → Congressional District**
   - Zoom in to your desired location using the map feature
   - Note the number you are interested in

**[00:07:55]**

5. Look back to the inspect window and click on the bottom (most recent) API call
   - It should say: `api/v2/search/spending_by_geography`

6. Look at the **Response** tab:
   - Locate the section that matches the congressional district you are interested in
   - Confirm that the number on the map matches the aggregated amount in the Response tab

We have found the correct API call.

**[00:08:40]**

7. Look at the **Payload** tab:
   - Note that the filters match the filters we applied in Advanced Search

8. Look at the **Headers** tab:
   - Note the Request URL, Request Method, and Status Code

9. Copy the Request URL and paste it into a new tab

10. Once on the page, click on the highlighted link to find the documentation for this endpoint

### Understanding the Documentation

- Compare the documentation for this endpoint to the Payload tab
- Observe which attributes are required
- The `filters` attribute takes an **Advanced Filter Object** — this object is integral to using an API that powers Advanced Search
- The `time_period` filter takes a **Time Period Object**
- The `recipient_location` filter takes a **Location Object**

You can use the Payload tab with the endpoint documentation to write your own API call for your desired software or application.

---

## Conclusion

**[00:09:25]**

Thank you for watching this USAspending Webinar Video.

Visit us at [USAspending.gov](https://usaspending.gov) to see federal spending transparency in action.

As always, you can send us an email at **usaspending.help@fiscal.treasury.gov** to give feedback or ask questions about the data or the website.

We look forward to hearing from you.