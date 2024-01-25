import { hash } from 'bcrypt';

export class Crypto {
  async cryptoPassword (password: string): Promise<any> {
    try {
      const passwordHashed = await hash(password, 8);

      return passwordHashed;
    }catch (error) {
      console.log(error);
    };
  };
};
