# No-code Voice quickstart with Twilio Studio

No-code Voice quickstart with Twilio Studio

This quickstart shows you how to build an application that answers phone calls using __Twilio Studio__, our no-code application builder.
Complete the prerequisites
1. __Create a Twilio account__.
2. __Buy a voice-enabled phone number__.
Create a Flow
A Flow is an application in Twilio Studio that handles calls and messages. Each Flow has a visual, flowchart-like interface.
1. Go to Studio > __Flows__.
2. Click Create new Flow.
3. In the Flow Name field, enter a name for your Flow.
4. Click Next.
5. Keep Start from scratch selected, and click Next.
Use a Widget
A canvas with a Trigger Widget and the Widget Library is displayed. Follow these steps to create a Widget:
1. In the Widget Library, find Say/Play.
2. Click and drag Say/Play onto the canvas. The canvas displays a Say/Play Widget.
3. Connect the Trigger Widget to the Say/Play Widget:
   * Click the red dot next to Incoming Call on the Trigger Widget.
   * Drag to the gray dot on the Say/Play Widget.
4. Select the Say/Play Widget.
5. In the configuration pane on the side of the canvas, find the Text to say field and enter the message you want callers to hear.
6. Click Save.
7. Click Publish.
Connect a phone number to your Flow
1. Go to the __Active Numbers__ page in the Twilio Console.
2. Click a phone number.
3. Go to the Configure tab and find the Voice Configuration section.
4. In the A call comes in row, select the Studio Flow option.
5. From the Select a Flow dropdown, select the name of your new Flow.
6. Click Save configuration.
Test your application with a call
Place a call to your Twilio number. The message you entered earlier plays.
Next steps
* __Get Started with Twilio Studio__: a longer guide that covers variables, transitions and other concepts
* __Build an Interactive Voice Response system (IVR) with Twilio Studio__
* __Forward Calls with Twilio Studio__
* __Route Inbound Sales Leads with Twilio Studio__