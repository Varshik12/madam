import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize GoogleGenAI server-side with User-Agent
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI:', err);
  }
}

// System prompt for Wingman / Crush Strategist
const SYSTEM_PROMPT = `
You are the ultimate Indian Wingman, Relationship Strategist, and Psychological Communicator.
You specialize in modern Indian dating culture, Instagram/WhatsApp dynamics, Hinglish texting, and high-EQ crisis management.
The user is in a critical situation:
- User has a crush named Priyanka.
- On Sep 21 Day: Sent a bitter text: "tujhe itni samajh hi nhi hai kisi ke effort orr time ki respect kese krte hai"
- On Sep 21 Evening: Posted 3 dramatic victim/karma/walls-up reels on Instagram story (guilty conscience, walls higher, badd dua/karma).
- On Sep 22: Sent an apology: "Priyanka wo msg galat tha Frustration mei mene tujhe unfair bol diya jabki tum par koi compulsion nhi hai Sorry Reply krne ki zaroorat nhi hai"
- Sep 27: 6 days passed, zero reply from Priyanka!
- The user needs tactical cover-up excuses (bahane) for the reels, click-worthy message hooks, and how to revive conversation without looking desperate or creepy.

Always respond in engaging, sharp, supportive Hinglish (mix of Hindi & English) like an experienced elder brother or sharp best wingman friend.
Provide actionable, low-pressure, high-curiosity messages and sharp psychological analysis. Never suggest being needy, stalkerish, or sending long emotional rants.
`;

// In-memory store for reaction notifications
interface ReactionLog {
  id: string;
  reaction: string;
  note?: string;
  timestamp: string;
  userAgent?: string;
}

const reactionLogs: ReactionLog[] = [];

// API endpoint to record reaction alert (when True Quiz button is clicked)
app.post('/api/reaction-alert', (req, res) => {
  try {
    const { reaction, note } = req.body;
    const newLog: ReactionLog = {
      id: Date.now().toString(),
      reaction: reaction || 'Haan, Dosti & Banter Restored! ☕',
      note: note || '',
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      userAgent: req.headers['user-agent'] || 'unknown',
    };
    reactionLogs.unshift(newLog);
    console.log(`[ALERT] Reaction received:`, newLog);
    return res.json({ success: true, message: 'Reaction recorded successfully!', log: newLog });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to record reaction' });
  }
});

// API endpoint to fetch recorded reaction alerts
app.get('/api/reaction-alert', (req, res) => {
  return res.json({
    total: reactionLogs.length,
    latest: reactionLogs[0] || null,
    history: reactionLogs,
  });
});

// API endpoint for AI Wingman advice
app.post('/api/chat-advisor', async (req, res) => {
  try {
    const { message, context } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Context: ${context || 'Priyanka crush damage control'}\n\nUser Question/Doubt: "${message}"\n\nProvide direct, practical, Hinglish advice, exact message scripts to copy, and tactical rationale. Keep it punchy and empathetic.`,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.8,
        },
      });

      return res.json({ reply: response.text });
    }

    // Fallback if API key is not configured
    return res.json({
      reply: `Bhai, tension mat le! Priyanka ka 6 din ka silence natural hai kyunki tune last me likha tha 'Reply krne ki zaroorat nhi hai'. Abhi serious ya emotional paragraph bilkul mat bhej! Sabse best move hai: Ek super lighthearted casual hook ya self-deprecating humor bhej jo tension ko 100% diffuse kar de. Example: 'Priyanka, ek sawal puchna tha... waise I know 21 ko mera brain freeze ho gaya tha 😂 par ek genuine cheez thi.' Uska ego bhi hurt nahi hoga aur curiosity se reply aayega!`,
    });
  } catch (error: any) {
    console.error('Gemini advisor error:', error);
    res.status(500).json({
      error: error.message || 'Error generating advice',
      reply: 'Bhai, tension mat le. Silence todne ke liye lighthearted tease ya low-pressure excuse use kar. Never send another apology paragraph!',
    });
  }
});

// API endpoint to generate custom excuse / message hook
app.post('/api/generate-excuse', async (req, res) => {
  try {
    const { angle, setting, closeness } = req.body;

    if (ai) {
      const prompt = `
Generate 3 distinct, ready-to-copy Hinglish messages to send to Priyanka right now (on Sep 27, after 6 days of silence).
User's mistake on Sep 21: Sent rude text, put 3 dramatic reels on IG story, apologized with 'reply krne ki zaroorat nhi hai', got ghosted for 6 days.
Selected Strategy Angle: ${angle || 'Friend drama excuse'}
Setting / Relation: ${setting || 'College / Casual friends'}
Closeness: ${closeness || 'Crush / Good acquaintance'}

For each message:
1. Exact text to send (WhatsApp/Instagram DM) in natural Hinglish.
2. Voice Note alternative script (if user prefers sending a 15-sec audio).
3. Why this will make her click and reply without feeling awkward.
Format cleanly with emojis and bullet points.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.85,
        },
      });

      return res.json({ result: response.text });
    }

    // Fallback response
    return res.json({
      result: `
### Option 1: The Friend Drama Cover-up (High Believability)
**Message:**
"Hey Priyanka! Ek bahut ajeeb cheez hui toh dhyan aaya... Us din (21 ko) mere dost ka uske ex ke sath full kalesh chal raha tha aur hum log uske support me bewakoofon jaise reels share kar rahe the 😂 Phir kal mujhe achanak strike hua ki kahi tune wo faltu stories apne pe toh nahi le li thi? Kyunki mera wo message bhi bohot immature tha. Hope everything's chill with you!"

**Why it works:**
Priyanka ke dimaag se guilt aur pressure hat jayega. Use lagega ki stories uske liye thi hi nahi, aur tumhare beech ki awkwardness ek second me khatam ho jayegi.
      `,
    });
  } catch (error: any) {
    console.error('Generate excuse error:', error);
    res.status(500).json({ error: 'Failed to generate excuse' });
  }
});

// Setup Vite middlewares in development or serve static in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
