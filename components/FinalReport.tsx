import React, { useRef, useState } from 'react';
import { User, Project, GamificationState } from '../types';
import { MAX_XP } from '../constants';

// @ts-ignore
const { jsPDF } = window.jspdf;
// @ts-ignore
const html2canvas = window.html2canvas;

interface FinalReportProps {
  user: User;
  project: Project;
  gamification: GamificationState;
}

const FinalReport: React.FC<FinalReportProps> = ({ user, project, gamification }) => {
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const pdfContentRef = useRef<HTMLDivElement>(null);

    const calculateGrade = (xp: number): string => {
        const percentage = (xp / MAX_XP) * 100;
        const grade = 1 + (percentage / 100) * 6;
        return Math.max(1.0, Math.min(7.0, grade)).toFixed(1);
    };

    const generatePdfContent = () => {
        const grade = calculateGrade(gamification.xp);
        const today = new Date().toLocaleDateString('es-CL');

        return (
            <>
                <h1 className="text-black text-center text-2xl font-bold mb-2">Conecta Ciudadano - Informe Final de Proyecto</h1>
                <p className="text-center text-xs text-gray-500 mb-6">Liceo El Palomar - {today}</p>

                <h2 className="text-black text-lg font-bold border-b border-gray-300 pb-1 mb-3">Datos del Estudiante</h2>
                <p className="text-black text-sm mb-1"><strong>Nombre:</strong> {user.nombre} {user.apellido}</p>
                <p className="text-black text-sm mb-4"><strong>Curso:</strong> {user.curso}</p>

                <h2 className="text-black text-lg font-bold border-b border-gray-300 pb-1 mb-3">Resumen del Proyecto Ciudadano</h2>
                <p className="text-black text-sm mb-2"><strong>Problema Identificado:</strong> {project.problema || 'No se seleccionó un problema.'}</p>
                <p className="text-black text-sm mb-2"><strong>Solución 1 Propuesta:</strong> {project.solucion1 || 'No se definió.'}</p>
                <p className="text-black text-sm mb-4"><strong>Solución 2 Propuesta:</strong> {project.solucion2 || 'No se definió.'}</p>
                
                <p className="text-black text-sm mb-2"><strong>Análisis de Factibilidad (Solución 1):</strong></p>
                <ul className="list-disc list-inside text-black text-sm mb-4 pl-4">
                    <li><strong>Recursos:</strong> {project.factibilidad.recursos || 'No se definió.'}</li>
                    <li><strong>Tiempo:</strong> {project.factibilidad.tiempo || 'No se definió.'}</li>
                    <li><strong>Aliados:</strong> {project.factibilidad.apoyo || 'No se definió.'}</li>
                    <li><strong>Consecuencias:</strong> {project.factibilidad.consecuencias || 'No se definió.'}</li>
                </ul>

                <p className="text-black text-sm mb-2"><strong>Mensaje Digital (Post):</strong> {project.postTexto || 'No se creó un post.'}</p>
                <p className="text-black text-sm mb-4"><strong>Compromiso Ciudadano:</strong> {project.compromiso || 'No se asumió un compromiso.'}</p>

                <h2 className="text-black text-lg font-bold border-b border-gray-300 pb-1 mb-3 mt-6">Evaluación Final</h2>
                <p className="text-black text-sm mb-1"><strong>Puntaje Total de Experiencia (XP):</strong> {gamification.xp} / {MAX_XP}</p>
                <p className="text-black text-sm"><strong>Calificación Final (Nota):</strong> <span className="text-xl font-bold">{grade}</span></p>
            </>
        );
    };

    const handleDownloadPdf = async () => {
        if (!pdfContentRef.current) return;
        setIsGeneratingPdf(true);

        try {
            const canvas = await html2canvas(pdfContentRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
                position -= pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;
            }
            
            pdf.save(`informe_${user.nombre}_${user.apellido}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Ocurrió un error al generar el PDF.");
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    return (
        <div className="text-left">
            <div className="border-b border-white/20 pb-4 mb-6 text-center">
                <h2 className="text-2xl font-semibold">¡Felicitaciones, has completado tu proyecto!</h2>
                <p className="text-gray-300 font-light">Este es el resumen de tu trabajo como ciudadano/a activo/a.</p>
            </div>
            
            <div className="space-y-4 text-gray-200 leading-relaxed">
                <div>
                    <h3 className="font-bold text-lg text-blue-300">👤 Estudiante</h3>
                    <p><strong>Nombre:</strong> {user.nombre} {user.apellido}</p>
                    <p><strong>Curso:</strong> {user.curso}</p>
                </div>
                 <div>
                    <h3 className="font-bold text-lg text-blue-300">🎯 Problema Identificado</h3>
                    <p>{project.problema || 'No se seleccionó un problema.'}</p>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-blue-300">💡 Soluciones Propuestas</h3>
                    <p><strong>Solución 1:</strong> {project.solucion1 || 'No se definió.'}</p>
                    <p><strong>Solución 2:</strong> {project.solucion2 || 'No se definió.'}</p>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-blue-300">📊 Evaluación de Factibilidad (Solución 1)</h3>
                    <ul className="list-disc list-inside pl-4">
                        <li><strong>Recursos:</strong> {project.factibilidad.recursos || 'No se definió.'}</li>
                        <li><strong>Tiempo:</strong> {project.factibilidad.tiempo || 'No se definió.'}</li>
                        <li><strong>Apoyo:</strong> {project.factibilidad.apoyo || 'No se definió.'}</li>
                        <li><strong>Consecuencias:</strong> {project.factibilidad.consecuencias || 'No se definió.'}</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-blue-300">📣 Mensaje para la Comunidad</h3>
                    <p className="italic">"{project.postTexto || 'No se creó un post.'}"</p>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-blue-300">✅ Mi Compromiso Ciudadano</h3>
                    <p>{project.compromiso || 'No se asumió un compromiso.'}</p>
                </div>
            </div>

            <div className="mt-8 text-center">
                <button 
                    onClick={handleDownloadPdf} 
                    disabled={isGeneratingPdf}
                    className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold text-lg hover:scale-105 hover:shadow-lg transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isGeneratingPdf ? 'Generando PDF...' : '📄 Descargar Informe en PDF'}
                </button>
            </div>

            {/* Hidden element for PDF generation */}
            <div className="fixed top-0 left-[-9999px] w-[210mm] p-[20mm] bg-white text-black font-[Arial] text-[12px] leading-normal" ref={pdfContentRef}>
                {generatePdfContent()}
            </div>
        </div>
    );
};

export default FinalReport;