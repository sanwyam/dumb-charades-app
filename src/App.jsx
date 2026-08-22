import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play, SkipForward, Check, Users, Clock, Trophy, Plus, X,
  Shuffle, ArrowRight, RotateCcw, Clapperboard, Film, Sparkles,
  PartyPopper, Pencil, Popcorn, Ticket, Star,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  MOVIE / SHOW DATA                                                  */
/*  Add more titles any time — just push more strings into these two   */
/*  arrays. The game engine handles any list length automatically.     */
/* ------------------------------------------------------------------ */

const HOLLYWOOD = [
  "Titanic","Avatar","Inception","The Matrix","Jurassic Park","The Lion King",
  "Frozen","Forrest Gump","The Godfather","Pulp Fiction","The Dark Knight",
  "Interstellar","Gladiator","Avengers: Endgame","Iron Man","Spider-Man",
  "Batman Begins","Joker","Toy Story","Finding Nemo","Shrek",
  "The Shawshank Redemption","Fight Club","Jaws","E.T. the Extra-Terrestrial",
  "Star Wars","Back to the Future","Rocky","Home Alone","The Sixth Sense",
  "The Silence of the Lambs","Schindler's List","Braveheart",
  "Gone with the Wind","Casablanca","The Wizard of Oz","Psycho",
  "Jurassic World","King Kong","Godzilla","Pirates of the Caribbean",
  "The Lord of the Rings","Harry Potter and the Sorcerer's Stone",
  "The Hunger Games","Twilight","The Notebook","La La Land","Whiplash",
  "Parasite","Django Unchained","Inglourious Basterds","Kill Bill",
  "The Wolf of Wall Street","Catch Me If You Can","The Terminal","Cast Away",
  "Big Fish","The Truman Show","Edward Scissorhands","Beetlejuice",
  "The Nightmare Before Christmas","Coco","Up","WALL-E","Ratatouille",
  "Monsters, Inc.","The Incredibles","Cars","Aladdin","Beauty and the Beast",
  "The Little Mermaid","Mulan","Tarzan","Pocahontas","Hercules","Brave",
  "Moana","Zootopia","Big Hero 6","Tangled","Frozen II","Encanto","Soul",
  "Luca","Turning Red","Sing","The Secret Life of Pets","Despicable Me",
  "Minions","Madagascar","Kung Fu Panda","How to Train Your Dragon",
  "Ice Age","Rio","The Croods","Trolls","Sherlock Holmes",
  "Mission: Impossible","Skyfall","Casino Royale","The Bourne Identity",
  "Fast and Furious","John Wick","Taken","Die Hard","Speed","The Rock",
  "Con Air","Face/Off","Top Gun","Top Gun: Maverick","Independence Day",
  "Armageddon","Deep Impact","The Day After Tomorrow","2012","San Andreas",
  "World War Z","I Am Legend","Zombieland","Shaun of the Dead","Get Out",
  "A Quiet Place","Hereditary","The Conjuring","Insidious","Annabelle","It",
  "The Exorcist","Halloween","Scream","Saw","Final Destination","The Ring",
  "Paranormal Activity","28 Days Later","The Shining","Se7en","Prisoners",
  "Gone Girl","Shutter Island","Memento","The Prestige","Dunkirk",
  "Oppenheimer","Tenet","The Dark Knight Rises","Man of Steel",
  "Wonder Woman","Aquaman","Justice League","Suicide Squad","Deadpool",
  "Guardians of the Galaxy","Black Panther","Doctor Strange","Ant-Man",
  "Captain America: Civil War","Thor: Ragnarok","X-Men","Logan","Venom",
  "Spider-Man: No Way Home","The Amazing Spider-Man","Ghostbusters",
  "Men in Black","Jumanji","Night at the Museum","The Princess Bride",
  "The Goonies","Stand By Me","Dead Poets Society","Good Will Hunting",
  "A Beautiful Mind","The Pursuit of Happyness","The Blind Side",
  "Remember the Titans","Creed","Million Dollar Baby","Rush",
  "Ford v Ferrari","The Social Network","Steve Jobs","The Imitation Game",
  "Hidden Figures","Bohemian Rhapsody","Rocketman","A Star Is Born",
  "The Greatest Showman","Chicago","Moulin Rouge!","Grease","Mamma Mia!",
  "Les Miserables","Friends","Breaking Bad","Game of Thrones",
  "Stranger Things","The Office","The Big Bang Theory","Money Heist",
  "Sherlock","The Crown","Peaky Blinders","Prison Break",
  "How I Met Your Mother","Suits","Dexter","The Walking Dead",
  "Grey's Anatomy","House","Lost","24","Modern Family",
  "Brooklyn Nine-Nine","The Simpsons","South Park","Rick and Morty",
  "Westworld","Narcos","Vikings","The Witcher","Squid Game",
  "Community","Arrested Development","Fleabag","The Good Place",
  "BoJack Horseman","Mindhunter","Chernobyl","Fargo","True Detective",
  "Better Call Saul","Ozark","The Boys","The Umbrella Academy","Dark",
  "Black Mirror","Twin Peaks","The X-Files","Firefly","Deadwood",
  "The Wire","Band of Brothers","Chuck","Veronica Mars","Skins",
  "Misfits","Peep Show","The IT Crowd","Extras","The Inbetweeners",
  "Derry Girls","Fawlty Towers","Blackadder","Doctor Who","Broadchurch",
  "Line of Duty","Happy Valley","Killing Eve","Luther","Utopia",
  "Black Sails","Rome","Spartacus","The Tudors","Boardwalk Empire",
  "Mad Men","The Sopranos","Six Feet Under","Curb Your Enthusiasm",
  "It's Always Sunny in Philadelphia","Parks and Recreation","30 Rock",
  "Scrubs","Frasier","Cheers","Seinfeld","Freaks and Geeks",
  "Buffy the Vampire Slayer","Supernatural","Smallville","Daredevil",
  "Jessica Jones","WandaVision","Loki","The Mandalorian","Ted Lasso",
  "Schitt's Creek","Barry","Succession","Yellowstone","Euphoria",
  "Sex Education","Lupin","Wednesday","You","Big Little Lies",
  "Sharp Objects","The Haunting of Hill House","Hannibal",
  "The Handmaid's Tale","Orange Is the New Black","Orphan Black",
  "Sense8","Lucifer","Invincible","Outlander","Bridgerton",
];

const BOLLYWOOD = [
  "Dilwale Dulhania Le Jayenge","Kuch Kuch Hota Hai","Kabhi Khushi Kabhie Gham",
  "Kal Ho Naa Ho","My Name Is Khan","Om Shanti Om","Chennai Express",
  "Happy New Year","Zero","Pathaan","Jawan","Dunki","Sholay","Deewar",
  "Zanjeer","Don","Amar Akbar Anthony","Mr. India","Anand","Guide",
  "Mughal-e-Azam","Pyaasa","Kaagaz Ke Phool","Mother India","Shree 420",
  "Awaara","Bobby","Kabhi Kabhie","Silsila","Lagaan","Swades",
  "Rang De Basanti","Chak De India","Taare Zameen Par","3 Idiots","PK",
  "Dangal","Secret Superstar","Sultan","Bajrangi Bhaijaan","Tubelight",
  "Sanju","Padman","Toilet: Ek Prem Katha","Andhadhun","Article 15",
  "Kabir Singh","Gully Boy","War","Tiger Zinda Hai","Ek Tha Tiger",
  "Baahubali","Baahubali 2","RRR","KGF","KGF Chapter 2","Pushpa","Vikram",
  "Master","Kabali","Kaala","Enthiran","2.0","Sarkar","Simmba","Singham",
  "Dabangg","Wanted","Rowdy Rathore","Bodyguard","Ready","Housefull",
  "Golmaal","Hera Pheri","Phir Hera Pheri","Welcome","Dhamaal","Judwaa",
  "Judwaa 2","Baazigar","Darr","Anjaam","Kaho Naa... Pyaar Hai","Raaz",
  "Bhool Bhulaiyaa","Bhool Bhulaiyaa 2","Stree","Tumbbad","Pari",
  "Ragini MMS","Kahaani","Talaash","Drishyam","Badla","Ittefaq",
  "A Wednesday","Special 26","Baby","Raazi","Uri: The Surgical Strike",
  "Shershaah","Gunjan Saxena","Mission Mangal","Bhaag Milkha Bhaag",
  "Mary Kom","83","MS Dhoni: The Untold Story","Panga","Neerja","Rustom",
  "Airlift","Pink","No One Killed Jessica","Talvar","Court","Masaan",
  "Gangs of Wasseypur","Once Upon a Time in Mumbaai","Company","Satya",
  "Vaastav","Black Friday","Omkara","Maqbool","Haider","Rockstar",
  "Highway","Tamasha","Barfi!","Yeh Jawaani Hai Deewani","Wake Up Sid",
  "Rock On!!","Zindagi Na Milegi Dobara","Dil Chahta Hai","Kaminey",
  "Ishqiya","Dev D","Delhi Belly","Fukrey","Golmaal Returns",
  "Munna Bhai MBBS","Lage Raho Munna Bhai","Krrish","Koi Mil Gaya",
  "Ra.One","Fan","Jab We Met","Cocktail","Namastey London",
  "Singh Is Kinng","Veer-Zaara","Mohabbatein","Devdas","Guru","Black",
  "Paa","Piku","Vicky Donor","Shubh Mangal Saavdhan","Badhaai Ho",
  "Angrezi Medium","Hindi Medium","Queen","English Vinglish","Sonchiriya",
  "Udta Punjab","Raees","Tanhaji","Padmaavat","Bajirao Mastani",
  "Goliyon Ki Raasleela Ram-Leela","Jodhaa Akbar","Ashoka","Veer",
  "Mangal Pandey: The Rising","Manikarnika","Chhichhore","Dear Zindagi",
  "Kapoor & Sons","Tanu Weds Manu","Band Baaja Baaraat","Article 370",
  "Sacred Games","Mirzapur","Panchayat","The Family Man","Scam 1992",
  "Delhi Crime","Kota Factory","TVF Pitchers","Made in Heaven",
  "Paatal Lok","Asur","Special Ops","Aashram",
  "Taarak Mehta Ka Ooltah Chashmah","CID","Kyunki Saas Bhi Kabhi Bahu Thi",
  "Permanent Roommates","Little Things","Gullak","Aspirants",
  "Inside Edge","Criminal Justice","Jamtara","Guilty Minds","Human",
  "Tabbar","Undekhi","Four More Shots Please","Yeh Kaali Kaali Ankhein",
  "Grahan","Bandish Bandits","Mismatched","Hostel Daze",
  "College Romance","Girls Hostel","Bhabiji Ghar Par Hai",
  "The Kapil Sharma Show","Bigg Boss","MTV Roadies","Crime Patrol",
  "Byomkesh Bakshi","Malgudi Days","Shaktimaan","Hum Log","Buniyaad",
  "Ramayan","Mahabharat","Khichdi","Sarabhai vs Sarabhai",
  "Office Office","Yeh Rishta Kya Kehlata Hai","Anupamaa","Naagin",
  "Rana Naidu","Farzi",
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const TIMER_OPTIONS = [60, 90, 120];

/* ------------------------------------------------------------------ */
/*  SHARED UI BITS (module-level so they keep a stable identity across  */
/*  re-renders — defining these inside the component would cause React  */
/*  to remount them, and any inputs, on every keystroke)                */
/* ------------------------------------------------------------------ */

const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Righteous&family=Space+Grotesk:wght@400;500;600;700&display=swap');
    .marquee-text { font-family: 'Righteous', sans-serif; letter-spacing: 0.01em; }
    .body-text { font-family: 'Space Grotesk', sans-serif; }
    @keyframes chase {
      0% { background-position: 0 0; }
      100% { background-position: 40px 0; }
    }
    .marquee-border {
      background-image: radial-gradient(circle, #fbbf24 2.5px, transparent 2.5px);
      background-size: 20px 20px;
      animation: chase 1.1s linear infinite;
    }
    @keyframes pulseGlow {
      0%, 100% { opacity: 0.55; }
      50% { opacity: 1; }
    }
    .glow-pulse { animation: pulseGlow 1.6s ease-in-out infinite; }
    @keyframes floatUp {
      0% { transform: translateY(8px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    .float-in { animation: floatUp 0.35s ease-out; }
    @media (prefers-reduced-motion: reduce) {
      .marquee-border, .glow-pulse, .float-in { animation: none; }
    }
  `}</style>
);

const DECOR_ICONS = [Clapperboard, Film, Popcorn, Ticket, Star, Sparkles];

// deterministic pseudo-random in [0, 1), avoids the visible banding/clumping
// that small modulo cycles produce when reused across rows and columns
function seededRandom(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function buildDecorItems() {
  const rows = 11;
  const cols = 8;
  const items = [];
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const baseTop = (r / (rows - 1)) * 100;
      const baseLeft = (c / (cols - 1)) * 100;
      const jitterTop = (seededRandom(i * 2 + 1.3) - 0.5) * (100 / (rows - 1)) * 0.7;
      const jitterLeft = (seededRandom(i * 2 + 7.7) - 0.5) * (100 / (cols - 1)) * 0.7;
      const rot = (seededRandom(i * 3 + 4.1) - 0.5) * 70;
      const size = 16 + Math.floor(seededRandom(i * 5 + 2.2) * 4) * 5; // 16 / 21 / 26 / 31
      items.push({
        Icon: DECOR_ICONS[i % DECOR_ICONS.length],
        top: `${Math.min(98, Math.max(2, baseTop + jitterTop))}%`,
        left: `${Math.min(97, Math.max(2, baseLeft + jitterLeft))}%`,
        rot,
        size,
      });
      i++;
    }
  }
  return items;
}

const DECOR_ITEMS = buildDecorItems();

const TheatricalBackdrop = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {DECOR_ITEMS.map(({ Icon, top, left, rot, size }, i) => (
      <Icon
        key={i}
        size={size}
        style={{
          position: "absolute",
          top,
          left,
          transform: `rotate(${rot}deg)`,
          color: "#f59e0b",
          opacity: 0.08,
        }}
      />
    ))}
  </div>
);

const Shell = ({ children }) => (
  <div
    className="min-h-full w-full flex flex-col items-center justify-center p-4 body-text relative"
    style={{
      background: "radial-gradient(circle at 50% 0%, #6b4a06 0%, #2a1f0a 45%, #0f0a05 100%)",
      minHeight: "100vh",
    }}
  >
    <FontStyles />
    <TheatricalBackdrop />
    <div className="w-full max-w-md relative z-10">{children}</div>
  </div>
);

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-3xl p-6 shadow-2xl border border-amber-800/40 float-in ${className}`}
    style={{ background: "rgba(38, 27, 10, 0.85)", backdropFilter: "blur(6px)" }}
  >
    {children}
  </div>
);

const PrimaryButton = ({ onClick, children, disabled, className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 font-semibold text-amber-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

const GhostButton = ({ onClick, children, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3 font-medium text-pink-100 bg-white/5 hover:bg-white/10 border border-white/10 active:scale-[0.98] transition ${className}`}
  >
    {children}
  </button>
);

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function DumbCharades() {
  // ---- flow state ----
  const [screen, setScreen] = useState("welcome");
  const [error, setError] = useState("");

  // ---- setup state ----
  const [mode, setMode] = useState(null); // 'auto' | 'manual'
  const [poolNames, setPoolNames] = useState([]); // auto mode entry
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [manualTarget, setManualTarget] = useState("A"); // which column gets the next manual entry
  const [teamNameA, setTeamNameA] = useState("Team Reel");
  const [teamNameB, setTeamNameB] = useState("Team Frame");
  const [editingTeamName, setEditingTeamName] = useState(null);

  // ---- game settings ----
  const [timerDuration, setTimerDuration] = useState(90);
  const [totalRounds, setTotalRounds] = useState(3);
  const [category, setCategory] = useState("mixed"); // 'hollywood' | 'bollywood' | 'mixed'

  // ---- live game state ----
  const [currentRound, setCurrentRound] = useState(1);
  const [roundQueue, setRoundQueue] = useState([]); // [{team:'A'|'B', name}]
  const [turnPointer, setTurnPointer] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(null);
  const [score, setScore] = useState({ A: 0, B: 0 });
  const [currentMovie, setCurrentMovie] = useState(null); // {title, cat}
  const [passCount, setPassCount] = useState(0);
  const [turnPhase, setTurnPhase] = useState("awaiting"); // 'awaiting' | 'enacting'
  const [timeLeft, setTimeLeft] = useState(0);
  const [lastResult, setLastResult] = useState(null);

  const poolHollywood = useRef(shuffle(HOLLYWOOD));
  const poolBollywood = useRef(shuffle(BOLLYWOOD));

  /* ---------------- movie pool engine ---------------- */

  const drawMovie = useCallback(() => {
    let cat = category;
    if (cat === "mixed") cat = Math.random() < 0.5 ? "hollywood" : "bollywood";
    const poolRef = cat === "hollywood" ? poolHollywood : poolBollywood;
    if (poolRef.current.length === 0) {
      poolRef.current = shuffle(cat === "hollywood" ? HOLLYWOOD : BOLLYWOOD);
    }
    const title = poolRef.current.shift();
    return { title, cat };
  }, [category]);

  const requeueMovie = (movieObj) => {
    if (!movieObj) return;
    const poolRef = movieObj.cat === "hollywood" ? poolHollywood : poolBollywood;
    poolRef.current.push(movieObj.title);
  };

  /* ---------------- team / round building ---------------- */

  const buildRoundQueue = (round, tA, tB) => {
    const shuffledA = shuffle(tA).map((name) => ({ team: "A", name }));
    const shuffledB = shuffle(tB).map((name) => ({ team: "B", name }));
    const startWithA = round % 2 === 1;
    const first = startWithA ? shuffledA : shuffledB;
    const second = startWithA ? shuffledB : shuffledA;
    const queue = [];
    const maxLen = Math.max(first.length, second.length);
    for (let i = 0; i < maxLen; i++) {
      if (first[i]) queue.push(first[i]);
      if (second[i]) queue.push(second[i]);
    }
    return queue;
  };

  const goToPlayerAt = (index, queue) => {
    if (index >= queue.length) {
      setScreen("roundSummary");
      return;
    }
    setTurnPointer(index);
    setCurrentTurn(queue[index]);
    setScreen("handoff");
  };

  const beginTurn = () => {
    const movie = drawMovie();
    setCurrentMovie(movie);
    setPassCount(0);
    setTurnPhase("awaiting");
    setScreen("turn");
  };

  /* ---------------- setup handlers ---------------- */

  const addAutoName = () => {
    const n = nameInput.trim();
    if (!n) return;
    setPoolNames((p) => [...p, n]);
    setNameInput("");
  };

  const addManualName = () => {
    const n = nameInput.trim();
    if (!n) return;
    if (manualTarget === "A") setTeamA((t) => [...t, n]);
    else setTeamB((t) => [...t, n]);
    setNameInput("");
  };

  const removeAutoName = (i) => setPoolNames((p) => p.filter((_, idx) => idx !== i));
  const removeTeamName = (team, i) => {
    if (team === "A") setTeamA((t) => t.filter((_, idx) => idx !== i));
    else setTeamB((t) => t.filter((_, idx) => idx !== i));
  };

  const shuffleIntoTeams = () => {
    if (poolNames.length < 2) {
      setError("Add at least 2 players to shuffle into teams.");
      return;
    }
    const shuffled = shuffle(poolNames);
    const half = Math.ceil(shuffled.length / 2);
    setTeamA(shuffled.slice(0, half));
    setTeamB(shuffled.slice(half));
    setError("");
    setScreen("settings");
  };

  const confirmManualTeams = () => {
    if (teamA.length < 1 || teamB.length < 1) {
      setError("Both teams need at least 1 player.");
      return;
    }
    setError("");
    setScreen("settings");
  };

  /* ---------------- game start ---------------- */

  const startGame = () => {
    poolHollywood.current = shuffle(HOLLYWOOD);
    poolBollywood.current = shuffle(BOLLYWOOD);
    setScore({ A: 0, B: 0 });
    setCurrentRound(1);
    const q = buildRoundQueue(1, teamA, teamB);
    setRoundQueue(q);
    goToPlayerAt(0, q);
  };

  const startNextRound = () => {
    const next = currentRound + 1;
    setCurrentRound(next);
    const q = buildRoundQueue(next, teamA, teamB);
    setRoundQueue(q);
    goToPlayerAt(0, q);
  };

  /* ---------------- turn actions ---------------- */

  const handleEnact = () => {
    setTurnPhase("enacting");
    setTimeLeft(timerDuration);
  };

  const handlePass = () => {
    const newCount = passCount + 1;
    if (newCount >= 3) {
      setScore((s) => ({ ...s, [currentTurn.team]: s[currentTurn.team] - 1 }));
      setLastResult({ type: "out", team: currentTurn.team, name: currentTurn.name, movie: currentMovie.title });
      setScreen("result");
      return;
    }
    requeueMovie(currentMovie);
    const movie = drawMovie();
    setCurrentMovie(movie);
    setPassCount(newCount);
  };

  const handleGuessed = () => {
    setScore((s) => ({ ...s, [currentTurn.team]: s[currentTurn.team] + 1 }));
    setLastResult({ type: "guessed", team: currentTurn.team, name: currentTurn.name, movie: currentMovie.title });
    setScreen("result");
  };

  const handleTimeout = useCallback(() => {
    setScore((s) => ({ ...s, [currentTurn.team]: s[currentTurn.team] - 1 }));
    setLastResult({ type: "timeout", team: currentTurn.team, name: currentTurn.name, movie: currentMovie.title });
    setScreen("result");
  }, [currentTurn, currentMovie]);

  useEffect(() => {
    if (turnPhase !== "enacting" || screen !== "turn") return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [turnPhase, timeLeft, screen, handleTimeout]);

  const nextPlayer = () => {
    const idx = turnPointer + 1;
    if (idx >= roundQueue.length) {
      setScreen("roundSummary");
    } else {
      goToPlayerAt(idx, roundQueue);
    }
  };

  const resetGame = () => {
    setScreen("welcome");
    setMode(null);
    setPoolNames([]);
    setTeamA([]);
    setTeamB([]);
    setNameInput("");
    setScore({ A: 0, B: 0 });
    setCurrentRound(1);
    setRoundQueue([]);
    setError("");
  };

  /* ------------------------------------------------------------------ */
  /*  SCREEN: WELCOME                                                    */
  /* ------------------------------------------------------------------ */

  if (screen === "welcome") {
    return (
      <Shell>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Clapperboard className="text-amber-400" size={36} />
          </div>
          <h1 className="marquee-text text-5xl text-amber-400 leading-none">
            DUMB<br />CHARADES
          </h1>
        </div>
        <Card>
          <div className="flex flex-col gap-3">
            <PrimaryButton onClick={() => { setMode("auto"); setScreen("addPlayers"); }}>
              <Shuffle size={18} /> Random Shuffle
            </PrimaryButton>
            <GhostButton onClick={() => { setMode("manual"); setScreen("addPlayers"); }}>
              <Users size={18} /> Make Teams
            </GhostButton>
          </div>
        </Card>
      </Shell>
    );
  }

  /* ------------------------------------------------------------------ */
  /*  SCREEN: ADD PLAYERS                                                */
  /* ------------------------------------------------------------------ */

  if (screen === "addPlayers") {
    const isAuto = mode === "auto";
    return (
      <Shell>
        <Card>
          <h2 className="marquee-text text-2xl text-amber-400 mb-1">
            {isAuto ? "Who's Playing?" : "Build Your Teams"}
          </h2>
          <p className="text-amber-200 text-xs mb-4">
            {isAuto
              ? "Add every player, then we'll shuffle you into two equal teams."
              : "Add names straight into each team below."}
          </p>

          {!isAuto && (
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setManualTarget("A")}
                className={`flex-1 rounded-xl py-2 text-sm font-semibold transition ${
                  manualTarget === "A" ? "bg-pink-500 text-white" : "bg-white/5 text-pink-200"
                }`}
              >
                + {teamNameA}
              </button>
              <button
                onClick={() => setManualTarget("B")}
                className={`flex-1 rounded-xl py-2 text-sm font-semibold transition ${
                  manualTarget === "B" ? "bg-teal-400 text-amber-950" : "bg-white/5 text-teal-200"
                }`}
              >
                + {teamNameB}
              </button>
            </div>
          )}

          <div className="flex gap-2 mb-4">
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (isAuto ? addAutoName() : addManualName())}
              placeholder="Enter a name"
              className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder-amber-600 outline-none focus:border-amber-400"
            />
            <button
              onClick={isAuto ? addAutoName : addManualName}
              className="rounded-xl bg-amber-400 text-amber-950 px-4 flex items-center justify-center hover:bg-amber-300 transition"
            >
              <Plus size={20} />
            </button>
          </div>

          {isAuto ? (
            <div className="flex flex-wrap gap-2 mb-5 min-h-[2rem]">
              {poolNames.map((n, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 bg-white/10 rounded-full pl-3 pr-1.5 py-1 text-sm text-amber-100"
                >
                  {n}
                  <button onClick={() => removeAutoName(i)} className="hover:text-red-400">
                    <X size={14} />
                  </button>
                </span>
              ))}
              {poolNames.length === 0 && (
                <span className="text-amber-600 text-xs italic">No players yet — add a few names above.</span>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <p className="text-pink-300 text-xs font-semibold mb-2">{teamNameA} ({teamA.length})</p>
                <div className="flex flex-col gap-1.5">
                  {teamA.map((n, i) => (
                    <span key={i} className="flex items-center justify-between bg-pink-500/10 rounded-lg px-2.5 py-1.5 text-sm text-pink-100">
                      {n}
                      <button onClick={() => removeTeamName("A", i)} className="hover:text-red-400"><X size={13} /></button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-teal-300 text-xs font-semibold mb-2">{teamNameB} ({teamB.length})</p>
                <div className="flex flex-col gap-1.5">
                  {teamB.map((n, i) => (
                    <span key={i} className="flex items-center justify-between bg-teal-400/10 rounded-lg px-2.5 py-1.5 text-sm text-teal-100">
                      {n}
                      <button onClick={() => removeTeamName("B", i)} className="hover:text-red-400"><X size={13} /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

          <PrimaryButton onClick={isAuto ? shuffleIntoTeams : confirmManualTeams}>
            {isAuto ? <>Shuffle Teams <Shuffle size={18} /></> : <>Continue <ArrowRight size={18} /></>}
          </PrimaryButton>
          <button onClick={() => setScreen("welcome")} className="w-full text-center text-amber-500 text-xs mt-3 hover:text-amber-100">
            ← back
          </button>
        </Card>
      </Shell>
    );
  }

  /* ------------------------------------------------------------------ */
  /*  SCREEN: SETTINGS                                                   */
  /* ------------------------------------------------------------------ */

  if (screen === "settings") {
    return (
      <Shell>
        <Card>
          <h2 className="marquee-text text-2xl text-amber-400 mb-4">Game Settings</h2>

          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-amber-200 text-xs font-semibold uppercase tracking-wide">Teams</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2 mb-2">
              <TeamNameEditor
                color="pink"
                value={teamNameA}
                onChange={setTeamNameA}
                editing={editingTeamName === "A"}
                setEditing={setEditingTeamName}
                keyName="A"
              />
              <span className="text-pink-300 text-xs">{teamA.length} players</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2">
              <TeamNameEditor
                color="teal"
                value={teamNameB}
                onChange={setTeamNameB}
                editing={editingTeamName === "B"}
                setEditing={setEditingTeamName}
                keyName="B"
              />
              <span className="text-teal-300 text-xs">{teamB.length} players</span>
            </div>
          </div>

          <div className="mb-5">
            <span className="text-amber-200 text-xs font-semibold uppercase tracking-wide flex items-center gap-1 mb-2">
              <Clock size={13} /> Time per turn
            </span>
            <div className="grid grid-cols-3 gap-2">
              {TIMER_OPTIONS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTimerDuration(t)}
                  className={`rounded-xl py-2.5 text-sm font-semibold transition ${
                    timerDuration === t ? "bg-amber-400 text-amber-950" : "bg-white/5 text-amber-100"
                  }`}
                >
                  {t}s
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <span className="text-amber-200 text-xs font-semibold uppercase tracking-wide mb-2 block">
              Rounds
            </span>
            <div className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-2.5">
              <button
                onClick={() => setTotalRounds((r) => Math.max(1, r - 1))}
                className="text-amber-400 text-xl font-bold w-8 h-8 flex items-center justify-center"
              >
                −
              </button>
              <span className="text-white font-semibold text-lg">{totalRounds}</span>
              <button
                onClick={() => setTotalRounds((r) => Math.min(10, r + 1))}
                className="text-amber-400 text-xl font-bold w-8 h-8 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          <div className="mb-6">
            <span className="text-amber-200 text-xs font-semibold uppercase tracking-wide flex items-center gap-1 mb-2">
              <Film size={13} /> Movie pool
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: "hollywood", label: "Hollywood" },
                { key: "bollywood", label: "Bollywood" },
                { key: "mixed", label: "Mixed" },
              ].map((c) => (
                <button
                  key={c.key}
                  onClick={() => setCategory(c.key)}
                  className={`rounded-xl py-2.5 text-xs font-semibold transition ${
                    category === c.key ? "bg-amber-400 text-amber-950" : "bg-white/5 text-amber-100"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <PrimaryButton onClick={startGame}>
            <Play size={18} /> Start Game
          </PrimaryButton>
          <button onClick={() => setScreen("addPlayers")} className="w-full text-center text-amber-500 text-xs mt-3 hover:text-amber-100">
            ← back
          </button>
        </Card>
      </Shell>
    );
  }

  /* ------------------------------------------------------------------ */
  /*  SCREEN: HANDOFF (pass the phone)                                   */
  /* ------------------------------------------------------------------ */

  if (screen === "handoff" && currentTurn) {
    const teamColor = currentTurn.team === "A" ? "pink" : "teal";
    const teamLabel = currentTurn.team === "A" ? teamNameA : teamNameB;
    return (
      <Shell>
        <ScoreBar score={score} teamNameA={teamNameA} teamNameB={teamNameB} round={currentRound} totalRounds={totalRounds} />
        <Card className="text-center">
          <PartyPopper className={`mx-auto mb-3 text-${teamColor === "pink" ? "pink-400" : "teal-300"}`} size={34} />
          <p className="text-amber-200 text-xs uppercase tracking-widest mb-1">Pass the phone to</p>
          <h2 className="marquee-text text-3xl text-white mb-1">{currentTurn.name}</h2>
          <p className={`text-sm font-semibold mb-6 ${teamColor === "pink" ? "text-pink-300" : "text-teal-300"}`}>
            {teamLabel}
          </p>
          <PrimaryButton onClick={beginTurn}>
            I'm Ready <ArrowRight size={18} />
          </PrimaryButton>
        </Card>
      </Shell>
    );
  }

  /* ------------------------------------------------------------------ */
  /*  SCREEN: TURN (awaiting / enacting)                                 */
  /* ------------------------------------------------------------------ */

  if (screen === "turn" && currentTurn && currentMovie) {
    const teamColor = currentTurn.team === "A" ? "pink" : "teal";
    return (
      <Shell>
        <ScoreBar score={score} teamNameA={teamNameA} teamNameB={teamNameB} round={currentRound} totalRounds={totalRounds} />

        <div className="text-center mb-3">
          <p className="text-amber-200 text-xs">
            <span className={teamColor === "pink" ? "text-pink-300" : "text-teal-300"}>{currentTurn.name}</span> is acting for{" "}
            {currentTurn.team === "A" ? teamNameA : teamNameB}
          </p>
        </div>

        {/* marquee movie card */}
        <div className="rounded-3xl p-[3px] marquee-border mb-4">
          <div
            className="rounded-3xl px-6 py-10 text-center"
            style={{ background: "linear-gradient(160deg, #4a3410, #1a1206)" }}
          >
            <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-3">
              {currentMovie.cat === "hollywood" ? "Hollywood" : "Bollywood"}
            </p>
            <h2 className="marquee-text text-3xl text-white leading-tight">{currentMovie.title}</h2>
          </div>
        </div>

        {turnPhase === "awaiting" && (
          <>
            <div className="flex justify-center gap-2 mb-4">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${i < passCount ? "bg-red-400" : "bg-white/15"}`}
                />
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <PrimaryButton onClick={handleEnact}>
                <Play size={18} /> Start Acting
              </PrimaryButton>
              <GhostButton onClick={handlePass}>
                <SkipForward size={16} /> Pass ({passCount}/3 used)
              </GhostButton>
            </div>
          </>
        )}

        {turnPhase === "enacting" && (
          <div className="text-center">
            <p
              className={`marquee-text mb-5 glow-pulse ${
                timeLeft <= 10 ? "text-red-400" : "text-amber-400"
              }`}
              style={{ fontSize: "4.5rem", lineHeight: 1 }}
            >
              {timeLeft}
            </p>
            <PrimaryButton onClick={handleGuessed} className="bg-emerald-400 hover:bg-emerald-300">
              <Check size={20} /> Guessed It!
            </PrimaryButton>
          </div>
        )}
      </Shell>
    );
  }

  /* ------------------------------------------------------------------ */
  /*  SCREEN: RESULT (after each turn)                                   */
  /* ------------------------------------------------------------------ */

  if (screen === "result" && lastResult) {
    const config = {
      guessed: {
        icon: <Check size={40} className="text-emerald-400" />,
        title: "Nailed It!",
        sub: `+1 point for ${lastResult.team === "A" ? teamNameA : teamNameB}`,
        subColor: "text-emerald-300",
      },
      timeout: {
        icon: <Clock size={40} className="text-red-400" />,
        title: "Time's Up!",
        sub: `−1 point for ${lastResult.team === "A" ? teamNameA : teamNameB}`,
        subColor: "text-red-300",
      },
      out: {
        icon: <X size={40} className="text-red-400" />,
        title: `${lastResult.name} is Out!`,
        sub: `3 passes used · −1 point for ${lastResult.team === "A" ? teamNameA : teamNameB}`,
        subColor: "text-red-300",
      },
    }[lastResult.type];

    return (
      <Shell>
        <ScoreBar score={score} teamNameA={teamNameA} teamNameB={teamNameB} round={currentRound} totalRounds={totalRounds} />
        <Card className="text-center">
          <div className="flex justify-center mb-3">{config.icon}</div>
          <h2 className="marquee-text text-2xl text-white mb-1">{config.title}</h2>
          <p className={`text-sm font-semibold mb-1 ${config.subColor}`}>{config.sub}</p>
          <p className="text-amber-500 text-xs mb-6">The movie was "{lastResult.movie}"</p>
          <PrimaryButton onClick={nextPlayer}>
            Next Player <ArrowRight size={18} />
          </PrimaryButton>
        </Card>
      </Shell>
    );
  }

  /* ------------------------------------------------------------------ */
  /*  SCREEN: ROUND SUMMARY                                              */
  /* ------------------------------------------------------------------ */

  if (screen === "roundSummary") {
    const isLastRound = currentRound >= totalRounds;
    return (
      <Shell>
        <Card className="text-center">
          <Sparkles className="mx-auto text-amber-400 mb-3" size={32} />
          <h2 className="marquee-text text-2xl text-amber-400 mb-1">
            Round {currentRound} Complete
          </h2>
          <p className="text-amber-200 text-xs mb-6">
            {isLastRound ? "That was the final round!" : `${totalRounds - currentRound} round(s) to go`}
          </p>
          <RoundScoreDisplay score={score} teamNameA={teamNameA} teamNameB={teamNameB} />
          <div className="mt-6">
            {isLastRound ? (
              <PrimaryButton onClick={() => setScreen("final")}>
                <Trophy size={18} /> See Final Results
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={startNextRound}>
                Start Round {currentRound + 1} <ArrowRight size={18} />
              </PrimaryButton>
            )}
          </div>
        </Card>
      </Shell>
    );
  }

  /* ------------------------------------------------------------------ */
  /*  SCREEN: FINAL RESULTS                                              */
  /* ------------------------------------------------------------------ */

  if (screen === "final") {
    const winner = score.A === score.B ? null : score.A > score.B ? "A" : "B";
    const winnerName = winner === "A" ? teamNameA : winner === "B" ? teamNameB : null;
    return (
      <Shell>
        <Card className="text-center">
          <Trophy className="mx-auto text-amber-400 mb-3 glow-pulse" size={44} />
          <p className="text-amber-200 text-xs uppercase tracking-widest mb-1">
            {winner ? "Champions" : "It's a Tie!"}
          </p>
          <h2 className="marquee-text text-3xl text-white mb-6">
            {winner ? winnerName : `${teamNameA} = ${teamNameB}`}
          </h2>
          <RoundScoreDisplay score={score} teamNameA={teamNameA} teamNameB={teamNameB} />
          <div className="flex flex-col gap-3 mt-6">
            <PrimaryButton onClick={startGame}>
              <RotateCcw size={18} /> Rematch, Same Teams
            </PrimaryButton>
            <GhostButton onClick={resetGame}>
              New Game
            </GhostButton>
          </div>
        </Card>
      </Shell>
    );
  }

  return null;
}

/* ------------------------------------------------------------------ */
/*  SMALL SUBCOMPONENTS                                                 */
/* ------------------------------------------------------------------ */

function ScoreBar({ score, teamNameA, teamNameB, round, totalRounds }) {
  return (
    <div className="flex items-center justify-between mb-4 px-1">
      <div className="text-left">
        <p className="text-pink-300 text-[10px] uppercase tracking-wide">{teamNameA}</p>
        <p className="text-pink-400 marquee-text text-2xl">{score.A}</p>
      </div>
      <div className="text-center">
        <p className="text-amber-500 text-[10px] uppercase tracking-wide">Round</p>
        <p className="text-white text-sm font-semibold">{round} / {totalRounds}</p>
      </div>
      <div className="text-right">
        <p className="text-teal-300 text-[10px] uppercase tracking-wide">{teamNameB}</p>
        <p className="text-teal-300 marquee-text text-2xl">{score.B}</p>
      </div>
    </div>
  );
}

function RoundScoreDisplay({ score, teamNameA, teamNameB }) {
  return (
    <div className="flex items-center justify-center gap-6">
      <div className="text-center">
        <p className="text-pink-300 text-xs mb-1">{teamNameA}</p>
        <p className="text-pink-400 marquee-text text-4xl">{score.A}</p>
      </div>
      <p className="text-amber-600 text-xl">–</p>
      <div className="text-center">
        <p className="text-teal-300 text-xs mb-1">{teamNameB}</p>
        <p className="text-teal-300 marquee-text text-4xl">{score.B}</p>
      </div>
    </div>
  );
}

function TeamNameEditor({ color, value, onChange, editing, setEditing, keyName }) {
  const [draft, setDraft] = useState(value);
  const colorClass = color === "pink" ? "text-pink-300" : "text-teal-300";

  if (editing) {
    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => { onChange(draft.trim() || value); setEditing(null); }}
        onKeyDown={(e) => {
          if (e.key === "Enter") { onChange(draft.trim() || value); setEditing(null); }
        }}
        className="bg-transparent border-b border-white/20 text-sm font-semibold text-white outline-none w-28"
      />
    );
  }

  return (
    <button
      onClick={() => { setDraft(value); setEditing(keyName); }}
      className={`flex items-center gap-1.5 text-sm font-semibold ${colorClass}`}
    >
      {value} <Pencil size={11} className="opacity-60" />
    </button>
  );
}
