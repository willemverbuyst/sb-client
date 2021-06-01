export interface ILogInCredentials {
  email: string;
  password: string;
}

export interface IProfileDetails {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  admin: boolean;
  totaalToto: boolean;
  teamId: number | '';
}

export interface ISignUpCredentials extends IProfileDetails {
  password: string;
}
