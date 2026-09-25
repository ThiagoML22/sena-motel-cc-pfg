import { useState, useEffect } from 'react';
import { HabitacionConDetalles } from './types';
import { api } from './services/api';
import TopNav from './components/TopNav';
import RoomsGrid from './components/RoomsGrid';
import SlideOverPanel from './components/SlideOverPanel';
import InventarioView from './components/InventarioView';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [habitaciones, setHabitaciones] = useState<HabitacionConDetalles[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<HabitacionConDetalles | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const fetchHabitaciones = async () => {
    try {
      const data = await api.getHabitaciones();
      
      const realData = data.map((h: any) => {
         let tiempo_transcurrido = undefined;
         let excede_tiempo = false;
         
         if (h.estado === 'Ocupada' && h.turno_activo && h.turno_activo.hora_inicio) {
             const isUtc = h.turno_activo.hora_inicio.endsWith('Z') || h.turno_activo.hora_inicio.includes('+');
             const start = new Date(h.turno_activo.hora_inicio + (isUtc ? '' : 'Z'));
             const now = new Date();
             const diffMs = Math.max(0, now.getTime() - start.getTime());
             
             const diffHrs = Math.floor(diffMs / 3600000);
             const diffMins = Math.floor((diffMs % 3600000) / 60000);
             const diffSecs = Math.floor((diffMs % 60000) / 1000);
             
             tiempo_transcurrido = `${diffHrs.toString().padStart(2, '0')}:${diffMins.toString().padStart(2, '0')}:${diffSecs.toString().padStart(2, '0')}`;
             excede_tiempo = diffHrs >= 2;
         }
         
         return { ...h, tiempo_transcurrido, excede_tiempo };
      });

      setHabitaciones(realData);
    } catch (err) {
      console.error('Error fetching habitaciones:', err);
    }
  };

  useEffect(() => {
    fetchHabitaciones();
    const interval = setInterval(fetchHabitaciones, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRoomClick = (habitacion: HabitacionConDetalles) => {
    setSelectedRoom(habitacion);
    setIsPanelOpen(true);
  };

  const handleTurnoSubmit = async (patente: string) => {
    if (!selectedRoom) return;
    try {
      await api.createTurno({
        habitacion_id: selectedRoom.id,
        identificador_vehicular: patente
      });
      setIsPanelOpen(false);
      setSelectedRoom(null);
      await fetchHabitaciones();
    } catch (err: any) {
      console.error('Error creating turno:', err);
      alert(err.response?.data?.detail || 'Error al abrir turno');
    }
  };

  // Resumen stats
  const total = habitaciones.length;
  const libres = habitaciones.filter(h => h.estado === 'Libre').length;
  const ocupadas = habitaciones.filter(h => h.estado === 'Ocupada').length;
  const limpieza = habitaciones.filter(h => h.estado === 'En Limpieza').length;
  const mantenimiento = habitaciones.filter(h => h.estado === 'Mantenimiento').length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <TopNav activeView={activeView} setActiveView={setActiveView} />

      <main className="flex-1 max-w-[1600px] mx-auto w-full px-8 py-8 flex flex-col">
        {activeView === 'dashboard' && (
          <>
            {/* Header Title */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Estado de Habitaciones</h1>
                <p className="text-slate-500 mt-1 font-medium">Filtro y monitoreo en tiempo real</p>
              </div>
              
              {/* Legend */}
              <div className="hidden sm:flex space-x-3">
                <div className="flex items-center px-3 py-1 rounded-full border border-emerald-200 bg-white">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Disponible</span>
                </div>
                <div className="flex items-center px-3 py-1 rounded-full border border-rose-200 bg-white">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mr-2"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Ocupada</span>
                </div>
                <div className="flex items-center px-3 py-1 rounded-full border border-amber-200 bg-white">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Limpieza</span>
                </div>
                <div className="flex items-center px-3 py-1 rounded-full border border-slate-300 bg-white">
                  <span className="w-2 h-2 rounded-full bg-slate-500 mr-2"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Mantenimiento</span>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="flex-1">
              <RoomsGrid habitaciones={habitaciones} onRoomClick={handleRoomClick} />
            </div>

            {/* Bottom Resumen Bar */}
            <div className="mt-8 bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-6">
                <span className="text-sm font-bold text-slate-900 mr-2">Resumen General</span>
                
                <div className="flex items-center text-sm font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span> Disponibles: {libres}
                </div>
                <div className="flex items-center text-sm font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mr-2"></span> Ocupadas: {ocupadas}
                </div>
                <div className="flex items-center text-sm font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span> Limpieza: {limpieza}
                </div>
                <div className="flex items-center text-sm font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-slate-500 mr-2"></span> Mantenimiento: {mantenimiento}
                </div>
              </div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Total Capacidad: {total} Habitaciones
              </div>
            </div>
          </>
        )}

        {activeView === 'inventario' && (
           <InventarioView />
        )}

        {activeView === 'caja' && (
           <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-gray-200">
              <span className="text-xl font-bold text-slate-900 mb-2">Cierre de Caja Ciego</span>
              <p className="text-slate-500">Módulo en desarrollo (Sprint 4)</p>
           </div>
        )}
      </main>

      {/* Slide-over panel */}
      {isPanelOpen && selectedRoom && (
        <SlideOverPanel
          room={selectedRoom}
          onClose={() => setIsPanelOpen(false)}
          onAperturaTurno={handleTurnoSubmit}
          onRefreshRooms={fetchHabitaciones}
        />
      )}
    </div>
  );
}

export default App;
