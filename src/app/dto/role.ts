export interface RoleRequest {
  st?: number;
  nm?: string;
  pr?: string;
}

export interface Permission {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
}

export interface RoleResponse {
  created_at: string;
  name: string;
  status: number;
  permissions: Permission[];
  users: User[];
}

export interface RoleCreate{
  id?: number;
  name: string;
  description?: string;
  status: number;
}
