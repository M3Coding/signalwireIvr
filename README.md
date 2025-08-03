
# IVR-Realtime

**IVR-Realtime** is an interactive voice response (IVR) system built using Node.js, Express, and the SignalWire Realtime SDK. This project enables automated phone responses that play a menu, receive keypad input from callers, and route calls based on input. Great for small businesses looking to automate call handling for general information, business hours, or direct support.

## 🔧 Features

* Text-to-speech (TTS) IVR menu
* Handles digit input with dynamic call routing
* Forwards calls to support line
* Integrates with SignalWire Realtime API
* Uses environment variables for secure configuration
* Express server to keep the process alive (future API potential)

---

## 📁 Project Structure

```
.
├── index.js           # Main app file
├── .env               # Environment variables
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js v18+
* A [SignalWire](https://signalwire.com) account with Realtime API credentials
* [ngrok](https://ngrok.com/) or similar tool to expose localhost to the internet

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/ivr-realtime.git
cd ivr-realtime
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up your `.env` file:**

```env
SIGNALWIRE_SPACE=your-space.signalwire.com
SIGNALWIRE_PROJECT=your-project-id
SIGNALWIRE_TOKEN=your-api-token
CONTEXT=ivr
SUPPORT_NUMBER=+18885551234
TZ=America/New_York
```

4. **Start the server:**

```bash
node index.js
```

> You'll see `Waiting for calls...` and `Server running on port 3000.` in your terminal.

5. **Tunnel with ngrok (for testing):**

```bash
ngrok http 3000
```

Use the ngrok URL to configure your SignalWire voice endpoint webhook if needed.

---

## 📞 IVR Call Flow

1. Caller dials in
2. System answers after a short delay
3. Plays:

   * "Press 1 for general information"
   * "Press 2 for hours"
   * "Press 3 for support"
4. Call is handled based on input:

   * **1**: Plays company overview
   * **2**: Plays business hours
   * **3**: Forwards call to `SUPPORT_NUMBER`
   * **Other**: Plays invalid selection message

---

## 👨‍💼 About the Creator

This IVR system was built by **Matthew Eady**, founder and CEO of **Coding 4 Life Corp** — a tech-forward organization focused on software development, IT consulting, and automation. Learn more or request a project at:

📧 [codinglife@gmail.com](mailto:codinglife@gmail.com)
🌐 [www.coding4lifecorp.com](http://www.coding4lifecorp.com)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
