# Get Started - Best Practices for Phone Number Use

## Overview

Global telecommunications regulations vary from country to country and are always changing. Twilio builds software, like Messaging Service Features and Message Queues, to help with the complexity. It lets you send calls and texts without being a telecoms expert. But, if you keep inactive phone numbers Twilio may reclaim them to follow regulations.

This guide will walk you through best practices for active phone number traffic. This way you'll know when to keep a number, and when to release it. You'll also learn what you can do to stop your numbers from getting reclaimed due to lack of use.

**Contents:**
- What's a reclaimed number?
- What counts as active use on a phone number?
- Active Phone Number Best Practices
  - Upgrade your account
  - Buy numbers you will use
  - Know which of your numbers are active
  - Release numbers you don't use
  - Rotate messages across a pool of numbers using Messaging Services
  - Reclaim numbers from your customers
  - Re-use numbers when possible
  - Send traffic on inactive numbers

## What's a reclaimed number?

On occasion, Twilio will take back inactive phone numbers to comply with local telecom regulations. If you want to hang on to certain numbers, the steps in the guide will help you keep them in active use.

You can find more details on when Twilio reclaims phone numbers in our Terms of Service.

## What counts as active use on a phone number?

There aren't hard and fast rules that work the same way everywhere in the world. But, we can offer some general definitions that cover most use cases.

For the most part, an active number:

- Made or received at least 3 phone calls with a duration of 12 seconds or longer and a "completed" status in the last month.

**OR**

- Sent or received 3 text messages in the last month.

## Active Phone Number Best Practices

### Upgrade your account

We reclaim phone numbers in trial and suspended accounts before phone numbers that belong to paid accounts. By upgrading your account and keeping it in good standing, you'll be less likely to have your number(s) reclaimed.

### Buy numbers you will use

When estimating how many numbers you need, be sure to buy numbers that you can use in the short term. Keep your inventory close to the amount of numbers that you plan to activate within the next month or two.

There's usually not a need for you to carry a large inventory of phone numbers. You can always get more numbers when you need them with the available numbers API. Each phone number you buy has a recurring monthly cost. So, you'll save money by keeping your inventory small.

### Know which of your numbers are active

You can use the `/Messages` and `/Calls` API to see the activity on each of your numbers. Check your numbers once a month to see if you have inactive numbers.

### Release numbers you don't use

Releasing a number removes it from your account. When you check your usage each month, release inactive numbers. You can do so by using the Console or via API. There's no charge to release a number and you can restore it within 10 days if you change your mind.

### Rotate messages across a pool of numbers using Messaging Services

A Twilio Messaging Service allows you to "pool" multiple numbers together. When you send SMS from that service, the Messaging Service uses each number from the pool in turn. Each number gets even use. You can keep your numbers active without the need to build your own application logic.

### Reclaim numbers from your customers

If your customers get phone numbers from you, consider taking back unused numbers. You can then give those numbers to other customers or release them back to Twilio. This is easier to do if you use subaccounts for multitenancy.

### Re-use numbers when possible

If you cycle through numbers in short succession, it's best to re-use numbers in your own inventory. Fraud accounts will release numbers and buy new ones right away over and over again. When we see this pattern, we may suspend the account, in accordance with your agreement with Twilio, to investigate potential fraud. To keep your account active, re-use numbers when possible.

### Send traffic on inactive numbers

If you'd like to keep your numbers instead of releasing them, you can run a script to keep them active. Send a few text messages or phone calls each month to keep your numbers active. This will help to ensure they don't get reclaimed.