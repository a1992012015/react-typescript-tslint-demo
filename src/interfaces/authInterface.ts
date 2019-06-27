export interface AuthLoginInterface {
  username: string;
  password: string;
}

export interface AuthSignUpInterface {
  username: string;
  phone: string;
  password: string;
  code: string;
}

export interface AuthSendCodeInterface {
  phone: string;
  check_phone: boolean;
}

export interface AuthForgotPassword {
  phone: string;
  code: string;
  new_password: string;
  is_forget: boolean;
}
