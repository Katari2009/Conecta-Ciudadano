
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
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">Conecta Ciudadano</h1>
        <p className="text-base text-gray-200 font-light mb-8">Tu voz, tu comunidad, tu futuro. Liceo El Palomar</p>
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
