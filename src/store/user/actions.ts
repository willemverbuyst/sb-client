import { LOG_IN_SUCCESS_USER } from './types';

export const loginSuccessUser = (user: any) => {
  return {
    type: LOG_IN_SUCCESS_USER,
    user,
  };
};
