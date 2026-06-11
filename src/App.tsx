import React, { useState, useCallback, useEffect } from 'react';
import { GameMode, GameState, GameSession } from './types/game';
import { PlayerStats } from './types/game';
import {
  loadStats, saveStats, DEFAULT_STATS,
  loadLeaderboard, addLeaderboardEntry,
  checkNewAchievements,
  getLevelFromXP,
  XP_GAIN_CORRECT, XP_GAIN_WRONG,
  COINS_PER_CORRECT, COINS_STREAK_BONUS_5, COINS_STREAK_BONUS_10,
  getAccuracy,
} from './utils/gameLogic';
import AnimatedBackground from './components/AnimatedBackground';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import AchievementsScreen from './components/AchievementsScreen';
import StatsScreen from './components/StatsScreen';
import ProfileScreen from './components/ProfileScreen';

const App: React.FC = () => {
  const [screen, setScreen] = useState<GameState>('home');
  const [currentMode, setCurrentMode] = useState<GameMode>('classic');
  const [lastSession, setLastSession] = useState<GameSession | null>(null);
  const [stats, setStats] = useState<PlayerStats>(() => loadStats());
  const [leaderboard, setLeaderboard] = useState(() => loadLeaderboard());
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [newAchievements, setNewAchievements] = useState<{ name: string; icon: string }[]>([]);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  const handleStartGame = useCallback((mode: GameMode) => {
    setCurrentMode(mode);
    setScreen('playing');
  }, []);

  const handleGameOver = useCallback((session: GameSession) => {
    // Calculate rewards
    const xpGained = session.correct * XP_GAIN_CORRECT + session.wrong * XP_GAIN_WRONG;
    let coinsGained = session.correct * COINS_PER_CORRECT;

    // Streak bonuses for coins
    if (session.bestStreak >= 10) coinsGained += COINS_STREAK_BONUS_10;
    else if (session.bestStreak >= 5) coinsGained += COINS_STREAK_BONUS_5;

    const today = new Date().toDateString();
    const newXP = stats.xp + xpGained;
    const newLevel = getLevelFromXP(newXP);

    // Mode best score check
    const modeKey = `${session.mode}Best` as keyof PlayerStats;
    const prevBest = stats[modeKey] as number;
    const newHighScore = session.score > prevBest;

    const updatedStats: PlayerStats = {
      ...stats,
      totalGamesPlayed: stats.totalGamesPlayed + 1,
      totalCorrect: stats.totalCorrect + session.correct,
      totalWrong: stats.totalWrong + session.wrong,
      totalScore: stats.totalScore + session.score,
      bestScore: Math.max(stats.bestScore, session.score),
      bestStreak: Math.max(stats.bestStreak, session.bestStreak),
      totalTimePlayed: stats.totalTimePlayed + session.totalTime,
      coins: stats.coins + coinsGained,
      xp: newXP,
      level: newLevel,
      classicBest: session.mode === 'classic' ? Math.max(stats.classicBest, session.score) : stats.classicBest,
      timeAttackBest: session.mode === 'timeattack' ? Math.max(stats.timeAttackBest, session.score) : stats.timeAttackBest,
      survivalBest: session.mode === 'survival' ? Math.max(stats.survivalBest, session.score) : stats.survivalBest,
      dailyBest: session.mode === 'daily' ? Math.max(stats.dailyBest, session.score) : stats.dailyBest,
      lastDailyDate: session.mode === 'daily' ? today : stats.lastDailyDate,
      dailyCompleted: session.mode === 'daily' ? true : stats.dailyCompleted,
    };

    // Check achievements
    const newAchs = checkNewAchievements(updatedStats);
    let bonusXP = 0;
    let bonusCoins = 0;
    const achIds: string[] = [...stats.achievements];
    for (const ach of newAchs) {
      bonusXP += ach.xpReward;
      bonusCoins += ach.coinReward;
      achIds.push(ach.id);
    }

    const finalStats: PlayerStats = {
      ...updatedStats,
      xp: updatedStats.xp + bonusXP,
      coins: updatedStats.coins + bonusCoins,
      level: getLevelFromXP(updatedStats.xp + bonusXP),
      achievements: achIds,
    };

    saveStats(finalStats);
    setStats(finalStats);

    // Add to leaderboard
    const entry = {
      id: `${Date.now()}_${Math.random()}`,
      score: session.score,
      mode: session.mode,
      streak: session.bestStreak,
      correct: session.correct,
      accuracy: getAccuracy(session.correct, session.correct + session.wrong),
      timePlayed: session.totalTime,
      date: new Date().toISOString(),
    };
    addLeaderboardEntry(entry);
    setLeaderboard(loadLeaderboard());

    setCoinsEarned(coinsGained + bonusCoins);
    setXpEarned(xpGained + bonusXP);
    setNewAchievements(newAchs.map(a => ({ name: a.name, icon: a.icon })));
    setIsNewHighScore(newHighScore && session.score > 0);
    setLastSession(session);
    setScreen('gameover');
  }, [stats]);

  const handleReset = useCallback(() => {
    const fresh = { ...DEFAULT_STATS };
    saveStats(fresh);
    setStats(fresh);
    setLeaderboard([]);
    localStorage.removeItem('footballEmoji_leaderboard');
    setScreen('home');
  }, []);

  // Handle daily reset
  useEffect(() => {
    const today = new Date().toDateString();
    if (stats.lastDailyDate !== today && stats.dailyCompleted) {
      const updated = { ...stats, dailyCompleted: false };
      saveStats(updated);
      setStats(updated);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 relative">
      <AnimatedBackground />

      {screen === 'home' && (
        <HomeScreen
          stats={stats}
          onStartGame={handleStartGame}
          onNavigate={setScreen}
        />
      )}

      {screen === 'playing' && (
        <GameScreen
          mode={currentMode}
          onGameOver={handleGameOver}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'gameover' && lastSession && (
        <GameOverScreen
          session={lastSession}
          coinsEarned={coinsEarned}
          xpEarned={xpEarned}
          newAchievements={newAchievements}
          isNewHighScore={isNewHighScore}
          onPlayAgain={() => handleStartGame(lastSession.mode)}
          onHome={() => setScreen('home')}
        />
      )}

      {screen === 'leaderboard' && (
        <LeaderboardScreen
          entries={leaderboard}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'achievements' && (
        <AchievementsScreen
          stats={stats}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'stats' && (
        <StatsScreen
          stats={stats}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'profile' && (
        <ProfileScreen
          stats={stats}
          onBack={() => setScreen('home')}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default App;
