import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FILMY_SLIDES } from '../data/filmySlides';
import { 
  ChevronLeft, ChevronRight, Sparkles, Music, 
  RotateCcw, Film, Upload, Heart, Pause, Play, ExternalLink
} from 'lucide-react';
import { romanticAudio, PRESET_SONGS } from '../utils/romanticAudio';

interface FilmySlideShowProps {
  onNavigateToSpecial?: () => void;
  isMusicModalOpen?: boolean;
}

export const FilmySlideShow: React.FC<FilmySlideShowProps> = ({ 
  onNavigateToSpecial,
  isMusicModalOpen = false,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSongModal, setShowSongModal] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [currentSongTitle, setCurrentSongTitle] = useState(romanticAudio.getSongName());
  // Start with auto-slide paused on initial load so page ALWAYS stays on Slide 1 until user interacts
  const [isPaused, setIsPaused] = useState(true);

  // 7-second auto advance timer
  const AUTO_SLIDE_DURATION_MS = 7000;
  const [timerProgress, setTimerProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Always reset to Slide 1 (index 0) on component mount
  useEffect(() => {
    setCurrentSlideIndex(0);
    setTimerProgress(0);
  }, []);

  const slide = FILMY_SLIDES[currentSlideIndex] || FILMY_SLIDES[0];
  const totalSlides = FILMY_SLIDES.length;
  const isLastSlide = currentSlideIndex === totalSlides - 1;

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => {
      if (prev < totalSlides - 1) {
        return prev + 1;
      }
      return prev;
    });
    setTimerProgress(0);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
    setTimerProgress(0);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // 7-second auto-slide timer effect with Pause / Resume support
  useEffect(() => {
    // If on the last slide, paused, or music modal is open, do NOT advance
    if (isLastSlide || isPaused || isMusicModalOpen) {
      return;
    }

    const intervalTime = 50; // update smooth progress every 50ms
    const step = (intervalTime / AUTO_SLIDE_DURATION_MS) * 100;

    const timer = setInterval(() => {
      setTimerProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [currentSlideIndex, isLastSlide, isPaused, isMusicModalOpen, handleNext]);

  // Audio name sync
  useEffect(() => {
    return romanticAudio.subscribe(() => {
      setCurrentSongTitle(romanticAudio.getSongName());
    });
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      romanticAudio.setCustomSong(file);
      romanticAudio.play();
      setShowSongModal(false);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrlInput.trim()) {
      romanticAudio.setCustomSong(customUrlInput.trim(), 'Custom Track');
      romanticAudio.play();
      setShowSongModal(false);
      setCustomUrlInput('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center select-none p-1 sm:p-2">
      {/* 
        Slide Box: Height-constrained to fit 100% within the browser window 
        without bottom or top cut-off on standard desktop/laptop displays 
      */}
      <div className="relative w-full max-h-[calc(100dvh-5.5rem)] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-rose-500/25 bg-gradient-to-b from-[#220412]/95 via-[#16020c]/95 to-[#0e0107]/95 text-rose-100 flex flex-col justify-between transition-all duration-500">
        
        {/* Background Animated Gradient Layer */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor} opacity-80 transition-all duration-700 ease-in-out pointer-events-none`}
        />

        {/* Ambient Sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-3 left-6 text-lg opacity-25 animate-pulse">✨</div>
          <div className="absolute top-6 right-6 text-lg opacity-25 animate-bounce">🌹</div>
          <div className="absolute bottom-8 left-8 text-base opacity-25 animate-pulse">💫</div>
        </div>

        {/* Top 7-Second Progress Bar (Smooth continuous line - does NOT reveal total slide count) */}
        <div className="relative z-10 w-full h-1 sm:h-1.5 bg-black/40 backdrop-blur-md overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 transition-[width] duration-75 ease-linear shadow-[0_0_8px_rgba(244,63,94,0.6)]"
            style={{ width: `${timerProgress}%` }}
          />
        </div>

        {/* Header Bar - Clean & compact (No slide counts, no "Badlein" text) */}
        <div className="relative z-10 px-3 py-2 sm:px-5 flex items-center justify-between border-b border-white/5 backdrop-blur-sm bg-black/20 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-sm">
              <Film className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-black text-white tracking-tight">
              {slide.filmTag}
            </span>
          </div>

          {/* Custom Song Selector Trigger - Clean music pill */}
          <button
            onClick={() => {
              if (!romanticAudio.getIsPlaying()) {
                romanticAudio.selectPresetSong('tum-se-hi');
                romanticAudio.play();
              }
              setShowSongModal(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/35 hover:bg-rose-950/60 text-[10px] sm:text-xs text-rose-200 border border-rose-500/20 hover:border-rose-400/40 transition-all cursor-pointer"
            title="Tum Se Hi Gaana & Settings"
          >
            <Music className="w-3 h-3 text-amber-300" />
            <span className="max-w-[110px] sm:max-w-[170px] truncate">{currentSongTitle}</span>
          </button>
        </div>

        {/* 
          Main Slide Content Stage
          Uses overflow-y-auto with no-scrollbar so text never spills or cuts off and no scrollbar is visible
        */}
        <div className="relative z-10 p-3 sm:p-5 flex-1 flex flex-col justify-center items-center text-center w-full max-w-xl mx-auto overflow-y-auto overflow-x-hidden no-scrollbar transition-all">
          
          {/* Emoji Badge */}
          <div className="text-xl sm:text-2xl mb-1 select-none drop-shadow-sm shrink-0">
            {slide.emojiArt}
          </div>

          {/* Headline */}
          <h2 className="text-base sm:text-lg md:text-xl font-black text-white tracking-tight mb-2 drop-shadow-sm shrink-0">
            {slide.headline}
          </h2>

          {/* Cinematic Dialogue Bubble Card - Scrollable without visible scrollbars */}
          <div className="w-full bg-black/55 border border-rose-500/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 backdrop-blur-xl shadow-xl relative text-left max-h-[calc(100dvh-13rem)] overflow-y-auto no-scrollbar">
            <div className="text-rose-400 text-lg font-serif leading-none select-none opacity-50">“</div>
            <p className="font-serif text-xs sm:text-sm font-medium text-rose-50 italic leading-relaxed px-1 sm:px-2 whitespace-pre-wrap">
              {slide.filmyDialogue}
            </p>
            <div className="text-rose-400 text-lg font-serif leading-none text-right select-none opacity-50">”</div>

            {/* Banter / Shayari Thought */}
            <div className="mt-2 pt-2 border-t border-rose-500/20 text-[11px] sm:text-xs text-rose-200/90 whitespace-pre-wrap leading-relaxed font-sans font-medium px-2 bg-rose-950/25 rounded-lg py-1.5">
              {slide.romanceShayari}
            </div>
          </div>

          {/* Final Slide (Slide 5) Call to Action -> Transition to Special Offers & Letter */}
          {isLastSlide && onNavigateToSpecial && (
            <div className="mt-3 w-full flex flex-col items-center gap-1.5 animate-in zoom-in-95 duration-300 shrink-0">
              <button
                onClick={onNavigateToSpecial}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-extrabold text-xs sm:text-sm shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-rose-400/30"
              >
                <Heart className="w-3.5 h-3.5 fill-current text-white" />
                <span>Special Offers & Letter Dekho 💌</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              </button>
            </div>
          )}
        </div>

        {/* 
          Slide Bottom Navigation Controls
          Previous and Next buttons, slide dot indicator (1 to 5), and Auto-slide toggle
        */}
        <div className="relative z-10 px-3 py-2 sm:px-5 bg-black/40 border-t border-rose-500/20 backdrop-blur-md flex items-center justify-between shrink-0">
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/15 text-white/50 hover:text-white disabled:opacity-0 disabled:pointer-events-none transition-all border border-white/5 hover:border-white/20 cursor-pointer"
            title="Pichli Slide"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {/* Center: Slide Dots Indicator & Auto-Play / Pause Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Interactive Slide Dots */}
            <div className="flex items-center gap-1.5">
              {FILMY_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    setTimerProgress(0);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentSlideIndex
                      ? 'w-4 sm:w-5 bg-gradient-to-r from-rose-400 to-amber-300 shadow-sm'
                      : 'w-1.5 bg-white/25 hover:bg-white/50'
                  }`}
                  title={`Slide ${idx + 1} pe jao`}
                />
              ))}
            </div>

            {/* Interactive Auto-Play / Pause Button */}
            {!isLastSlide ? (
              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  isPaused
                    ? 'bg-rose-600/75 hover:bg-rose-500 text-white border border-rose-400/50 shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-rose-200 border border-white/15'
                }`}
                title={isPaused ? 'Auto slide chalu karo' : 'Auto slide pause karo'}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3 h-3 fill-white text-white" />
                    <span className="hidden sm:inline">Auto-Play</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3 h-3 text-amber-300 fill-amber-300" />
                    <span className="hidden sm:inline">Pause</span>
                  </>
                )}
              </button>
            ) : (
              <div className="text-[11px] font-semibold text-rose-300/80 flex items-center gap-1 select-none">
                <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                <span>Dil Ki Baat ✨</span>
              </div>
            )}
          </div>

          {currentSlideIndex < totalSlides - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-rose-500/30 text-white/70 hover:text-white border border-white/10 hover:border-rose-400/40 transition-all cursor-pointer shadow-sm"
              title="Agli Slide"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                setCurrentSlideIndex(0);
                setTimerProgress(0);
                setIsPaused(true);
              }}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-amber-500/30 text-white/70 hover:text-white border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer"
              title="Slide 1 se dobara dekho"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Slide 1 ↺</span>
            </button>
          )}
        </div>
      </div>

      {/* Song Customization Modal */}
      {showSongModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-gradient-to-b from-[#2a0616] via-[#1a030f] to-[#120108] border border-rose-500/40 rounded-2xl p-5 shadow-2xl text-left text-rose-100">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-rose-500/20">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Apni Pasand Ka Gana Lagao</h3>
              </div>
              <button
                onClick={() => setShowSongModal(false)}
                className="text-xs text-rose-400 hover:text-white px-2 py-0.5 rounded cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-rose-200/80 mb-3 leading-relaxed">
              Pehle wale romantic gane chuno ya apna favorite gaana lagao:
            </p>

            {/* Presets List */}
            <div className="space-y-1.5 mb-3 max-h-48 overflow-y-auto no-scrollbar">
              {PRESET_SONGS.map((song) => {
                const isSelected = currentSongTitle.includes(song.title);
                return (
                  <div
                    key={song.id}
                    className={`p-2 rounded-xl border flex flex-col gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-rose-950/80 border-rose-400 text-white font-bold'
                        : 'bg-black/30 hover:bg-white/5 border-rose-900/40 text-rose-200'
                    }`}
                  >
                    <div 
                      onClick={() => {
                        romanticAudio.selectPresetSong(song.id);
                        romanticAudio.play();
                        setShowSongModal(false);
                      }}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-semibold flex items-center gap-1.5">
                          <span>{song.title}</span>
                          <span className="text-[10px] px-1 py-0.2 rounded-full bg-rose-500/20 text-rose-300">
                            {song.tag}
                          </span>
                        </div>
                        <span className="text-[10px] text-rose-400/70 block">{song.filmOrArtist}</span>
                      </div>
                      {isSelected ? (
                        <span className="text-amber-400 text-xs flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                          Playing
                        </span>
                      ) : (
                        <span className="text-[11px] text-rose-300/80 bg-white/10 px-2 py-0.5 rounded-md hover:bg-white/20">
                          Play
                        </span>
                      )}
                    </div>

                    {/* Spotify & YouTube Links */}
                    <div className="flex items-center gap-1.5 pt-1 border-t border-white/5">
                      <a
                        href={song.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 py-0.5 px-1.5 rounded bg-[#1DB954]/20 hover:bg-[#1DB954]/30 border border-[#1DB954]/40 text-[#1ed760] text-[9px] font-bold"
                        title="Spotify pe suno"
                      >
                        <ExternalLink className="w-2.5 h-2.5" />
                        <span>Spotify</span>
                      </a>
                      <a
                        href={song.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 py-0.5 px-1.5 rounded bg-[#FF0000]/20 hover:bg-[#FF0000]/30 border border-[#FF0000]/40 text-[#ff4e4e] text-[9px] font-bold"
                        title="YouTube pe suno"
                      >
                        <ExternalLink className="w-2.5 h-2.5" />
                        <span>YouTube</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Option 1: Upload from Device */}
            <div className="mb-3">
              <label className="block text-[11px] font-bold text-rose-300 uppercase tracking-wider mb-1.5">
                Device Se Audio Chuno:
              </label>
              <input
                type="file"
                ref={fileInputRef}
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600/40 to-pink-600/40 hover:from-rose-600/60 hover:to-pink-600/60 border border-rose-400/30 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Audio File Upload Karo (.mp3)</span>
              </button>
            </div>

            {/* Option 2: Direct Audio URL */}
            <form onSubmit={handleUrlSubmit} className="mb-3">
              <label className="block text-[11px] font-bold text-rose-300 uppercase tracking-wider mb-1.5">
                Ya Audio URL Daalo:
              </label>
              <div className="flex gap-1.5">
                <input
                  type="url"
                  placeholder="https://example.com/song.mp3"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  className="flex-1 bg-black/60 border border-rose-500/30 rounded-xl px-3 py-1.5 text-xs text-white placeholder-rose-400/40 focus:outline-none focus:border-rose-400"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Set
                </button>
              </div>
            </form>

            {/* Reset to Default Acoustic Melody */}
            {romanticAudio.getIsCustom() && (
              <button
                type="button"
                onClick={() => {
                  romanticAudio.clearCustomSong();
                  setShowSongModal(false);
                }}
                className="w-full py-1.5 text-[11px] text-amber-300/80 hover:text-amber-200 underline text-center cursor-pointer"
              >
                Default Acoustic Melody Pe Wapas Chalo
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
