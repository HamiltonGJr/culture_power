import { hash } from 'bcrypt';

export class Crypto {
  async cryptoPassword (password: string) {
      const passwordHashed = await hash(password, 8);
      return passwordHashed;
  };
};
