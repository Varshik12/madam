import React from 'react';
import { Music, Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';

interface MusicPromptModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export const MusicPromptModal: React.FC<MusicPromptModalProps> = ({
  isOpen,
  onAccept,
  onDecline,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#2a0616] via-[#1d0410] to-[#12020a] border border-rose-500/40 rounded-3xl p-6 shadow-2xl text-center text-rose-100 select-none transform transition-all animate-in zoom-in-95 duration-300">
        {/* Glow halo */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-28 h-28 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Animated Icon */}
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-rose-500/30 mb-4 animate-bounce">
          <Music className="w-8 h-8" />
          <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-amber-300 animate-spin" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-white tracking-tight mb-2 flex items-center justify-center gap-2">
          <span>"Tum Se Hi" Chalao? 🎵</span>
        </h3>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed mb-6 font-medium">
          Madam ke liye <span className="text-amber-300 font-bold">"Tum Se Hi"</span> acoustic lo-fi melody background mei play kare? ☕
          <span className="block text-[11px] text-rose-300/70 mt-1">
            (Pritam • Jab We Met acoustic guitar vibes)
          </span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={onAccept}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-extrabold text-sm shadow-xl shadow-rose-600/30 transition-all transform hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>▶ Haa, Tum Se Hi Chalao 🎶</span>
          </button>

          <button
            onClick={onDecline}
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-rose-300/80 hover:text-white font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <VolumeX className="w-3.5 h-3.5" />
            <span>Nhi, Silent 🔇</span>
          </button>
        </div>
      </div>
    </div>
  );
};
