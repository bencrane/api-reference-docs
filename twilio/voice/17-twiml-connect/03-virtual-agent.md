TwiML™ Voice: <VirtualAgent>
(warning)
Warning
This TwiML Verb is not currently available when using __Twilio Regions__ Ireland (IE1) or Australia (AU1). This is currently only supported with the default US1 region. A full list of unsupported products and features with Twilio Regions is documented __here__.
The `<VirtualAgent>` TwiML noun, which nests inside a `<Connect>` verb, allows you to connect callers to a Google Dialogflow VirtualAgent. `<VirtualAgent>` currently supports Dialogflow CX.
This document outlines the steps to integrate your Dialogflow agents with Twilio and provides links to the specific documentation for working with `<VirtualAgent>` and Dialogflow CX agents.
Copy code block

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Connect> 
<VirtualAgent connectorName="project"/> 
</Connect> 
</Response>
To use `<VirtualAgent>`, you must connect your Dialogflow agent to Twilio using a Twilio One-click telephony integration in the Google Dialogflow cloud console. The One-click process is different for Dialogflow CX. See the sections below on how to complete the integration steps.
Once you've completed those integration steps, Twilio will add a __Dialogflow CX Connector__ and create a new Studio Flow containing a Connect Virtual Agent Widget that is connected to your selected Dialogflow agent.
You can review all of your Dialogflow CX connections in your __Installed Twilio Marketplace Add-Ons in the Twilio Console.__
Set up the integration between Twilio and Dialogflow CX
__See the full onboarding guide here.__ The onboarding guide discusses prerequisites, integration steps, and specifics about Dialogflow CX features enabled with the Twilio integration.
Use <VirtualAgent> with Dialogflow CX
Review the supporting documentation to get started with the Dialogflow integration:
* __Dialogflow CX__