import { hash } from 'bcrypt';

export class Crypto {
  async cryptoPassword (password: string) {
    return await hash(password, 8);
  };
};
