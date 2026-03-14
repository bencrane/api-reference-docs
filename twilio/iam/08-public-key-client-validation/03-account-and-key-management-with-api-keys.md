# Public Key Client Validation - Account and Key Management with API Keys

> **ℹ️ Twilio Editions feature**
> 
> Public Key Client Validation is available to Twilio Enterprise Edition and Twilio Security Edition customers. Learn more about **Editions**.

To manage API Keys and Accounts via the API after enforcing Public Key Client Validation, a Main API Key is required. Once Public Key Client Validation is enforced, requests with Auth Tokens will not be successful anymore and by default, API Keys are not permitted to manage Accounts or Keys.

## Creating Main Keys

The required keys can be **created in the Console** by selecting `Main` as the Key Type.

## Creating a new Subaccount when Public Key Client Validation is enforced

To create a new Subaccount and make a successful API request, the newly created account needs to be primed with its own API Key and Public Key. Only Main API Keys have the permissions to execute the required steps below.

## Setting up a Subaccount via API

1. Create a new Subaccount with the key created above.
2. Seed the new account with an API Key
3. Seed the new account with a Public Key
4. Request with new account credentials

## Sample Code

```java
import com.twilio.rest.accounts.v1.credential.PublicKey;
import com.twilio.rest.api.v2010.Account;
import com.twilio.rest.api.v2010.account.NewKey;
import com.twilio.http.TwilioRestClient;
import com.twilio.http.ValidationClient;
import java.security.PrivateKey;

public class NewSubAccount {

    private static final String ACCOUNT_SID = CredStore.getEnv("TWILIO_ACCOUNT_SID");
    private static final String API_KEY = CredStore.getEnv("TWILIO_MAIN_KEY");
    private static final String API_SECRET = CredStore.getEnv("TWILIO_MAIN_SECRET");
    private static final String PUBLIC_KEY_SID = CredStore.getEnv("TWILIO_PUBLIC_KEY_SID");
    private static final PrivateKey PRIVATE_KEY = CredStore.getPrivateKey();
    private static final String PUBLIC_KEY = CredStore.getPublicKey();

    public static void main(String[] args) {

        // Create client with Main Account Credentials
        TwilioRestClient client = new TwilioRestClient.Builder(API_KEY, API_SECRET)
            .accountSid(ACCOUNT_SID)
            .httpClient(new ValidationClient(ACCOUNT_SID, PUBLIC_KEY_SID, API_KEY, PRIVATE_KEY))
            .build();

        // Create new Subaccount
        Account myAccount = Account.creator().setFriendlyName("PKCV Account").create(client);
        String myAccountSid = myAccount.getSid();

        // Seed API Key
        NewKey myKey = NewKey.creator(myAccountSid).setFriendlyName("PKCV Key").create(client);

        // Seed Public Key
        PublicKey myPubKey = PublicKey.creator(PUBLIC_KEY)
            .setAccountSid(myAccountSid)
            .setFriendlyName("Seed PK")
            .create(client);

        // Create a client for new Subaccount
        TwilioRestClient newClient = new TwilioRestClient.Builder(myKey.getSid(), myKey.getSecret())
            .accountSid(myAccountSid)
            .httpClient(new ValidationClient(myAccountSid, myPubKey.getSid(), myKey.getSid(), PRIVATE_KEY))
            .build();

        // Make API call with new account and list public key sid(s) assigned to account
        Iterable<PublicKey> pks = PublicKey.reader().read(newClient);
        for (PublicKey pk : pks) {
            System.out.println("key: " + pk.getSid() + "  - friendlyName: " + pk.getFriendlyName());
        }

        // Clean up
        Account.updater(myAccountSid).setStatus(Account.Status.CLOSED).update(client);
    }
}
```

The Console also supports creating API Keys and adding Public Keys for new Subaccounts.