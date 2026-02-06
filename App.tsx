
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LogTable from './components/LogTable';
import AIAnalyst from './components/AIAnalyst';
import LogCreator from './components/LogCreator';
import Login from './components/Login';
import AccountManager from './components/AccountManager';
import { MOCK_LOGS } from './constants';
import { LogCategory, LogEntry, StaffAccount } from './types';

// Banco de dados local para o site nunca "resetar"
const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {}
};

const getFromStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) { return null; }
};

const App: React.FC = () => {
  const [user, setUser] = useState<{ username: string; role: 'master' | 'staff' } | null>(null);
  const [activeTab, setActiveTab] = useState('create-log');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Carrega dados salvos ou os exemplos iniciais
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    const saved = getFromStorage('imperio_logs_prod');
    return Array.isArray(saved) ? saved : MOCK_LOGS;
  });

  const [staffAccounts, setStaffAccounts] = useState<StaffAccount[]>(() => {
    const saved = getFromStorage('imperio_accounts_prod');
    return Array.isArray(saved) ? saved : [
      { id: '1', username: 'furious', role: 'master', status: 'approved', joinedAt: new Date().toISOString(), lastLogin: new Date().toISOString() }
    ];
  });

  // Salva automaticamente para que o site "fique ligado" com as informações
  useEffect(() => saveToStorage('imperio_logs_prod', logs), [logs]);
  useEffect(() => saveToStorage('imperio_accounts_prod', staffAccounts), [staffAccounts]);

  const handleLogin = (loginData: { username: string; role: 'master' | 'staff' }) => {
    const usernameLower = loginData.username.toLowerCase();
    let existing = staffAccounts.find(a => a.username.toLowerCase() === usernameLower);
    
    if (!existing) {
      const newAcc: StaffAccount = {
        id: Math.random().toString(36).substr(2, 5).toUpperCase(),
        username: loginData.username,
        role: loginData.role,
        status: loginData.role === 'master' ? 'approved' : 'pending',
        joinedAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      setStaffAccounts(prev => [...prev, newAcc]);
      existing = newAcc;
    }

    setUser({ username: existing.username, role: existing.role });
    setActiveTab(existing.role === 'master' ? 'dashboard' : 'create-log');
  };

  const filteredLogs = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return logs;
    return logs.filter(l => 
      l.player.name.toLowerCase().includes(term) ||
      l.player.id.toString().includes(term) ||
      l.details.toLowerCase().includes(term)
    );
  }, [logs, searchTerm]);

  if (!user) return <Login onLogin={handleLogin} />;

  const currentAcc = staffAccounts.find(a => a.username.toLowerCase() === user.username.toLowerCase());
  if (currentAcc?.status !== 'approved') {
    return (
      <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900/50 border border-slate-800 p-12 rounded-[3rem] text-center backdrop-blur-3xl shadow-2xl">
          <div className="text-7xl mb-8 animate-pulse">🏛️</div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Aguardando Aprovação</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Seja bem-vindo, <span className="text-orange-500 font-bold">{user.username}</span>. 
            Seu acesso foi registrado e está na fila do <span className="text-white font-bold underline">Furious</span>.
          </p>
          <button onClick={() => setUser(null)} className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-orange-500 transition-all border border-slate-800 px-6 py-3 rounded-full">Sair do Sistema</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-slate-200 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={() => setUser(null)} />
      
      <main className="flex-1 h-screen overflow-y-auto p-6 lg:p-10 relative">
        <div className="fixed top-6 right-10 z-50 flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Sistema Online</span>
        </div>

        <div className="max-w-7xl mx-auto space-y-8 pb-20">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800/60 shadow-xl">
            <div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                {activeTab.replace('-', ' ')}
              </h1>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2 opacity-70 italic">Gerenciamento Imperio RJ</p>
            </div>
            
            <div className="flex items-center gap-5 bg-slate-950/40 p-4 rounded-3xl border border-slate-800/50">
              <div className="text-right">
                <p className="text-xs font-black text-white uppercase">{user.username}</p>
                <p className="text-[9px] text-orange-500 font-bold uppercase tracking-widest mt-1">
                  {user.role === 'master' ? '👑 Admin Master' : '🛡️ Staff Oficial'}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-yellow-500 flex items-center justify-center font-black text-white shadow-xl text-xl">
                {user.username[0].toUpperCase()}
              </div>
            </div>
          </header>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {activeTab === 'dashboard' && <Dashboard logs={logs} />}
            {activeTab === 'create-log' && <LogCreator onLogCreated={l => setLogs([l, ...logs])} />}
            {activeTab === 'live-logs' && (
              <div className="space-y-6">
                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
                  <input 
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-[2rem] pl-14 pr-8 py-5 text-sm focus:ring-2 focus:ring-orange-500/30 outline-none transition-all placeholder:text-slate-600 shadow-inner"
                    placeholder="Pesquisar por ID ou Nome..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                <LogTable logs={filteredLogs} title="Registros Gerais" />
              </div>
            )}
            {activeTab === 'manage-team' && user.role === 'master' && (
              <AccountManager 
                accounts={staffAccounts}
                onApprove={id => setStaffAccounts(prev => prev.map(a => a.id === id ? {...a, status: 'approved'} : a))}
                onDelete={id => setStaffAccounts(prev => prev.filter(a => a.id !== id))}
                onReject={id => setStaffAccounts(prev => prev.filter(a => a.id !== id))}
              />
            )}
            {activeTab === 'manage-data' && user.role === 'master' && (
              <LogTable logs={logs} title="Limpeza de Dados" onDelete={id => setLogs(logs.filter(l => l.id !== id))} />
            )}
            {activeTab === 'ai-analyst' && <AIAnalyst logs={logs} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
