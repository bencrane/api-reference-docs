# Organizations

A Twilio Organization is a container that helps you manage all of your company's Twilio accounts. Organizations reduce operational risk by centralizing management for the following items:

- Your Twilio accounts
- Your Twilio users
- Security policies that govern Twilio user access

## How organizations fit into Twilio

When you first sign up with Twilio, we create the following unique resources for you:

- A user, which represents the developer.
- An account, which contains the application you build and resources such as phone numbers. The account also stores billing information, allowing each application to have its own billing method.
- Your first Organization, which groups together your user and account.

Every account has one specific user who is its owner, but there's no limit to the number of users that you can invite to access the account. You can even invite users who have accounts of their own.

This model lets anyone visit Twilio, sign up, create an account, and start building straight away. As your business grows, you can create new accounts—new applications—and invite additional users to access them.

However, as your company scales, you need a more structured approach to user and account management than the basic account model can provide. This is where Organizations can help. Organizations allow you to consolidate all of your accounts and manage them centrally.

All of your accounts, regardless of which employee created them, can roll up into one Organization. Your designated Organization Admins can then perform appropriate management actions, such as adding and removing users, assigning users to accounts, and updating account settings.

If you have personnel changes, the Organization lets you transfer administrative responsibilities to different members of your team.

## Organization ownership

When you create an Organization, you become the Organization Owner. All of the accounts that you currently own become part of the Organization too. Your users will continue to have permission to access their accounts, which you can now review and manage.

## Organization roles

You can assign Organization Roles to users when you invite them into the Organization. These roles govern what actions a user can perform within your Organization. You can set and change these roles in a user's detail page, accessed from the Twilio Admin's Users area.

> **Info:** Organization roles are different from account roles, which are roles you can assign to users within a given account. To learn more, see Managed Accounts.

You can assign the following Organization roles:

- **Owner:** This role is automatically assigned to the person who created the Organization, and gives them full control of the Organization. There can be only one Organization Owner at a time. Only the Organization Owner can delete the Organization.
- **Administrator:** A managed user in the Organization who has permission to manage it. For example, they can invite and remove users, add existing accounts, create new accounts, modify accounts, and change Organization settings. However, they can't delete the Organization.
- **Standard User (Account Creation):** A managed user who doesn't have permission to manage your Organization in any capacity. This role is the default you would assign to most of the users in your Organization. Standard users have access only to the accounts that you specify.

## Create your Organization

Twilio creates your first Organization by default. To create another Organization, complete the following steps:

1. Log in to the Twilio Console.
2. Select 'Admin' in the upper right corner of the Console's top navigation bar. From the drop-down menu, select Create Organization.
3. On the Create Your Organization page, enter a name for your Organization. Usually, this is your company's name, but you can enter anything you like. You can change the Organization's name later by going to the Twilio Admin's Settings section.
4. Click the Create Organization button. Twilio creates a container that holds all your company's accounts and users.

> **Warning:** You must be the Owner of an account with a verified phone number to create an Organization. To add a verified phone number, see How to Add and Remove a Verified Phone Number or Caller ID with Twilio.

## Manage accounts

The Twilio Admin's Accounts section provides you with lists of all your managed accounts, independent accounts, and pending accounts. You can also add existing accounts to your Organization and create new accounts within your Organization from the Accounts section.

An Organization can include the following types of accounts:

- **Managed accounts** are part of your Organization. Organization Admins can change the settings and lifecycle of all managed accounts.
- **Independent accounts** aren't managed by your Organization, but are accounts that your managed users have access to.
- **Pending accounts** are the accounts that an Organization Admin has invited to become part of your Organization, but the account owner hasn't yet accepted your invitation.

> **Info:** To find out more about working with managed accounts, see Managed Accounts.

## Manage users

The Twilio Admin's Users section is where you can view lists of all your managed users, independent users, and pending users. You can also invite users to be part of your Organization from the Users section.

The following types of users can work with an Organization:

- **Managed users** are part of your Organization. Organization Admins can control their settings and access.
- **Independent users** aren't part of your Organization, but they have access to one or more of your managed accounts.
- **Pending users** are users that an Organization Admin has explicitly invited to join your Organization, but the users haven't yet accepted your invitation.

> **Info:** To find out more about working with managed users, see Managed Users page.

## Update your Organization

### Settings

You can update your Organization name in the Twilio Admin's Settings section.

The Domain Settings selection determines how Twilio processes new users from your registered domain(s) when the users attempt to create Twilio accounts. You can set domain settings to perform any of the following actions:

- Prevent users from signing up with email addresses from your domain, unless they have been explicitly invited to do so by the Organization. In this case, users must request an invitation or sign up using an alternative email address if they're setting up an entirely separate user entity.
- Users that sign up with email addresses from your domain automatically join this Organization, and Twilio grants the users permission to create accounts within the Organization. This allows your employees to get working as quickly as possible.
- Users that sign up with email addresses from your domain can't join this Organization. Use this to tightly restrict access to your Organization and its accounts.

These settings apply to any or all of the domains you have verified. To learn more, see Domains.

### Billing

Billing is independent of the Organization. New accounts created in the Organization operate in trial mode until you upgrade the account or add the account to your invoice. New accounts don't inherit custom pricing models.

### Privacy

Organizations introduce a new Personally Identifiable Information (PII) element: the Organization's friendly name. Twilio retains his name for up to 30 days after you delete an Organization (PII MTL: 30 DAYS).

## Turn on HIPAA and eligible Accounts

For customers subject to the Health Insurance Portability and Accountability Act (HIPAA), Twilio will execute a Business Associate Addendum (BAA) to Twilio's Terms of Service. To obtain a BAA, please contact your Twilio Account Representative.

If your Organization has a BAA with Twilio for usage subject to HIPAA, you can manage HIPAA Accounts through the Twilio Admin.

To check if your Organization has HIPAA Entitlement turned on, verify that the HIPAA Entitlement: On property exists for that Organization on the Twilio Admin.

To turn on or turn off HIPAA for the accounts of your Organization, follow these steps:

1. Log in to the Console and navigate to Twilio Admin > Accounts.
2. Click the name of the account you want to manage.
3. In the HIPAA enablement section, select Enable HIPAA for this account or Disable HIPAA for this account.
4. Click Save.

> **Info:** You must repeat the steps to turn on HIPAA for all existing Subaccounts to designate them as HIPAA. Once you designate an Account as HIPAA, any future Subaccounts created in that Account are also automatically designated as HIPAA Subaccounts.
>
> Any new Accounts that you create don't automatically become designated as HIPAA eligible. It's the Customer's responsibility to ensure that all Accounts and Subaccounts requiring HIPAA are designated as such through the Twilio Admin or Console.
>
> To learn more about how to build a HIPAA-compliant workflow using Twilio's offerings, see Architecting for HIPAA on Twilio.

## Delete an Organization

You can't delete your Organization from the Console. If you need to delete your Organization, contact the Twilio support team.

## Change the Organization's Owner

> **Note:** Only the current Organization Owner can complete this update.

1. Ensure the new owner is a user listed within the Organization. If they're not a user in the Organization, you must add them as a user first. To learn how to add a new user, see the Manage users.
2. Go to the Users section within the Twilio Admin and select the name of the Organization's Owner. The Organization Owner displays with the role Owner under the Organization Roles column.
3. On the Owner's profile page, click on Change Ownership in the Organization Role section.
4. Under the Change Organization Ownership panel, type the new owner's email into the Choose a new owner field, select their user, and click Change Owner.

## Merge Organizations

This feature allows you to merge two Organizations. The Organization that initiates the merge (Prime Organization) absorbs the other Organization (Candidate Organization). The Owner of the Candidate Organization must use an email address from the same verified domain as the Prime Organization.

After a successful merge, you can expect the following:

- The Candidate Organization no longer exists independently.
- Twilio adds Candidate Organization Managed Accounts and Users to the Prime Organization.
- There is no impact on Candidate Organization Accounts billing, compliance, or Twilio product functionality.
- Candidate Organization Users retain the same Account-level roles and access. They don't automatically get access to Accounts in the Prime Organization.
- If the Prime Organization has SSO turned on at its verified domain level, SSO is enforced for Candidate Organization Users.

You can merge Organizations either by using an invitation or by using import. You must meet the following prerequisites before you can merge with either method.

### Prerequisites

Before you begin merging Organizations, ensure the following:

- The Prime Organization has one or more verified domains.
- The Candidate Organization doesn't have any verified domains.
- The Candidate Organization Owner's email address belongs to one of the Prime Organization's verified domains.

### Merge by using an invitation

To merge Organizations by using an invitation, follow these steps:

1. Navigate to the Twilio Admin's Users section.
2. The Prime Organization Owner or Admin selects the Invite User button and sends an invitation to the Candidate Organization Owner to join the Prime Organization.
3. The Prime Organization Owner or Admin can choose if the Candidate Organization Owner becomes an Admin or Standard User in the Prime Organization. Candidate Organization Admins become Standard Users by default. The Prime Organization Owner or Admin can update user roles after the merge.
4. The Candidate Organization Owner displays as a Pending User in the Prime Organization until the Candidate Organization Owner accepts the invitation or the invitation expires.
5. Candidate Organization Owner receives the invitation. The invitation informs the Candidate Organization Owner that if they accept, their Organization will merge into the Prime Organization.
6. Candidate Organization Owner accepts the invitation.
7. The Candidate Organization merges into the Prime Organization.

### Merge by using import

To merge Organizations by using import, follow these steps:

1. Request access to the Import Users feature for the Prime Organization by contacting Twilio support.
2. Navigate to the Twilio Admin's Import Users section.
3. Prime Organization Owner or Admin imports the Owner of the Candidate Organization with the Import Users feature.
4. The Owner of the Candidate Organization can't opt out of the merge.
5. If the Prime Organization chose to notify the User of the Import process, the Candidate Organization Owner receives a notification after the import and merge complete.
6. The Candidate Organization merges into the Prime Organization.
7. The Candidate Organization Owner and Admins become Standard Users in the Prime Organization. The Prime Organization Owner or Admin can update user roles after the merge.