export const LOG_IN_SUCCESS_USER = 'LOGIN_SUCCESS_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const TOKEN_STILL_VALID_USER = 'TOKEN_STILL_VALID_USER';

export type UserState = {
  user: User | null;
};

export type GetUserState = () => UserState;

export type User = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  admin: boolean;
  totaalToto: boolean;
  token: string;
  team: Team;
};

export type Team = {
  id: number;
  logo: string;
  name: string;
};

export type LogInSuccessUser = {
  type: typeof LOG_IN_SUCCESS_USER;
  user: User;
};

export type LogOutUser = {
  type: typeof LOG_OUT_USER;
};

export type TokenUserStillValid = {
  type: typeof TOKEN_STILL_VALID_USER;
  user: User;
};

export type UserActionTypes =
  | LogInSuccessUser
  | LogOutUser
  | TokenUserStillValid;
