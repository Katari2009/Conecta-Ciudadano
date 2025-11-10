
export interface User {
  nombre: string;
  apellido: string;
  curso: string;
}

export interface Factibilidad {
  recursos: string;
  tiempo: string;
  apoyo: string;
  consecuencias: string;
}

export interface Project {
  problema: string;
  solucion1: string;
  solucion2: string;
  factibilidad: Factibilidad;
  postTexto: string;
  compromiso: string;
}

export interface GamificationState {
  xp: number;
  badges: string[];
  viewedPerspectives: string[];
}

export interface AppState {
  user: User | null;
  project: Project;
  gamification: GamificationState;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xp: number;
}

export interface Level {
  name: string;
  minXP: number;
}
