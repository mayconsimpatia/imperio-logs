
import { LogCategory, LogEntry } from './types';

export const MOCK_LOGS: LogEntry[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    category: LogCategory.ADMIN,
    player: { id: '10', name: 'Imperador', discord: 'Imperio#0001' },
    action: 'BAN_PLAYER',
    details: '[STAFF] Imperador baniu [ID: 8821] | MOTIVO: Uso de Software de Terceiros (Cheat) | TIPO: Permanente',
    severity: 'critical'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    category: LogCategory.POLICE,
    player: { id: '102', name: 'Sgt. Rocha', discord: 'Rocha#4444' },
    action: 'ARREST_PLAYER',
    details: '[OFICIAL] Sgt. Rocha prendeu [ID: 550] | MOTIVO: Tráfico de entorpecentes e desobediência | PENA: 120 meses',
    severity: 'medium'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    category: LogCategory.ECONOMY,
    player: { id: '994', name: 'Turco', discord: 'Turco#1234' },
    action: 'LARGE_TRANSFER',
    details: '[BANCO] Transferência suspeita de R$ 5.000.000 para [ID: 221] | TIPO: PIX Anônimo',
    severity: 'high'
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    category: LogCategory.COMBAT,
    player: { id: '221', name: 'Menor Do Chapa', discord: 'Menor#9999' },
    action: 'KILL_LOG',
    details: '[COMBATE] Menor Do Chapa [ID: 221] finalizou Sgt. Rocha [ID: 102] | ARMA: AK-47 MK2',
    severity: 'medium'
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    category: LogCategory.ADMIN,
    player: { id: '10', name: 'Imperador', discord: 'Imperio#0001' },
    action: 'REVIVE_PLAYER',
    details: '[STAFF] Imperador reviveu [ID: 102] | MOTIVO: Ação anulada por VDM',
    severity: 'low'
  },
  {
    id: '6',
    timestamp: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    category: LogCategory.VEHICLE,
    player: { id: '555', name: 'Ballas 01', discord: 'Ballas#1111' },
    action: 'VEHICLE_SPAWN',
    details: '[GARAGEM] Spawnou veículo de luxo (Ferrari Italia) sem possuir na garagem.',
    severity: 'high'
  }
];

export const CATEGORY_COLORS = {
  [LogCategory.COMBAT]: 'bg-rose-500/5 text-rose-400 border-rose-500/20',
  [LogCategory.ADMIN]: 'bg-indigo-500/5 text-indigo-400 border-indigo-500/20',
  [LogCategory.VEHICLE]: 'bg-blue-500/5 text-blue-400 border-blue-500/20',
  [LogCategory.GENERAL]: 'bg-slate-500/5 text-slate-400 border-slate-500/20',
  [LogCategory.POLICE]: 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20',
  [LogCategory.ECONOMY]: 'bg-amber-500/5 text-amber-400 border-amber-500/20'
};

export const SEVERITY_COLORS = {
  low: 'text-slate-500 font-medium',
  medium: 'text-amber-500 font-semibold',
  high: 'text-orange-500 font-bold',
  critical: 'text-rose-500 font-extrabold flex items-center gap-1 before:content-["●"] before:animate-pulse'
};
