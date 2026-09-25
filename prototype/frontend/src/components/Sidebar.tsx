import React from 'react';
import { LayoutGrid, DollarSign, Package, FileText, Settings, LogOut, CircleUser } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Panel de Habitaciones', icon: LayoutGrid },
    { id: 'caja', label: 'Arqueo y Caja Ciega', icon: DollarSign },
    { id: 'minibar', label: 'Stock de Minibar', icon: Package },
    { id: 'auditoria', label: 'Auditoría', icon: FileText },
    { id: 'config', label: 'Configuración', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col h-screen border-r border-slate-800 transition-all duration-300 flex-shrink-0">
      {/* Header / Branding */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800/50 select-none">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-md shadow-indigo-500/20">
          <span className="text-white font-bold text-lg leading-none">M</span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-100 font-semibold tracking-tight leading-tight">Motel C.C.</span>
          <div className="flex items-center space-x-1.5 mt-0.5">
            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-md font-medium tracking-wider uppercase">v1.0 TPS</span>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] text-emerald-500/90 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-indigo-500/10 text-indigo-400 font-medium' 
                  : 'hover:bg-slate-900 hover:text-slate-100'
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-slate-800/50 bg-slate-950/50">
        <div className="flex items-center p-2 rounded-xl bg-slate-900 border border-slate-800/80">
          <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center mr-3 flex-shrink-0">
            <CircleUser className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-medium text-slate-200 truncate">Conserje Guardia</span>
            <span className="text-[11px] text-slate-500 truncate">Turno Tarde</span>
          </div>
          <button className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-md transition-colors" title="Cambio de Guardia">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
