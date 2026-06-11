import React from 'react';
import { GameSession } from '../types/game';
import { getModeIcon, getModeLabel, formatTime, getAccuracy } from '../utils/gameLogic';

interface GameOverScreenProps {
  session: GameSession;
  coinsEarned: number;
  xpEarned: number;
  newAchievements: { name: string; icon: string }[];
  isNewHighScore: boolean;
  onPlayAgain: () => void;
  onHome: () => void;
}

const StatRow: React.FC<{ label: string; value: string | number; icon: string; highlight?: boolean }> = ({
  label, value, icon, highlight
}) => (
  <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
    <div className="flex items-center gap-2 text-gray-400 text-sm">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
    <span className={`font-bold text-sm ${highlight ? 'text-yellow-400' : 'text-white'}`}>{value}</span>
  </div>
);

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  session, coinsEarned, xpEarned, newAchievements, isNewHighScore, onPlayAgain, onHome
}) => {
  const accuracy = getAccuracy(session.correct, session.correct + session.wrong);
  const totalAnswered = session.correct + session.wrong;

  const getRankEmoji = () => {
    if (accuracy >= 90 && session.bestStreak >= 10) return '🏆';
    if (accuracy >= 80) return '🥇';
    if (accuracy >= 60) return '🥈';
    if (accuracy >= 40) return '🥉';
    return '⚽';
  };

  const getRankLabel = () => {
    if (accuracy >= 90 && session.bestStreak >= 10) return 'World Class!';
    if (accuracy >= 80) return 'Excellent!';
    if (accuracy >= 60) return 'Good Game!';
    if (accuracy >= 40) return 'Keep Practicing';
    return 'Try Again!';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-7xl mb-3">{getRankEmoji()}</div>
          <h2 className="text-3xl font-black text-white mb-1">{getRankLabel()}</h2>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <span>{getModeIcon(session.mode)}</span>
            <span>{getModeLabel(session.mode)}</span>
          </div>
          {isNewHighScore && (
            <div className="mt-2 bg-yellow-500/20 border border-yellow-500/40 rounded-full px-4 py-1 inline-block">
              <span className="text-yellow-400 font-bold text-sm">🎉 NEW HIGH SCORE!</span>
            </div>
          )}
        </div>

        {/* Main Score */}
        <div className="bg-gradient-to-br from-emerald-950/80 to-green-950/80 border border-emerald-600/40 rounded-3xl p-6 mb-4 text-center">
          <div className="text-gray-400 text-xs uppercase tracking-widest mb-1">Final Score</div>
          <div className="text-6xl font-black text-white mb-2">{session.score}</div>
          <div className="flex justify-center gap-4 text-sm">
            <div className="text-center">
              <div className="text-emerald-400 font-bold">+{xpEarned} XP</div>
              <div className="text-gray-500 text-xs">Experience</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-bold">+{coinsEarned} 🪙</div>
              <div className="text-gray-500 text-xs">Coins</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-4">
          <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-2">Game Statistics</h3>
          <StatRow label="Correct Answers" value={`${session.correct} / ${totalAnswered}`} icon="✅" />
          <StatRow label="Accuracy" value={`${accuracy}%`} icon="🎯" highlight={accuracy >= 80} />
          <StatRow label="Longest Streak" value={`${session.bestStreak} 🔥`} icon="⚡" highlight={session.bestStreak >= 5} />
          <StatRow label="Time Played" value={formatTime(session.totalTime)} icon="⏱️" />
          {session.mode === 'timeattack' && (
            <StatRow label="Time Remaining" value={formatTime(session.timeLeft)} icon="⏰" />
          )}
        </div>

        {/* New Achievements */}
        {newAchievements.length > 0 && (
          <div className="bg-yellow-950/60 border border-yellow-600/40 rounded-3xl p-4 mb-4">
            <h3 className="text-yellow-400 font-bold text-sm mb-3">🎖️ New Achievements!</h3>
            <div className="space-y-2">
              {newAchievements.map((ach) => (
                <div key={ach.name} className="flex items-center gap-2 bg-yellow-950/40 rounded-xl px-3 py-2">
                  <span className="text-xl">{ach.icon}</span>
                  <span className="text-yellow-300 text-sm font-medium">{ach.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-lg"
          >
            ⚽ Play Again
          </button>
          <button
            onClick={onHome}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 rounded-2xl transition-all active:scale-95"
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
