
import React from 'react';
import { AdminTab } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  ShieldAlert, 
  Zap, 
  Bell, 
  Search, 
  UserCircle,
  Coins
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  username: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, username }) => {
  const navItems = [
    { id: AdminTab.Dashboard, icon: LayoutDashboard, label: 'Betting Overview' },
    { id: AdminTab.Users, icon: Users, label: 'Bettors Management' },
    { id: AdminTab.Actions, icon: Zap, label: 'Risk Intelligence' },
    { id: AdminTab.Security, icon: ShieldAlert, label: 'Transaction Logs' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-slate-950 text-white shadow-2xl transition-all duration-300 z-20">
        <div className="flex items-center px-6 h-20 border-b border-slate-800">
          <div className="bg-orange-500 p-1.5 rounded-lg mr-3">
            <Coins className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-black tracking-tighter">NAGAD<span className="text-orange-500 font-normal">BET</span></h1>
        </div>
        
        <nav className="mt-8 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-900/40' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${activeTab === item.id ? 'text-white' : 'text-slate-500'}`} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-6 bg-slate-900/50">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center font-bold text-white mr-3 border-2 border-slate-700">
              {username.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{username}</p>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-10">
          <div className="flex items-center bg-slate-100 px-4 py-2 rounded-xl w-96 border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search transactions, bets, users..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full font-medium"
            />
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="relative text-slate-400 hover:text-orange-500 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-orange-600 ring-2 ring-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors group">
              <UserCircle className="w-6 h-6 text-slate-400 group-hover:text-orange-500" />
              <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Admin Settings</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <div className="inline-flex items-center bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-2 border border-orange-100">
                Live Server Status: Optimal
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">{activeTab}</h2>
              <p className="text-slate-500 mt-1 font-medium">Real-time betting intelligence and financial control.</p>
            </header>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
