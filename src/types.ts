export interface StrategyOption {
  id: string;
  title: string;
  category: 'excuse' | 'humor' | 'curiosity' | 'reset' | 'voicenote';
  tag: string;
  believabilityScore: number; // e.g. 95%
  pressureScore: number; // e.g. 1/10
  clickProbability: number; // e.g. 98%
  headline: string;
  bahanaStory: string; // Background excuse context
  messageText: string; // Exact text to copy
  voiceNoteScript?: string; // Audio script
  psychologyBreakdown: string; // Why this works on her mind
  whenToUse: string; // Best time/situation
  howToFollowUp: string; // If she responds
}

export interface SimulationMessage {
  id: string;
  sender: 'user' | 'priyanka';
  text: string;
  time: string;
  isHistoric?: boolean;
}

export interface ChatReplyBranch {
  trigger: string;
  priyankaReply: string;
  yourNextMove: string;
  sampleNextText: string;
  dangerLevel: 'safe' | 'caution' | 'critical';
}
