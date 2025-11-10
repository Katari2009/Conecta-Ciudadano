
import React from 'react';
import { Project } from '../../types';

interface Module3Props {
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}

const Module3: React.FC<Module3Props> = ({ project, setProject }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProject(prev => ({...prev, [e.target.name]: e.target.value }));
  };
  
  const commonTextAreaClasses = "w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-all";

  return (
    <div className="text-left">
      <div className="border-b border-white/20 pb-4 mb-6">
        <h2 className="text-2xl font-semibold">Módulo 3: Nuestra Voz Digital</h2>
        <p className="text-gray-300 font-light">Comunica tu propuesta y asume un compromiso.</p>
      </div>

      <div className="bg-black/10 rounded-xl p-5 mb-6">
        <h3 className="text-xl font-semibold mb-3 text-teal-300">Actividad 5: Taller de Comunicación</h3>
        <p className="mb-4">Crea un post para Instagram para dar a conocer tu solución:</p>
        <div>
            <label htmlFor="postTexto" className="block mb-2 font-semibold">Texto del post (máximo 150 caracteres):</label>
            <textarea
                id="postTexto"
                name="postTexto"
                maxLength={150}
                rows={3}
                placeholder="¡Unimos manos por [tu problema]! 🌍 Nuestra idea es [tu solución]. Únete al cambio usando #ConectaCiudadanoLiceoPalomar"
                value={project.postTexto}
                onChange={handleChange}
                className={commonTextAreaClasses}
            ></textarea>
        </div>
      </div>
      
      <div className="bg-black/10 rounded-xl p-5">
        <h3 className="text-xl font-semibold mb-3 text-teal-300">Actividad 6: Mi Compromiso Ciudadano</h3>
        <p className="mb-4">El cambio empieza por ti. ¿Qué acción concreta te comprometes a realizar esta semana para abordar este problema?</p>
        <div>
            <label htmlFor="compromiso" className="block mb-2 font-semibold">Mi compromiso es:</label>
            <textarea
                id="compromiso"
                name="compromiso"
                rows={3}
                placeholder="Ej: Hablaré con el inspector sobre la posibilidad de usar un patio los fines de semana."
                value={project.compromiso}
                onChange={handleChange}
                className={commonTextAreaClasses}
            ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Module3;
