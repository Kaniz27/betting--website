
import React, { useState } from 'react';
import { SecurityLog } from '../types';
import { analyzeLog } from '../services/gemini';
import { AlertTriangle, AlertCircle, Info, BrainCircuit, Loader2, X, ShieldAlert } from 'lucide-react';

const mockLogs: SecurityLog[] = [
  { id: '1', timestamp: '2023-11-20 14:23:11', event: 'Suspicious Withdrawal', severity: 'High', ipAddress: '192.168.1.102', details: 'Bettor #402 attempts to withdraw ৳50,000 to unverified Nagad number.' },
  { id: '2', timestamp: '2023-11-20 15:01:05', event: 'New Admin Proxy', severity: 'Medium', ipAddress: '10.0.0.15', details: 'Admin "tanvir" authorized a new betting odd manager from unusual IP.' },
  { id: '3', timestamp: '2023-11-20 15:45:30', event: 'Nagad Sync Success', severity: 'Low', ipAddress: 'Gateway', details: 'API bridge with Nagad Gateway refreshed. Latency: 42ms.' },
  { id: '4', timestamp: '2023-11-20 16:12:00', event: 'Betting Cap Bypass', severity: 'High', ipAddress: '172.16.2.44', details: 'User #991 placed 20 consecutive bets under ৳5 to bypass daily limit.' },
  { id: '5', timestamp: '2023-11-20 17:00:00', event: 'System Maintenance', severity: 'Low', ipAddress: 'Cloud', details: 'Weekly security patch deployed to odd-generator clusters.' },
];

export const SecurityLogs: React.FC = () => {
  const [selectedLog, setSelectedLog] = useState<SecurityLog | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (log: SecurityLog) => {
    setSelectedLog(log);
    setAiAnalysis(null);
    setIsAnalyzing(true);
    const result = await analyzeLog(`${log.event}: ${log.details}`);
    setAiAnalysis(result || "Analysis failed.");
    setIsAnalyzing(false);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'High': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'Medium': return <AlertCircle className="w-5 h-5 text-orange-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5">Severity</th>
                <th className="px-8 py-5">Timestamp</th>
                <th className="px-8 py-5">Event Type</th>
                <th className="px-8 py-5">Location/IP</th>
                <th className="px-8 py-5 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-2.5">
                      {getSeverityIcon(log.severity)}
                      <span className={`text-xs font-black uppercase tracking-tighter ${
                        log.severity === 'High' ? 'text-red-600' :
                        log.severity === 'Medium' ? 'text-orange-500' :
                        'text-blue-500'
                      }`}>{log.severity}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-400 font-bold">{log.timestamp}</td>
                  <td className="px-8 py-5 font-black text-slate-900 text-sm tracking-tight">{log.event}</td>
                  <td className="px-8 py-5 text-xs text-orange-600 font-black font-mono bg-orange-50/30 rounded-lg inline-block my-5 ml-8">{log.ipAddress}</td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => handleAnalyze(log)}
                      className="inline-flex items-center text-orange-600 hover:text-white hover:bg-orange-600 text-[10px] font-black uppercase tracking-widest bg-orange-50 px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95"
                    >
                      <BrainCircuit className="w-3.5 h-3.5 mr-2" />
                      Verify Security
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Analysis Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-slate-200">
            <div className="p-8 bg-orange-600 text-white flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <ShieldAlert className="w-24 h-24" />
              </div>
              <div className="flex items-center relative z-10">
                <BrainCircuit className="w-7 h-7 mr-4 text-orange-200" />
                <h3 className="text-2xl font-black tracking-tight">Security Intelligence Report</h3>
              </div>
              <button onClick={() => setSelectedLog(null)} className="hover:bg-white/20 p-2 rounded-full transition-all relative z-10">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-10">
              <div className="mb-8 pb-8 border-b border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Event Context</h4>
                <div className="flex items-start bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                  {getSeverityIcon(selectedLog.severity)}
                  <div className="ml-5">
                    <p className="font-black text-slate-900 text-lg mb-1">{selectedLog.event}</p>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{selectedLog.details}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-4">Gemini AI Audit</h4>
                {isAnalyzing ? (
                  <div className="flex items-center space-x-4 text-slate-400 animate-pulse bg-slate-50 p-8 rounded-3xl border-2 border-dashed border-slate-200">
                    <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                    <span className="font-bold">Analyzing transactional patterns for risk...</span>
                  </div>
                ) : (
                  <div className="bg-orange-50/40 p-8 rounded-[2rem] border border-orange-100 shadow-inner">
                    <p className="text-slate-800 leading-relaxed text-sm font-bold italic">
                      {aiAnalysis}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-10 flex justify-end space-x-4">
                <button 
                  onClick={() => setSelectedLog(null)}
                  className="px-8 py-3 border-2 border-slate-200 text-slate-600 font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-xs"
                >
                  Dismiss
                </button>
                <button className="px-8 py-3 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 shadow-xl shadow-red-900/20 transition-all active:scale-95 uppercase tracking-widest text-xs">
                  Freeze Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
