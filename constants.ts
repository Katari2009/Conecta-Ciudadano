
import { Achievement, Level } from './types';

export const MAX_XP = 275;

export const ACHIEVEMENTS: Achievement[] = [
    { id: 'iniciador', name: 'Iniciador Ciudadano', description: 'Por unirte a la plataforma.', icon: '🚀', xp: 10 },
    { id: 'detective', name: 'Detective de Problemas', description: 'Por identificar tu primer problema.', icon: '🔍', xp: 20 },
    { id: 'oido', name: 'Oído Atento', description: 'Por ver todas las perspectivas.', icon: '👂', xp: 30 },
    { id: 'constructor', name: 'Constructor de Ideas', description: 'Por proponer una solución.', icon: '💡', xp: 25 },
    { id: 'estratega', name: 'Estratega', description: 'Por completar tu análisis de factibilidad.', icon: '📈', xp: 40 },
    { id: 'comunicador', name: 'Comunicador Digital', description: 'Por crear un post para redes sociales.', icon: '📣', xp: 20 },
    { id: 'compromiso', name: 'Compromiso Real', description: 'Por asumir un compromiso ciudadano.', icon: '✅', xp: 30 },
    { id: 'agente', name: 'Agente de Cambio', description: '¡Por completar todo el proyecto!', icon: '🌟', xp: 100 },
];

export const LEVELS: Level[] = [
    { name: 'Iniciador', minXP: 0 },
    { name: 'Explorador', minXP: 50 },
    { name: 'Colaborador', minXP: 150 },
    { name: 'Líder', minXP: 300 },
    { name: 'Agente de Cambio', minXP: 500 },
];

export const CURSOS = [
    "Tercero Medio A",
    "Tercero Medio B",
    "Tercero Medio C",
    "Tercero Medio D",
    "Tercero Medio E",
    "Tercero Medio F",
];

export const PROBLEMAS = [
    { title: "Escasez de espacios recreativos juveniles", description: "Hay pocos parques, plazas o centros comunitarios seguros y atractivos para jóvenes." },
    { title: "Contaminación por basura en calles y plazas", description: "El mal manejo de residuos afecta la limpieza y salud del entorno." },
    { title: "Falta de transporte público eficiente", description: "Los autobuses son lentos, infrecuentes o no cubren todas las zonas." },
    { title: "Bullying y ciberacoso en el liceo", description: "La agresión entre estudiantes afecta el clima escolar y la salud mental." },
];

export const ACTORES = [
    { name: "Vecino/a", icon: "👤", perspective: "Vivo aquí toda mi vida y veo cómo los jóvenes no tienen dónde estar. Se juntan en las esquinas y a veces hay ruido, pero entiendo que no tienen otra opción. Quizás si hubiera un lugar para ellos, todo sería más tranquilo." },
    { name: "Municipio", icon: "🏢", perspective: "Nuestro presupuesto es limitado. Cada proyecto de infraestructura, como un nuevo parque, requiere estudios de suelo, permisos y una inversión millonaria que debemos priorizar junto a salud y seguridad." },
    { name: "Estudiante", icon: "🎒", perspective: "Después de clases no hay nada que hacer. Todo es muy caro o está lejos. Un lugar donde podamos hacer deportes, música o simplemente hablar nos mantendría fuera de problemas y nos ayudaría a desestresar." },
    { name: 'Comercio Local', icon: '🏪', perspective: "Un parque o centro juvenil traería más gente al barrio, lo cual es bueno para mis ventas. Pero también me preocupa el mantenimiento, la limpieza y si podría atraer delincuencia si no está bien gestionado." },
];
