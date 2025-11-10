
import React, { useState, useCallback } from 'react';
import { Project, GamificationState } from '../../types';
import { PROBLEMAS, ACTORES } from '../../constants';

interface Module1Props {
    project: Project;
    setProject: React.Dispatch<React.SetStateAction<Project>>;
    gamification: GamificationState;
    setGamification: React.Dispatch<React.SetStateAction<GamificationState>>;
    addXP: (amount: number) => void;
    unlockBadge: (badgeId: string) => void;
}

const Module1: React.FC<Module1Props> = ({ project, setProject, gamification, setGamification, addXP, unlockBadge }) => {
    const [openPerspectives, setOpenPerspectives] = useState<Record<string, boolean>>({});

    const handleProblemSelect = (problemTitle: string) => {
        setProject(prev => ({ ...prev, problema: problemTitle }));
        unlockBadge('detective');
    };

    const togglePerspective = useCallback((actorName: string) => {
        setOpenPerspectives(prev => ({ ...prev, [actorName]: !prev[actorName] }));
        if (!gamification.viewedPerspectives.includes(actorName)) {
            const newPerspectives = [...gamification.viewedPerspectives, actorName];
            setGamification(prev => ({ ...prev, viewedPerspectives: newPerspectives }));
            addXP(5);
            if (newPerspectives.length === ACTORES.length) {
                unlockBadge('oido');
            }
        }
    }, [gamification.viewedPerspectives, setGamification, addXP, unlockBadge]);
    

    return (
        <div className="text-left">
            <div className="border-b border-white/20 pb-4 mb-6">
                <h2 className="text-2xl font-semibold">Módulo 1: Diagnóstico - Miradas Críticas</h2>
                <p className="text-gray-300 font-light">Identifica un problema y explora diferentes perspectivas.</p>
            </div>

            <div className="bg-black/10 rounded-xl p-5 mb-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-300">Actividad 1: El Cazador de Problemas</h3>
                <p className="mb-4">Selecciona UN problema de tu comuna o liceo que te interese abordar:</p>
                <div className="space-y-3">
                    {PROBLEMAS.map(({ title, description }) => (
                        <div
                            key={title}
                            onClick={() => handleProblemSelect(title)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                                project.problema === title
                                    ? 'bg-blue-500/30 border-blue-400 scale-105'
                                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                            }`}
                        >
                            <strong className="block">{title}</strong>
                            <p className="text-sm text-gray-300">{description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-black/10 rounded-xl p-5">
                <h3 className="text-xl font-semibold mb-3 text-blue-300">Actividad 2: La Múltiple Realidad</h3>
                <p className="mb-4">Haz clic en cada actor para conocer su perspectiva sobre el problema elegido:</p>
                <div className="space-y-3">
                    {ACTORES.map(({ name, icon, perspective }) => (
                        <div key={name}>
                            <div
                                onClick={() => togglePerspective(name)}
                                className="p-4 rounded-lg border bg-white/10 border-white/20 hover:bg-white/20 cursor-pointer flex justify-between items-center"
                            >
                                <strong className="text-lg">{icon} {name}</strong>
                                <span className={`transform transition-transform ${openPerspectives[name] ? 'rotate-180' : 'rotate-0'}`}>▼</span>
                            </div>
                            {openPerspectives[name] && (
                                <div className="mt-2 p-3 bg-black/20 rounded-lg italic text-gray-300">
                                    {perspective}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Module1;
