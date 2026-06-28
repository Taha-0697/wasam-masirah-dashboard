import axios, { AxiosResponse } from 'axios';
import { Role } from '../../roles/core/_models';
import { User, UserRoleMappingRequest, UsersQueryResponse } from './_models';

const API_URL = process.env.REACT_APP_API_URL;
const USERS_URL = `${API_URL}/users`;

const getUsers = (): Promise<Array<User>> => {
  return axios.get(USERS_URL).then((d: AxiosResponse<Array<User>>) => d.data);
};

const getFilteredUsers = async (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${USERS_URL}/find?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data);
};

const getUserById = (id: number): Promise<User> => {
  return axios.get(`${USERS_URL}/${id}`).then((response: AxiosResponse<User>) => response.data);
};

const createUser = (user: FormData): Promise<User> => {
  return axios.post(USERS_URL, user).then((response: AxiosResponse<User>) => response.data);
};

const updateUser = (id: number, user: FormData): Promise<void> => {
  return axios.put(`${USERS_URL}/${id}`, user).then(() => { });
};

const deleteUser = (id: number): Promise<void> => {
  return axios.delete(`${USERS_URL}/${id}`).then(() => { });
};

// Roles
const getUserRoles = (id: number): Promise<Array<Role>> => {
  return axios.get(`${USERS_URL}/${id}/roles`).then((d: AxiosResponse<Array<Role>>) => d.data);
};

const createUserRoles = (id: number, userRole: UserRoleMappingRequest): Promise<Array<User>> => {
  return axios
    .post(`${USERS_URL}/${id}/roles`, userRole.roleIds)
    .then((d: AxiosResponse<Array<User>>) => d.data);
};

const deleteUserRole = (id: number, roleId: number): Promise<void> => {
  return axios.delete(`${USERS_URL}/${id}/roles/${roleId}`).then(() => { });
};


// Entity
const updateEntity = (id?: number, selectedEntity?: number) => {
  return axios.put(`${USERS_URL}/${id}/Entity/${selectedEntity}`).then(() => { });
}

export { getUsers, getFilteredUsers, getUserById, createUser, updateUser, getUserRoles, createUserRoles, deleteUserRole, deleteUser, updateEntity };
