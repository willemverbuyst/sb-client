export const LOG_IN_SUCCESS_USER = 'LOGIN_SUCCESS_USER';
export const TOKEN_STILL_VALID_USER = 'TOKEN_STILL_VALID_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';

export type UserState = {
  user: User;
};

export type GetUserState = () => UserState;

export type User = {
  id: number | null;
  userName: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
  admin: boolean | null;
  totaalToto: boolean | null;
  token: string | null;
  team: Team | null;
};

export type Team = {
  id: number | null;
  logo: string;
  name: string;
};

export type LogOutUser = {
  type: typeof LOG_OUT_USER;
};

export type LogInSuccessUser = {
  type: typeof LOG_IN_SUCCESS_USER;
  user: User;
};

export type TokenUserStillValid = {
  type: typeof TOKEN_STILL_VALID_USER;
  user: User;
};

export type TeacherActionTypes =
  | LogInSuccessUser
  | LogOutUser
  | TokenUserStillValid;
