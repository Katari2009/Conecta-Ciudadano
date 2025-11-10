
import React from 'react';
import { ACHIEVEMENTS } from '../constants';

interface AchievementsScreenProps {
  badges: string[];
  onClose: () => void;
}

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ badges, onClose }) => {
  return (
    <div>
        <div className="border-b border-white/20 pb-4 mb-6 text-center relative">
            <h2 className="text-2xl font-semibold">🏆 Tus Logros</h2>
            <p className="text-gray-300 font-light">Desbloquea todos los insignias para convertirte en un Agente de Cambio.</p>
            <button onClick={onClose} className="absolute top-0 right-0 text-2xl font-bold text-white/50 hover:text-white">&times;</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map(achievement => {
                const isUnlocked = badges.includes(achievement.id);
                return (
                    <div
                        key={achievement.id}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                            isUnlocked
                                ? 'bg-green-500/10 border-green-400'
                                : 'bg-black/10 border-white/20'
                        }`}
                    >
                        <div className={`text-5xl mb-3 transition-all duration-500 ${isUnlocked ? 'grayscale-0 opacity-100' : 'grayscale opacity-30'}`}>
                            {achievement.icon}
                        </div>
                        <h4 className="font-bold text-lg">{achievement.name}</h4>
                        <p className={`text-sm ${isUnlocked ? 'text-gray-200' : 'text-gray-400'}`}>{achievement.description}</p>
                    </div>
                );
            })}
        </div>
         <div className="mt-6 text-center">
            <button onClick={onClose} className="px-6 py-2 rounded-lg bg-white/20 text-white font-semibold hover:bg-white/30 transition-all">
                Volver
            </button>
        </div>
    </div>
  );
};

export default AchievementsScreen;
