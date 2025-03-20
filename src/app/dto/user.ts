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
