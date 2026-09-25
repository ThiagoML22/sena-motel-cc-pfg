import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Timer, Plus, ShieldAlert } from 'lucide-react';
import { HabitacionConDetalles } from '../types';

interface HeaderStatsProps {
  habitaciones: HabitacionConDetalles[];
  onEntradaRapida: () => void;
}

const HeaderStats: React.FC<HeaderStatsProps> = ({ habitaciones, onEntradaRapida }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const total = 13;
  const libres = habitaciones.filter(h => h.estado === 'Libre').length;
  const ocupadas = habitaciones.filter(h => h.estado === 'Ocupada').length;
  const limpieza = habitaciones.filter(h => h.estado === 'En Limpieza' || h.estado === 'Mantenimiento').length;

  const percentOcupacion = Math.round((ocupadas / total) * 100) || 0;

  return (
    <div className="bg-slate-900 border-b border-slate-800 px-8 py-5">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        
        {/* Left: Clock & Global KPIs */}
        <div className="flex flex-wrap items-center gap-6">
          {/* Digital Clock */}
          <div className="flex flex-col">
            <span className="text-3xl font-mono font-light tracking-tight text-white">
              {time.toLocaleTimeString('es-AR', { hour12: false })}
            </span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
              Posadas, AR
            </span>
          </div>

          <div className="h-10 w-px bg-slate-800 hidden sm:block"></div>

          {/* Quick Metrics */}
          <div className="flex gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2.5 flex items-center min-w-[140px]">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg mr-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col w-full">
                <span className="text-xs text-slate-400 font-medium">Disponibles</span>
                <div className="flex items-end justify-between mt-0.5">
                  <span className="text-lg font-semibold text-slate-100 leading-none">{libres} <span className="text-xs text-slate-500 font-normal">/ {total}</span></span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2.5 flex items-center min-w-[140px] relative overflow-hidden">
              <div className="absolute bottom-0 left-0 h-1 bg-rose-500/20 w-full">
                <div className="h-full bg-rose-500 transition-all duration-500" style={{ width: `${percentOcupacion}%` }}></div>
              </div>
              <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg mr-3">
                <Timer className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium">Ocupadas</span>
                <span className="text-lg font-semibold text-slate-100 leading-none mt-0.5">{ocupadas}</span>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2.5 flex items-center min-w-[140px]">
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg mr-3">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium">En Limpieza</span>
                <span className="text-lg font-semibold text-slate-100 leading-none mt-0.5">{limpieza}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Primary Actions */}
        <div className="flex items-center space-x-3">
           <button className="h-11 px-4 flex items-center justify-center text-sm font-medium text-slate-300 bg-slate-800/80 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white transition-colors">
            <ShieldAlert className="w-4 h-4 mr-2 text-amber-400" />
            Incidencia
          </button>
          <button 
            onClick={onEntradaRapida}
            className="h-11 px-6 flex items-center justify-center text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            Entrada Rápida
          </button>
        </div>

      </div>
    </div>
  );
};

export default HeaderStats;
