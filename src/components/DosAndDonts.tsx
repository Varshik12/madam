import React from 'react';
import { DOS_AND_DONTS } from '../data/strategies';
import { CheckCircle2, XCircle, AlertOctagon, Flame } from 'lucide-react';

export const DosAndDonts: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Intro Warning */}
      <div className="bg-gradient-to-r from-red-950/40 via-rose-950/30 to-slate-900 border border-red-800/40 rounded-2xl p-5 md:p-6 shadow-lg">
        <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
          <AlertOctagon className="w-4 h-4" />
          The Laxman Rekha (लक्ष्मण रेखा)
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">
          Crucial Ground Rules: How NOT to Mess Up Again
        </h2>
        <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
          Ye rules yaad rakhna. Ek galat step (jaise dobara emotional apology bhej dena ya call karna) is poori situation ko revive hone se pehle hi block me convert kar sakta hai.
        </p>
      </div>

      {/* Grid: Green DOs and Red DONTs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DOs Card */}
        <div className="bg-slate-900 border border-emerald-900/40 rounded-2xl p-5 md:p-6 space-y-4">
          <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2 pb-3 border-b border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>KAREN (Mandatory Good Habits)</span>
          </h3>

          <div className="space-y-3.5">
            {DOS_AND_DONTS.dos.map((item, i) => (
              <div key={i} className="p-3 bg-emerald-950/20 rounded-xl border border-emerald-800/30">
                <h4 className="text-white font-semibold text-xs md:text-sm flex items-center gap-1.5 mb-1">
                  <span className="text-emerald-400 font-bold">✓</span> {item.title}
                </h4>
                <p className="text-xs text-slate-300/90 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DONTs Card */}
        <div className="bg-slate-900 border border-rose-900/40 rounded-2xl p-5 md:p-6 space-y-4">
          <h3 className="text-rose-400 font-bold text-base flex items-center gap-2 pb-3 border-b border-slate-800">
            <XCircle className="w-5 h-5 text-rose-400" />
            <span>NA KAREN (Strictly Prohibited - Red Alert)</span>
          </h3>

          <div className="space-y-3.5">
            {DOS_AND_DONTS.donts.map((item, i) => (
              <div key={i} className="p-3 bg-rose-950/20 rounded-xl border border-rose-800/30">
                <h4 className="text-rose-200 font-semibold text-xs md:text-sm flex items-center gap-1.5 mb-1">
                  <span className="text-rose-400 font-bold">✕</span> {item.title}
                </h4>
                <p className="text-xs text-slate-300/90 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Protocol */}
      <div className="bg-slate-900 border border-amber-800/40 p-5 rounded-2xl">
        <h4 className="text-sm font-bold text-amber-300 mb-2 flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-400" />
          The 48-Hour Golden Silence Protocol
        </h4>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Jab tum naya message bhejoge: <strong>Agar Madam agle 2-3 ghante me reply na kare, bilkul panic mat hona!</strong> Do not delete the message. Do not send a question mark. Do not stalk her follower list. Ladkiyan test karti hain ki kya banda abhi bhi anxious aur desperate hai, ya chill ho chuka hai. Tumhara calm rehna hi tumhari sabse badi superpower hai.
        </p>
      </div>
    </div>
  );
};
