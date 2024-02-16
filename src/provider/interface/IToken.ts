export interface ITokenProvider {
  tokenJWT: (id: string) => string

  verifyJWT: (
    token: string,
    secretKey: string
  ) => { success: boolean; payload?: object }
}
