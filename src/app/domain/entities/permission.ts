export interface Permission {
  id:              number;
  name:            string;
  description:     string;
  status:          number;
  createdAt:       Date;
  updatedAt:       Date;
  deletedAt:       null;
  rolePermissions: any[];
}

