import axios from 'axios';
import { AuthModel, UserModel } from './_models';
import { useAuth } from './Auth';

const API_URL = `${process.env.REACT_APP_API_URL}/Auth`;

// const API_URL = 'https://preview.keenthemes.com/metronic8/laravel/api';

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/ValidateToken`;
export const GET_USER_DATA = `${API_URL}/Me`;
export const GET_USER_DATA1 = `https://localhost:44322/api/v1/Auth/Me`;
export const LOGIN_URL = `${API_URL}/Login`;
export const LOGIN__WITH_AD_URL = `${API_URL}/LoginByAD`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

// Server should return AuthModel
export function login (email: string, password: string) {
  return axios.post<string>(LOGIN_URL, {
    email,
    password,
  });
}

export function loginWithAD () {
  return axios.post<string>(LOGIN__WITH_AD_URL);
}

// Server should return AuthModel
export function register (
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword (email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken (token: string) {
  return axios.get<UserModel>(`${GET_USER_BY_ACCESSTOKEN_URL}?token=${token}`);
}

export function getUserDataByToken () {
  return axios.get<UserModel>(GET_USER_DATA);
}
