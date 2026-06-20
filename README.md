# 🤖 WhatsApp AI Assistant (Hinglish/Gujlish)

A fully automated, smart WhatsApp chatbot built using **Node.js**, **whatsapp-web.js**, and **Google Gemini 2.5 AI**. 

This bot acts as a personal AI assistant that automatically replies to direct messages in a friendly, conversational tone using **Hinglish** and **Gujlish** (written using the English alphabet).

## ✨ Features
- **Smart AI Replies:** Uses Google Gemini 2.5 Flash for fast and intelligent responses.
- **Auto-Responder:** Automatically replies to all direct messages (DMs).
- **Group Safety:** Ignores messages from WhatsApp groups to prevent spam.
- **Spam Protection:** Ignores old/queued messages on startup to prevent infinite loops and spam.
- **Personalized Knowledge:** Knows specific details about its owner (e.g., Arnav Panwala, 3rd Year B.E. Computer Engineering, Contact Number).
- **Media Safety:** Safely ignores empty messages or media (images/videos) sent without captions to avoid crashes.
- **Local Session Auth:** Remembers your WhatsApp Web login so you don't have to scan the QR code every time.

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arnav192005/whatsapp-ai-chatbox.git
   cd whatsapp-ai-chatbox
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the bot:**
   ```bash
   node index.js
   ```

5. **Scan the QR Code:**
   When you run the bot for the first time, a QR code will appear in the terminal. Open WhatsApp on your phone -> Linked Devices -> Link a Device, and scan the QR code.

6. **You're all set!** 
   The bot will now listen for incoming messages and reply automatically.

## 🔒 Security
- The `.env` file containing your API keys and the `.wwebjs_auth` folder containing your WhatsApp session data are explicitly ignored in `.gitignore` to keep your accounts 100% secure.

## 🛠️ Built With
- [whatsapp-web.js](https://wwebjs.dev/) - A WhatsApp client library for Node.js
- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) - Google's official Gemini AI SDK
- [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal) - Terminal QR code generator
