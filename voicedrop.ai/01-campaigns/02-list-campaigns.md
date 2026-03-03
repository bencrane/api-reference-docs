# VoiceDrop.ai - Campaigns - List Campaigns

## GET — List Campaigns

```
GET https://api.voicedrop.ai/v1/campaigns
```

---

## Authorization

**API Key** — uses API Key from collection: VoiceDrop API Reference

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/campaigns'
```

---

## Example Response — 200 OK

```json
[
  {
    "Name": "Property Offer",
    "_id": "1714926234800x968329891393830900",
    "Campaign Status": "Active",
    "Voice Clone IDs": [
      "w7WnkA91ghyzM3S97XXX"
    ],
    "Hourly Max Sending Rate": 250,
    "From Phone Numbers": [
      "7865555555"
    ],
    "Scheduled Days": [
      "Monday",
      "Tuesday"
    ],
    "Script": "Hey {{First Name}}, my name is Jhon, I'm looking to offer you {{Cash Offer}} for your property in {{Address}}",
    "Type of Campaign": "AI Voice RVM",
    "Sending Until": "4:00 PM",
    "Sending From": "10:00 AM",
    "Schedule Timezone": "CST (Chicago)"
  },
  {
    "Name": "Draft Campaign",
    "_id": "1715698889443x790524729652150300",
    "Campaign Status": "Deleted",
    "Voice Clone IDs": [
      "w7WnkA91ghyzM3S97XXX"
    ],
    "Hourly Max Sending Rate": 250,
    "From Phone Numbers": [
      "7865555555"
    ],
    "Scheduled Days": [
      "Monday",
      "Tuesday",
      "Wednesday"
    ],
    "Script": "testing this ringless voicemail with my voice, let me know how it sounds",
    "Type of Campaign": "AI Voice RVM",
    "Sending Until": "4:00 PM",
    "Sending From": "10:00 AM",
    "Schedule Timezone": "CST (Chicago)"
  },
  {
    "Name": "Test",
    "_id": "1718995780477x599819301962383400",
    "Campaign Status": "Archived",
    "Voice Clone IDs": [
      "w7WnkA91ghyzM3S97XXX"
    ],
    "Hourly Max Sending Rate": 12,
    "From Phone Numbers": [
      "7865555555"
    ],
    "Scheduled Days": [
      "Monday",
      "Tuesday",
      "Wednesday"
    ],
    "Script": "Testing this RVM with my voice, let me know how it sounds",
    "Type of Campaign": "AI Voice RVM",
    "Sending Until": "4:00 PM",
    "Sending From": "10:00 AM",
    "Schedule Timezone": "CST (Chicago)"
  },
  {
    "Name": "My first campaign",
    "_id": "1720463947563x709679076883824600",
    "Campaign Status": "Paused",
    "Voice Clone IDs": [
      "w7WnkA91ghyzM3S97XXX"
    ],
    "Hourly Max Sending Rate": 50,
    "From Phone Numbers": [
      "7865555555"
    ],
    "Scheduled Days": [
      "Saturday",
      "Sunday",
      "Friday",
      "Monday"
    ],
    "Script": "Hi {{first_name}}, my name is Jhon. Could you please ... call me back at this {{senderPhoneNumber}}?",
    "Type of Campaign": "AI Voice RVM",
    "Sending Until": "7:00 PM",
    "Sending From": "8:00 AM",
    "Schedule Timezone": "EST (New York)"
  }
]
```