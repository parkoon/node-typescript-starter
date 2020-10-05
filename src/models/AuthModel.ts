export interface UserModel {
  email: string;
  password: string;
  name: string;
}

export interface DataStoreInToken {
  id: string;
  name: string;
  iat?: number;
  exp?: number;
}
export interface Token {
  token: string;
  expiresIn: number;
}
