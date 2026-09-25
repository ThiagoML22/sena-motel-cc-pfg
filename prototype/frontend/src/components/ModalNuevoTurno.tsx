import React, { useState, useEffect, useRef } from 'react';
import { X, Car, Clock } from 'lucide-react';
import { HabitacionConDetalles } from '../types';

interface ModalNuevoTurnoProps {
  habitacion: HabitacionConDetalles;
  onClose: () => void;
  onSubmit: (patente: string) => void;
}

const ModalNuevoTurno: React.FC<ModalNuevoTurnoProps> = ({ habitacion, onClose, onSubmit }) => {
  const [patente, setPatente] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when modal opens
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    
    // Handle Esc key to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patente.trim()) {
      onSubmit(patente.trim());
    }
  };

  const handlePatenteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic formatting for Mercosur/Traditional plates (optional, keep it simple uppercase)
    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9 ]/g, '');
    setPatente(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <span className="text-emerald-400 font-bold">{habitacion.numero.toString().padStart(2, '0')}</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-100 leading-tight">Apertura de Turno</h2>
              <p className="text-xs text-zinc-400 mt-0.5 font-medium">Registro Anónimo</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 transition-colors p-2 rounded-lg hover:bg-zinc-800 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="flex items-center text-zinc-300 text-sm font-medium mb-3" htmlFor="patente">
              <Car className="w-4 h-4 mr-2 text-zinc-500" />
              Identificador Vehicular
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                id="patente"
                type="text"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-slate-100 text-xl font-mono uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder:text-zinc-700 shadow-inner"
                placeholder="AB 123 CD"
                value={patente}
                onChange={handlePatenteChange}
                required
                autoComplete="off"
              />
            </div>
          </div>

          <div className="mb-8">
             <label className="flex items-center text-zinc-300 text-sm font-medium mb-3">
              <Clock className="w-4 h-4 mr-2 text-zinc-500" />
              Tarifa Inicial
            </label>
            <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 flex justify-between items-center cursor-pointer hover:border-indigo-500/50 transition-colors">
               <div className="flex flex-col">
                  <span className="text-indigo-300 font-medium">Turno Estándar</span>
                  <span className="text-zinc-500 text-xs mt-0.5">Duración base: 2 horas</span>
               </div>
               <div className="w-4 h-4 rounded-full border-4 border-indigo-500 bg-zinc-900"></div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-sm font-medium text-zinc-300 bg-zinc-800 border border-transparent rounded-xl hover:bg-zinc-700 hover:text-white transition-colors focus:outline-none"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!patente.trim()}
              className="flex-1 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20"
            >
              Ocupar Habitación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalNuevoTurno;
