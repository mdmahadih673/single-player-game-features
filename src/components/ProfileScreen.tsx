import React from 'react';
import { PlayerStats } from '../types/game';
import { getTitle, TITLE_REQUIREMENTS, getAccuracy, formatTime, ACHIEVEMENTS } from '../utils/gameLogic';

interface ProfileScreenProps {
  stats: PlayerStats;
  onBack: () => void;
  onReset: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ stats, onBack, onReset }) => {
  const title = getTitle(stats.level);
  const accuracy = getAccuracy(stats.totalCorrect, stats.totalCorrect + stats.totalWrong);
  const xpInLevel = stats.xp % 200;
  const xpPercent = (xpInLevel / 200) * 100;
  const unlockedAchievements = ACHIEVEMENTS.filter(a => stats.achievements.includes(a.id));

  const [showResetConfirm, setShowResetConfirm] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 relative z-10">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              ←
            </button>
            <h1 className="text-white font-black text-2xl">👤 Profile</h1>
          </div>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-xs text-red-400 hover:text-red-300 bg-red-950/40 border border-red-800/40 rounded-lg px-3 py-1.5 transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 border border-emerald-700/30 rounded-3xl p-6 mb-5">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-700 flex items-center justify-center text-5xl shadow-2xl mb-4">
              {title.icon}
            </div>
            <div className="text-white font-black text-2xl mb-1">You</div>
            <div className={`text-sm font-bold px-4 py-1 rounded-full ${title.bgColor} ${title.color} mb-4`}>
              {title.title}
            </div>

            {/* Coin + XP row */}
            <div className="flex gap-6 mb-5">
              <div className="text-center">
                <div className="text-yellow-400 font-black text-xl">🪙 {stats.coins}</div>
                <div className="text-gray-500 text-xs">Coins</div>
              </div>
              <div className="text-center">
                <div className="text-emerald-400 font-black text-xl">⭐ {stats.xp}</div>
                <div className="text-gray-500 text-xs">Total XP</div>
              </div>
              <div className="text-center">
                <div className="text-white font-black text-xl">Lv.{stats.level}</div>
                <div className="text-gray-500 text-xs">Level</div>
              </div>
            </div>

            {/* XP Progress */}
            <div className="w-full">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Level {stats.level}</span>
                <span>{xpInLevel}/200 XP</span>
                <span>Level {stats.level + 1}</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden w-full">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Best Score', value: stats.bestScore, icon: '🏆' },
            { label: 'Best Streak', value: `${stats.bestStreak}🔥`, icon: '⚡' },
            { label: 'Accuracy', value: `${accuracy}%`, icon: '🎯' },
            { label: 'Games', value: stats.totalGamesPlayed, icon: '🎮' },
            { label: 'Correct', value: stats.totalCorrect, icon: '✅' },
            { label: 'Time', value: formatTime(stats.totalTimePlayed), icon: '⏱️' },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="text-white font-bold text-sm">{s.value}</div>
              <div className="text-gray-500 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Title Path */}
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">Your Title Path</h2>
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {TITLE_REQUIREMENTS.map(t => {
            const isUnlocked = stats.level >= t.minLevel;
            const isCurrent = title.title === t.title;
            return (
              <div
                key={t.title}
                className={`flex-shrink-0 flex flex-col items-center gap-1 p-3 rounded-2xl border min-w-[80px]
                  ${isCurrent ? `${t.bgColor}/50 border-yellow-500/50` : ''}
                  ${isUnlocked && !isCurrent ? 'bg-white/5 border-white/10' : ''}
                  ${!isUnlocked ? 'bg-white/3 border-white/5 opacity-40' : ''}
                `}
              >
                <span className={`text-2xl ${!isUnlocked ? 'grayscale' : ''}`}>{t.icon}</span>
                <span className={`text-xs font-bold ${isCurrent ? t.color : isUnlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.title}
                </span>
                <span className="text-xs text-gray-600">Lv.{t.minLevel}</span>
                {isCurrent && <span className="text-xs text-yellow-400">●</span>}
              </div>
            );
          })}
        </div>

        {/* Recent Achievements */}
        {unlockedAchievements.length > 0 && (
          <>
            <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">
              Achievements ({unlockedAchievements.length}/{ACHIEVEMENTS.length})
            </h2>
            <div className="flex gap-2 flex-wrap mb-5">
              {unlockedAchievements.map(a => (
                <div
                  key={a.id}
                  title={a.name}
                  className="w-12 h-12 bg-yellow-950/40 border border-yellow-600/30 rounded-xl flex items-center justify-center text-xl"
                >
                  {a.icon}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Reset Confirm */}
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-red-700/40 rounded-3xl p-6 max-w-sm w-full">
              <div className="text-4xl text-center mb-3">⚠️</div>
              <h3 className="text-white font-black text-xl text-center mb-2">Reset All Progress?</h3>
              <p className="text-gray-400 text-sm text-center mb-5">
                This will delete all your stats, achievements, scores, and coins. This cannot be undone.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onReset();
                    setShowResetConfirm(false);
                  }}
                  className="bg-red-700 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
