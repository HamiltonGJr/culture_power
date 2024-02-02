export interface ITokenProvider {
  tokenJWT: (id: string) => string;
};
