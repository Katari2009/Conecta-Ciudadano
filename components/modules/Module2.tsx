
import React from 'react';
import { Project, Factibilidad } from '../../types';

interface Module2Props {
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}

const Module2: React.FC<Module2Props> = ({ project, setProject }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'solucion1' || name === 'solucion2') {
        setProject(prev => ({...prev, [name]: value }));
    } else {
        setProject(prev => ({
            ...prev,
            factibilidad: { ...prev.factibilidad, [name]: value }
        }));
    }
  };

  const commonTextAreaClasses = "w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white focus:outline-none focus:border-pink-400 focus:bg-white/10 transition-all";
  const commonInputClasses = "w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white focus:outline-none focus:border-pink-400 focus:bg-white/10 transition-all";

  return (
    <div className="text-left">
      <div className="border-b border-white/20 pb-4 mb-6">
        <h2 className="text-2xl font-semibold">Módulo 2: Construyendo Soluciones</h2>
        <p className="text-gray-300 font-light">Propón y evalúa la factibilidad de tus ideas.</p>
      </div>

      <div className="bg-black/10 rounded-xl p-5 mb-6">
        <h3 className="text-xl font-semibold mb-3 text-pink-300">Actividad 3: El Laboratorio de Ideas</h3>
        <p className="mb-4">Describe DOS soluciones concretas para el problema que elegiste:</p>
        <div className="space-y-4">
            <div>
                <label htmlFor="solucion1" className="block mb-2 font-semibold">Solución 1:</label>
                <textarea id="solucion1" name="solucion1" rows={3} placeholder="Ej: Organizar a los estudiantes para pedir un espacio en el liceo..." value={project.solucion1} onChange={handleChange} className={commonTextAreaClasses}></textarea>
            </div>
            <div>
                <label htmlFor="solucion2" className="block mb-2 font-semibold">Solución 2:</label>
                <textarea id="solucion2" name="solucion2" rows={3} placeholder="Ej: Crear una campaña en redes sociales para reciclar..." value={project.solucion2} onChange={handleChange} className={commonTextAreaClasses}></textarea>
            </div>
        </div>
      </div>

      <div className="bg-black/10 rounded-xl p-5">
        <h3 className="text-xl font-semibold mb-3 text-pink-300">Actividad 4: El Juego de la Factibilidad</h3>
        <p className="mb-4">Evalúa tu Solución 1. Sé honesto/a sobre los recursos necesarios:</p>
        <div className="space-y-4">
            <div>
                <label htmlFor="fact-recursos" className="block mb-2 font-semibold">Recursos (dinero, materiales, voluntarios):</label>
                <input type="text" id="fact-recursos" name="recursos" placeholder="Ej: $500.000 en pintura, 20 voluntarios..." value={project.factibilidad.recursos} onChange={handleChange} className={commonInputClasses}/>
            </div>
            <div>
                <label htmlFor="fact-tiempo" className="block mb-2 font-semibold">Tiempo de implementación:</label>
                <input type="text" id="fact-tiempo" name="tiempo" placeholder="Ej: 3 meses" value={project.factibilidad.tiempo} onChange={handleChange} className={commonInputClasses} />
            </div>
            <div>
                <label htmlFor="fact-apoyo" className="block mb-2 font-semibold">Aliados potenciales (quién te ayudaría):</label>
                <input type="text" id="fact-apoyo" name="apoyo" placeholder="Ej: Centro de Alumnos, Profesor de Artes, Municipalidad..." value={project.factibilidad.apoyo} onChange={handleChange} className={commonInputClasses}/>
            </div>
             <div>
                <label htmlFor="fact-consecuencias" className="block mb-2 font-semibold">Consecuencias (positivas y negativas):</label>
                <textarea id="fact-consecuencias" name="consecuencias" rows={3} placeholder="Ej: Positivo: más integración. Negativo: podría haber desacuerdos en el grupo..." value={project.factibilidad.consecuencias} onChange={handleChange} className={commonTextAreaClasses}></textarea>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Module2;
