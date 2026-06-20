require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Setup Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: "You are the personal AI assistant of Arnav Panwala. Your job is to answer questions politely. Arnav is currently a 3rd-year student pursuing B.E. in Computer Engineering. If anyone asks what Arnav does, tell them this. If anyone asks for Arnav's contact number, phone number, or mobile number, give them this exact number: +917861865466. CRITICAL STRICT RULE: You MUST write your entire response using ONLY the English Alphabet (A-Z). NEVER use Gujarati script (like ગુજરાતી) or Devanagari script (like हिंदी). Talk in Hinglish or Gujlish (e.g. 'Kem cho bhai', 'Mast chhe', 'Haan bhai bilkul'). Talk like a typical Indian friend on WhatsApp."
});

// Setup WhatsApp Client
// LocalAuth saves the session so you don't have to scan the QR every time
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('\n=============================================');
    console.log('QR RECEIVED! Please scan it using WhatsApp:');
    console.log('=============================================\n');
    qrcode.generate(qr, { small: true });
});

const BOT_START_TIME = Math.floor(Date.now() / 1000);

client.on('ready', () => {
    console.log('\n✅ WhatsApp AI Bot is ready and connected!');
    console.log('Waiting for incoming messages...');
});

// Listen ONLY for incoming messages from others
client.on('message', async msg => {
    // Ignore old queued messages to prevent spamming on startup
    if (msg.timestamp < BOT_START_TIME) {
        return;
    }

    // Ignore status updates and group messages to be safe
    if (msg.isStatus || msg.from.includes('@g.us')) {
        return;
    }

    const userQuery = msg.body;
    if (!userQuery || userQuery.trim() === '') {
        return; // Ignore empty messages or media without text
    }

    console.log(`\n💬 Received message from ${msg.from}: ${userQuery}`);

    try {
        // Show "typing..." indicator
        const chat = await msg.getChat();
        chat.sendStateTyping();

        // Ask Gemini AI
        const result = await model.generateContent(userQuery);
        const responseText = result.response.text();

        // Reply to the user
        await msg.reply(responseText);
        console.log('🤖 AI Reply sent successfully.');
    } catch (error) {
        console.error('❌ Error generating AI response:', error);
        await msg.reply('Oops! My AI brain ran into an error. 🤖');
    }
});

// Initialize the client
client.initialize();
