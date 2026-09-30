import React, { useState } from 'react';
import { MASTER_STRATEGIES } from '../data/strategies';
import { StrategyOption } from '../types';
import { Copy, Check, Mic, Sparkles, BrainCircuit, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  onSelectForSimulation?: (strategy: StrategyOption) => void;
}

export const StoryCoverUpVault: React.FC<Props> = ({ onSelectForSimulation }) => {
  const [filter, setFilter] = useState<'all' | 'excuse' | 'humor' | 'curiosity'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeStrategyId, setActiveStrategyId] = useState<string>(MASTER_STRATEGIES[0].id);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredStrategies = MASTER_STRATEGIES.filter((s) => {
    if (filter === 'all') return true;
    return s.category === filter;
  });

  const activeStrategy = MASTER_STRATEGIES.find((s) => s.id === activeStrategyId) || MASTER_STRATEGIES[0];

  return (
    <div className="space-y-6">
      {/* Intro banner */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-800/40 rounded-2xl p-5 md:p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-400 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Story Fixer Master Vault (कहानी के मास्टर बहाने)
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              The 3 Story Reels Cover-Up Tactics
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
              Uske dimaag me yahi baitha hai ki wo 3 reels (&quot;guilty conscience&quot;, &quot;walls higher&quot;, &quot;karma/bad dua&quot;) uske liye thi. Yaha se choose kar ki kaun sa angle tere hisaab se best baithta hai.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All 5 Strategies' },
              { id: 'excuse', label: 'Third-Party Excuses (बहाने)' },
              { id: 'humor', label: 'Self-Aware Roast (High EQ)' },
              { id: 'curiosity', label: 'Curiosity Hooks (Clickbait)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  filter === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Selection list + Deep Dive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left column: strategy buttons */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredStrategies.map((strat) => {
            const isSelected = strat.id === activeStrategyId;
            return (
              <div
                key={strat.id}
                onClick={() => setActiveStrategyId(strat.id)}
                className={`cursor-pointer p-4 rounded-xl border transition-all text-left relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-800/90 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-indigo-500" />
                )}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    {strat.tag}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    Click Prob: <strong className="text-emerald-400">{strat.clickProbability}%</strong>
                  </span>
                </div>
                <h3 className="font-semibold text-white text-sm md:text-base">{strat.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{strat.headline}</p>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                  <span>Believability: <strong className="text-indigo-300">{strat.believabilityScore}%</strong></span>
                  <span>Pressure: <strong className="text-emerald-400">{strat.pressureScore}/10 (Very Low)</strong></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right column: Active strategy detail and ready-to-copy message */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-5">
          {/* Header of Active Strategy */}
          <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                {activeStrategy.category === 'excuse' ? 'Third-Party Cover-Up' : activeStrategy.category === 'humor' ? 'High-EQ Disarmer' : 'Irresistible Hook'}
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">{activeStrategy.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{activeStrategy.headline}</p>
            </div>
            {onSelectForSimulation && (
              <button
                onClick={() => onSelectForSimulation(activeStrategy)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-semibold transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Test in Chat Simulator
              </button>
            )}
          </div>

          {/* The Bahana Narrative (How to frame it) */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              The Cover Story Context (बैकग्राउंड कहानी)
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {activeStrategy.bahanaStory}
            </p>
          </div>

          {/* The Exact Message to Send */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>Exact Text to Send to Madam (WhatsApp / Instagram DM)</span>
              </label>
              <button
                onClick={() => handleCopy(activeStrategy.id, activeStrategy.messageText)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg border transition-all ${
                  copiedId === activeStrategy.id
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border-indigo-500/30'
                }`}
              >
                {copiedId === activeStrategy.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Message
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm md:text-base whitespace-pre-wrap leading-relaxed font-sans shadow-inner selection:bg-indigo-600 selection:text-white">
              {activeStrategy.messageText}
            </div>
          </div>

          {/* Voice note alternative if available */}
          {activeStrategy.voiceNoteScript && (
            <div className="bg-amber-950/20 border border-amber-800/30 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-amber-400" />
                  Voice Note Option (10-15 Seconds - Super Effective)
                </span>
                <span className="text-[11px] text-amber-400 font-medium">95% Listen Rate</span>
              </div>
              <p className="text-xs text-amber-200/90 italic leading-relaxed">
                {activeStrategy.voiceNoteScript}
              </p>
              <p className="text-[11px] text-amber-300/70 mt-2">
                💡 <strong>Voice Note Golden Rule:</strong> Record karte waqt chehre pe halki si smile rakhna. Voice me halka sa chuckling tone hona chahiye, koi guilt ya sad sound nahi aana chahiye!
              </p>
            </div>
          )}

          {/* Psychology Breakdown & Next Step */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 bg-slate-950/40 rounded-xl border border-slate-800/70">
              <h5 className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1">
                <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />
                Why Madam Will Click & Reply
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                {activeStrategy.psychologyBreakdown}
              </p>
            </div>

            <div className="p-3.5 bg-slate-950/40 rounded-xl border border-slate-800/70">
              <h5 className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                Agla Step (Jab Wo Reply Kare)
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                {activeStrategy.howToFollowUp}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
