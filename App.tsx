
import React, { useState, useEffect, useCallback } from 'react';
import { User, Project, GamificationState } from './types';
import { ACHIEVEMENTS } from './constants';
import RegistrationScreen from './components/RegistrationScreen';
import MainApp from './components/MainApp';
import AchievementNotification from './components/AchievementNotification';

const AnimatedBackground: React.FC = () => {
    const particles = [
        { left: '25%', width: 80, height: 80, delay: '0s', duration: '25s' },
        { left: '10%', width: 20, height: 20, delay: '2s', duration: '12s' },
        { left: '70%', width: 20, height: 20, delay: '4s', duration: '25s' },
        { left: '40%', width: 60, height: 60, delay: '0s', duration: '18s' },
        { left: '65%', width: 20, height: 20, delay: '0s', duration: '25s' },
        { left: '75%', width: 110, height: 110, delay: '3s', duration: '25s' },
        { left: '35%', width: 150, height: 150, delay: '7s', duration: '25s' },
        { left: '50%', width: 25, height: 25, delay: '15s', duration: '45s' },
        { left: '20%', width: 15, height: 15, delay: '2s', duration: '35s' },
        { left: '85%', width: 150, height: 150, delay: '0s', duration: '11s' },
    ];
    return (
        <div className="bg-animation fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden">
            {particles.map((p, i) => (
                <span
                    key={i}
                    className="absolute block bg-white/10 animate-[move_25s_linear_infinite] bottom-[-150px]"
                    style={{
                        left: p.left,
                        width: `${p.width}px`,
                        height: `${p.height}px`,
                        animationDelay: p.delay,
                        animationName: 'move',
                        animationDuration: p.duration,
                    }}
                ></span>
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
        <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white flex justify-center items-center p-4">
            <AnimatedBackground />
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
