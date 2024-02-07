export interface ICryptoProvider {
  cryptoPassword: (password: string) => Promise<string>;

  comperePassword: (password: string, userPassword: string) => Promise<boolean>;
};
