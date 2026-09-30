import React, { useState, useRef } from 'react';
import { 
  Heart, Sparkles, Music, Gift, Coffee, Check, Volume2, VolumeX,
  MessageCircleHeart, Flame, ExternalLink, Upload, ShieldCheck, Play, Pause, Disc3,
  MessageCircle
} from 'lucide-react';
import { romanticAudio, PRESET_SONGS } from '../utils/romanticAudio';
import { MY_WHATSAPP_PHONE_NUMBER } from '../config';

interface PhilosophicalOffer {
  id: string;
  tag: string;
  title: string;
  philosophicLine: string;
  offerDetail: string;
  icon: any;
}

const PHILOSOPHICAL_OFFERS: PhilosophicalOffer[] = [
  {
    id: '1',
    tag: 'Zero Ego & Peace ☕',
    title: 'The Coffee Truce Treaty ☕',
    philosophicLine: 'Ego jeet bhi jaye toh rishta haar jata hai Madam. 9 din ka sannata kisi baat ka ilaaj nhi hai. Jo dosti ek cup premium cold coffee par chill banter mei restore ho sakti hai, usme khamoshi rakhna dono ke sath na-insaafi hai.',
    offerDetail: 'Penalty Clause: Meri taraf se best cafe mei premium cold coffee orr unlimited laughter.',
    icon: Coffee,
  },
  {
    id: '2',
    tag: 'Lifetime Banter 👑',
    title: 'The Unlimited Roasting License ✨',
    philosophicLine: 'Madam ka roast krne ka birthright hamesha active rahega! Chhoti-moti overthinking orr 21st Sep ka kalesh officially dismiss kiya jaata hai. Dil mei sirf unconditional respect hai, toh chalo normal form mei wapas aate hai.',
    offerDetail: 'Lifetime Perk: Full right to roast anytime without any formal permissions.',
    icon: Flame,
  },
  {
    id: '3',
    tag: 'Safe Space & Chill 🛡️',
    title: 'The 24/7 Venting & Listening Protocol 🛡️',
    philosophicLine: 'Jab bhi tera mood off ho ya duniya se chidh ho, bina kisi filter baat krne ka safe space hamesha open rahega. Zero judgement, 100% chill vibes orr sachhi dosti.',
    offerDetail: 'Official Warranty: Instant listening ear orr tension-free conversations forever.',
    icon: ShieldCheck,
  },
];

interface RomanticSurprisePageProps {
  initialTab?: 'offers' | 'letter' | 'quiz' | 'playlist';
}

export const RomanticSurprisePage: React.FC<RomanticSurprisePageProps> = ({ initialTab = 'offers' }) => {
  const [herName] = useState('Madam');
  const [selectedOffer, setSelectedOffer] = useState(0);
  const [forgiveClicked, setForgiveClicked] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'offers' | 'letter' | 'quiz' | 'playlist'>(
    initialTab === 'quiz' ? 'quiz' : initialTab === 'letter' ? 'letter' : initialTab === 'playlist' ? 'playlist' : 'offers'
  );

  const [isAudioPlaying, setIsAudioPlaying] = useState(romanticAudio.getIsPlaying());
  const [songTitle, setSongTitle] = useState(romanticAudio.getSongName());
  const [customUrl, setCustomUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    return romanticAudio.subscribe((playing) => {
      setIsAudioPlaying(playing);
      setSongTitle(romanticAudio.getSongName());
    });
  }, []);

  const toggleMusic = () => {
    romanticAudio.toggle();
    setIsAudioPlaying(romanticAudio.getIsPlaying());
  };

  const moveNoButton = () => {
    const randomX = (Math.random() - 0.5) * 140;
    const randomY = (Math.random() - 0.5) * 50;
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleTrueQuizYes = () => {
    setForgiveClicked(true);
    fetch('/api/reaction-alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reaction: 'Haan, Dosti & Banter Restored! ☕',
        note: 'Madam passed True Quiz in Special Section',
      }),
    }).catch(() => {});
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      romanticAudio.setCustomSong(file);
      romanticAudio.play();
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      romanticAudio.setCustomSong(customUrl.trim(), 'Custom Track');
      romanticAudio.play();
      setCustomUrl('');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col rounded-2xl sm:rounded-3xl shadow-2xl border border-rose-500/25 bg-gradient-to-b from-[#220412]/95 via-[#16020c]/95 to-[#0e0107]/95 text-rose-50 p-3 sm:p-5 select-none transition-all my-auto max-h-[calc(100dvh-5rem)] overflow-y-auto no-scrollbar">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-rose-500/20">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-black bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200 bg-clip-text text-transparent">
              Dedicated To {herName} ✨
            </h2>
            <p className="text-[10px] text-rose-300/80">
              Pure respect, unfiltered banter & zero drama.
            </p>
          </div>
        </div>

        {/* Live status badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-200 text-[10px] sm:text-[11px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Verified Peace</span>
        </div>
      </div>

      {/* Interactive Tabs Bar */}
      <div className="my-2.5 flex gap-1.5 justify-center flex-wrap">
        {[
          { id: 'offers', label: '🎁 Treaties & Perks', icon: Gift },
          { id: 'letter', label: '💌 Special Letter', icon: MessageCircleHeart },
          { id: 'quiz', label: '📜 True Quiz', icon: Sparkles },
          { id: 'playlist', label: '🎵 Music Player', icon: Music },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeInteractiveTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveInteractiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md ring-1 ring-rose-400/40'
                  : 'bg-[#290515]/90 text-rose-200/80 hover:bg-[#38081e] hover:text-white border border-rose-900/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Stage */}
      <div className="py-1 flex-1 min-h-0 overflow-y-auto no-scrollbar">
        {/* Tab 1: Special Offers (Original Treaties & Perks) */}
        {activeInteractiveTab === 'offers' && (
          <div className="space-y-3 animate-in fade-in duration-300 max-h-[calc(100dvh-12rem)] overflow-y-auto no-scrollbar pr-0.5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full">
              {PHILOSOPHICAL_OFFERS.map((item, i) => {
                const Icon = item.icon;
                const isSelected = selectedOffer === i;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedOffer(i)}
                    className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#450c27]/95 via-[#34081c]/95 to-[#210312]/90 border-rose-400 ring-1 ring-rose-500/40 shadow-xl'
                        : 'bg-[#260515]/80 border-rose-900/50 hover:border-rose-700/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
                          {item.tag}
                        </span>
                        <Icon className="w-3.5 h-3.5 text-amber-300" />
                      </div>
                      <h3 className="font-black text-white text-xs sm:text-sm mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-rose-100/90 italic font-serif leading-relaxed mb-2.5 bg-black/30 p-2 rounded-lg border border-white/5">
                        &quot;{item.philosophicLine}&quot;
                      </p>
                    </div>
                    <div className="pt-2 border-t border-rose-500/20 text-[11px] font-semibold text-emerald-300 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>{item.offerDetail}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Special Letter (Focused 100% on HER in WhatsApp Language) */}
        {activeInteractiveTab === 'letter' && (
          <div className="max-w-xl mx-auto w-full bg-gradient-to-br from-[#38091f]/95 via-[#260515]/95 to-[#1c030f]/95 border border-rose-500/35 rounded-2xl p-4 sm:p-5 shadow-2xl animate-in zoom-in-95 duration-300 max-h-[calc(100dvh-12rem)] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between pb-2 border-b border-rose-500/20">
              <span className="text-xs font-bold text-rose-300 uppercase tracking-widest flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                Pure Friendship & Respect
              </span>
              <span className="text-[10px] text-rose-400/80 font-mono">Status: Pure & Honest</span>
            </div>

            <div className="mt-3 text-rose-100 text-xs sm:text-sm leading-relaxed space-y-3">
              <p className="font-extrabold text-pink-300 text-sm">
                Dear {herName},
              </p>

              <p className="text-rose-200/90 leading-relaxed text-xs sm:text-sm">
                Tu hamesha kitni sorted, chill orr genuine rehti hai na... orr 21st ko faltu mei tujhe itna irritate orr uncomfortable feel krwaya. Teri bhi apni life hai, busy schedule, college/work ka load ya apna mood ho sakta hai, orr tu deserve krti hai ki log bina kisi entitlement ke teri space orr time ki respect kare.
              </p>

     

              <p className="text-rose-200/90 leading-relaxed text-xs sm:text-sm">
                Teri hasi, teri energy orr tera bina filter chill rehna bohot rare hai. Tujhe kabhi bhi kisi ki overthinking ya immature harkat ki wajah se awkward ya pressured feel nhi hona chahiye.
              </p>

              <p className="text-rose-200/90 leading-relaxed text-xs sm:text-sm">
                Tujhe koi explanation dene ya formal reply krne ki bilkul zaroorat nhi hai. Ye msg bas isliye hai taaki tujhe pata rahe ki teri peace of mind orr tera comfort sabse pehle aata hai. Take all your time, hamesha chill reh orr aise hi bindass muskuraati reh! ✨
              </p>
            </div>

            <div className="pt-2.5 flex items-center justify-between text-xs text-rose-300/80 border-t border-rose-500/20 mt-3">
              <span>Always respecting your space & comfort 🌸</span>
              <span className="font-mono text-[10px] text-pink-300/80">With Sincere Respect ✨</span>
            </div>
          </div>
        )}

        {/* Tab 3: Interactive True Quiz */}
        {activeInteractiveTab === 'quiz' && (
          <div className="max-w-md mx-auto w-full bg-[#2b0616]/95 border border-rose-500/40 rounded-2xl p-4 sm:p-6 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center mx-auto text-white shadow-lg mb-2">
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            <h3 className="text-sm sm:text-base font-black text-white mb-1">
              True Quiz 📜
            </h3>
            <p className="text-xs text-rose-200/85 mb-4 leading-relaxed">
              Sach sach bata Madam... 6 din mei meri kami mehsoos hui na? Chal ab gussa side mei rakh orr chill dosti & daily banter restore kare?
            </p>

            {!forgiveClicked ? (
              <div className="space-y-3 relative min-h-[60px] flex flex-col items-center justify-center">
                <button
                  onClick={handleTrueQuizYes}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold rounded-xl shadow-lg text-xs sm:text-sm transition-all transform hover:scale-105 active:scale-95 cursor-pointer border border-emerald-400/40"
                >
                  Haa, Dosti & Banter Restored! ☕🤝
                </button>

                {/* Playful escaping button */}
                <div className="relative w-full flex justify-center">
                  <button
                    onMouseEnter={moveNoButton}
                    onClick={moveNoButton}
                    style={{
                      transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                      transition: 'all 0.15s ease-out',
                    }}
                    className="px-3.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-rose-300/80 text-[11px] font-semibold border border-white/10 cursor-pointer select-none"
                  >
                    Nhi, thoda orr nakhra dikhana hai 😜
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 sm:p-5 bg-gradient-to-b from-[#0a2717] via-[#061c10] to-[#031109] border-2 border-emerald-400/80 rounded-2xl sm:rounded-3xl text-emerald-100 animate-in zoom-in-95 duration-300 shadow-2xl shadow-emerald-950/70 flex flex-col items-center text-center">
                <span className="text-3xl sm:text-4xl block mb-2 animate-bounce">🎉 🤝 ☕</span>
                <h4 className="font-black text-white text-sm sm:text-base tracking-tight">
                  Deal Done! True Quiz Passed! ✨
                </h4>
                <p className="text-xs text-emerald-200/90 mt-1 max-w-xs mx-auto leading-relaxed">
                  Dosti & banter 100% restore ho chuki hai! Madam ne officially truce accept kar li! 
                </p>

                {/* Bada Green WhatsApp Button */}
                {(() => {
                  const phoneDigits = MY_WHATSAPP_PHONE_NUMBER ? MY_WHATSAPP_PHONE_NUMBER.replace(/\D/g, '') : '';
                  const targetUrl = phoneDigits && phoneDigits.length >= 10
                    ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent("Haa, dosti & banter 100% restored! ☕🤝 Gussa side mei, ab chill vibes only.")}`
                    : `https://api.whatsapp.com/send?text=${encodeURIComponent("Haa, dosti & banter 100% restored! ☕🤝 Gussa side mei, ab chill vibes only.")}`;

                  return (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-4 py-3.5 px-6 bg-gradient-to-r from-[#25D366] via-[#20be5a] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0f7a6e] active:scale-95 text-white font-black text-sm sm:text-base rounded-2xl shadow-2xl shadow-emerald-950 flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.02] border-2 border-emerald-200/60 cursor-pointer animate-pulse ring-4 ring-emerald-500/25"
                    >
                      <MessageCircle className="w-5 h-5 fill-current text-white shrink-0" />
                      <span>WhatsApp Pe Confirm Bhejo ☕</span>
                    </a>
                  );
                })()}

                <p className="text-[10px] text-emerald-400/80 mt-2 font-medium">
                  (Click krte hi WhatsApp khul jayega confirm message bhejne ke liye 📲)
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Background Music Controls & Full Playlist with Spotify & YouTube */}
        {activeInteractiveTab === 'playlist' && (
          <div className="max-w-md mx-auto w-full bg-[#2b0616]/95 border border-rose-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl animate-in zoom-in-95 duration-300 max-h-[calc(100dvh-12rem)] overflow-y-auto no-scrollbar">
            {/* Header with album badge */}
            <div className="flex items-center justify-between pb-3 border-b border-rose-500/20 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md">
                  <Disc3 className={`w-5 h-5 ${isAudioPlaying ? 'animate-spin [animation-duration:4s]' : ''}`} />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-black text-white">
                    Romantic Music Player 🎶
                  </h3>
                  <p className="text-[11px] text-rose-300/80">
                    Now Playing: <span className="text-amber-300 font-bold">{songTitle}</span>
                  </p>
                </div>
              </div>

              {/* Master Play/Pause Toggle */}
              <button
                onClick={toggleMusic}
                className={`p-2 sm:px-3 sm:py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                  isAudioPlaying
                    ? 'bg-rose-600 hover:bg-rose-500 text-white'
                    : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'
                }`}
                title={isAudioPlaying ? 'Pause Melody' : 'Play Melody'}
              >
                {isAudioPlaying ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Play</span>
                  </>
                )}
              </button>
            </div>

            {/* Presets Playlist Tracklist with Spotify & YouTube Links */}
            <div className="space-y-2 mb-4 text-left">
              <span className="block text-[10px] font-bold text-rose-300/90 uppercase tracking-wider mb-1">
                Pehle Wale Gane (Spotify & YouTube Links):
              </span>
              {PRESET_SONGS.map((song, index) => {
                const isSelected = songTitle.includes(song.title);
                return (
                  <div
                    key={song.id}
                    className={`p-2.5 rounded-xl border transition-all flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-rose-950/90 via-[#3b0b23]/90 to-[#260515]/90 border-rose-400 ring-1 ring-rose-400/40 shadow-md'
                        : 'bg-black/35 hover:bg-white/5 border-rose-900/40 hover:border-rose-700/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-xs font-mono text-rose-200">
                          {isSelected && isAudioPlaying ? (
                            <div className="flex items-end gap-0.5 h-3">
                              <span className="w-0.5 bg-rose-400 rounded-full animate-bounce [animation-delay:0.1s] h-2.5" />
                              <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.25s] h-3" />
                              <span className="w-0.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.4s] h-2" />
                            </div>
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
                            <span>{song.title}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 font-normal">
                              {song.tag}
                            </span>
                          </div>
                          <p className="text-[10px] text-rose-300/70 truncate">
                            {song.filmOrArtist}
                          </p>
                        </div>
                      </div>

                      {/* Play in Web Audio Player */}
                      <button
                        type="button"
                        onClick={() => {
                          romanticAudio.selectPresetSong(song.id);
                          romanticAudio.play();
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                          isSelected && isAudioPlaying
                            ? 'bg-rose-500 text-white shadow-sm'
                            : 'bg-white/10 text-rose-200 hover:bg-white/20 hover:text-white'
                        }`}
                        title="Website me chalao"
                      >
                        {isSelected && isAudioPlaying ? (
                          <>
                            <Pause className="w-3 h-3 fill-current" />
                            <span>Playing</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 fill-current" />
                            <span>Play</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Spotify and YouTube Direct Action Buttons */}
                    <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                      <a
                        href={song.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-[#1DB954]/20 hover:bg-[#1DB954]/30 border border-[#1DB954]/40 text-[#1ed760] text-[10px] font-bold transition-all cursor-pointer"
                        title="Spotify pe suno"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Spotify</span>
                      </a>
                      <a
                        href={song.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-[#FF0000]/20 hover:bg-[#FF0000]/30 border border-[#FF0000]/40 text-[#ff4e4e] text-[10px] font-bold transition-all cursor-pointer"
                        title="YouTube pe suno"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>YouTube</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Song Selector */}
            <div className="pt-3 border-t border-rose-500/20 text-left">
              <span className="block text-[11px] font-bold text-rose-300 uppercase tracking-wider mb-2">
                Ya Apni Pasand Ka Gana Lagao:
              </span>
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
                className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-rose-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer mb-2"
              >
                <Upload className="w-3.5 h-3.5 text-amber-300" />
                <span>Device Se MP3 Upload Karo</span>
              </button>

              <form onSubmit={handleUrlSubmit} className="flex gap-1.5">
                <input
                  type="url"
                  placeholder="Ya song URL (https://...mp3)"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="flex-1 bg-black/60 border border-rose-500/30 rounded-xl px-2.5 py-1 text-xs text-white placeholder-rose-400/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Set
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
