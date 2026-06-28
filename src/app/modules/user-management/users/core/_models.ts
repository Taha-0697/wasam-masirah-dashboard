import { Response } from '../../../../../_metronic/helpers';
import { Role } from '../../roles/core/_models';

export type User = {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  icon?: string;
  phone: string;
  picture?: string;
  roles: any[];
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  modifiedAt?: string;
  modifiedBy?: string;
};

export type UserRequest = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  picture?: any;
  isActive: boolean;
  picturePath?: string;
  roles?: any;
};

export type UserRoleMappingRequest = {
  roleIds: number[];
};

export type UsersQueryResponse = Response<Array<User>>;

export const initialUserRoleMappingRequest: UserRoleMappingRequest = {
  roleIds: [],
};

export const initialUser: UserRequest = {
  userId: '',
  firstName: '',
  lastName: '',
  email: '',
  picture: '',
  isActive: true,
  phone: '',
  roles: [],
};

// the below model is for Api Calls

export type APIData = {
  users?: User[];
  roles?: Role[];
  entities?: any;
  discipline?: any;
  ranks?: any;
};

export type EnabledAPIs = {
  businessEntity?: boolean;
  user?: boolean;
  discipline?: boolean;
  rank?: boolean;
  roles?: boolean;
};

export const initialEnabledAPIs = {
  user: true,
  businessEntity: false,
  discipline: true,
  rank: false,
  roles: false,
};
