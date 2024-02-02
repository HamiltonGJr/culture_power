import { hash } from 'bcrypt';
import { ICryptoProvider } from './ICrypto';

export class Crypto implements ICryptoProvider {
  async cryptoPassword (password: string) {
    return await hash(password, 8);
  };
};
