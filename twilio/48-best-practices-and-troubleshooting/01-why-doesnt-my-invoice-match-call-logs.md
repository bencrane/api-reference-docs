Why doesn't my invoice match what I pull from the call logs?
You should not necessarily expect responses from the /Calls API to match invoices, there are a number of reasons for this discrepancy.
In order of frequency of occurrence:
* Many API resources, including /Calls, support a `DELETE` method after which they will be removed from logs
* The /Calls API returns calls regardless of call status; only completed calls are billed
* There are ephemeral things like phone numbers which can be present on an account for a period of time and then released
* Rounding behavior for billable items is not represented in the /Calls API; for example by default we round up to the next minute, for a 25 second call duration on the logs the invoice will say 1 minute (or whatever the pricing model rounding behavior stipulates)
* Time zone variance where the /Calls API is not using the same time zone that the invoice uses
* The price from the /Calls API is only for the connectivity portion of the call; things like recordings, premium text-to-speech voices, speech recognition, conference participation, etc. are not included in the price
* The price from the /Calls API does not contain units
For reconciling usage with invoices we provide a __Usage API__. The Usage API is tightly integrated with our billing platform and is able to provide counts and costs for usage even after the underlying resource has been deleted or released. Voice product usage including count is available in multiple categories, so make sure you are familiar with all the features your application uses and that you are requesting results from those categories.