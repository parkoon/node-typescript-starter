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
