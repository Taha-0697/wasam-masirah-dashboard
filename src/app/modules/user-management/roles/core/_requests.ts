import axios, { AxiosResponse } from 'axios';
import { Role, RoleRequest, PermissionRequest, RolesQueryResponse } from './_models';
import { SystemAction, SystemPage } from '../../../../../_metronic/helpers';

const API_URL = process.env.REACT_APP_API_URL;
const ROLES_URL = `${API_URL}/roles`;

const getRoles = (): Promise<Array<Role>> => {
  return axios.get(ROLES_URL).then((d: AxiosResponse<Array<Role>>) => d.data);
};

const getFilteredRoles = async (query: string): Promise<RolesQueryResponse> => {
  return axios
    .get(`${ROLES_URL}/find?${query}`)
    .then((d: AxiosResponse<RolesQueryResponse>) => d.data);
};

const getRoleById = (id: number): Promise<Role> => {
  return axios.get(`${ROLES_URL}/${id}`).then((response: AxiosResponse<Role>) => response.data);
};

const createRole = (role: RoleRequest): Promise<Role> => {
  return axios.post(ROLES_URL, role).then((response: AxiosResponse<Role>) => response.data);
};

const createRolePermissions = (id: number, permissions: PermissionRequest[]): Promise<Role> => {
  return axios
    .post(`${ROLES_URL}/${id}/permissions`, permissions)
    .then((response: AxiosResponse<Role>) => response.data);
};

const updateRole = (id: number, role: RoleRequest): Promise<void> => {
  return axios.put(`${ROLES_URL}/${id}`, role).then(() => { });
};

const deleteRole = (id: number): Promise<void> => {
  return axios.delete(`${ROLES_URL}/${id}`).then(() => { });
};

const deleteRolePageActions = (
  id: number,
  pageId?: SystemPage,
  actions?: SystemAction[]
): Promise<void> => {
  return axios
    .post(`${ROLES_URL}/${id}/permissions/pages/${pageId}/actions`, actions)
    .then(() => { });
};

const getRolesAssociatedByUserTypeAndId = () => {
  return axios.get(`${ROLES_URL}/userType`).then((d: AxiosResponse<Array<Role>>) => d.data);
}

export {
  getRoles,
  getFilteredRoles,
  getRoleById,
  createRole,
  createRolePermissions,
  updateRole,
  deleteRole,
  deleteRolePageActions,
  getRolesAssociatedByUserTypeAndId
};
