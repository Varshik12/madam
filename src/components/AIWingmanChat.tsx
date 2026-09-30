import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'wingman';
  text: string;
}

const QUICK_PROMPTS = [
  'Agar wo mere message pe "Hmm" ya "Okay" likhe toh kya reply du?',
  'Kya main use direct phone call kar sakta hu?',
  'College/Office me kal aamne-saamne mil gaye toh kya reaction du?',
  'Kya main Instagram pe koi story lagau ya chup rahu?',
  'Agar usne pucha "tune story mere liye hi dali thi na?", toh exact reply kya hoga?',
];

export const AIWingmanChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'wingman',
      text: `Bhai sun! Main tera Wingman aur Crush Damage Control Advisor hu.
Tere case ka pura context mere pass hai:
• 21 Sep: Rude text bheja
• 21 Sep sham: 3 victim reels story pe lagai
• 22 Sep: Apology di sath me likha "reply krne ki zaroorat nhi hai"
• 27 Sep: 6 din ka silence ho chuka hai.

Koi bhi doubt ho, jaise: "Agar Madam ne seen kar ke chhod diya?", "Call karu ya text?", ya "Naya message kaise likhu?" — mujhse be-jhijhak puch! Exact script dunga.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          context: 'User had conflict with crush Madam on Sep 21 (rude text + 3 story reels). 6 days silence after apology. Goal: Win back, break silence without desperation.',
        }),
      });

      const data = await res.json();
      const wingmanMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'wingman',
        text: data.reply || 'Bhai, lighthearted approach le aur kabhi bhi double text mat kar. Apni self-respect aur chill vibes maintain rakh!',
      };
      setMessages((prev) => [...prev, wingmanMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'wingman',
        text: 'Bhai, simple rule hai: No heavy talks right now. Call bilkul mat karna, bas ek lighthearted text ya voice note bhej jo curiosity jagaye. Don’t chase, just reset the vibe!',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col h-[700px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span>AI Wingman & Crisis Consultant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>
            <p className="text-xs text-slate-400">Ask any scenario question about Madam & get tactical advice</p>
          </div>
        </div>
      </div>

      {/* Quick Prompts Carousel */}
      <div className="py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-slate-800/60">
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            disabled={loading}
            className="text-left text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700/60 shrink-0 transition-all"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Chat Feed */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 my-2">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs md:text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-xs'
                    : 'bg-slate-800 border border-slate-700/80 text-slate-200 rounded-tl-xs'
                }`}
              >
                {msg.text}
              </div>
              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 justify-start items-center text-xs text-slate-400 italic">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/40 flex items-center justify-center text-indigo-300 shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <span>Wingman is analyzing psychology & formulating strategy...</span>
          </div>
        )}
      </div>

      {/* Input box */}
      <div className="pt-3 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question or what Madam said..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold px-5 rounded-xl transition-all flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
