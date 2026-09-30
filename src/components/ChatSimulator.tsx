import React, { useState } from 'react';
import { REPLY_BRANCHES, MASTER_STRATEGIES } from '../data/strategies';
import { StrategyOption } from '../types';
import { Send, CheckCheck, Sparkles, MessageCircle, AlertTriangle, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';

interface Props {
  selectedStrategy?: StrategyOption | null;
}

export const ChatSimulator: React.FC<Props> = ({ selectedStrategy }) => {
  const [platform, setPlatform] = useState<'whatsapp' | 'instagram'>('whatsapp');
  const [currentProposedText, setCurrentProposedText] = useState<string>(
    selectedStrategy ? selectedStrategy.messageText : MASTER_STRATEGIES[0].messageText
  );
  const [hasSentProposed, setHasSentProposed] = useState<boolean>(false);
  const [selectedBranchIndex, setSelectedBranchIndex] = useState<number | null>(null);

  const resetChat = () => {
    setHasSentProposed(false);
    setSelectedBranchIndex(null);
  };

  const handleSendProposed = () => {
    setHasSentProposed(true);
    setSelectedBranchIndex(0); // Default to positive laughing response
  };

  return (
    <div className="space-y-6">
      {/* Intro info */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-900 border border-emerald-800/40 rounded-2xl p-5 md:p-6 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1">
            <MessageCircle className="w-3.5 h-3.5" />
            Interactive Chat Simulator & Live Rehearsal
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Madam Chat Rehearsal: See Before You Send
          </h2>
          <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
            Real message bhejane se pehle yaha test karo. Dekho ki wo message WhatsApp ya Instagram pe kaisa dikhega, aur Madam kya reply karegi toh tumhara next response kya hona chahiye!
          </p>
        </div>

        {/* Platform switcher */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700/60">
          <button
            onClick={() => setPlatform('whatsapp')}
            className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
              platform === 'whatsapp'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            WhatsApp View
          </button>
          <button
            onClick={() => setPlatform('instagram')}
            className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
              platform === 'instagram'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Instagram DM View
          </button>
        </div>
      </div>

      {/* Simulator Workspace: Left Mock Phone, Right Branching Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mock Phone Frame (lg:col-span-6) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full max-w-md bg-slate-950 border-4 border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[650px] relative">
            {/* Phone Top Notch / Status Bar */}
            <div className="bg-slate-900 px-4 py-2 flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800">
              <span className="font-semibold text-slate-300">10:42 PM</span>
              <div className="w-16 h-4 bg-slate-950 rounded-full mx-auto" />
              <div className="flex items-center gap-1.5">
                <span>5G</span>
                <span>88%</span>
              </div>
            </div>

            {/* Chat App Header */}
            <div
              className={`px-4 py-3 flex items-center justify-between border-b ${
                platform === 'whatsapp'
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-gradient-to-r from-purple-950/80 to-slate-900 border-purple-900/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow">
                  P
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm leading-tight">Madam</h4>
                  <p className="text-[10px] text-slate-400">
                    {platform === 'whatsapp' ? 'last seen today at 9:15 PM' : 'Active 2h ago'}
                  </p>
                </div>
              </div>
              <button
                onClick={resetChat}
                className="text-slate-400 hover:text-white text-xs flex items-center gap-1 p-1 bg-slate-800 rounded-md"
                title="Reset simulation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/90 text-xs">
              {/* Date stamp 1 */}
              <div className="text-center my-1">
                <span className="bg-slate-900 text-slate-500 text-[10px] px-2.5 py-0.5 rounded-full border border-slate-800">
                  Sep 21, 2:15 PM
                </span>
              </div>

              {/* Historic Rude Message */}
              <div className="flex justify-end">
                <div className="max-w-[85%] bg-rose-950/40 border border-rose-800/40 text-rose-100 rounded-2xl rounded-tr-xs p-3 shadow">
                  <p className="leading-relaxed">
                    tujhe itni samajh hi nhi hai kisi ke effort orr time ki respect kese krte hai
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-rose-400">
                    <span>2:15 PM</span>
                    <CheckCheck className="w-3 h-3 text-rose-400" />
                  </div>
                </div>
              </div>

              {/* Story separator indicator */}
              <div className="text-center my-2">
                <span className="bg-amber-950/40 text-amber-300 text-[10px] px-3 py-1 rounded-full border border-amber-800/40 inline-flex items-center gap-1">
                  ⚠️ 3 Dramatic Reels posted on your IG story that evening
                </span>
              </div>

              {/* Date stamp 2 */}
              <div className="text-center my-1">
                <span className="bg-slate-900 text-slate-500 text-[10px] px-2.5 py-0.5 rounded-full border border-slate-800">
                  Sep 22, 11:30 AM
                </span>
              </div>

              {/* Historic Apology Message */}
              <div className="flex justify-end">
                <div className="max-w-[85%] bg-slate-800 border border-slate-700 text-slate-200 rounded-2xl rounded-tr-xs p-3 shadow">
                  <p className="leading-relaxed">
                    Madam wo msg galat tha Frustration mei mene tujhe unfair bol diya jabki tum par koi compulsion nhi hai Sorry Reply krne ki zaroorat nhi hai
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                    <span>11:30 AM</span>
                    <CheckCheck className="w-3 h-3 text-blue-400" />
                  </div>
                </div>
              </div>

              {/* 6 Days Silence Gap */}
              <div className="text-center my-4 py-1 border-t border-b border-dashed border-slate-800">
                <span className="text-slate-500 text-[11px] font-medium">
                  ⏳ 6 Days of Silence (Sep 22 - Sep 27)
                </span>
              </div>

              {/* Simulated New Message from User */}
              {hasSentProposed && (
                <>
                  <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2">
                    <div
                      className={`max-w-[85%] rounded-2xl rounded-tr-xs p-3 shadow text-white ${
                        platform === 'whatsapp'
                          ? 'bg-emerald-700/90 border border-emerald-600'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 border border-purple-500/50'
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{currentProposedText}</p>
                      <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-emerald-200">
                        <span>Just now</span>
                        <CheckCheck className="w-3 h-3 text-blue-300" />
                      </div>
                    </div>
                  </div>

                  {/* Simulated Response from Madam */}
                  {selectedBranchIndex !== null && (
                    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-3 delay-150">
                      <div className="max-w-[85%] bg-slate-800 border border-slate-700 text-slate-100 rounded-2xl rounded-tl-xs p-3 shadow">
                        <p className="whitespace-pre-wrap leading-relaxed">
                          {REPLY_BRANCHES[selectedBranchIndex].priyankaReply}
                        </p>
                        <div className="text-right text-[9px] text-slate-400 mt-1">
                          Just now
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Input Bar (Click to send proposed) */}
            <div className="p-3 bg-slate-900 border-t border-slate-800">
              {!hasSentProposed ? (
                <button
                  onClick={handleSendProposed}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  Simulate Sending This Message
                </button>
              ) : (
                <div className="text-center text-[11px] text-slate-400">
                  Message sent in simulation! Select Madam&apos;s reaction on the right 👉
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Playbook & Branching Reaction Engine (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Strategy Message Selector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Select Message to Test in Simulation:
            </label>
            <div className="space-y-2 mb-3">
              {MASTER_STRATEGIES.slice(0, 3).map((strat) => (
                <button
                  key={strat.id}
                  onClick={() => {
                    setCurrentProposedText(strat.messageText);
                    setHasSentProposed(false);
                    setSelectedBranchIndex(null);
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                    currentProposedText === strat.messageText
                      ? 'bg-indigo-950/40 border-indigo-500 text-white font-medium ring-1 ring-indigo-500/40'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-slate-200">{strat.title}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{strat.messageText}</div>
                </button>
              ))}
            </div>

            {/* Custom Edit Box */}
            <textarea
              rows={3}
              value={currentProposedText}
              onChange={(e) => {
                setCurrentProposedText(e.target.value);
                setHasSentProposed(false);
              }}
              placeholder="Or type your own custom message here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none font-sans"
            />
          </div>

          {/* Branching Guide: What if she replies X? */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Madam&apos;s Simulated Reactions & Your Next Move
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Click any reaction to test how Madam might respond and see the exact high-EQ follow-up:
            </p>

            <div className="space-y-3">
              {REPLY_BRANCHES.map((branch, index) => {
                const isActive = selectedBranchIndex === index;
                const isSafe = branch.dangerLevel === 'safe';
                const isCaution = branch.dangerLevel === 'caution';

                return (
                  <div
                    key={index}
                    onClick={() => {
                      if (!hasSentProposed) setHasSentProposed(true);
                      setSelectedBranchIndex(index);
                    }}
                    className={`cursor-pointer p-3.5 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-slate-800/90 border-emerald-500 ring-1 ring-emerald-500/40'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-xs text-slate-200">
                        {branch.trigger}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          isSafe
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : isCaution
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {branch.dangerLevel}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 italic mb-2 bg-slate-900/80 p-2 rounded border border-slate-800">
                      Madam: &quot;{branch.priyankaReply}&quot;
                    </p>

                    {isActive && (
                      <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 animate-in fade-in">
                        <div className="text-[11px] text-amber-300 flex items-start gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                          <span><strong>Your Tactical Rule:</strong> {branch.yourNextMove}</span>
                        </div>
                        <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-emerald-300">
                          <strong>Your Exact Reply:</strong> &quot;{branch.sampleNextText}&quot;
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
