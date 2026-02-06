
export enum LogCategory {
  COMBAT = 'COMBAT',
  ECONOMY = 'ECONOMY',
  ADMIN = 'ADMIN',
  VEHICLE = 'VEHICLE',
  GENERAL = 'GENERAL',
  POLICE = 'POLICE'
}

export type AccountStatus = 'pending' | 'approved' | 'rejected';

export interface StaffAccount {
  id: string;
  username: string;
  role: 'master' | 'staff';
  status: AccountStatus;
  joinedAt: string;
  lastLogin: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  category: LogCategory;
  player: {
    id: string;
    name: string;
    discord?: string;
  };
  action: string;
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface CityStats {
  onlinePlayers: number;
  totalTransactions: number;
  activeIncidents: number;
  adminActions: number;
}
