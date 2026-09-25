import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView }) => {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans antialiased selection:bg-indigo-500/30">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-zinc-950">
        {children}
      </div>
    </div>
  );
};

export default Layout;
