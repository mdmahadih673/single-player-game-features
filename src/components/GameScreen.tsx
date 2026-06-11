import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameMode, GameSession, AnswerFeedback, Difficulty } from '../types/game';
import { Question, getDailyQuestions, shuffleArray, getQuestionsByDifficulty } from '../data/questions';
import {
  POINTS_CORRECT, POINTS_STREAK_5, POINTS_STREAK_10,
  getModeIcon, getModeLabel, formatTime, getDifficultyForQuestion
} from '../utils/gameLogic';

interface GameScreenProps {
  mode: GameMode;
  onGameOver: (session: GameSession) => void;
  onBack: () => void;
}

const INITIAL_LIVES: Record<GameMode, number> = {
  classic: 3,
  timeattack: 0,
  survival: 3,
  daily: 3,
};

const TIME_ATTACK_SECONDS = 60;

const buildQuestionPool = (mode: GameMode): Question[] => {
  if (mode === 'daily') return getDailyQuestions(15);
  return [];
};

const getDifficultyColor = (d: Difficulty) => {
  if (d === 'easy') return 'text-emerald-400';
  if (d === 'medium') return 'text-yellow-400';
  return 'text-red-400';
};

const getDifficultyBg = (d: Difficulty) => {
  if (d === 'easy') return 'bg-emerald-950/60 border-emerald-600/40';
  if (d === 'medium') return 'bg-yellow-950/60 border-yellow-600/40';
  return 'bg-red-950/60 border-red-600/40';
};

const GameScreen: React.FC<GameScreenProps> = ({ mode, onGameOver, onBack }) => {
  const [dailyPool, setDailyPool] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState<Question | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES[mode]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [feedback, setFeedback] = useState<AnswerFeedback>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_ATTACK_SECONDS);
  const [, setIsAnimating] = useState(false);
  const [bonusFlash, setBonusFlash] = useState<string | null>(null);
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>('easy');
  const [answered, setAnswered] = useState(false);
  const [comboText, setComboText] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [questionFade, setQuestionFade] = useState(true);

  const startTime = useRef(Date.now());
  const timeLeftRef = useRef(TIME_ATTACK_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scoreRef = useRef(0);
  const livesRef = useRef(INITIAL_LIVES[mode]);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const correctRef = useRef(0);
  const wrongRef = useRef(0);
  const qIndexRef = useRef(0);
  const onGameOverRef = useRef(onGameOver);
  onGameOverRef.current = onGameOver;

  const triggerGameOver = useCallback(() => {
    if (isGameOver) return;
    setIsGameOver(true);
    if (timerRef.current) clearInterval(timerRef.current);
    const elapsed = Math.floor((Date.now() - startTime.current) / 1000);
    const sess: GameSession = {
      mode,
      score: scoreRef.current,
      lives: livesRef.current,
      streak: streakRef.current,
      bestStreak: bestStreakRef.current,
      correct: correctRef.current,
      wrong: wrongRef.current,
      timeLeft: timeLeftRef.current,
      totalTime: elapsed,
      difficulty: 'easy',
      questionIndex: qIndexRef.current,
      answeredQuestions: [],
      startTime: startTime.current,
    };
    setTimeout(() => onGameOverRef.current(sess), 300);
  }, [isGameOver, mode]);

  const loadQuestion = useCallback((idx: number, pool: Question[]) => {
    const diff = getDifficultyForQuestion(idx, mode);
    setCurrentDifficulty(diff);

    let q: Question;
    if (mode === 'daily') {
      q = pool[idx % pool.length];
    } else {
      const diffPool = getQuestionsByDifficulty(diff);
      const available = shuffleArray(diffPool);
      q = available[idx % available.length];
    }

    setQuestionFade(false);
    setTimeout(() => {
      setCurrentQ(q);
      setShuffledOptions(shuffleArray(q.options));
      setFeedback(null);
      setSelectedAnswer(null);
      setAnswered(false);
      setIsAnimating(false);
      setQuestionFade(true);
    }, 200);
  }, [mode]);

  // Init
  useEffect(() => {
    const pool = buildQuestionPool(mode);
    setDailyPool(pool);
    loadQuestion(0, pool);
  }, []);

  // Time Attack timer
  useEffect(() => {
    if (mode !== 'timeattack') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        const next = t - 1;
        timeLeftRef.current = next;
        if (next <= 0) {
          clearInterval(timerRef.current!);
          triggerGameOver();
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [mode]);

  const handleAnswer = useCallback((option: string) => {
    if (answered || !currentQ || isGameOver) return;
    setAnswered(true);
    setSelectedAnswer(option);
    setIsAnimating(true);

    const isCorrect = option === currentQ.answer;
    setFeedback(isCorrect ? 'correct' : 'wrong');

    let newScore = scoreRef.current;
    let newStreak = streakRef.current;
    let newLives = livesRef.current;
    let newCorrect = correctRef.current;
    let newWrong = wrongRef.current;
    let bonusMsg = '';

    if (isCorrect) {
      newScore += POINTS_CORRECT;
      newStreak += 1;
      newCorrect += 1;

      if (newStreak === 5) {
        newScore += POINTS_STREAK_5;
        bonusMsg = `🔥 Streak x5! +${POINTS_STREAK_5} BONUS!`;
      } else if (newStreak === 10) {
        newScore += POINTS_STREAK_10;
        bonusMsg = `🌟 Streak x10! +${POINTS_STREAK_10} MEGA BONUS!`;
      } else if (newStreak > 10 && newStreak % 5 === 0) {
        newScore += POINTS_STREAK_5;
        bonusMsg = `⚡ Streak x${newStreak}! +${POINTS_STREAK_5} BONUS!`;
      }

      if (newStreak > bestStreakRef.current) {
        bestStreakRef.current = newStreak;
        setBestStreak(newStreak);
      }
      setComboText(newStreak >= 3 ? `${newStreak}x COMBO!` : null);
    } else {
      newStreak = 0;
      newWrong += 1;
      setComboText(null);
      if (mode !== 'timeattack') {
        newLives = Math.max(0, newLives - 1);
      }
    }

    scoreRef.current = newScore;
    streakRef.current = newStreak;
    livesRef.current = newLives;
    correctRef.current = newCorrect;
    wrongRef.current = newWrong;
    qIndexRef.current = qIndexRef.current + 1;

    setScore(newScore);
    setStreak(newStreak);
    setLives(newLives);
    setCorrect(newCorrect);
    setWrong(newWrong);

    if (bonusMsg) {
      setBonusFlash(bonusMsg);
    }

    setTimeout(() => {
      setBonusFlash(null);

      // Check game over
      if (newLives <= 0 && mode !== 'timeattack') {
        triggerGameOver();
        return;
      }

      const nextIdx = qIndexRef.current;

      // Daily mode: end after all questions
      if (mode === 'daily' && nextIdx >= dailyPool.length) {
        triggerGameOver();
        return;
      }

      setQIndex(nextIdx);
      loadQuestion(nextIdx, dailyPool);
    }, 1400);
  }, [answered, currentQ, isGameOver, mode, dailyPool, loadQuestion, triggerGameOver]);

  if (!currentQ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-3xl animate-pulse">⚽</div>
      </div>
    );
  }

  const totalAnswered = correct + wrong;
  const accuracy = totalAnswered > 0 ? Math.round((correct / totalAnswered) * 100) : 100;
  const timerPercent = mode === 'timeattack' ? (timeLeft / TIME_ATTACK_SECONDS) * 100 : 0;
  const timerColor = timeLeft > 30 ? 'bg-emerald-500' : timeLeft > 15 ? 'bg-yellow-500' : 'bg-red-500 animate-pulse';

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-4 relative z-10">
      <div className="w-full max-w-lg">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            <span className="text-lg">{getModeIcon(mode)}</span>
            <span className="text-white font-bold text-sm">{getModeLabel(mode)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            Q{qIndex + 1}
          </div>
        </div>

        {/* Status Bar */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <div className="text-emerald-400 font-black text-xl tabular-nums">{score}</div>
            <div className="text-gray-500 text-xs">Score</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            {mode === 'timeattack' ? (
              <>
                <div className={`font-black text-xl tabular-nums ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-blue-300'}`}>
                  {formatTime(timeLeft)}
                </div>
                <div className="text-gray-500 text-xs">Time</div>
              </>
            ) : (
              <>
                <div className="text-xl leading-none py-0.5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span key={i} className={`transition-all ${i < lives ? 'opacity-100' : 'opacity-15 grayscale'}`}>
                      ❤️
                    </span>
                  ))}
                </div>
                <div className="text-gray-500 text-xs mt-1">Lives</div>
              </>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <div className={`font-black text-xl ${streak >= 5 ? 'text-orange-400' : streak >= 3 ? 'text-yellow-400' : 'text-white'}`}>
              {streak > 0 ? `${streak}🔥` : '—'}
            </div>
            <div className="text-gray-500 text-xs">Streak</div>
          </div>
        </div>

        {/* Time Attack Progress Bar */}
        {mode === 'timeattack' && (
          <div className="h-2.5 bg-gray-800 rounded-full mb-4 overflow-hidden">
            <div
              className={`h-full ${timerColor} rounded-full transition-all duration-1000`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>
        )}

        {/* Difficulty badge */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getDifficultyBg(currentDifficulty)} ${getDifficultyColor(currentDifficulty)}`}>
            {currentDifficulty.toUpperCase()} DIFFICULTY
          </span>
          <span className="text-xs text-gray-500">
            🎯 {accuracy}% acc
          </span>
        </div>

        {/* Question Card */}
        <div
          className={`rounded-3xl p-6 mb-5 text-center transition-all duration-300 border-2
            ${feedback === 'correct' ? 'border-emerald-500 bg-emerald-950/50 shadow-lg shadow-emerald-900/30' : ''}
            ${feedback === 'wrong' ? 'border-red-500 bg-red-950/50 shadow-lg shadow-red-900/30' : ''}
            ${!feedback ? 'border-white/10 bg-white/5' : ''}
            ${questionFade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          `}
          style={{ transition: 'opacity 0.2s, transform 0.2s, border-color 0.3s, background-color 0.3s' }}
        >
          {/* Emoji display */}
          <div
            className={`text-6xl mb-4 select-none transition-all duration-300 inline-block
              ${feedback === 'correct' ? 'scale-125' : ''}
              ${feedback === 'wrong' ? 'scale-90 opacity-70' : ''}
            `}
          >
            {currentQ.emojis}
          </div>

          {/* Feedback */}
          {feedback === 'correct' && (
            <div className="text-emerald-400 font-black text-2xl mb-2">
              ⚽ GOAL! +{POINTS_CORRECT}
            </div>
          )}
          {feedback === 'wrong' && (
            <div className="text-red-400 font-black text-xl mb-2">
              ❌ MISS! {mode !== 'timeattack' ? '-1 ❤️' : 'No points'}
            </div>
          )}

          {comboText && feedback === 'correct' && (
            <div className="text-orange-300 font-bold text-sm mb-2 animate-pulse">{comboText}</div>
          )}

          <p className="text-white font-semibold text-lg leading-snug">{currentQ.question}</p>
          <p className="text-gray-600 text-xs mt-2">📂 {currentQ.category}</p>
        </div>

        {/* Bonus Flash Overlay */}
        {bonusFlash && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-black text-xl px-8 py-4 rounded-3xl shadow-2xl animate-bounce">
              {bonusFlash}
            </div>
          </div>
        )}

        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-3">
          {shuffledOptions.map((option, idx) => {
            let btnStyle = 'bg-white/8 border-white/15 text-white hover:bg-white/15 hover:border-white/30 hover:scale-[1.02]';
            if (answered) {
              if (option === currentQ.answer) {
                btnStyle = 'bg-emerald-600/90 border-emerald-400 text-white scale-[1.02]';
              } else if (option === selectedAnswer) {
                btnStyle = 'bg-red-600/90 border-red-400 text-white';
              } else {
                btnStyle = 'bg-white/5 border-white/8 text-gray-600';
              }
            }
            return (
              <button
                key={`${option}-${idx}`}
                onClick={() => handleAnswer(option)}
                disabled={answered}
                className={`border-2 rounded-2xl p-4 font-semibold text-sm transition-all duration-200
                  ${btnStyle}
                  ${!answered ? 'cursor-pointer active:scale-95' : 'cursor-default'}
                `}
              >
                <span className="mr-1">
                  {answered && option === currentQ.answer && '✓ '}
                  {answered && option === selectedAnswer && option !== currentQ.answer && '✗ '}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Bottom stats row */}
        <div className="flex justify-between text-xs text-gray-600 mt-4 px-1">
          <span>Best streak: <span className="text-orange-400 font-bold">{bestStreak}🔥</span></span>
          <span><span className="text-emerald-400">✓{correct}</span> <span className="text-red-400">✗{wrong}</span></span>
          {mode === 'daily' && (
            <span className="text-blue-400">{qIndex + 1}/{dailyPool.length}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
