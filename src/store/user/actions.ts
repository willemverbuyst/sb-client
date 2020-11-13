import { LOGIN_SUCCESS_USER } from './types';

export const loginSuccessUser = (user: any) => {
  return {
    type: LOGIN_SUCCESS_USER,
    user,
  };
};
