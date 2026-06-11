export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  emojis: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: Difficulty;
  category: string;
  hint?: string;
}

export const questions: Question[] = [
  // EASY
  {
    id: 'e1',
    emojis: '⚽🥅',
    question: 'What does this represent?',
    options: ['Goal', 'Corner kick', 'Free kick', 'Penalty'],
    answer: 'Goal',
    difficulty: 'easy',
    category: 'basics',
  },
  {
    id: 'e2',
    emojis: '🟨',
    question: 'What card is this?',
    options: ['Yellow card', 'Red card', 'Green card', 'Blue card'],
    answer: 'Yellow card',
    difficulty: 'easy',
    category: 'rules',
  },
  {
    id: 'e3',
    emojis: '🟥',
    question: 'What card is this?',
    options: ['Red card', 'Yellow card', 'Orange card', 'Penalty card'],
    answer: 'Red card',
    difficulty: 'easy',
    category: 'rules',
  },
  {
    id: 'e4',
    emojis: '⚽🧤',
    question: 'Who wears gloves in football?',
    options: ['Goalkeeper', 'Striker', 'Defender', 'Referee'],
    answer: 'Goalkeeper',
    difficulty: 'easy',
    category: 'positions',
  },
  {
    id: 'e5',
    emojis: '🏆⚽',
    question: 'What major football tournament is this?',
    options: ['World Cup', 'Champions League', 'Premier League', 'FA Cup'],
    answer: 'World Cup',
    difficulty: 'easy',
    category: 'tournaments',
  },
  {
    id: 'e6',
    emojis: '⚽👟',
    question: 'What football action is this?',
    options: ['Kick', 'Header', 'Save', 'Tackle'],
    answer: 'Kick',
    difficulty: 'easy',
    category: 'actions',
  },
  {
    id: 'e7',
    emojis: '🕐⚽',
    question: 'What does this represent in football?',
    options: ['Extra time', 'Half time', 'Match start', 'Penalty shootout'],
    answer: 'Extra time',
    difficulty: 'easy',
    category: 'rules',
  },
  {
    id: 'e8',
    emojis: '⚽🇧🇷',
    question: 'Which national team is famous for beautiful football?',
    options: ['Brazil', 'Germany', 'France', 'Argentina'],
    answer: 'Brazil',
    difficulty: 'easy',
    category: 'teams',
  },
  {
    id: 'e9',
    emojis: '🦵⚽',
    question: 'What action does this represent?',
    options: ['Penalty kick', 'Free kick', 'Corner kick', 'Goal kick'],
    answer: 'Penalty kick',
    difficulty: 'easy',
    category: 'actions',
  },
  {
    id: 'e10',
    emojis: '⚽🏟️',
    question: 'Where do football matches take place?',
    options: ['Stadium', 'Arena', 'Field', 'Court'],
    answer: 'Stadium',
    difficulty: 'easy',
    category: 'basics',
  },
  {
    id: 'e11',
    emojis: '👑⚽🌍',
    question: 'Who is considered the "King of Football"?',
    options: ['Pelé', 'Maradona', 'Ronaldo', 'Messi'],
    answer: 'Pelé',
    difficulty: 'easy',
    category: 'legends',
  },
  {
    id: 'e12',
    emojis: '⚽🔔',
    question: 'What does the whistle signal in football?',
    options: ['Foul', 'Goal', 'Offside', 'All of these'],
    answer: 'All of these',
    difficulty: 'easy',
    category: 'rules',
  },
  {
    id: 'e13',
    emojis: '🔟⚽',
    question: 'Which shirt number is iconic for playmakers?',
    options: ['Number 10', 'Number 9', 'Number 1', 'Number 7'],
    answer: 'Number 10',
    difficulty: 'easy',
    category: 'basics',
  },
  {
    id: 'e14',
    emojis: '⚽🌐',
    question: 'Which organization governs world football?',
    options: ['FIFA', 'UEFA', 'AFC', 'CONMEBOL'],
    answer: 'FIFA',
    difficulty: 'easy',
    category: 'organizations',
  },
  {
    id: 'e15',
    emojis: '🥇⚽🌍',
    question: 'How often is the FIFA World Cup held?',
    options: ['Every 4 years', 'Every 2 years', 'Every year', 'Every 3 years'],
    answer: 'Every 4 years',
    difficulty: 'easy',
    category: 'tournaments',
  },

  // MEDIUM
  {
    id: 'm1',
    emojis: '🦁⚽🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    question: 'Which team plays as "The Lions"?',
    options: ['England', 'Chelsea', 'Millwall', 'Aston Villa'],
    answer: 'Millwall',
    difficulty: 'medium',
    category: 'teams',
  },
  {
    id: 'm2',
    emojis: '🌙⭐⚽',
    question: 'Which national team has a crescent and star on their kit?',
    options: ['Turkey', 'Algeria', 'Pakistan', 'Tunisia'],
    answer: 'Turkey',
    difficulty: 'medium',
    category: 'teams',
  },
  {
    id: 'm3',
    emojis: '🕗⚽2️⃣',
    question: 'How long is each half in a standard football match?',
    options: ['45 minutes', '40 minutes', '50 minutes', '60 minutes'],
    answer: '45 minutes',
    difficulty: 'medium',
    category: 'rules',
  },
  {
    id: 'm4',
    emojis: '⚽🚫🏃',
    question: 'What rule prevents attackers from being behind the last defender?',
    options: ['Offside rule', 'Foul rule', 'Handball rule', 'Back-pass rule'],
    answer: 'Offside rule',
    difficulty: 'medium',
    category: 'rules',
  },
  {
    id: 'm5',
    emojis: '🦅⚽🇩🇪',
    question: 'Which club is known as "Die Adler" (The Eagles)?',
    options: ['Eintracht Frankfurt', 'Bayern Munich', 'Borussia Dortmund', 'Schalke'],
    answer: 'Eintracht Frankfurt',
    difficulty: 'medium',
    category: 'teams',
  },
  {
    id: 'm6',
    emojis: '🌹⚽🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    question: 'Which city in England is nicknamed "The Rose"?',
    options: ['Sheffield', 'Leeds', 'Blackburn', 'Burnley'],
    answer: 'Sheffield',
    difficulty: 'medium',
    category: 'teams',
  },
  {
    id: 'm7',
    emojis: '⚽📐',
    question: 'What is the standard penalty spot distance from goal?',
    options: ['12 yards', '10 yards', '15 yards', '8 yards'],
    answer: '12 yards',
    difficulty: 'medium',
    category: 'rules',
  },
  {
    id: 'm8',
    emojis: '🥇⭐⭐⭐⭐⚽🇮🇹',
    question: 'How many World Cups has Italy won?',
    options: ['4', '5', '3', '2'],
    answer: '4',
    difficulty: 'medium',
    category: 'tournaments',
  },
  {
    id: 'm9',
    emojis: '🐓⚽🇫🇷',
    question: 'What is the symbol of the French football team?',
    options: ['Rooster', 'Eagle', 'Lion', 'Bull'],
    answer: 'Rooster',
    difficulty: 'medium',
    category: 'teams',
  },
  {
    id: 'm10',
    emojis: '⚽🎭🔵🔴',
    question: 'Which club plays in half-blue half-red "clown" kit?',
    options: ['Crystal Palace', 'Barcelona', 'PSG', 'Atletico Madrid'],
    answer: 'Crystal Palace',
    difficulty: 'medium',
    category: 'teams',
  },
  {
    id: 'm11',
    emojis: '🌟⚽🇦🇷',
    question: 'How many World Cups has Argentina won?',
    options: ['3', '2', '1', '4'],
    answer: '3',
    difficulty: 'medium',
    category: 'tournaments',
  },
  {
    id: 'm12',
    emojis: '⚽🖐️❌',
    question: 'What infringement is it when a player uses their hand?',
    options: ['Handball', 'Foul', 'Offside', 'Obstruction'],
    answer: 'Handball',
    difficulty: 'medium',
    category: 'rules',
  },
  {
    id: 'm13',
    emojis: '🔵⚽🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    question: 'Which Premier League club wears all-blue?',
    options: ['Chelsea', 'Manchester City', 'Leicester', 'All of these'],
    answer: 'All of these',
    difficulty: 'medium',
    category: 'teams',
  },
  {
    id: 'm14',
    emojis: '⚽🇺🇦🔵🟡',
    question: 'What colors does Ukraine wear?',
    options: ['Blue and Yellow', 'Red and Blue', 'Green and White', 'White and Red'],
    answer: 'Blue and Yellow',
    difficulty: 'medium',
    category: 'teams',
  },
  {
    id: 'm15',
    emojis: '🏅⚽🇧🇷',
    question: 'How many World Cups has Brazil won?',
    options: ['5', '4', '6', '3'],
    answer: '5',
    difficulty: 'medium',
    category: 'tournaments',
  },
  {
    id: 'm16',
    emojis: '⚽🔢1️⃣1️⃣',
    question: 'How many players are on the field per team?',
    options: ['11', '10', '12', '9'],
    answer: '11',
    difficulty: 'medium',
    category: 'basics',
  },

  // HARD
  {
    id: 'h1',
    emojis: '🦊⚽🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    question: 'Which club is nicknamed "The Foxes"?',
    options: ['Leicester City', 'Wolverhampton', 'Watford', 'Norwich'],
    answer: 'Leicester City',
    difficulty: 'hard',
    category: 'teams',
  },
  {
    id: 'h2',
    emojis: '🐺⚽🟡',
    question: 'Which Premier League club is called "The Wolves"?',
    options: ['Wolverhampton Wanderers', 'Sheffield United', 'Watford', 'Leeds'],
    answer: 'Wolverhampton Wanderers',
    difficulty: 'hard',
    category: 'teams',
  },
  {
    id: 'h3',
    emojis: '⚽🏆🌍2022',
    question: 'Who won the 2022 FIFA World Cup?',
    options: ['Argentina', 'France', 'Brazil', 'England'],
    answer: 'Argentina',
    difficulty: 'hard',
    category: 'tournaments',
  },
  {
    id: 'h4',
    emojis: '🎯⚽🏆🇪🇺',
    question: 'Which club has won the most UEFA Champions League titles?',
    options: ['Real Madrid', 'Barcelona', 'AC Milan', 'Bayern Munich'],
    answer: 'Real Madrid',
    difficulty: 'hard',
    category: 'tournaments',
  },
  {
    id: 'h5',
    emojis: '🕰️⚽🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    question: 'In what year was the English Football League founded?',
    options: ['1888', '1900', '1863', '1872'],
    answer: '1888',
    difficulty: 'hard',
    category: 'history',
  },
  {
    id: 'h6',
    emojis: '⚽🦂🇩🇪',
    question: 'Which club is nicknamed "Die Skorpione" (The Scorpions)?',
    options: ['Eintracht Braunschweig', 'Hannover 96', 'Wolfsburg', 'Bremen'],
    answer: 'Eintracht Braunschweig',
    difficulty: 'hard',
    category: 'teams',
  },
  {
    id: 'h7',
    emojis: '🐝⚽🟡⚫',
    question: 'Which club is nicknamed "The Bees" in yellow and black?',
    options: ['Brentford', 'Watford', 'Burton Albion', 'Oxford'],
    answer: 'Burton Albion',
    difficulty: 'hard',
    category: 'teams',
  },
  {
    id: 'h8',
    emojis: '🌊⚽🇵🇹',
    question: 'Which Portuguese club plays in blue and white stripes?',
    options: ['FC Porto', 'Benfica', 'Sporting CP', 'Braga'],
    answer: 'FC Porto',
    difficulty: 'hard',
    category: 'teams',
  },
  {
    id: 'h9',
    emojis: '⚽📏🅰️',
    question: 'What does VAR stand for in football?',
    options: ['Video Assistant Referee', 'Virtual Action Review', 'Visual Aid Referee', 'Video Action Replay'],
    answer: 'Video Assistant Referee',
    difficulty: 'hard',
    category: 'rules',
  },
  {
    id: 'h10',
    emojis: '🦁👑⚽🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    question: 'Which Scottish club is known as "The Lions"?',
    options: ['Celtic', 'Rangers', 'Hearts', 'Aberdeen'],
    answer: 'Celtic',
    difficulty: 'hard',
    category: 'teams',
  },
  {
    id: 'h11',
    emojis: '🏆⚽🌍1966',
    question: 'Who won the 1966 FIFA World Cup?',
    options: ['England', 'West Germany', 'Portugal', 'USSR'],
    answer: 'England',
    difficulty: 'hard',
    category: 'history',
  },
  {
    id: 'h12',
    emojis: '⚽💰🏦',
    question: 'Which transfer broke the world record in 2017?',
    options: ['Neymar to PSG', 'Ronaldo to Juventus', 'Pogba to Man Utd', 'Mbappe to PSG'],
    answer: 'Neymar to PSG',
    difficulty: 'hard',
    category: 'transfers',
  },
  {
    id: 'h13',
    emojis: '⚽🧮3️⃣-5️⃣-2️⃣',
    question: 'What formation has 3 defenders, 5 midfielders and 2 strikers?',
    options: ['3-5-2', '4-3-3', '4-4-2', '5-3-2'],
    answer: '3-5-2',
    difficulty: 'hard',
    category: 'tactics',
  },
  {
    id: 'h14',
    emojis: '🦁⚽🇧🇪',
    question: 'Belgium\'s national team is nicknamed?',
    options: ['Red Devils', 'Red Lions', 'Golden Lions', 'Red Eagles'],
    answer: 'Red Devils',
    difficulty: 'hard',
    category: 'teams',
  },
  {
    id: 'h15',
    emojis: '⚽🏆🇪🇺2020',
    question: 'Who won UEFA Euro 2020 (played in 2021)?',
    options: ['Italy', 'England', 'Spain', 'Denmark'],
    answer: 'Italy',
    difficulty: 'hard',
    category: 'tournaments',
  },
  {
    id: 'h16',
    emojis: '🐉⚽🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    question: 'What is the nickname of the Welsh football team?',
    options: ['Dragons', 'Red Dragons', 'Welsh Lions', 'Fire Dragons'],
    answer: 'Dragons',
    difficulty: 'hard',
    category: 'teams',
  },
  {
    id: 'h17',
    emojis: '⚽🔢🎯🏆',
    question: 'What is the minimum number of teams in a World Cup group?',
    options: ['4', '3', '5', '6'],
    answer: '4',
    difficulty: 'hard',
    category: 'rules',
  },
  {
    id: 'h18',
    emojis: '🕵️⚽🇮🇹',
    question: 'Which Italian club is nicknamed "The Old Lady"?',
    options: ['Juventus', 'AC Milan', 'Inter Milan', 'Roma'],
    answer: 'Juventus',
    difficulty: 'hard',
    category: 'teams',
  },
];

export const getDailyQuestions = (count: number = 10): Question[] => {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const shuffled = [...questions].sort((a, b) => {
    const hashA = (seed * a.id.charCodeAt(0) * 31) % 1000;
    const hashB = (seed * b.id.charCodeAt(0) * 31) % 1000;
    return hashA - hashB;
  });
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const getQuestionsByDifficulty = (difficulty: Difficulty): Question[] => {
  return questions.filter(q => q.difficulty === difficulty);
};

export const shuffleArray = <T>(arr: T[], seed?: number): T[] => {
  const array = [...arr];
  if (seed !== undefined) {
    let s = seed;
    for (let i = array.length - 1; i > 0; i--) {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      const j = Math.abs(s) % (i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
  } else {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  return array;
};
