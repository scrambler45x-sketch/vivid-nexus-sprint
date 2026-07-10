# Vivid Nexus AI Chatbot

> A lightweight, embeddable AI chatbot widget that can be integrated into any website with a single script tag.

The **Vivid Nexus AI Chatbot** is a production-ready conversational AI widget designed for static websites, React applications, and modern frontend frameworks.

No npm packages. No build configuration. No framework dependency.

Simply include the widget script and initialize it with your branding.

---

# Features

- ⚡ 2-minute integration
- 🎨 Custom branding
- 💬 AI-powered conversations
- 📱 Responsive design
- 🔒 Secure backend communication
- 🌐 Works on any website
- ⚛️ React compatible
- 🚀 Always receives the latest widget updates

---

# Quick Integration (Any Website)

Add the following code just before the closing `</body>` tag of your website.

```html
<script src="https://your-domain.com/widget.js" defer></script>

<script>
window.addEventListener("DOMContentLoaded", () => {
    window.initSmartChatWidget({
        brandName: "Your Brand Name",
        brandColor: "#00D2FF",
        welcomeMessage: "Hello! How can we help you today?"
    });
});
</script>
```

That's it.

The chatbot will automatically appear on your website.

---

# Configuration Options

The widget can be customized using the `initSmartChatWidget()` function.

| Option | Type | Default | Description |
|---------|------|---------|-------------|
| `brandName` | String | `"Smart Live Chat"` | Name displayed in the chatbot header |
| `brandColor` | String | `#00D2FF` | Primary accent color used throughout the widget |
| `welcomeMessage` | String | Default welcome message | First message displayed when the chatbot opens |
| `position` *(Optional)* | String | `"bottom-right"` | Widget placement on the page *(if supported)* |
| `theme` *(Optional)* | String | `"light"` | Widget appearance *(if supported)* |

Example:

```javascript
window.initSmartChatWidget({
    brandName: "Acme Support",
    brandColor: "#4F46E5",
    welcomeMessage: "Hi there 👋 How can we help today?",
});
```

---

# React Integration

For React applications, dynamically load the widget after the component mounts.

```jsx
import { useEffect } from "react";

export default function ChatbotLoader() {

    useEffect(() => {

        const script = document.createElement("script");

        script.src = "https://your-domain.com/widget.js";

        script.defer = true;

        script.onload = () => {
            window.initSmartChatWidget({
                brandName: "My React App",
                brandColor: "#00D2FF"
            });
        };

        document.body.appendChild(script);

    }, []);

    return null;

}
```

Then simply include the component once.

```jsx
function App() {
    return (
        <>
            <ChatbotLoader />
            {/* Your application */}
        </>
    );
}
```

---

# Next.js Integration

For Next.js, load the widget only on the client side.

```jsx
import Script from "next/script";

export default function Layout() {

    return (
        <>
            <Script
                src="https://your-domain.com/widget.js"
                strategy="afterInteractive"
                onLoad={() => {
                    window.initSmartChatWidget({
                        brandName: "Next.js App"
                    });
                }}
            />
        </>
    );

}
```

---

# How It Works

1. The browser downloads the widget.
2. The widget injects its UI into your page.
3. Your messages are securely sent to our AI backend.
4. AI responses are streamed back to the widget.
5. Conversations continue in real time.

No page refreshes.

No additional setup.

---

# Why Use a Script Tag?

Using a hosted script provides several advantages:

- No npm installation
- No build configuration
- Framework independent
- Easy deployment
- Small footprint
- Automatic updates

Simply update the hosted widget once, and every website immediately receives the latest improvements.

---

# Browser Support

Supported on all modern browsers including:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari
- Brave
- Opera

---

# Security

The widget communicates only with our configured backend endpoint.

Recommended production practices:

- HTTPS only
- CORS restrictions
- Authentication where applicable
- Rate limiting
- Server-side validation

---

# Custom Branding

You can easily match the chatbot to your brand.

Supported customizations include:

- Brand name
- Primary color
- Welcome message
- Backend endpoint
- Future configuration options

No code modifications are required.

---

# Updating the Widget

The widget is loaded from a hosted source.

This means:

- Bug fixes are automatic.
- Performance improvements are automatic.
- New features become available without requiring customers to reinstall anything.

Users always run the latest version.

---

# Troubleshooting

### Widget doesn't appear

Verify:

- The script URL is correct.
- `initSmartChatWidget()` is called after the script has loaded.
- The browser console has no JavaScript errors.

---

### AI responses aren't working

Check:

- The backend server is running.
- CORS is configured correctly.
- HTTPS certificates are valid.

---

### Styling conflicts

The widget is isolated from the host website as much as possible.

If styling conflicts occur, ensure no global CSS is overriding injected elements.

---

# Frequently Asked Questions

### Does this require React?

The widget itself is built with Vanilla JavaScript and does not require React to function.

However, when integrating into a React project, you will use standard React hooks (like useEffect) to manage the script lifecycle and component mounting. It is platform-agnostic and functions on any website capable of loading JavaScript, including HTML, Next.js, Vue, Angular, Svelte, WordPress, and Shopify.

---

### Does it require npm?

No.

The widget is designed as a standalone script. Installation is simple and requires only a single <script> tag to embed the widget.

---

### Can I customize the branding?

Yes.

You have full control over the brand name, colors, welcome message, and backend API endpoint, all of which are configurable during the initialization process.

---

### How are updates delivered?

The widget is hosted centrally on our servers.

When we push an update, all integrated websites receive the latest version and improvements automatically without any action required from your end.


---

# Example

```html
<!DOCTYPE html>
<html>

<head>
    <title>My Website</title>
</head>

<body>

    <h1>Welcome!</h1>

    <script src="https://your-domain.com/widget.js" defer></script>

    <script>
        window.addEventListener("DOMContentLoaded", () => {

            window.initSmartChatWidget({

                brandName: "My Company",

                brandColor: "#2563EB",

                welcomeMessage: "Welcome! How can we help you today?",

            });

        });
    </script>

</body>

</html>
```

---

# Support

For integration assistance, feature requests, or technical support, please contact your Vivid Nexus representative.

---

# License

Copyright © Vivid Nexus.

All rights reserved.
