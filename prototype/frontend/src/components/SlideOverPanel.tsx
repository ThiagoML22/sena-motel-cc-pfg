import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, CreditCard, Banknote, Receipt } from 'lucide-react';
import { HabitacionConDetalles, Articulo, TurnoResumen } from '../types';
import { api } from '../services/api';

interface SlideOverPanelProps {
  room: HabitacionConDetalles;
  onClose: () => void;
  onAperturaTurno?: (patente: string) => void;
  onRefreshRooms?: () => void;
}

const SlideOverPanel: React.FC<SlideOverPanelProps> = ({ room, onClose, onAperturaTurno, onRefreshRooms }) => {
  const isOcupada = room.estado === 'Ocupada';
  const isLibre = room.estado === 'Libre';
  const isLimpieza = room.estado === 'En Limpieza';
  
  const [patente, setPatente] = useState('');
  
  const [resumen, setResumen] = useState<TurnoResumen | null>(null);
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [addingProduct, setAddingProduct] = useState(false);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  
  const [isCheckout, setIsCheckout] = useState(false);
  const [medioPago, setMedioPago] = useState('EFECTIVO');
  const [comprobante, setComprobante] = useState('');

  useEffect(() => {
    if (isOcupada && room.turno_activo?.id) {
      loadResumenAndArticulos(room.turno_activo.id);
    }
  }, [isOcupada, room]);

  const loadResumenAndArticulos = async (turnoId: string) => {
    try {
      const [res, arts] = await Promise.all([
        api.getResumen(turnoId),
        api.getArticulos()
      ]);
      setResumen(res);
      setArticulos(arts);
    } catch (e) {
      console.error(e);
    }
  };

  const handleQtyChange = (artId: number, delta: number) => {
    const art = articulos.find(a => a.id === artId);
    if (!art) return;
    const current = quantities[artId] || 0;
    const next = current + delta;
    if (next >= 0 && next <= art.stock_actual) {
      setQuantities({ ...quantities, [artId]: next });
    }
  };

  const handleAddConsumo = async () => {
    if (!resumen?.id) return;
    try {
      for (const artId in quantities) {
        const qty = quantities[artId];
        if (qty > 0) {
          await api.addConsumo(resumen.id, parseInt(artId), qty);
        }
      }
      setQuantities({});
      setAddingProduct(false);
      await loadResumenAndArticulos(resumen.id);
    } catch (e: any) {
      alert(e.response?.data?.detail || "Error al agregar consumo");
    }
  };

  const handleCobrar = async () => {
    if (!resumen?.id) return;
    if ((medioPago === 'POSNET' || medioPago === 'MERCADO_PAGO') && !comprobante) {
      alert("Ingrese el número de comprobante");
      return;
    }
    try {
      await api.cerrarTurno(resumen.id, resumen.total_general, medioPago, comprobante);
      if (onRefreshRooms) onRefreshRooms();
      onClose();
    } catch (e: any) {
      alert(e.response?.data?.detail || "Error al cobrar");
    }
  };
  
  const handleLiberar = async () => {
      try {
          await api.liberarHabitacion(room.id);
          if (onRefreshRooms) onRefreshRooms();
          onClose();
      } catch(e: any) {
          alert("Error al liberar");
      }
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-gray-200 flex flex-col transform transition-transform duration-300">
        
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-slate-50">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold text-slate-900">
              HAB {room.numero.toString().padStart(2, '0')}
            </h2>
            <span className="text-gray-500 text-sm">— {isOcupada ? 'Cuenta Corriente' : isLibre ? 'Apertura' : 'Limpieza'}</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLibre && (
            <div className="p-6">
               <form onSubmit={(e) => { e.preventDefault(); if (onAperturaTurno) onAperturaTurno(patente.trim()); }}>
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Identificador Vehicular</label>
                    <input 
                      type="text" autoFocus required
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg uppercase focus:border-slate-900 focus:ring-0 outline-none transition-colors"
                      placeholder="AB 123 CD"
                      value={patente}
                      onChange={(e) => setPatente(e.target.value.toUpperCase())}
                    />
                  </div>
                  <button type="submit" disabled={!patente.trim()} className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors">
                    Ocupar Habitación
                  </button>
               </form>
            </div>
          )}

          {isLimpieza && (
            <div className="p-6 flex flex-col items-center justify-center h-full space-y-4">
               <span className="text-5xl">🧹</span>
               <h3 className="text-xl font-bold text-slate-900">Habitación en Limpieza</h3>
               <p className="text-gray-500 text-center">Una vez finalizado el reacondicionamiento, marque la habitación como lista para un nuevo cliente.</p>
               <button onClick={handleLiberar} className="mt-4 w-full bg-emerald-500 text-white font-bold py-3.5 rounded-lg hover:bg-emerald-600 transition-colors">
                  Marcar como Lista (Disponible)
               </button>
            </div>
          )}

          {isOcupada && resumen && !addingProduct && !isCheckout && (
            <div className="p-6 flex flex-col h-full">
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Detalle de Estadía</h3>
                <div className="space-y-3 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tarifa Base (2 hs)</span>
                    <span className="font-bold text-slate-900">${resumen.tarifa_base}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sobreturno ({Math.max(0, resumen.minutos_transcurridos - 120)} min)</span>
                    <span className="font-bold text-rose-500">${resumen.total_sobreturno}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tiempo Transcurrido</span>
                    <span className="font-mono font-bold text-slate-900">{room.tiempo_transcurrido}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between mt-2">
                    <span className="font-bold text-slate-900">Subtotal Estadía</span>
                    <span className="font-bold text-slate-900">${resumen.tarifa_base + resumen.total_sobreturno}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6 flex-1">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Consumos / Productos</h3>
                </div>
                <div className="space-y-3">
                  {resumen.consumos.length === 0 ? (
                      <p className="text-sm text-gray-400 italic">No hay consumos registrados.</p>
                  ) : (
                      resumen.consumos.map((c, i) => {
                          const art = articulos.find(a => a.id === c.articulo_id);
                          return (
                            <div key={i} className="flex justify-between text-sm items-center border-b border-gray-100 pb-2">
                                <span className="text-slate-700">{art?.descripcion || 'Producto'} x{c.cantidad}</span>
                                <span className="font-medium text-slate-900">${c.subtotal}</span>
                            </div>
                          );
                      })
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-auto">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal Productos</span>
                    <span className="font-medium text-slate-900">${resumen.total_consumos}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-slate-900 uppercase tracking-wide">Total a Cobrar</span>
                    <span className="font-extrabold text-3xl text-slate-900">${resumen.total_general}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button onClick={() => setAddingProduct(true)} className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl border-2 border-gray-200 hover:border-slate-300 transition-colors">
                    + Agregar Producto
                  </button>
                  <button onClick={() => setIsCheckout(true)} className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
                    Finalizar y Cobrar
                  </button>
                </div>
              </div>
            </div>
          )}

          {isOcupada && addingProduct && (
              <div className="p-6 flex flex-col h-full">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Despacho de Minibar</h3>
                  <div className="flex-1 overflow-y-auto space-y-4">
                      {articulos.map(art => (
                          <div key={art.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50">
                              <div className="flex flex-col">
                                  <span className="font-bold text-slate-900 text-sm">{art.descripcion}</span>
                                  <span className="text-xs text-gray-500">Stock: {art.stock_actual} | ${art.precio_unitario}</span>
                              </div>
                              <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm">
                                  <button type="button" onClick={() => handleQtyChange(art.id, -1)} className="p-2 text-gray-500 hover:text-slate-900"><Minus className="w-4 h-4" /></button>
                                  <span className="w-6 text-center font-bold text-sm text-slate-900">{quantities[art.id] || 0}</span>
                                  <button type="button" onClick={() => handleQtyChange(art.id, 1)} className="p-2 text-gray-500 hover:text-slate-900"><Plus className="w-4 h-4" /></button>
                              </div>
                          </div>
                      ))}
                  </div>
                  <div className="pt-6 mt-4 border-t border-gray-200 flex space-x-3">
                      <button onClick={() => {setAddingProduct(false); setQuantities({})}} className="flex-1 bg-white text-slate-700 font-bold py-3 rounded-xl border border-gray-300 hover:bg-gray-50">Volver</button>
                      <button onClick={handleAddConsumo} className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700">Cargar a Cuenta</button>
                  </div>
              </div>
          )}

          {isOcupada && isCheckout && resumen && (
              <div className="p-6 flex flex-col h-full">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Liquidación de Turno</h3>
                  
                  <div className="bg-slate-900 text-white p-6 rounded-2xl mb-8 flex flex-col items-center justify-center shadow-lg">
                      <span className="text-sm text-slate-400 uppercase tracking-widest font-medium mb-1">Total a Pagar</span>
                      <span className="text-4xl font-extrabold tracking-tight">${resumen.total_general}</span>
                  </div>

                  <div className="space-y-4 flex-1">
                      <label className="block text-sm font-bold text-slate-700">Medio de Pago</label>
                      <div className="grid grid-cols-2 gap-3">
                          <button onClick={() => setMedioPago('EFECTIVO')} className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-colors ${medioPago === 'EFECTIVO' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                              <Banknote className="w-6 h-6 mb-2" />
                              <span className="text-sm font-bold">Efectivo</span>
                          </button>
                          <button onClick={() => setMedioPago('POSNET')} className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-colors ${medioPago === 'POSNET' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                              <CreditCard className="w-6 h-6 mb-2" />
                              <span className="text-sm font-bold">Tarjeta / MP</span>
                          </button>
                      </div>

                      {medioPago === 'POSNET' && (
                          <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                              <label className="block text-sm font-bold text-slate-700 mb-2">Nº Comprobante / Lote</label>
                              <div className="relative">
                                <Receipt className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input type="text" value={comprobante} onChange={e => setComprobante(e.target.value)} placeholder="000123456" className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-indigo-600 font-mono" />
                              </div>
                          </div>
                      )}
                  </div>

                  <div className="pt-6 mt-4 border-t border-gray-200 flex space-x-3">
                      <button onClick={() => setIsCheckout(false)} className="flex-1 bg-white text-slate-700 font-bold py-3 rounded-xl border border-gray-300 hover:bg-gray-50">Cancelar</button>
                      <button onClick={handleCobrar} className="flex-1 bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 shadow-md">Confirmar Pago</button>
                  </div>
              </div>
          )}

        </div>
      </div>
    </>
  );
};

export default SlideOverPanel;
