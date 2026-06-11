import { PlayerStats, LeaderboardEntry, GameMode, Achievement, TitleRequirement } from '../types/game';

export const DEFAULT_STATS: PlayerStats = {
  totalGamesPlayed: 0,
  totalCorrect: 0,
  totalWrong: 0,
  totalScore: 0,
  bestScore: 0,
  bestStreak: 0,
  totalTimePlayed: 0,
  coins: 0,
  xp: 0,
  level: 1,
  classicBest: 0,
  timeAttackBest: 0,
  survivalBest: 0,
  dailyBest: 0,
  achievements: [],
  lastDailyDate: '',
  dailyCompleted: false,
};

export const XP_PER_LEVEL = 200;
export const XP_GAIN_CORRECT = 15;
export const XP_GAIN_WRONG = 2;
export const COINS_PER_CORRECT = 3;
export const COINS_STREAK_BONUS_5 = 10;
export const COINS_STREAK_BONUS_10 = 25;

export const POINTS_CORRECT = 10;
export const POINTS_STREAK_5 = 25;
export const POINTS_STREAK_10 = 50;

export const loadStats = (): PlayerStats => {
  try {
    const saved = localStorage.getItem('footballEmoji_stats');
    if (saved) {
      return { ...DEFAULT_STATS, ...JSON.parse(saved) };
    }
  } catch {}
  return { ...DEFAULT_STATS };
};

export const saveStats = (stats: PlayerStats) => {
  try {
    localStorage.setItem('footballEmoji_stats', JSON.stringify(stats));
  } catch {}
};

export const loadLeaderboard = (): LeaderboardEntry[] => {
  try {
    const saved = localStorage.getItem('footballEmoji_leaderboard');
    if (saved) return JSON.parse(saved);
  } catch {}
  return [];
};

export const saveLeaderboard = (entries: LeaderboardEntry[]) => {
  try {
    // Keep top 50 entries
    const sorted = entries.sort((a, b) => b.score - a.score).slice(0, 50);
    localStorage.setItem('footballEmoji_leaderboard', JSON.stringify(sorted));
  } catch {}
};

export const addLeaderboardEntry = (entry: LeaderboardEntry) => {
  const board = loadLeaderboard();
  board.push(entry);
  saveLeaderboard(board);
};

export const getLevelFromXP = (xp: number): number => {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
};

export const getXPForNextLevel = (xp: number): number => {
  const level = getLevelFromXP(xp);
  return level * XP_PER_LEVEL;
};

export const getXPProgress = (xp: number): number => {
  return (xp % XP_PER_LEVEL) / XP_PER_LEVEL;
};

export const TITLE_REQUIREMENTS: TitleRequirement[] = [
  { title: 'Beginner', minLevel: 1, color: 'text-gray-300', bgColor: 'bg-gray-600', icon: '⚽' },
  { title: 'Pro', minLevel: 5, color: 'text-blue-300', bgColor: 'bg-blue-700', icon: '🔵' },
  { title: 'Elite', minLevel: 10, color: 'text-purple-300', bgColor: 'bg-purple-700', icon: '💜' },
  { title: 'Legend', minLevel: 20, color: 'text-yellow-300', bgColor: 'bg-yellow-700', icon: '⭐' },
  { title: 'GOAT', minLevel: 40, color: 'text-red-300', bgColor: 'bg-red-700', icon: '🐐' },
];

export const getTitle = (level: number): TitleRequirement => {
  let title = TITLE_REQUIREMENTS[0];
  for (const t of TITLE_REQUIREMENTS) {
    if (level >= t.minLevel) title = t;
  }
  return title;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_game',
    name: 'First Kick',
    description: 'Play your first game',
    icon: '⚽',
    condition: (s) => s.totalGamesPlayed >= 1,
    xpReward: 50,
    coinReward: 20,
  },
  {
    id: 'score_100',
    name: 'Century',
    description: 'Score 100 points in a single game',
    icon: '💯',
    condition: (s) => s.bestScore >= 100,
    xpReward: 75,
    coinReward: 30,
  },
  {
    id: 'score_500',
    name: 'High Scorer',
    description: 'Score 500 points in a single game',
    icon: '🎯',
    condition: (s) => s.bestScore >= 500,
    xpReward: 150,
    coinReward: 75,
  },
  {
    id: 'score_1000',
    name: 'Thousand Club',
    description: 'Score 1000 points in a single game',
    icon: '🏆',
    condition: (s) => s.bestScore >= 1000,
    xpReward: 300,
    coinReward: 150,
  },
  {
    id: 'streak_5',
    name: 'Hot Streak',
    description: 'Get 5 correct answers in a row',
    icon: '🔥',
    condition: (s) => s.bestStreak >= 5,
    xpReward: 100,
    coinReward: 40,
  },
  {
    id: 'streak_10',
    name: 'On Fire!',
    description: 'Get 10 correct answers in a row',
    icon: '🌟',
    condition: (s) => s.bestStreak >= 10,
    xpReward: 200,
    coinReward: 80,
  },
  {
    id: 'streak_20',
    name: 'Unstoppable',
    description: 'Get 20 correct answers in a row',
    icon: '🚀',
    condition: (s) => s.bestStreak >= 20,
    xpReward: 400,
    coinReward: 200,
  },
  {
    id: 'games_10',
    name: 'Regular Player',
    description: 'Play 10 games',
    icon: '👟',
    condition: (s) => s.totalGamesPlayed >= 10,
    xpReward: 100,
    coinReward: 50,
  },
  {
    id: 'games_50',
    name: 'Dedicated Fan',
    description: 'Play 50 games',
    icon: '🏟️',
    condition: (s) => s.totalGamesPlayed >= 50,
    xpReward: 300,
    coinReward: 150,
  },
  {
    id: 'correct_50',
    name: 'Knowledge Base',
    description: 'Answer 50 questions correctly',
    icon: '📚',
    condition: (s) => s.totalCorrect >= 50,
    xpReward: 150,
    coinReward: 60,
  },
  {
    id: 'correct_200',
    name: 'Football Scholar',
    description: 'Answer 200 questions correctly',
    icon: '🎓',
    condition: (s) => s.totalCorrect >= 200,
    xpReward: 400,
    coinReward: 200,
  },
  {
    id: 'daily_first',
    name: 'Daily Devotion',
    description: 'Complete a Daily Challenge',
    icon: '📅',
    condition: (s) => s.dailyBest > 0,
    xpReward: 100,
    coinReward: 50,
  },
  {
    id: 'level_5',
    name: 'Pro Player',
    description: 'Reach Level 5',
    icon: '🔵',
    condition: (s) => s.level >= 5,
    xpReward: 200,
    coinReward: 100,
  },
  {
    id: 'level_10',
    name: 'Elite Status',
    description: 'Reach Level 10',
    icon: '💜',
    condition: (s) => s.level >= 10,
    xpReward: 500,
    coinReward: 250,
  },
  {
    id: 'coins_500',
    name: 'Millionaire',
    description: 'Earn 500 coins total',
    icon: '🪙',
    condition: (s) => s.coins >= 500,
    xpReward: 200,
    coinReward: 0,
  },
  {
    id: 'survival_master',
    name: 'Survival Expert',
    description: 'Score 300+ in Survival Mode',
    icon: '💪',
    condition: (s) => s.survivalBest >= 300,
    xpReward: 250,
    coinReward: 100,
  },
  {
    id: 'time_attack_master',
    name: 'Speed Demon',
    description: 'Score 400+ in Time Attack',
    icon: '⚡',
    condition: (s) => s.timeAttackBest >= 400,
    xpReward: 250,
    coinReward: 100,
  },
];

export const checkNewAchievements = (stats: PlayerStats): Achievement[] => {
  const newOnes: Achievement[] = [];
  for (const ach of ACHIEVEMENTS) {
    if (!stats.achievements.includes(ach.id) && ach.condition(stats)) {
      newOnes.push(ach);
    }
  }
  return newOnes;
};

export const getModeLabel = (mode: GameMode): string => {
  switch (mode) {
    case 'classic': return 'Classic Mode';
    case 'timeattack': return 'Time Attack';
    case 'survival': return 'Survival Mode';
    case 'daily': return 'Daily Challenge';
  }
};

export const getModeIcon = (mode: GameMode): string => {
  switch (mode) {
    case 'classic': return '⚽';
    case 'timeattack': return '⏱️';
    case 'survival': return '💀';
    case 'daily': return '📅';
  }
};

export const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export const getAccuracy = (correct: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const getDifficultyForQuestion = (questionIndex: number, mode: GameMode): 'easy' | 'medium' | 'hard' => {
  if (mode === 'survival') {
    if (questionIndex < 5) return 'easy';
    if (questionIndex < 12) return 'medium';
    return 'hard';
  }
  if (questionIndex < 8) return 'easy';
  if (questionIndex < 18) return 'medium';
  return 'hard';
};
