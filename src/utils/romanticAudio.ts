import { TUM_SE_HI_AUDIO_PATH } from '../config';

// Romantic Background Music Engine
// Supports curated preset romantic songs (Tum Se Hi, Kesariya, Apna Bana Le, etc.)
// AND custom user songs (file/URL)

export interface SongItem {
  id: string;
  title: string;
  filmOrArtist: string;
  tag: string;
  chordTheme: 'acoustic' | 'piano' | 'ambient' | 'vintage' | 'lofi';
  spotifyUrl: string;
  youtubeUrl: string;
}

export const PRESET_SONGS: SongItem[] = [
  {
    id: 'tum-se-hi',
    title: 'Tum Se Hi',
    filmOrArtist: 'Jab We Met • Acoustic Lo-Fi',
    tag: 'Sukoon & Peace ☕',
    chordTheme: 'acoustic',
    spotifyUrl: 'https://open.spotify.com/search/Tum%20Se%20Hi%20Jab%20We%20Met',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Tum+Se+Hi+Jab+We+Met+song',
  },
  {
    id: 'kesariya',
    title: 'Kesariya',
    filmOrArtist: 'Brahmāstra • Soft Piano Reverie',
    tag: 'Soulful & Dreamy ✨',
    chordTheme: 'piano',
    spotifyUrl: 'https://open.spotify.com/search/Kesariya%20Brahmastra',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Kesariya+Brahmastra+song',
  },
  {
    id: 'apna-bana-le',
    title: 'Apna Bana Le',
    filmOrArtist: 'Bhediya • Ambient Guitar Chords',
    tag: 'Late Night Chill 🌙',
    chordTheme: 'ambient',
    spotifyUrl: 'https://open.spotify.com/search/Apna%20Bana%20Le%20Bhediya',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Apna+Bana+Le+Bhediya+song',
  },
  {
    id: 'pehla-nasha',
    title: 'Pehla Nasha',
    filmOrArtist: 'Vintage Romance • Fingerstyle Plucks',
    tag: 'Warm Butterflies 🦋',
    chordTheme: 'vintage',
    spotifyUrl: 'https://open.spotify.com/search/Pehla%20Nasha',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Pehla+Nasha+song',
  },
  {
    id: 'raataan-lambiyan',
    title: 'Raataan Lambiyan',
    filmOrArtist: 'Shershaah • Acoustic Heartstrings',
    tag: 'Sweet Melodies 🌸',
    chordTheme: 'lofi',
    spotifyUrl: 'https://open.spotify.com/search/Raataan%20Lambiyan%20Shershaah',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Raataan+Lambiyan+Shershaah+song',
  },
];

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private loopInterval: any = null;
  private chordIndex = 0;
  private masterGain: GainNode | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();
  
  // Active selected preset song
  private currentSong: SongItem = PRESET_SONGS[0];

  // Custom audio element for user's favorite song
  private customAudio: HTMLAudioElement | null = null;
  private customAudioName: string = '';
  private isUsingCustomAudio = false;

  // Real MP3 audio element for Tum Se Hi (from public/tum-se-hi.mp3)
  private tumSeHiAudio: HTMLAudioElement | null = null;

  // Sound banks for different songs
  private soundBanks: Record<string, { root: number; notes: number[] }[]> = {
    acoustic: [
      { root: 164.81, notes: [164.81, 246.94, 329.63, 392.00, 493.88] }, // Em
      { root: 130.81, notes: [130.81, 261.63, 329.63, 392.00, 493.88] }, // Cmaj7
      { root: 196.00, notes: [196.00, 246.94, 293.66, 392.00, 587.33] }, // G
      { root: 146.83, notes: [146.83, 220.00, 293.66, 369.99, 440.00] }, // D
    ],
    piano: [
      { root: 130.81, notes: [261.63, 329.63, 392.00, 523.25] }, // C
      { root: 174.61, notes: [220.00, 261.63, 349.23, 440.00] }, // Fmaj7
      { root: 110.00, notes: [220.00, 261.63, 329.63, 440.00] }, // Am
      { root: 196.00, notes: [246.94, 293.66, 392.00, 493.88] }, // G
    ],
    ambient: [
      { root: 146.83, notes: [220.00, 293.66, 369.99, 440.00, 587.33] }, // Dmaj9
      { root: 123.47, notes: [246.94, 293.66, 369.99, 440.00] }, // Bm7
      { root: 196.00, notes: [246.94, 293.66, 392.00, 587.33] }, // Gadd9
      { root: 110.00, notes: [220.00, 277.18, 329.63, 440.00] }, // A
    ],
    vintage: [
      { root: 196.00, notes: [246.94, 293.66, 392.00, 493.88] }, // G
      { root: 164.81, notes: [246.94, 329.63, 392.00, 493.88] }, // Em
      { root: 130.81, notes: [261.63, 329.63, 392.00, 523.25] }, // C
      { root: 146.83, notes: [220.00, 293.66, 369.99, 440.00] }, // D7
    ],
    lofi: [
      { root: 110.00, notes: [220.00, 261.63, 329.63, 392.00] }, // Am7
      { root: 146.83, notes: [220.00, 293.66, 349.23, 440.00] }, // Dm7
      { root: 130.81, notes: [261.63, 329.63, 392.00, 493.88] }, // Cmaj7
      { root: 174.61, notes: [220.00, 261.63, 349.23, 440.00] }, // Fmaj7
    ],
  };

  constructor() {
    if (typeof window !== 'undefined') {
      const savedSongId = localStorage.getItem('selected_preset_song');
      if (savedSongId) {
        const found = PRESET_SONGS.find((s) => s.id === savedSongId);
        if (found) {
          this.currentSong = found;
        }
      }
      const savedName = localStorage.getItem('custom_song_name');
      if (savedName) {
        this.customAudioName = savedName;
      }
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private pluckNote(freq: number, startTime: number, duration: number, isBass = false, isPiano = false) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = isBass ? 'sine' : isPiano ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isBass ? 380 : isPiano ? 1400 : 1800, startTime);
    filter.frequency.exponentialRampToValueAtTime(isBass ? 240 : 350, startTime + duration);

    const attack = isBass ? 0.04 : 0.015;
    const peak = isBass ? 0.22 : 0.12;

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(peak, startTime + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  private playArpeggioStep() {
    if (!this.ctx || !this.isPlaying || this.isUsingCustomAudio) return;

    const theme = this.currentSong.chordTheme || 'acoustic';
    const chords = this.soundBanks[theme] || this.soundBanks.acoustic;
    const currentChord = chords[this.chordIndex % chords.length];
    this.chordIndex++;

    const now = this.ctx.currentTime;
    const noteGap = 0.28;
    const isPiano = theme === 'piano';

    this.pluckNote(currentChord.root, now, 2.2, true, isPiano);

    currentChord.notes.forEach((freq, idx) => {
      const noteTime = now + (idx + 1) * noteGap;
      const duration = 1.6;
      this.pluckNote(freq, noteTime, duration, false, isPiano);
    });
  }

  public selectPresetSong(songId: string) {
    const found = PRESET_SONGS.find((s) => s.id === songId);
    if (!found) return;

    this.currentSong = found;
    this.isUsingCustomAudio = false;

    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }

    if (this.tumSeHiAudio && songId !== 'tum-se-hi') {
      this.tumSeHiAudio.pause();
    }

    try {
      localStorage.setItem('selected_preset_song', songId);
      localStorage.removeItem('custom_song_name');
    } catch (_) {}

    if (this.isPlaying) {
      this.chordIndex = 0;
      if (songId === 'tum-se-hi') {
        this.play();
      } else {
        this.playSynth();
      }
    }
    this.notify();
  }

  public setCustomSong(source: string | File, name?: string) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }

    const audio = new Audio();
    audio.loop = true;

    if (typeof source === 'string') {
      audio.src = source;
      this.customAudioName = name || 'Custom Song';
    } else {
      audio.src = URL.createObjectURL(source);
      this.customAudioName = name || source.name.replace(/\.[^/.]+$/, '');
    }

    try {
      localStorage.setItem('custom_song_name', this.customAudioName);
    } catch (_) {}

    this.customAudio = audio;
    this.isUsingCustomAudio = true;

    if (this.isPlaying) {
      if (this.loopInterval) {
        clearInterval(this.loopInterval);
        this.loopInterval = null;
      }
      this.customAudio.play().catch(() => {});
    }

    this.notify();
  }

  public clearCustomSong() {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    this.isUsingCustomAudio = false;
    this.customAudioName = '';
    try {
      localStorage.removeItem('custom_song_name');
    } catch (_) {}

    if (this.isPlaying) {
      this.playSynth();
    }
    this.notify();
  }

  private playSynth() {
    this.initContext();
    this.playArpeggioStep();
    if (this.loopInterval) clearInterval(this.loopInterval);
    this.loopInterval = setInterval(() => {
      if (this.isPlaying && !this.isUsingCustomAudio) {
        this.playArpeggioStep();
      }
    }, 2100);
  }

  public play() {
    this.isPlaying = true;
    if (this.isUsingCustomAudio && this.customAudio) {
      if (this.tumSeHiAudio) this.tumSeHiAudio.pause();
      this.customAudio.play().catch(() => {
        this.playSynth();
      });
    } else if (this.currentSong.id === 'tum-se-hi' && TUM_SE_HI_AUDIO_PATH) {
      if (!this.tumSeHiAudio) {
        this.tumSeHiAudio = new Audio(TUM_SE_HI_AUDIO_PATH);
        this.tumSeHiAudio.loop = true;
      }
      this.tumSeHiAudio.play().catch(() => {
        // Fallback to soothing acoustic synth if tum-se-hi.mp3 is not placed in public folder yet
        this.playSynth();
      });
    } else {
      if (this.tumSeHiAudio) {
        this.tumSeHiAudio.pause();
      }
      this.playSynth();
    }
    this.notify();
  }

  public playTumSeHi() {
    this.selectPresetSong('tum-se-hi');
    this.play();
  }

  public pause() {
    this.isPlaying = false;
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.tumSeHiAudio) {
      this.tumSeHiAudio.pause();
    }
    this.notify();
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getSongName(): string {
    if (this.isUsingCustomAudio && this.customAudioName) {
      return this.customAudioName;
    }
    return this.currentSong.title;
  }

  public getCurrentSong(): SongItem {
    return this.currentSong;
  }

  public getPresetSongs(): SongItem[] {
    return PRESET_SONGS;
  }

  public getIsCustom(): boolean {
    return this.isUsingCustomAudio;
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.add(cb);
    cb(this.isPlaying);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }
}

export const romanticAudio = new RomanticAudioEngine();

