import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

export const FloatingMusicControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(romanticAudio.getIsPlaying());
  const [songName, setSongName] = useState(romanticAudio.getSongName());

  useEffect(() => {
    return romanticAudio.subscribe((playing) => {
      setIsPlaying(playing);
      setSongName(romanticAudio.getSongName());
    });
  }, []);

  const handleToggle = () => {
    romanticAudio.toggle();
  };

  return (
    <div className="fixed bottom-3 left-3 z-30 select-none">
      <button
        onClick={handleToggle}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border transition-all shadow-xl cursor-pointer ${
          isPlaying
            ? 'bg-gradient-to-r from-rose-950/90 to-[#2c0717]/90 border-rose-500/50 text-rose-200 hover:border-rose-400'
            : 'bg-black/60 border-white/10 text-rose-300/60 hover:text-rose-200'
        }`}
        title={isPlaying ? 'Music playing (Click to mute)' : 'Music muted (Click to play)'}
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-3.5">
              <span className="w-0.5 bg-rose-400 rounded-full animate-bounce [animation-delay:0.1s] h-3" />
              <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.25s] h-3.5" />
              <span className="w-0.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.4s] h-2" />
            </div>
            <Volume2 className="w-3.5 h-3.5 text-rose-300" />
            <span className="text-[11px] font-bold text-white tracking-tight hidden sm:inline max-w-[120px] truncate">
              {songName}
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium hidden sm:inline">
              Music Muted
            </span>
          </>
        )}
      </button>
    </div>
  );
};
