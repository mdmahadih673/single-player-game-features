import React from 'react';
import { PlayerStats } from '../types/game';
import { getAccuracy, formatTime, getTitle, TITLE_REQUIREMENTS } from '../utils/gameLogic';

interface StatsScreenProps {
  stats: PlayerStats;
  onBack: () => void;
}

const StatCard: React.FC<{ label: string; value: string | number; icon: string; color?: string }> = ({
  label, value, icon, color = 'text-white'
}) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
    <div className="text-2xl mb-2">{icon}</div>
    <div className={`font-black text-xl ${color}`}>{value}</div>
    <div className="text-gray-500 text-xs mt-1">{label}</div>
  </div>
);

const StatsScreen: React.FC<StatsScreenProps> = ({ stats, onBack }) => {
  const accuracy = getAccuracy(stats.totalCorrect, stats.totalCorrect + stats.totalWrong);
  const title = getTitle(stats.level);
  const xpInLevel = stats.xp % 200;
  const xpPercent = (xpInLevel / 200) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 relative z-10">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            ←
          </button>
          <h1 className="text-white font-black text-2xl">📊 Statistics</h1>
        </div>

        {/* Player Card */}
        <div className="bg-gradient-to-br from-emerald-950 to-green-950 border border-emerald-600/40 rounded-3xl p-6 mb-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-3xl shadow-lg">
              {title.icon}
            </div>
            <div>
              <div className="text-white font-black text-xl">Level {stats.level}</div>
              <div className={`text-sm font-bold ${title.color}`}>{title.title}</div>
              <div className="text-gray-400 text-xs">{stats.xp} XP total</div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Level Progress</span>
              <span>{xpInLevel} / 200 XP</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <StatCard label="Best Score" value={stats.bestScore} icon="🏆" color="text-yellow-400" />
          <StatCard label="Best Streak" value={`${stats.bestStreak}🔥`} icon="⚡" color="text-orange-400" />
          <StatCard label="Total Correct" value={stats.totalCorrect} icon="✅" color="text-emerald-400" />
          <StatCard label="Accuracy" value={`${accuracy}%`} icon="🎯" color={accuracy >= 70 ? 'text-emerald-400' : 'text-red-400'} />
          <StatCard label="Games Played" value={stats.totalGamesPlayed} icon="🎮" />
          <StatCard label="Time Played" value={formatTime(stats.totalTimePlayed)} icon="⏱️" />
          <StatCard label="Total Score" value={stats.totalScore.toLocaleString()} icon="📈" />
          <StatCard label="Coins" value={stats.coins.toLocaleString()} icon="🪙" color="text-yellow-400" />
        </div>

        {/* Mode Bests */}
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">Mode High Scores</h2>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: 'Classic', value: stats.classicBest, icon: '⚽', color: 'text-emerald-400' },
            { label: 'Time Attack', value: stats.timeAttackBest, icon: '⏱️', color: 'text-blue-400' },
            { label: 'Survival', value: stats.survivalBest, icon: '💀', color: 'text-red-400' },
            { label: 'Daily', value: stats.dailyBest, icon: '📅', color: 'text-yellow-400' },
          ].map(m => (
            <div key={m.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
              <span className="text-2xl">{m.icon}</span>
              <div>
                <div className={`font-black text-lg ${m.color}`}>{m.value}</div>
                <div className="text-gray-500 text-xs">{m.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Title Progression */}
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">Title Progression</h2>
        <div className="space-y-2">
          {TITLE_REQUIREMENTS.map(t => {
            const isUnlocked = stats.level >= t.minLevel;
            const isCurrent = title.title === t.title;
            return (
              <div
                key={t.title}
                className={`flex items-center gap-3 rounded-2xl p-3 border transition-all
                  ${isCurrent ? `${t.bgColor}/40 border-${t.color.replace('text-', '')}/40` : ''}
                  ${isUnlocked && !isCurrent ? 'bg-white/5 border-white/10' : ''}
                  ${!isUnlocked ? 'bg-white/3 border-white/5 opacity-50' : ''}
                `}
              >
                <span className="text-xl">{t.icon}</span>
                <div className="flex-1">
                  <div className={`font-bold text-sm ${isUnlocked ? t.color : 'text-gray-500'}`}>
                    {t.title}
                  </div>
                  <div className="text-gray-600 text-xs">Level {t.minLevel}+</div>
                </div>
                {isCurrent && <span className="text-xs text-white bg-white/20 px-2 py-0.5 rounded-full">Current</span>}
                {isUnlocked && !isCurrent && <span className="text-xs text-emerald-400">✓ Unlocked</span>}
                {!isUnlocked && <span className="text-xs text-gray-600">🔒 Locked</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsScreen;
