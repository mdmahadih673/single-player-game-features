export type GameMode = 'classic' | 'timeattack' | 'survival' | 'daily';
export type GameState = 'home' | 'playing' | 'gameover' | 'stats' | 'leaderboard' | 'achievements' | 'profile';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type AnswerFeedback = 'correct' | 'wrong' | null;

export interface PlayerStats {
  totalGamesPlayed: number;
  totalCorrect: number;
  totalWrong: number;
  totalScore: number;
  bestScore: number;
  bestStreak: number;
  totalTimePlayed: number; // seconds
  coins: number;
  xp: number;
  level: number;
  classicBest: number;
  timeAttackBest: number;
  survivalBest: number;
  dailyBest: number;
  achievements: string[];
  lastDailyDate: string;
  dailyCompleted: boolean;
}

export interface LeaderboardEntry {
  id: string;
  score: number;
  mode: GameMode;
  streak: number;
  correct: number;
  accuracy: number;
  timePlayed: number;
  date: string;
}

export interface GameSession {
  mode: GameMode;
  score: number;
  lives: number;
  streak: number;
  bestStreak: number;
  correct: number;
  wrong: number;
  timeLeft: number; // for time attack
  totalTime: number;
  difficulty: Difficulty;
  questionIndex: number;
  answeredQuestions: string[];
  startTime: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (stats: PlayerStats) => boolean;
  xpReward: number;
  coinReward: number;
}

export type Title = 'Beginner' | 'Pro' | 'Elite' | 'Legend' | 'GOAT';

export interface TitleRequirement {
  title: Title;
  minLevel: number;
  color: string;
  bgColor: string;
  icon: string;
}
