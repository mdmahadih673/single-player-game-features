import React from 'react';
import { GameMode, GameState } from '../types/game';
import { PlayerStats } from '../types/game';
import { getModeIcon, getModeLabel, getTitle, getAccuracy } from '../utils/gameLogic';

interface HomeScreenProps {
  stats: PlayerStats;
  onStartGame: (mode: GameMode) => void;
  onNavigate: (screen: GameState) => void;
}

const MODE_DESCRIPTIONS: Record<GameMode, { desc: string; color: string; bg: string; border: string; detail: string }> = {
  classic: {
    desc: 'Endless questions, 3 lives',
    detail: 'Answer as many as you can before losing all 3 lives',
    color: 'text-emerald-300',
    bg: 'bg-emerald-950/60',
    border: 'border-emerald-600/50',
  },
  timeattack: {
    desc: '60 seconds, max score',
    detail: 'Race against the clock and score as many points as possible',
    color: 'text-blue-300',
    bg: 'bg-blue-950/60',
    border: 'border-blue-600/50',
  },
  survival: {
    desc: 'Endless difficulty climb',
    detail: 'Difficulty increases — one mistake costs a life',
    color: 'text-red-300',
    bg: 'bg-red-950/60',
    border: 'border-red-600/50',
  },
  daily: {
    desc: 'Daily fixed challenge',
    detail: 'Same questions for everyone today. Come back tomorrow!',
    color: 'text-yellow-300',
    bg: 'bg-yellow-950/60',
    border: 'border-yellow-600/50',
  },
};

const HomeScreen: React.FC<HomeScreenProps> = ({ stats, onStartGame, onNavigate }) => {
  const title = getTitle(stats.level);
  const xpInLevel = stats.xp % 200;
  const xpPercent = (xpInLevel / 200) * 100;

  const today = new Date().toDateString();
  const dailyDone = stats.dailyCompleted && stats.lastDailyDate === today;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 relative z-10">
      {/* Header */}
      <div className="w-full max-w-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-xl shadow-lg">
              {title.icon}
            </div>
            <div>
              <div className="text-white font-bold text-sm">Level {stats.level}</div>
              <div className={`text-xs font-semibold px-2 py-0.5 rounded-full ${title.bgColor} ${title.color}`}>
                {title.title}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-yellow-950/60 border border-yellow-600/40 rounded-full px-3 py-1.5">
              <span className="text-yellow-400">🪙</span>
              <span className="text-yellow-300 font-bold text-sm">{stats.coins.toLocaleString()}</span>
            </div>
            <button
              onClick={() => onNavigate('profile')}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
              title="Profile"
            >
              👤
            </button>
          </div>
        </div>

        {/* XP Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>XP: {stats.xp}</span>
            <span>Next level: {stats.xp - xpInLevel + 200} XP</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* Hero */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3 animate-bounce">⚽</div>
          <h1 className="text-4xl font-black text-white mb-1 tracking-tight">
            Football<span className="text-emerald-400">Emoji</span>
          </h1>
          <p className="text-gray-400 text-sm">Quiz Challenge</p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {[
            { label: 'Best Score', value: stats.bestScore, icon: '🏆' },
            { label: 'Best Streak', value: `${stats.bestStreak}🔥`, icon: '⚡' },
            { label: 'Games', value: stats.totalGamesPlayed, icon: '🎮' },
            { label: 'Accuracy', value: `${getAccuracy(stats.totalCorrect, stats.totalCorrect + stats.totalWrong)}%`, icon: '🎯' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="text-lg mb-1">{stat.icon}</div>
              <div className="text-white font-bold text-sm">{stat.value}</div>
              <div className="text-gray-500 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Game Modes */}
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">Select Mode</h2>
        <div className="grid grid-cols-1 gap-3 mb-6">
          {(['classic', 'timeattack', 'survival', 'daily'] as GameMode[]).map((mode) => {
            const m = MODE_DESCRIPTIONS[mode];
            const isDailyDone = mode === 'daily' && dailyDone;
            return (
              <button
                key={mode}
                onClick={() => !isDailyDone && onStartGame(mode)}
                className={`${m.bg} border ${m.border} rounded-2xl p-4 text-left transition-all duration-200
                  ${isDailyDone ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] cursor-pointer'}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getModeIcon(mode)}</span>
                    <div>
                      <div className={`font-bold text-base ${m.color}`}>{getModeLabel(mode)}</div>
                      <div className="text-gray-400 text-xs">{m.desc}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    {isDailyDone ? (
                      <span className="text-xs text-yellow-400 bg-yellow-950/60 px-2 py-1 rounded-full">✓ Done</span>
                    ) : (
                      <div className="text-xs text-gray-500">
                        Best: <span className={`font-bold ${m.color}`}>
                          {mode === 'classic' && stats.classicBest}
                          {mode === 'timeattack' && stats.timeAttackBest}
                          {mode === 'survival' && stats.survivalBest}
                          {mode === 'daily' && stats.dailyBest}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-gray-500 text-xs mt-2">{m.detail}</div>
              </button>
            );
          })}
        </div>

        {/* Bottom Nav */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Leaderboard', icon: '🏅', screen: 'leaderboard' as GameState },
            { label: 'Achievements', icon: '🎖️', screen: 'achievements' as GameState },
            { label: 'Statistics', icon: '📊', screen: 'stats' as GameState },
          ].map((nav) => (
            <button
              key={nav.screen}
              onClick={() => onNavigate(nav.screen)}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 flex flex-col items-center gap-1 transition-all active:scale-95"
            >
              <span className="text-xl">{nav.icon}</span>
              <span className="text-gray-300 text-xs font-medium">{nav.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
