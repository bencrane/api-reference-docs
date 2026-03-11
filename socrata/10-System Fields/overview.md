# System Fields

In addition to the fields provided by the dataset owner, Socrata also provides a number of useful system fields you can make use of. They're very useful for detecting when datasets have changed.

| Field | Description |
|---|---|
| `:id` | The internal Socrata identifier for this record. |
| `:created_at` | A Fixed Timestamp representing when this record was created. |
| `:updated_at` | A Fixed Timestamp representing when this record was last updated. |

System fields are not included by default, and the method that you use to request the inclusion of the hidden system fields depends on what version of the SODA API specification the API you are accessing complies with. To learn more about API versioning, see the API Endpoint documentation.

---

## Version 2.1

With version 2.1 APIs, accessing the system fields is as simple as including them in your `$select` parameter, either explicitly or via a wildcard. You can either use `$select=:id, :updated_at, name, address`, or you could be even more broad and simply select `:*, *` to retrieve both all of the hidden internal fields and the fields from the dataset itself.

Since `:created_at` and `:updated_at` are Fixed Timestamp, you can query them to get recent updates to a dataset using the `$where` query parameter.

### A Note on How Datasets Are Updated

Data providers use many different methods to update datasets. In some cases, they use tools like DataSync or the SODA Producer API to update datasets, and we can tell which records within the dataset have actually been modified, and only update them accordingly. When data providers perform a full replace of the dataset using the SODA Producer Replace API, all of its records will be updated within a short period of time, in which case a query based on `:updated_at` will show that all of the records have changed.

---

## Version 2.0

Getting the SODA API to return system fields is as simple as adding the parameter `$$exclude_system_fields=false` to your request. The double dollar sign (`$$`) is significant — it denotes a Socrata-specific parameter that is not part of the SODA standard.