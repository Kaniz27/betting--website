
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Bettor' | 'Editor';
  status: 'Active' | 'Inactive' | 'Pending';
  lastActive: string;
  avatar?: string;
  balance?: number;
}

export interface SecurityLog {
  id: string;
  timestamp: string;
  event: string;
  severity: 'Low' | 'Medium' | 'High';
  ipAddress: string;
  details: string;
}

export enum AdminTab {
  Dashboard = 'Dashboard',
  Users = 'Users',
  Actions = 'Actions',
  Security = 'Security'
}
