import type { LoginByPasswordParams, RegisterByEmail } from './types/user';
import http from '../utils/http';

// TODO response type

export const loginApi = (data: LoginByPasswordParams) =>
  http({
    url: '/auth/signin_by_password',
    method: 'post',
    data,
  });

export const sendCode = (email: string) =>
  http({
    url: '/auth/send-code',
    method: 'post',
    data: { email },
  });

export const register = (data: RegisterByEmail) =>
  http({
    url: '/auth/signup',
    method: 'post',
    data,
  });

export const findAllUser = () => http('/user/findall');

export function getInfo() {
  return http('/members/info');
}
