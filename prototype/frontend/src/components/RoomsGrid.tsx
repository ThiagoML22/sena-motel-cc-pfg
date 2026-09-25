import React from 'react';
import { HabitacionConDetalles } from '../types';
import RoomCard from './RoomCard';

interface RoomsGridProps {
  habitaciones: HabitacionConDetalles[];
  onRoomClick: (habitacion: HabitacionConDetalles) => void;
}

const RoomsGrid: React.FC<RoomsGridProps> = ({ habitaciones, onRoomClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {habitaciones.map((habitacion) => (
        <RoomCard 
          key={habitacion.id} 
          room={habitacion} 
          onClick={onRoomClick} 
        />
      ))}
    </div>
  );
};

export default RoomsGrid;
