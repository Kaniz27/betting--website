
import React, { useState, useRef } from 'react';
import { User } from '../types';
import { 
  MoreVertical, 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Edit2, 
  Trash2, 
  X, 
  Camera, 
  ShieldCheck,
  Wallet
} from 'lucide-react';

const INITIAL_USERS: User[] = [
  { id: '1', name: 'Tanvir Hossain', email: 'tanvir@nagadbet.com', role: 'Admin', status: 'Active', lastActive: '2 mins ago', balance: 50000 },
  { id: '2', name: 'Arif Ahmed', email: 'arif@gmail.com', role: 'Bettor', status: 'Active', lastActive: '1 hour ago', balance: 1200 },
  { id: '3', name: 'Sakib Khan', email: 'sakib@nagadbet.com', role: 'Editor', status: 'Inactive', lastActive: '3 days ago', balance: 0 },
  { id: '4', name: 'Anisur Rahman', email: 'anis@outlook.com', role: 'Bettor', status: 'Pending', lastActive: 'Never', balance: 0 },
];

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'Bettor',
    status: 'Pending',
    balance: 0,
    avatar: ''
  });

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'Bettor', status: 'Pending', balance: 0, avatar: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } as User : u));
    } else {
      const newUser: User = {
        ...(formData as User),
        id: Math.random().toString(36).substr(2, 9),
        lastActive: 'Just now'
      };
      setUsers([newUser, ...users]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-5 py-3 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors bg-white">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            <button 
              onClick={openAddModal}
              className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-2xl text-sm font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/20 active:scale-95"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add User / Admin
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5">User / Admin</th>
                <th className="px-8 py-5">Role</th>
                <th className="px-8 py-5">Wallet (৳)</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center">
                      <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-orange-600 text-sm mr-4 border border-slate-200 shadow-sm transition-transform group-hover:scale-105 overflow-hidden">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          user.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm leading-none mb-1.5 flex items-center">
                          {user.name}
                          {user.role === 'Admin' && <ShieldCheck className="w-3.5 h-3.5 ml-1.5 text-orange-500" />}
                        </div>
                        <div className="text-slate-400 text-xs flex items-center font-medium">
                          <Mail className="w-3 h-3 mr-1.5 text-slate-300" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      user.role === 'Admin' ? 'bg-orange-600 text-white shadow-sm' :
                      user.role === 'Editor' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center text-sm font-black text-slate-700">
                      <Wallet className="w-4 h-4 mr-2 text-slate-400" />
                      {user.balance?.toLocaleString() || 0}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center">
                      {user.status === 'Active' ? (
                        <span className="flex items-center text-green-600 text-xs font-black uppercase tracking-tighter">
                          <CheckCircle className="w-4 h-4 mr-1.5" />
                          Active
                        </span>
                      ) : user.status === 'Inactive' ? (
                        <span className="flex items-center text-slate-400 text-xs font-black uppercase tracking-tighter">
                          <XCircle className="w-4 h-4 mr-1.5" />
                          Inactive
                        </span>
                      ) : (
                        <span className="flex items-center text-orange-500 text-xs font-black uppercase tracking-tighter">
                          <Clock className="w-4 h-4 mr-1.5" />
                          Pending
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => openEditModal(user)}
                        className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-slate-200">
            <div className="p-8 bg-slate-900 text-white flex justify-between items-center relative overflow-hidden">
               <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-600 rounded-full blur-2xl opacity-20"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black tracking-tight">{editingUser ? 'Edit User Profile' : 'Add New Member'}</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">NagadBet Administration</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-all relative z-10">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-24 h-24 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center relative group overflow-hidden cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {formData.avatar ? (
                    <img src={formData.avatar} className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-8 h-8 text-slate-300 group-hover:text-orange-500 transition-colors" />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] font-black uppercase">
                    Change
                  </div>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                />
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Profile Picture</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Platform Role</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value as any})}
                  >
                    <option value="Bettor">Bettor (User)</option>
                    <option value="Admin">Admin (Manager)</option>
                    <option value="Editor">Editor</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Account Status</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                  >
                    <option value="Active">Active / Verified</option>
                    <option value="Pending">Pending KYC</option>
                    <option value="Inactive">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Initial Balance (৳)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">৳</span>
                  <input 
                    type="number" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm font-bold focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.balance}
                    onChange={(e) => setFormData({...formData, balance: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div className="pt-4 flex space-x-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 border-2 border-slate-200 text-slate-600 font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-700 shadow-xl shadow-orange-900/20 transition-all active:scale-95 uppercase tracking-widest text-xs"
                >
                  {editingUser ? 'Update Profile' : 'Confirm & Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
