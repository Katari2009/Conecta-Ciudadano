
import React, { useState, useCallback } from 'react';
import { User, Project, GamificationState } from '../types';
import GamificationBar from './GamificationBar';
import AchievementsScreen from './AchievementsScreen';
import Module1 from './modules/Module1';
import Module2 from './modules/Module2';
import Module3 from './modules/Module3';
import FinalReport from './FinalReport';

interface MainAppProps {
  user: User;
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
  gamification: GamificationState;
  setGamification: React.Dispatch<React.SetStateAction<GamificationState>>;
  addXP: (amount: number) => void;
  unlockBadge: (badgeId: string) => void;
}

interface GlassPanelProps {
    children: React.ReactNode;
    className?: string;
}
const GlassPanel: React.FC<GlassPanelProps> = ({ children, className = '' }) => (
    <div className={`bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6 sm:p-10 text-center ${className}`}>
        {children}
    </div>
);


const MainApp: React.FC<MainAppProps> = ({ user, project, setProject, gamification, setGamification, addXP, unlockBadge }) => {
  const [view, setView] = useState<'module1' | 'module2' | 'module3' | 'report' | 'achievements'>('module1');

  const handleNext = () => {
    switch (view) {
      case 'module1':
        if(project.problema) unlockBadge('detective');
        setView('module2');
        break;
      case 'module2':
        if(project.solucion1) unlockBadge('constructor');
        if(project.factibilidad.recursos && project.factibilidad.tiempo) unlockBadge('estratega');
        setView('module3');
        break;
      case 'module3':
        if(project.postTexto) unlockBadge('comunicador');
        if(project.compromiso) unlockBadge('compromiso');
        unlockBadge('agente');
        setView('report');
        break;
    }
  };

  const handlePrevious = () => {
    switch (view) {
      case 'module2': setView('module1'); break;
      case 'module3': setView('module2'); break;
      case 'report': setView('module3'); break;
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'module1':
        return <Module1 project={project} setProject={setProject} addXP={addXP} unlockBadge={unlockBadge} gamification={gamification} setGamification={setGamification}/>;
      case 'module2':
        return <Module2 project={project} setProject={setProject} />;
      case 'module3':
        return <Module3 project={project} setProject={setProject} />;
      case 'report':
        return <FinalReport user={user} project={project} gamification={gamification} />;
      case 'achievements':
        return <AchievementsScreen badges={gamification.badges} onClose={() => setView('module1')} />;
      default:
        return <Module1 project={project} setProject={setProject} addXP={addXP} unlockBadge={unlockBadge} gamification={gamification} setGamification={setGamification} />;
    }
  };

  return (
    <GlassPanel>
      {view !== 'achievements' && (
        <>
            <h2 className="text-2xl font-bold">¡Bienvenido/a, {user.nombre}!</h2>
            <p className="text-base text-gray-200 font-light mb-6">Aquí begins tu viaje para transformar tu comunidad.</p>
            <GamificationBar gamification={gamification} onViewAchievements={() => setView('achievements')} />
        </>
      )}

      {renderContent()}

      {view !== 'achievements' && view !== 'report' && (
        <div className="flex justify-between mt-8">
            <button
                onClick={handlePrevious}
                className="px-6 py-2 rounded-lg bg-white/20 text-white font-semibold hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={view === 'module1'}
            >
                Anterior
            </button>
            <button
                onClick={handleNext}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold hover:scale-105 hover:shadow-lg transition-transform"
            >
                Siguiente
            </button>
        </div>
      )}
    </GlassPanel>
  );
};

export default MainApp;
