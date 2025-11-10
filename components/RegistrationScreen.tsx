
import React, { useState } from 'react';
import { User } from '../types';
import { CURSOS } from '../constants';

interface GlassPanelProps {
    children: React.ReactNode;
    className?: string;
}
const GlassPanel: React.FC<GlassPanelProps> = ({ children, className = '' }) => (
    <div className={`bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6 sm:p-10 text-center ${className}`}>
        {children}
    </div>
);

const Logo: React.FC = () => (
    <div className="mx-auto mb-4 h-20 w-20">
        <svg viewBox="0 0 24 24" fill="url(#logoGradient)" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f472b6" /> 
                    <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
            </defs>
            {/* The outer 'C' shape representing 'Conecta' or 'Ciudadano' */}
            <path d="M20 13C20 17.42 16.42 21 12 21C7.58 21 4 17.42 4 13C4 8.58 7.58 5 12 5C13.81 5 15.43 5.58 16.75 6.57L18.17 5.15C16.45 3.8 14.33 3 12 3C6.48 3 2 7.48 2 13C2 18.52 6.48 23 12 23C17.52 23 22 18.52 22 13H20Z" />
            {/* The inner circle representing a person/citizen */}
            <path d="M16 13C16 15.21 14.21 17 12 17C9.79 17 8 15.21 8 13C8 10.79 9.79 9 12 9C14.21 9 16 10.79 16 13ZM12 11C10.9 11 10 11.9 10 13C10 14.1 10.9 15 12 15C13.1 15 14 14.1 14 13C14 11.9 13.1 11 12 11Z" />
        </svg>
    </div>
);


interface RegistrationScreenProps {
  onRegister: (user: User) => void;
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState({ nombre: '', apellido: '', curso: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nombre && formData.apellido && formData.curso) {
      onRegister(formData);
    }
  };

  return (
    <GlassPanel>
        <Logo />
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">Conecta Ciudadano</h1>
        <p className="text-base text-gray-200 font-light mb-8">Tu voz, tu comunidad, tu futuro. Liceo El Palomar</p>

        <div className="bg-black/20 rounded-xl p-5 mb-8 text-left">
            <h3 className="text-lg font-bold mb-3 text-center text-teal-300">Objetivos de Aprendizaje</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-start">
                    <span className="mr-3 mt-1 text-teal-400">🎯</span>
                    <span><strong>OA 4:</strong> Analizar problemáticas de la sociedad chilena considerando múltiples perspectivas e interpretando datos.</span>
                </li>
                <li className="flex items-start">
                    <span className="mr-3 mt-1 text-teal-400">🎯</span>
                    <span><strong>OA 5:</strong> Proponer y fundamentar soluciones a problemáticas locales y evaluar su factibilidad y consecuencias.</span>
                </li>
                <li className="flex items-start">
                    <span className="mr-3 mt-1 text-teal-400">🎯</span>
                    <span><strong>OA 11:</strong> Evaluar críticamente el papel de los medios y tecnologías digitales en la comunicación de propuestas.</span>
                </li>
            </ul>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
            <div className="form-group">
                <label htmlFor="nombre" className="block mb-2 font-semibold">Nombre</label>
                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required 
                       className="w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white focus:outline-none focus:border-pink-400 focus:bg-white/10 transition-all"/>
            </div>
            <div className="form-group">
                <label htmlFor="apellido" className="block mb-2 font-semibold">Apellido</label>
                <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required
                       className="w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white focus:outline-none focus:border-pink-400 focus:bg-white/10 transition-all"/>
            </div>
            <div className="form-group">
                <label htmlFor="curso" className="block mb-2 font-semibold">Curso</label>
                <select id="curso" name="curso" value={formData.curso} onChange={handleChange} required
                        className="w-full p-3 rounded-lg border border-white/20 bg-black/20 text-white focus:outline-none focus:border-pink-400 focus:bg-black/30 transition-all appearance-none">
                    <option value="" disabled>Selecciona tu curso</option>
                    {CURSOS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <button type="submit" className="w-full mt-4 p-3 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold text-lg hover:scale-105 hover:shadow-lg transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                    disabled={!formData.nombre || !formData.apellido || !formData.curso}>
                Comenzar mi Proyecto
            </button>
        </form>
    </GlassPanel>
  );
};

export default RegistrationScreen;
