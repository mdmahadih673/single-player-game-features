import React from 'react';
import { PlayerStats } from '../types/game';
import { ACHIEVEMENTS } from '../utils/gameLogic';

interface AchievementsScreenProps {
  stats: PlayerStats;
  onBack: () => void;
}

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ stats, onBack }) => {
  const unlocked = ACHIEVEMENTS.filter(a => stats.achievements.includes(a.id));
  const locked = ACHIEVEMENTS.filter(a => !stats.achievements.includes(a.id));

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
          <h1 className="text-white font-black text-2xl">🎖️ Achievements</h1>
        </div>

        {/* Progress */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300 text-sm font-medium">Progress</span>
            <span className="text-white font-bold">{unlocked.length} / {ACHIEVEMENTS.length}</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full transition-all"
              style={{ width: `${(unlocked.length / ACHIEVEMENTS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Unlocked */}
        {unlocked.length > 0 && (
          <>
            <h2 className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">Unlocked ✓</h2>
            <div className="grid grid-cols-1 gap-2 mb-5">
              {unlocked.map(ach => (
                <div key={ach.id} className="bg-yellow-950/30 border border-yellow-600/30 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center text-2xl">
                    {ach.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-yellow-300 font-bold text-sm">{ach.name}</div>
                    <div className="text-gray-400 text-xs">{ach.description}</div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <div className="text-emerald-400 font-bold">+{ach.xpReward} XP</div>
                    <div className="text-yellow-500">+{ach.coinReward} 🪙</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Locked */}
        {locked.length > 0 && (
          <>
            <h2 className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-3">Locked 🔒</h2>
            <div className="grid grid-cols-1 gap-2">
              {locked.map(ach => (
                <div key={ach.id} className="bg-white/3 border border-white/8 rounded-2xl p-4 flex items-center gap-4 opacity-60">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-2xl grayscale">
                    {ach.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-400 font-bold text-sm">{ach.name}</div>
                    <div className="text-gray-600 text-xs">{ach.description}</div>
                  </div>
                  <div className="text-right text-xs text-gray-600">
                    <div>+{ach.xpReward} XP</div>
                    <div>+{ach.coinReward} 🪙</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AchievementsScreen;
