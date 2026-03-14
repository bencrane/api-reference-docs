# Managed Users

> **Info:** The Admin Center has been renamed to Twilio Admin.

Individuals whose logins are owned and overseen by an Organization are called Managed Users. The Organization has full control over the lifecycle and settings of its managed users. When we refer to 'users', we're referring to those individuals' records in the system.

## How can managed users help you

Adding users to your Organization, thereby making them managed users, means that you can supervise them centrally. They can be managed by an Organization Owner or Administrator, who will have full control over the user's lifecycle and can delete users, change their name, assign them to accounts, reset their passwords — forcing them to create a new one — or require that they use two-factor authentication when signing in.

To create a managed user, an Organization Owner or Organization Administrator can navigate to the Users section in the Twilio Admin, click the Invite User button, and enter the user's email address.

If there's no user associated with the email address, Twilio will create a new user in the system. By default, this is a managed user.

If the invited user does exist in the system, Twilio will send an invitation to the user. Once they have accepted the invitation, the user will join the Organization as a managed user.

## Managed users and independent users

Managed users belong to an Organization. An independent user exists outside of an Organization but has access to one or more of the Organization's managed accounts. For example, you might want to add a contractor so that they can access the account they have been hired to build. Rather than add independent users to your Organization as you would manage users, you instead add them to the specific account(s) you want them to access.

All your Organization's independent users are listed in the Twilio Admin's Users section, under the Independent Users tab.

> **Info:** To learn more about how Organizations wrangle accounts, and the different types of accounts available, please see Managed Accounts.

## Pending users

Users who have been invited to join an Organization but have yet to respond are called Pending Users. They are listed under the tab of the same name in the Twilio Admin's Users section. You can choose to prompt folks taking too long to confirm their acceptance of your invitation by resending the invite.

## Create a new user

You can invite a participant into your Organization by visiting the Twilio Admin's Users section.

To invite a user, you must first have verified the domain that owns the user's email address. You can do that in the Twilio Admin's Domains section. If they are not part of your company — i.e., their email address is not in a domain you own — then you invite them in a different way.

> **Info:** To learn more about how an Organization connects to its company's Internet domain, please see the Domains page.

1. Log in to the Console and navigate to Twilio Admin > Users.
2. Click the Invite User button.
3. In the Invite User to Organization panel that now appears, enter the user's email address.
4. Choose their user role:
   - **Administrator** — This grants them permission to manage your Organization and its users and accounts.
   - **Standard User (Account Creation)** — This limits their access to the role they have been assigned for each of the accounts they have access to, if any. They can create new accounts in the Organization but have no other management access: for example, they won't be able to access the Twilio Admin.
5. Click the Invite User button.

> **Info:** When you invite a user to the Organization with an Admin user role, the user will be able to add themselves or invite any other user to any account managed by the Organization with any role.
>
> When you add a user to the Organization with a standard user role, the user will only have access to the accounts they already have access to. To grant access to other accounts for a standard user, you must invite the user to the account from the accounts screen.

After a user has been sent their invitation, they will appear under the Pending Users tab.

## Import users

You can bulk import existing Twilio users belonging to your verified domain into your Organization by visiting the Admin Center's Users section.

> **Warning:** This feature is currently not enabled for all organizations. If you don't see this feature for your organization, you can request access by contacting Twilio support.

To import users, you must first have verified one or more domains. You can do that in the Admin Center's Domains section.

1. Log in to the Console and navigate to Twilio Admin / Admin Center > Import Users. If you have a verified domain, you may see a banner with a message that you have users eligible to import.
2. Click the Import User button and carefully read the instructions on how user import works.
3. Click Continue. You are then shown a new page with three options.
   - **Yes, I want to review a list of existing users using my domain** — This is the default option and you should use this option in most cases. With this option you are able to select one or more domains, review and select the users who can be imported to your Organization.
   - **I have already reviewed the CSV list of existing users using my domain and want to continue with the import** — This option should be used if you previously downloaded the list of users from your domain and want to import them now.
   - **No, I don't want to review. Import all existing users using my domain(s)** — With this option you are not able to review and select the users. If selected, all eligible users from the verified domains in your Organization are imported.
4. If you selected the option to review the list of users before importing, then you need to select from the verified domain(s) in your Organization. You can remove the pre-selected domains if you want to but you have to select at least one domain.
5. Click the Download CSV of all users button to download a CSV file containing the list of users who are eligible for import into your Organization.
6. Review the list of users and remove any users from the file who you don't want to import. Make sure that you save the file after making any changes. Note that the import only works for the users in this downloaded list. If you add any other users to the file, the import will not work.
7. When you are done making changes and you're ready to import, click Next. Select and upload the CSV file from the previous step. Note that only CSV files with the same format as the downloaded file are accepted.
8. Select whether you want Twilio to notify the users being imported via email or not.
9. Click Next to see a review of your selections thus far. Review the selected domains, count of users, and the notification option you have selected for the import.
10. Click the Start importing users and accounts button.

You are redirected to the Import Users. The status of the import process is displayed. You can revisit this page any time in future and see the import summary along with status and other details.

## Invite a user to an account

1. Log in to the Console and navigate to Twilio Admin > Accounts.
2. Click on the name of the account you are managing.
3. Click on the Users tab.
4. Click the Invite User button.
5. In the Invite User to Account panel that now appears, enter their email address.
6. Choose their account role:
   - **Administrator** — They will be able to manage the account, including adding further users.
   - **Billing Manager** — They can only access Console pages related to account billing.
   - **Developer** — They have access to the account's development resources — they can add phone numbers and API credentials, for instance — but have no management control over it.
   - **Support** — They can only access the logs and usage.
7. Click Submit.

If the user is already part of your Organization, they will be given access to the selected account according to the role you chose. If they are not yet part of your Organization, they will be sent an email invitation — just like creating the user from scratch, as outlined above.

> **Info:** Account roles are not exclusive. For example, a user can be assigned both the Developer and Billing Manager roles. Because the Administrator role has the same permissions as both of these roles, if you tick the Administrator box, the others will be de-selected. You find out more about account roles in this support document.

## Remove a user from the Organization

This action will remove a user's access to your Organization and all managed accounts while leaving their user active. They can continue to log into Twilio and access accounts not managed by your Organization, but can be invited to the Organization and/or other managed accounts in the future.

1. Log in to the Console and navigate to Twilio Admin > Users.
2. Click on the name of the user you are managing.
3. Click on the Remove user option at the bottom of the page.
4. Check "I have reviewed and acknowledge the points above" to acknowledge:
   - This user will be removed from the Organization.
   - This user will lose access to all managed accounts.
   - The user will lose access to any role granted by the Organization.
   - Access to managed accounts can still be granted in the future.
   - The Organization will no longer be able to control the lifecycle or setting of the user.
5. Choose the owner of the account(s).
6. Click on the Remove User button.

You can select the same user as the owner of the accounts but the Organization will no longer be able to control the lifecycle or setting of the account(s). If you want to keep the account under the Organization's control, select a new user who is a managed user of the Organization.

## Delete a user

This action will immediately delete and remove the user from Twilio's system, but not the accounts they own or have access to. They can create a new user for that email again in the future, but will not have access to the accounts they were previously invited to.

1. Log in to the Console and navigate to Twilio Admin > Users.
2. Click on the name of the user you are managing.
3. Click on the Delete User option at the bottom of the page.
4. Review and check off all acknowledgements on the Delete User pop-up screen.
5. Choose the owner of the account(s).
6. Click on the Delete User button.

## Remove a user from Independent Account

1. Log in to the Console and navigate to Twilio Admin > Accounts > Independent Accounts.
2. Click on the name of the independent account.
3. Click on Users tab.
4. Click Remove under the Actions column on the user you would like to remove.

The user will be permanently removed from the account. This action can not be reversed.

## View a user's details

The list of users shown by the Twilio Admin's Users section allows you to manage users individually: just select one and click on their name.

In the General tab, you can view and update the user's settings: their name, their Organization role, and whether they must sign in using two-factor authentication.

The Accounts tab lists all the accounts the user has access to. You can select an account role from the popup list — click on Filter when you're ready to update the list — to view the accounts, if any, to which the user has the selected level of access.