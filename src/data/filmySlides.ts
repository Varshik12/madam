export interface FilmySlide {
  id: number;
  filmTag: string;
  headline: string;
  filmyDialogue: string;
  romanceShayari: string;
  emojiArt: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
}

export const FILMY_SLIDES: FilmySlide[] = [
  {
    id: 1,
    filmTag: 'Courtroom Case File #01 👀',
    headline: '“Ek important case saamne aaya hai… 👀”',
    filmyDialogue: `Ek ladki mujhse naraz hai.
Orr accused ko samajh nhi aa rha ki usne aisa kya kr diya… 🌝😂`,
    romanceShayari: `Accused: Tera Coder Dost 💻
Victim: Madam (100% attitude ke sath) 👑
Case: 9 din ka silence orr unknown IPC sections!`,
    emojiArt: '👀 ⚖️ 🌝',
    bgColor: 'from-[#2b0816] via-[#400d23] to-[#1c040d]',
    borderColor: 'border-rose-500/50',
    accentColor: 'text-rose-400',
  },
  {
    id: 2,
    filmTag: 'Investigation Report 🕵️‍♂️',
    headline: '“Investigation mei pata chala…” 🕵️‍♂️',
    filmyDialogue: `Accused us din thoda frustrated tha,
orr frustration mei kuch zyada hi bol gya.
Court ne kaha:  ye toh galat tha.’ 😂`,
    romanceShayari: `Charge Sheet: 21st Sep ka communication gap orr extra bolna.
Verdict: Bhai, galti thi... no arguments on that! 🤦‍♂️☕`,
    emojiArt: '🕵️‍♂️ 📑 😂',
    bgColor: 'from-[#380e15] via-[#4d131f] to-[#1f050b]',
    borderColor: 'border-amber-500/50',
    accentColor: 'text-amber-300',
  },
  {
    id: 3,
    filmTag: 'The Plot Twist 🎬',
    headline: '“Lekin kahani mei ek twist hai…” 🎬',
    filmyDialogue: `Accused ne ego side mei rakhi,
apni galti accept ki,
orr already apology bhi de di.
Lekin madam ki taraf se abhi tak koi review nhi aaya. 🌝`,
    romanceShayari: `Ego side mei rakh di, sorry bhej diya, system debug ho gya...
Current Status: Madam ke review orr rating ka intezaar hai! ⏳✨`,
    emojiArt: '🎬 ⏳ 🌝',
    bgColor: 'from-[#3b0b27] via-[#24041a] to-[#170110]',
    borderColor: 'border-pink-500/50',
    accentColor: 'text-pink-300',
  },
  {
    id: 4,
    filmTag: 'Final Verdict 🥁',
    headline: '“Toh ab final question…” 🥁',
    filmyDialogue: `Kya accused ko ek orr attempt krna chahiye?
Ya chup-chaap apni izzat bachakar ghar chala jana chahiye? 😂

Decision pending…`,
    romanceShayari: `Decision pending in Madam's Supreme Court... ⚖️
Batao, maaf krna hai ya remand pe bhejna hai? 😜☕`,
    emojiArt: '🥁 ⚖️ 😂',
    bgColor: 'from-[#420a22] via-[#2d0718] to-[#1a030e]',
    borderColor: 'border-pink-500/50',
    accentColor: 'text-pink-300',
  },
  {
    id: 5,
    filmTag: 'Bas Ek Baat Genuinely ❤️',
    headline: 'Dil Ki Baat (Zero Expectations) 🕊️',
    filmyDialogue: `"Hum dono ke beech jo connection orr chill vibe hai, wo mere liye bohot special hai. Kabhi-kabhi feelings aur frustration mix ho jate hai, par mai humare pyaare se bond par kabhi koi bojh nhi dalna chahta. I'm truly sorry for the way I reacted.

Jab maine apni feelings express ki thi, tab bhi dil se yahi tha — tumhara comfort, space orr wo cute si hasi mere liye sabse pehle aati hai. Mai bas wahi khubsurat, bina kisi condition waala bond aur pyaari vibes wapas chahta hoon, jahan hum dono bina kisi overthinking ke khush reh sake. 🌸✨" 🌸🤝`,
    romanceShayari: `Na koi haq jatana hai, na koi shart lagana hai,
Tumhari azaadi orr khushi hi sabse pehla thikana hai.
Dosti wahi khoobsurat hai jahan dil par koi bojh na ho,
Bina kisi umeed ke, sirf tumhari muskaan zaroori hai! 🌸✨`,
    emojiArt: '❤️ 🕊️ 🤝',
    bgColor: 'from-[#2e0517] via-[#430926] to-[#1a020d]',
    borderColor: 'border-rose-400/60',
    accentColor: 'text-rose-200',
  },
];
