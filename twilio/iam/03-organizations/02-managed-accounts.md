# Managed Accounts

> **Info:** The Admin Center has been renamed to Twilio Admin.

> **Info:** The terms 'Accounts' and 'Projects' are used interchangeably. Twilio Admin and the Organizations API use the term Accounts, and the Console primarily uses Projects. Going forward, Twilio is standardizing on Accounts.

A Managed Account is an account that is owned and overseen by an Organization. The Organization has full control over its managed accounts' lifecycles and their settings.

The Organization encompasses multiple accounts and multiple users, who have access to some or all of those accounts.

## How managed accounts can help you

Managed accounts provide you with a way to bring all of the accounts created by your company's employees into one place. You can see precisely which accounts your Organization and its users are responsible for, who has access to them — whether they are company developers or outside contractors — and manage them centrally.

There are two ways to create a managed account:

- Create a new account in your Organization. By default, this will be a managed account.
- Import an existing account that was created outside of your Organization. Once imported, it becomes a managed account.

Organization Owners and Administrators have full control over the lifecycle of any account that is part of your Organization. For example, they can change the settings or close the account.

Owners and Administrators also can manage account settings, such as choosing which users have access to a given account, and requiring the use of two-factor authentication to sign into the account.

Managed accounts, whether created by the Organization or imported into it, still have an Owner — i.e., a user on the account with the Owner role. That user must be a managed user who is part of the same Organization as the account itself. Managed accounts cannot be owned by an independent user.

> **Info:** Custom account settings or configurations are not inherited on account creation. You may need to contact support to ensure that newly created managed accounts have the correct terms, invoicing, and specific features.

To view a list of an Organization's managed accounts, navigate to the Accounts section of the Twilio Admin and select the Managed Accounts tab.

## Managed accounts and independent accounts

Your Organization's managed accounts belong to your Organization. An Independent account is an account that belongs to an Owner who is not a part of your Organization but has granted access to it to one or more of your Organization's managed users. Note that managed users cannot be the Owners of independent accounts.

To add an independent account to your Organization, you must invite the owner to share it, and they must accept your invitation. You can relinquish access to an independent account at any time.

## Pending accounts

These are accounts that an Organization admin has explicitly added to your Organization, but for which the account owner has not yet confirmed the request. Whether they are managed or independent, they will be listed here until the import process is completed. See Add an existing account to learn how and when the added account's owner is contacted.

## Create a new account

You can create a new account in your Organization by visiting the Twilio Admin's Accounts section.

1. Log in to the Console and navigate to Twilio Admin > Accounts.
2. Click the Create New Account button.
3. On the Create new account screen, name your account and select if the account will be used for Twilio or Flex.
4. On the Review screen, review and confirm the details of your new account.
5. Click the Create new account button.

After you create and set up your new account, it will show up under your Organization's Accounts section under Managed Accounts.

## Add an existing account

You can add an existing account to your Organization from the Accounts section. The owner of the account you want to add must have signed up to Twilio through one of your Organization's verified domains. The account's owner will be emailed, and they will have to confirm the request before the account is added to your Organization.

You will also need the account's SID. A user with access to the account can get that for you from the Console.

1. Log in to the Console and navigate to Twilio Admin > Accounts.
2. Click the Add Existing Account button.
3. Enter the account's SID.
4. Click the Add Account button.

## Add users to accounts

To add users to an account, click on the account in the Accounts section's list and then, on the account's details page, click on the Users tab. Here you'll see a list of users who already have access to the account, if any. You can add users to work on the account by clicking the Invite User button above the list.

You can view sub-groups of users by clicking on the Select account roles popup and clicking the Filter button. To learn more about each of these roles, please see the Managed Users page.

The Pending Users tab will take you to a list of users who have been invited to access the account but have not yet responded to the invitation. You can resend pending account invitations to users here.

## Account settings

To see and update an account's settings, click on the account in the Accounts section. This will open the General tab of the account's details page, where you can update settings or close the account.

## Change Account Owner

> **Note:** Ownership can only be changed for a managed account in your organization. If you have an independent account, you will need to add that account as a managed account to your Organization.

> **Note:** Ownership can only be transferred to another managed user. If your desired user is not yet managed by your Organization, you will need to invite them to your Organization.

To change the owner, go to the Managed Accounts list page and click on the account you want to change. You will see the account details and in the General tab you will be able to change the owner by following the below steps:

1. Select the X in the Account Owner text field to remove the existing value of the Owner's email address.
2. Enter the email address or User SID of the new owner.
3. Select the new owner.
4. Click the Save button.

## Close a managed account

You can close an existing account in your Organization from the Accounts section.

1. Log in to the Console and navigate to Twilio Admin > Accounts.
2. Select the name of the account you are managing.
3. Click on the red Close Account option at the bottom of the page.
4. Review and check off all acknowledgements on the Close Account pop-up screen.
5. Click the Close Account button.