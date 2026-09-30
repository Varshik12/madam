import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { RomanticSurprisePage } from './components/RomanticSurprisePage';
import { FilmySlideShow } from './components/FilmySlideShow';
import { FallingHeartsBackground } from './components/FallingHeartsBackground';
import { MusicPromptModal } from './components/MusicPromptModal';
import { FloatingMusicControl } from './components/FloatingMusicControl';
import { romanticAudio } from './utils/romanticAudio';
import { Heart, Film, X, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeMode, setActiveMode] = useState<'filmy' | 'romantic'>('filmy');
  const [reactionAlerts, setReactionAlerts] = useState<any[]>([]);
  const [showAlertModal, setShowAlertModal] = useState(false);

  // Every reload prompts the user: "Play Music? Yes / No"
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);

  const handleMusicAccept = () => {
    setShowMusicPrompt(false);
    romanticAudio.selectPresetSong('tum-se-hi');
    romanticAudio.play();
  };

  const handleMusicDecline = () => {
    setShowMusicPrompt(false);
    romanticAudio.pause();
  };

  // Poll for reactions in background
  const fetchAlerts = () => {
    fetch('/api/reaction-alert')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.history) {
          setReactionAlerts(data.history);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full bg-gradient-to-b from-[#18030b] via-[#240410] to-[#120107] text-rose-100 flex flex-col font-sans select-none overflow-x-hidden overflow-y-auto">
      {/* Vercel Web Analytics Tracking */}
      <Analytics />

      {/* Background Animated Falling Hearts Particles */}
      <FallingHeartsBackground />

      {/* Play Music Prompt Modal - Appears on visit & every reload */}
      <MusicPromptModal
        isOpen={showMusicPrompt}
        onAccept={handleMusicAccept}
        onDecline={handleMusicDecline}
      />

      {/* Floating Music Loop Indicator & Toggle */}
      <FloatingMusicControl />

      {/* Top Header - Clean, balanced bar with Slides and Special Offers & Letter (No Code Mode) */}
      <header className="relative z-20 h-14 shrink-0 border-b border-rose-900/40 bg-[#19030c]/90 backdrop-blur-md px-3 md:px-6 flex items-center justify-between shadow-lg">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <span className="font-black text-xs md:text-sm tracking-tight text-white block">
              Madam Ke Liye Special 🎬
            </span>
            <span className="text-[10px] text-rose-300/70 block -mt-0.5">
              Filmy Dialogues & Banter
            </span>
          </div>
        </div>

        {/* Navigation Switcher: Slides & Special Offers */}
        <div className="flex items-center gap-1.5 bg-[#2a0614]/80 p-1 rounded-xl border border-rose-900/50">
          <button
            onClick={() => setActiveMode('filmy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'filmy'
                ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'text-rose-300 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Slides</span>
          </button>

          <button
            onClick={() => setActiveMode('romantic')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'romantic'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-600/30'
                : 'text-rose-300 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Special Offers & Letter</span>
          </button>
        </div>
      </header>

      {/* Main Content Viewport - Fluid, responsive, never cut off, hidden scrollbars */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex flex-col justify-start items-center overflow-y-auto no-scrollbar min-h-0">
        {activeMode === 'filmy' && (
          <FilmySlideShow 
            onNavigateToSpecial={() => setActiveMode('romantic')}
            isMusicModalOpen={showMusicPrompt}
          />
        )}
        {activeMode === 'romantic' && <RomanticSurprisePage initialTab="offers" />}
      </main>

      {/* Secret Floating Response Alert if Madam clicks (Only displays if reaction exists) */}
      {reactionAlerts.length > 0 && !showAlertModal && (
        <button
          onClick={() => setShowAlertModal(true)}
          className="fixed bottom-3 right-3 z-30 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 text-xs font-bold shadow-2xl animate-bounce cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Madam Clicked ({reactionAlerts.length})</span>
        </button>
      )}

      {/* Reaction Details Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-[#250414] border border-rose-500/40 rounded-2xl p-5 shadow-2xl text-rose-100">
            <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-sm text-white">
                  Madam&apos;s Responses Logged
                </h3>
              </div>
              <button
                onClick={() => setShowAlertModal(false)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-rose-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 space-y-2 max-h-60 overflow-y-auto pr-1">
              {reactionAlerts.length === 0 ? (
                <p className="text-xs text-rose-300/60 py-3 text-center">
                  Koi response abhi tak record nahi hua hai.
                </p>
              ) : (
                reactionAlerts.map((alert, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-black/40 border border-rose-500/20 flex flex-col gap-1 text-xs"
                  >
                    <div className="font-bold text-emerald-300 flex items-center justify-between">
                      <span>{alert.reaction}</span>
                      <span className="text-[10px] text-rose-300/50">
                        {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {alert.note && (
                      <p className="text-[11px] text-rose-200/70">{alert.note}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}