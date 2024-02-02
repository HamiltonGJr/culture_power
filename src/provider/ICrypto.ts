export interface ICryptoProvider {
  cryptoPassword: (password: string) => Promise<string>;
};
