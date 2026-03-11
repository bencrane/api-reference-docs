# API Keys

## API Key Management API 1.0.4

API Keys are an alternative way to authenticate with Socrata APIs.

### Sidebar Navigation (from documentation site)

- **API Key Management API**
  - Using API Keys
  - Managing API Keys
  - Changelog
    - 1.0.4
    - 1.0.3
    - 1.0.2
    - 1.0.1
    - 1.0.0
- **OPERATIONS**
  - **ApiKeys**
    - List API Keys
    - Create an API Key
    - View an API Key
    - Delete an API Key
- **COMPONENTS**
  - **Parameters**
    - keyId
  - **Schemas**
    - ApiKey
    - ErrorInvalidPageSize
    - ErrorInvalidSortColumn
    - ErrorResponse
    - ErrorResponseDeleted
    - ErrorResponseInsufficientRights
    - ErrorResponseInvalidSecret
    - ErrorResponseMissingField
    - ErrorResponseNameTaken
    - ErrorResponseNameTooLong
    - ErrorResponseNotFound
    - ErrorResponseTokenLimitReached
    - KeyOwner

---

## Using API Keys

API Keys have two main components:

- `keyId`
- `keySecret`

After creating an API key, it can be used with Basic authorization. This is done by using the `keyId` as the username and the `keySecret` as the password.

For example, a header using an API key may look like:

```
Authorization: Basic {keyId}:{keySecret}
```

---

## Managing API Keys

API keys can be managed on the Socrata platform by logging in to any Socrata site and navigating to `/profile/edit/developer_settings` (or, from your profile page, click "Edit Profile" and then "Developer Settings" in the sidebar).

API keys will keep track of when they were last used with the `lastUsedAtTimestamp`. This value will update once a day. This means that if a key is used at 9am on Monday, its `lastUsedAtTimestamp` value will update again when it is used any time after 9am on Tuesday.

To disable an API key, you can delete it using the "Delete an API Key" operation. You will still be able to see the key if you provide the `includeDeleted` parameter in the "List API Keys" call, but it cannot be used.

> **Note:** API Keys are not scoped to a specific Socrata domain. An API Key that you create for your user will work on any Socrata domain.

---

## Changelog

### 1.0.4

Documentation updates.

### 1.0.3

Renamed time-related fields in `ApiKey` schema:

- `createdAt` ➡ `createdAtTimestamp`
- `lastUsedAt` ➡ `lastUsedAtTimestamp`
- `deletedAt` ➡ `deletedAtTimeStamp`

There were duplicate keys for these in the JSON response; one would come back in seconds since epoch, and one would come back as an ISO 8601 timestamp.

> **Note:** The old field names are still returned in the response, but will be in seconds since epoch. The `*Timestamp` fields are preferred and as such are the ones documented here.

### 1.0.2

Remove support for ES6 in `typescript-fetch` clients. This was breaking in Internet Explorer 11.

### 1.0.1

Updates to parameter names and key deletion return type.

### 1.0.0

Initial specification.