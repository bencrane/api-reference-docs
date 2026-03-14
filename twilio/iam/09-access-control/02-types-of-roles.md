# Types of Roles

There are 3 types of roles: General roles, Built-in roles and Organization roles.

---

## General roles

General roles aren't product-specific and apply only to the account scope. Learn more about general account roles.

---

## Built-in roles

Built-in roles represent known access patterns for a Twilio product and are offered out-of-the-box as part of the Twilio platform.

Built-in roles can be assigned at organization, account, and subaccount scopes.

- **Organization scope roles** can access all of the accounts and subaccounts of the organization.
- **Account scope roles** can access all the subaccounts of the account.
- **Subaccount scope roles** can access only that subaccount.

The following table lists all the built-in roles.

| Product Group | Built-in Role name | Description |
|---------------|-------------------|-------------|
| Studio | Studio Viewer | Ability to view any Flow, export Flow definitions, and see Execution logs. This role provides access to Studio pages for Console users. |
| Studio | Studio Admin | Full access to create, read, update and delete Flows and view Execution logs. This role provides access to Studio pages for Console users. |
| Phone numbers | Numbers Configuration Editor | Provides access to configure pre-purchased numbers for using Voice & Messaging features. This role does not allow access to buy a number or create new regulatory bundles. |
| Phone numbers | Numbers Configuration Viewer | Provides read only access to view numbers configurations for Voice & Messaging features. This role does not allow access to configure numbers, buy a number, or create new regulatory bundles. |
| Phone numbers | Numbers Inventory Manager | Provides access to buy a number and repurchase released numbers. This role does not allow access to configure numbers and create new regulatory bundles. |
| Messaging | Messaging Services Configurator | Provides permissions to view and configure Messaging Services and regulatory compliance details for messaging. |
| Messaging | Messaging Services Viewer | Provides permissions to view Messaging Services and regulatory compliance details for messaging. This role does not allow users to configure existing messaging services. |
| Messaging | Messaging Settings Admin | Provides admin permissions for Messaging Settings. Users can update general settings, create message log archives, and update geo permissions. |
| Messaging | Messaging Settings Viewer | Provides read-only permissions for Messaging Settings. Users can view general settings, message log archives, and geo permissions. |
| Messaging | WhatsApp Senders Admin | Provides admin permissions for WhatsApp Senders. Users can view, create, update or delete WhatsApp Senders for messaging. |
| Messaging | WhatsApp Senders Viewer | Provides read-only permissions for WhatsApp Senders. |
| Messaging | Content Template Builder Admin | Provides admin permissions for Content Template Builder. Users can view, create, update, or delete Content Templates for messaging. |
| Messaging | Content Template Builder Viewer | Provides read-only permissions for Content Template Builder. |
| Messaging | RCS Senders Admin | Provides admin permissions for RCS Senders. Users can view, create, update, or delete an RCS Sender. |
| Messaging | RCS Senders Viewer | Provides read-only permissions for RCS Senders. Users can view existing RCS Senders. |
| Messaging | Facebook Messenger Senders Admin | Provides admin permissions for Facebook Messenger. Users can view, create, update, or delete a Facebook Messenger Sender. |
| Messaging | Facebook Messenger Senders Viewer | Provides read-only permissions for Facebook Messenger. Users can view existing Facebook Messenger Senders. |
| Messaging | Messaging Logs Admin | Provides admin permissions for messaging logs. Users will be able to view PII from message logs. |
| Messaging | Messaging Logs PII Viewer | Provides read-only permissions for messaging logs. Users will be able to view PII from message logs. |
| Messaging | Messaging Logs Viewer | Provides read-only permissions for messaging logs. Users will not be able to view PII from message logs. |
| Messaging | Messaging Insights & Intelligence Admin | Provides admin permissions for messaging insights & intelligence. Users will be able to view and download insights & intelligence as well as manage notifications. |
| Messaging | Messaging Insights & Intelligence Viewer | Provides read-only permissions for messaging insights & intelligence. Users will be able to view insights & intelligence. |
| Voice | Voice Intelligence Admin | Provides permissions to view, modify, and configure Voice Intelligence transcripts and services. |
| Voice | Voice Intelligence Viewer | Provides permissions to view Voice Intelligence transcripts and services. |
| IAM | Account API Access Admin | Provides access to view, create and delete API keys, Auth tokens, OAuth apps, Credentials and Connect apps within an account or subaccount. |
| IAM | Account API Access Viewer | Provides access to view API keys, Auth tokens, OAuth apps, Credentials and Connect apps within an account or subaccount. |
| Help Center | Twilio Help Center - Account Level Ticket History | Provides users with visibility to all support tickets generated within the help center by authorized account users, this includes sub-accounts which roll up to the parent account. This role also allows for users to be added as 'contributors' to support tickets, they will be able to comment, add cc's, add attachments and resolve tickets. |

---

## Organization Roles

There are three Organization roles: Organization Owner, Organization Admin and Organization standard user. Organization Owner and Organization Admin roles give access to the Twilio Admin which is used to manage Organization level operations and settings. Learn more about Organization roles.