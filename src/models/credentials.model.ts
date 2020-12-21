export interface ILogInCredentials {
  email: string;
  password: string;
}

export interface ISignUpCredentials {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  admin: boolean;
  totaalToto: boolean;
  teamId: number | '';
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

export interface IPassword {
  newPassword: string;
}
