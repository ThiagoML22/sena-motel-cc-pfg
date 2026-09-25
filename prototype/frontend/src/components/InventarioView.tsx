import React, { useState, useEffect } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { Articulo } from '../types';
import { api } from '../services/api';

const InventarioView: React.FC = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    fetchArticulos();
  }, []);

  const fetchArticulos = async () => {
    try {
      const data = await api.getArticulos();
      setArticulos(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createArticulo({
        codigo: codigo.toUpperCase(),
        descripcion,
        categoria,
        precio_unitario: parseFloat(precio),
        stock_actual: parseInt(stock, 10)
      });
      setIsModalOpen(false);
      // Reset form
      setCodigo(''); setDescripcion(''); setCategoria(''); setPrecio(''); setStock('');
      // Reload
      fetchArticulos();
    } catch (e: any) {
      alert(e.response?.data?.detail || "Error al crear el artículo");
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Inventario y Minibar</h1>
          <p className="text-slate-500 mt-1 font-medium">Gestión de stock en tiempo real</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white font-bold py-2.5 px-5 rounded-lg flex items-center hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Artículo
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar por código o nombre..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-slate-900 focus:ring-0 outline-none"
            />
          </div>
          <div className="text-sm font-medium text-slate-500">
            Total en catálogo: {articulos.length} ítems
          </div>
        </div>
        
        {loading ? (
           <div className="p-8 text-center text-gray-400">Cargando inventario...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Código</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Descripción</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Categoría</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Precio Venta</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Stock Actual</th>
              </tr>
            </thead>
            <tbody>
              {articulos.map((art) => (
                <tr key={art.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 text-sm font-mono text-slate-500">{art.codigo}</td>
                  <td className="py-4 px-6 text-sm font-bold text-slate-900">{art.descripcion}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-bold">
                      {art.categoria || 'General'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-slate-900 text-right">${art.precio_unitario}</td>
                  <td className="py-4 px-6 text-right">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-sm font-bold min-w-[3rem] ${
                      art.stock_actual > 5 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {art.stock_actual}
                    </span>
                  </td>
                </tr>
              ))}
              {articulos.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500 font-medium">No hay artículos registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Alta Articulo */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity" onClick={() => setIsModalOpen(false)} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-lg border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-bold text-slate-900">Alta de Nuevo Artículo</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Código SKU</label>
                  <input type="text" required placeholder="BEB-001" className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono uppercase focus:border-slate-900 focus:ring-0 outline-none" value={codigo} onChange={e => setCodigo(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Categoría</label>
                  <select required className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-slate-900 focus:ring-0 outline-none" value={categoria} onChange={e => setCategoria(e.target.value)}>
                    <option value="" disabled>Seleccionar...</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Farmacia">Farmacia</option>
                    <option value="Blanquería">Blanquería</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Descripción del Producto</label>
                <input type="text" required placeholder="Ej: Gaseosa Cola 500ml" className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-slate-900 focus:ring-0 outline-none" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Precio Unitario ($)</label>
                  <input type="number" step="0.01" min="0" required placeholder="0.00" className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono focus:border-slate-900 focus:ring-0 outline-none" value={precio} onChange={e => setPrecio(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Stock Inicial</label>
                  <input type="number" min="0" step="1" required placeholder="0" className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono focus:border-slate-900 focus:ring-0 outline-none" value={stock} onChange={e => setStock(e.target.value)} />
                </div>
              </div>
              <div className="pt-6 border-t border-gray-100 mt-6 flex space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white text-slate-700 font-bold py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">Cancelar</button>
                <button type="submit" className="flex-1 bg-slate-900 text-white font-bold py-2.5 rounded-lg hover:bg-slate-800 transition-colors">Guardar Artículo</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default InventarioView;
