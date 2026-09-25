import React from 'react';
import { ChevronRight, Timer } from 'lucide-react';
import { HabitacionConDetalles } from '../types';

interface RoomCardProps {
  room: HabitacionConDetalles;
  onClick: (room: HabitacionConDetalles) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onClick }) => {
  const isOcupada = room.estado === 'Ocupada';

  // Configuración visual según Figma
  const getStyle = () => {
    switch (room.estado) {
      case 'Libre':
        return {
          cardBorder: 'border-gray-200',
          badgeBorder: 'border-emerald-200',
          badgeText: 'text-emerald-500',
          badgeDot: 'bg-emerald-500',
          bottomText: 'text-gray-400 font-medium'
        };
      case 'Ocupada':
        return {
          cardBorder: 'border-slate-800 shadow-sm',
          badgeBorder: 'border-rose-200',
          badgeText: 'text-rose-500',
          badgeDot: 'bg-rose-500',
          bottomText: 'text-rose-500 font-mono font-bold'
        };
      case 'En Limpieza':
        return {
          cardBorder: 'border-amber-200 shadow-sm',
          badgeBorder: 'border-amber-200',
          badgeText: 'text-amber-500',
          badgeDot: 'bg-amber-500',
          bottomText: 'text-gray-400 font-medium'
        };
      case 'Mantenimiento':
        return {
          cardBorder: 'border-slate-200',
          badgeBorder: 'border-slate-300',
          badgeText: 'text-slate-500',
          badgeDot: 'bg-slate-500',
          bottomText: 'text-gray-400 font-medium'
        };
      default:
        return {
          cardBorder: 'border-gray-200',
          badgeBorder: 'border-gray-200',
          badgeText: 'text-gray-500',
          badgeDot: 'bg-gray-500',
          bottomText: 'text-gray-400 font-medium'
        };
    }
  };

  const style = getStyle();
  const displayState = room.estado === 'Libre' ? 'Disponible' : (room.estado === 'En Limpieza' ? 'Limpieza' : room.estado);

  return (
    <div 
      onClick={() => onClick(room)}
      className={`bg-white rounded-2xl border-2 p-5 flex flex-col justify-between h-[140px] cursor-pointer transition-all hover:shadow-md ${style.cardBorder}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          HAB {room.numero.toString().padStart(2, '0')}
        </h3>
        <div className={`flex items-center px-2.5 py-0.5 rounded-full border ${style.badgeBorder}`}>
          <span className={`w-2 h-2 rounded-full mr-1.5 ${style.badgeDot}`}></span>
          <span className={`text-[11px] font-bold uppercase tracking-wider ${style.badgeText}`}>
            {displayState}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end mt-4">
        <div className="flex items-center">
          {isOcupada ? (
            <>
              <Timer className="w-4 h-4 mr-1.5 text-rose-500" strokeWidth={2.5} />
              <span className={`text-base ${style.bottomText}`}>
                {room.tiempo_transcurrido || '00:00:00'}
              </span>
            </>
          ) : (
            <span className={`text-sm ${style.bottomText}`}>Sin ocupar</span>
          )}
        </div>
        
        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-gray-100 hover:bg-gray-100 transition-colors">
          <ChevronRight className="w-4 h-4 text-slate-400" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
