import { SystemPage, SystemAction, Response } from '../../../../../_metronic/helpers';

export type Role = {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  isMapped?: boolean;
  permissions: Permission[];
  createdAt: string;
  createdBy: string;
  modifiedAt?: string;
  modifiedBy?: string;
  businessEntityId?: number;
  lastSelectedEntity?: number;
};

export type RoleRequest = {
  name: string;
  description?: string;
  isActive: boolean;
  permissions: PermissionRequest[];
};

export type Permission = {
  page: any;
  actions: PermissionAction[] | SystemAction[];
};

export type PermissionAction = {
  action: SystemAction;
  createdAt: string;
  createdBy: string;
};

export type PermissionRequest = {
  page: SystemPage;
  actions: SystemAction[];
};

export type RolesQueryResponse = Response<Array<Role>>;

export const initialRoleRequest: RoleRequest = {
  name: '',
  description: '',
  isActive: true,
  permissions: [],
};
