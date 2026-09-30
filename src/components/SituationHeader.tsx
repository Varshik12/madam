import React, { useState } from 'react';
import { TIMELINE_EVENTS } from '../data/strategies';
import { AlertCircle, Clock, ShieldCheck, Flame, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const SituationHeader: React.FC = () => {
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-7 shadow-xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Title */}
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              Live Case: Madam (Sep 21 - Sep 27)
            </span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Day 6 Reset Window: ACTIVE
            </span>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/50">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            Silence Duration: <strong className="text-white">6 Days</strong> (Optimal to break now)
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Madam Damage Control & Crush Win-Back OS
        </h1>
        <p className="text-slate-300 text-sm md:text-base mt-1.5 max-w-3xl leading-relaxed">
          Bhai, pareshan mat ho. Jo 21 ko hua wo fix ho sakta hai. 3 dramatic reels aur &quot;Reply krne ki zaroorat nhi hai&quot; bolne se jo awkward wall khadi hui hai, use clever excuse aur low-pressure hook se todte hain.
        </p>
      </div>

      {/* Crisis Timeline Stepper */}
      <div className="mt-6 pt-5 border-t border-slate-800 relative z-10">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span>Incident Timeline & Psychological Diagnosis</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TIMELINE_EVENTS.map((event, idx) => {
            const isNegative = event.type === 'negative';
            const isCritical = event.type === 'critical';
            const isWarning = event.type === 'warning';
            const isPositive = event.type === 'positive';

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCritical
                    ? 'bg-rose-950/20 border-rose-800/40 text-rose-200'
                    : isNegative
                    ? 'bg-orange-950/20 border-orange-800/40 text-orange-200'
                    : isWarning
                    ? 'bg-amber-950/20 border-amber-800/40 text-amber-200'
                    : 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200 ring-1 ring-emerald-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-300">{event.date}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      isCritical
                        ? 'bg-rose-500/20 text-rose-400'
                        : isNegative
                        ? 'bg-orange-500/20 text-orange-400'
                        : isWarning
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-emerald-500/20 text-emerald-400 animate-pulse'
                    }`}
                  >
                    {isCritical ? 'High Damage' : isNegative ? 'Trigger' : isWarning ? 'Exit Trap' : 'Golden Move'}
                  </span>
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">{event.title}</h4>
                <p className="text-xs text-slate-300 line-clamp-2 italic mb-2 bg-slate-900/60 p-1.5 rounded border border-slate-800">
                  {event.detail}
                </p>
                <p className="text-[11px] text-slate-400 leading-normal">{event.impact}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Psychology Reveal Accordion */}
      <div className="mt-5 pt-4 border-t border-slate-800/70">
        <button
          onClick={() => setShowFullAnalysis(!showFullAnalysis)}
          className="w-full flex items-center justify-between text-left text-xs md:text-sm font-semibold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/15 p-3 rounded-xl border border-amber-500/20 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Kyu 6 din tak Madam ka reply nahi aaya? (The Psychological Trap & Good News)</span>
          </span>
          {showFullAnalysis ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showFullAnalysis && (
          <div className="mt-3 p-4 bg-slate-800/70 border border-slate-700/70 rounded-xl text-xs md:text-sm text-slate-300 space-y-3 leading-relaxed animate-in fade-in duration-200">
            <div className="flex gap-2.5 items-start">
              <span className="font-bold text-amber-400 shrink-0">1. &quot;Reply krne ki zaroorat nhi hai&quot; ka Psychological Trap:</span>
              <span>
                Tune khud use exit door de diya. Jab koi ladki awkward ya guilty feel karti hai, aur samne wala likh deta hai &quot;reply karne ki zaroorat nahi hai&quot;, toh uska subconscious brain relieved feel karta hai ki chalo mujhe confront nahi karna padega. Iska matlab ye nahi hai ki wo hamesha ke liye chali gayi!
              </span>
            </div>
            <div className="flex gap-2.5 items-start">
              <span className="font-bold text-rose-400 shrink-0">2. Story + Message ka Combination Effect:</span>
              <span>
                Pehle rude message (&quot;tujhe samajh hi nahi effort ki...&quot;) aur sham ko reels (guilty conscience + karma). Usne socha: &quot;Ye banda bohot passive-aggressive hai aur meri personal baat public stories pe shade kar raha hai.&quot;
              </span>
            </div>
            <div className="flex gap-2.5 items-start">
              <span className="font-bold text-emerald-400 shrink-0">3. The 6-Day Blessing:</span>
              <span>
                Agar tu 22 ya 23 ko dobara message karta, toh wo irritate hoti. 6 din ka silence matlab uska high-alert defensive state cool-down ho chuka hai. Ab agar tu ek mature, funny ya third-party excuse wala hook bhejega, toh wo bina kisi ego ke reply kar sakti hai!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
