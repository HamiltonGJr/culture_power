export interface ITokenProvider {
  tokenJWT: (id: string) => string;

  verifyJWT: (token: string, secretKey: string) => { sucess: boolean, payload?: object };
};
