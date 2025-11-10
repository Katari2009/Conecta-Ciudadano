
import React from 'react';
import { GamificationState } from '../types';
import { LEVELS } from '../constants';

interface GamificationBarProps {
  gamification: GamificationState;
  onViewAchievements: () => void;
}

const GamificationBar: React.FC<GamificationBarProps> = ({ gamification, onViewAchievements }) => {
  const currentLevelData = LEVELS.slice().reverse().find(l => gamification.xp >= l.minXP) || LEVELS[0];
  const levelIndex = LEVELS.findIndex(l => l.name === currentLevelData.name);
  const nextLevelData = LEVELS[levelIndex + 1];

  const xpInCurrentLevel = gamification.xp - currentLevelData.minXP;
  const xpForNextLevel = nextLevelData ? nextLevelData.minXP - currentLevelData.minXP : xpInCurrentLevel;
  const progress = xpForNextLevel > 0 ? (xpInCurrentLevel / xpForNextLevel) * 100 : 100;

  return (
    <div className="bg-white/10 border border-white/20 rounded-xl p-4 mb-6 flex flex-wrap justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <span className="bg-blue-500 text-white px-4 py-1 rounded-full font-bold text-sm">
          Nivel {levelIndex + 1}
        </span>
        <span className="font-semibold text-gray-200">{currentLevelData.name}</span>
      </div>
      <div className="flex-grow flex items-center gap-3 min-w-[150px]">
        <div className="w-full h-5 bg-black/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-lime-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="font-semibold text-gray-200 text-sm whitespace-nowrap">
          {nextLevelData ? `${gamification.xp} / ${nextLevelData.minXP} XP` : `${gamification.xp} XP`}
        </span>
      </div>
      <button onClick={onViewAchievements} className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:scale-105 transition-transform">
        🏆 Ver Logros
      </button>
    </div>
  );
};

export default GamificationBar;
