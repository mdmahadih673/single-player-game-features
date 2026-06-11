import React, { useState } from 'react';
import { LeaderboardEntry, GameMode } from '../types/game';
import { getModeLabel, getModeIcon, formatTime } from '../utils/gameLogic';

interface LeaderboardScreenProps {
  entries: LeaderboardEntry[];
  onBack: () => void;
}

const MODES: (GameMode | 'all')[] = ['all', 'classic', 'timeattack', 'survival', 'daily'];

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ entries, onBack }) => {
  const [filter, setFilter] = useState<GameMode | 'all'>('all');

  const filtered = (filter === 'all' ? entries : entries.filter(e => e.mode === filter))
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);

  const getModeColor = (mode: GameMode) => {
    switch (mode) {
      case 'classic': return 'text-emerald-400';
      case 'timeattack': return 'text-blue-400';
      case 'survival': return 'text-red-400';
      case 'daily': return 'text-yellow-400';
    }
  };

  const getRankStyle = (i: number) => {
    if (i === 0) return 'text-yellow-400 text-lg';
    if (i === 1) return 'text-gray-300 text-base';
    if (i === 2) return 'text-amber-600 text-base';
    return 'text-gray-500 text-sm';
  };

  const getRankEmoji = (i: number) => {
    if (i === 0) return '🥇';
    if (i === 1) return '🥈';
    if (i === 2) return '🥉';
    return `#${i + 1}`;
  };

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
          <h1 className="text-white font-black text-2xl">🏅 Leaderboard</h1>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {MODES.map(m => (
            <button
              key={m}
              onClick={() => setFilter(m)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all
                ${filter === m
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
            >
              {m === 'all' ? '🌍 All' : `${getModeIcon(m)} ${getModeLabel(m)}`}
            </button>
          ))}
        </div>

        {/* Entries */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🏟️</div>
            <div className="text-gray-400">No records yet. Play a game!</div>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((entry, i) => (
              <div
                key={entry.id}
                className={`bg-white/5 border rounded-2xl p-4 flex items-center gap-4
                  ${i === 0 ? 'border-yellow-500/40 bg-yellow-950/20' : 'border-white/10'}
                `}
              >
                <div className={`w-10 text-center font-black ${getRankStyle(i)}`}>
                  {getRankEmoji(i)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${getModeColor(entry.mode)}`}>
                      {getModeIcon(entry.mode)} {getModeLabel(entry.mode)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span>🎯 {entry.accuracy}%</span>
                    <span>🔥 {entry.streak}</span>
                    <span>⏱️ {formatTime(entry.timePlayed)}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-white font-black text-xl">{entry.score}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardScreen;
