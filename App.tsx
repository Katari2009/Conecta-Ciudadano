import React, { useState, useEffect, useCallback } from 'react';
import { User, Project, GamificationState } from './types';
import { ACHIEVEMENTS } from './constants';
import RegistrationScreen from './components/RegistrationScreen';
import MainApp from './components/MainApp';
import AchievementNotification from './components/AchievementNotification';

const AnimatedBackground: React.FC = () => {
    // Generate a set of lines for a more thematic "digital city" background
    const lines = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 40 + 20}vh`, // Use viewport height for responsiveness
      delay: `${Math.random() * 10}s`,
      duration: `${Math.random() * 20 + 15}s`,
      opacity: Math.random() * 0.5 + 0.1, // Varied opacity
    }));
  
    return (
      <div className="lines fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
        {lines.map(line => (
          <div
            key={line.id}
            className="absolute bottom-0 bg-gradient-to-t from-white/20 to-transparent"
            style={{
              left: line.left,
              width: line.width,
              height: line.height,
              opacity: line.opacity,
              animation: `animateLines ${line.duration} linear ${line.delay} infinite`,
            }}
          ></div>
        ))}
      </div>
    );
};


const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [project, setProject] = useState<Project>(() => {
        const saved = localStorage.getItem('project');
        return saved ? JSON.parse(saved) : {
            problema: '', solucion1: '', solucion2: '',
            factibilidad: { recursos: '', tiempo: '', apoyo: '', consecuencias: '' },
            postTexto: '', compromiso: ''
        };
    });
    const [gamification, setGamification] = useState<GamificationState>(() => {
        const saved = localStorage.getItem('gamification');
        return saved ? JSON.parse(saved) : { xp: 0, badges: [], viewedPerspectives: [] };
    });
    const [lastUnlockedBadgeName, setLastUnlockedBadgeName] = useState<string | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('project', JSON.stringify(project));
    }, [project]);

    useEffect(() => {
        localStorage.setItem('gamification', JSON.stringify(gamification));
    }, [gamification]);

    const addXP = useCallback((amount: number) => {
        setGamification(prev => ({...prev, xp: prev.xp + amount}));
    }, []);

    const unlockBadge = useCallback((badgeId: string) => {
        if (!gamification.badges.includes(badgeId)) {
            const badge = ACHIEVEMENTS.find(b => b.id === badgeId);
            if (badge) {
                setGamification(prev => ({...prev, badges: [...prev.badges, badgeId]}));
                addXP(badge.xp);
                setLastUnlockedBadgeName(badge.name);
            }
        }
    }, [gamification.badges, addXP]);

    const handleRegister = (newUser: User) => {
        setUser(newUser);
        unlockBadge('iniciador');
    };

    return (
        <div className="min-h-screen text-white flex flex-col p-4 relative isolate">
            <AnimatedBackground />
            <main className="flex-grow flex justify-center items-center w-full z-10">
                <div className="container w-full max-w-4xl">
                    {user ? (
                        <MainApp
                            user={user}
                            project={project}
                            setProject={setProject}
                            gamification={gamification}
                            setGamification={setGamification}
                            addXP={addXP}
                            unlockBadge={unlockBadge}
                        />
                    ) : (
                        <RegistrationScreen onRegister={handleRegister} />
                    )}
                </div>
            </main>
            <footer className="w-full text-center py-4 shrink-0 z-10">
                <p className="font-bold text-sm text-white/70">Creado por Christian Núñez V., Asesor Pedagógico, Programa CTA-PACE. 2025.</p>
            </footer>
            {lastUnlockedBadgeName && (
                <AchievementNotification
                    badgeName={lastUnlockedBadgeName}
                    onDismiss={() => setLastUnlockedBadgeName(null)}
                />
            )}
        </div>
    );
};

export default App;