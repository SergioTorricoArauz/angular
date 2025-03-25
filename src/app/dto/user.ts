export interface UserRequest {
  type: number;
  name: string;
  email: string;
  gender: string;
  collaboratorId: number;
  serviceAssociated: number;
  supervisorId: number;
  systemId: number;
  modeWork: number;
  serialComputer?: string;
  serialMonitor?: string;
}

export interface UserResponse {
  firstname: string;
  lastname: string;
  role: string;
  type: string;
  id: number;
  name: string;
  email: string;
  status: number;
  te: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Team {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  teamUsers: string[];
}

export interface TeamUser {
  teamId: number;
  team: Team;
  userId: number;
  user: string;
}

export interface UserResponses {
  id: number;
  type: number; // 0: Operador, 1: Coordinador, 2: Supervisor
  firstname: string;
  lastname: string;
  email: string;
  status: number;
  gender: string;
  bornAt: string; // Date as string
  country: string;
  phone: string;
  address: string;
  collaboratorId: number;
  serviceAssociated: number;
  coordinatorId: number;
  supervisorId: number;
  systemId: number;
  modeWork: number;
  winUsernameConecta: string;
  winUsernameClient: string;
  eh: string;
  avayaId: number;
  orionUsername: string;
  rrssUsername: string;
  serialComputer: string;
  serialMonitor: string;
  signupAt: string; // Date as string
  pisoAt: string; // Date as string
  quitAt: string; // Date as string
  createdAt: string; // Date as string
  updatedAt: string; // Date as string
  deletedAt: string; // Date as string
  teamUsers: TeamUser[];
}
