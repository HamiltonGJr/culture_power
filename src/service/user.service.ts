import { User } from '../model/user';
import { Crypto } from './crypto.service';

const crypto = new Crypto();

export class UserService {
  async searchRegisteredEmail(email: string): Promise<any> {
    try {
      const thisUserExists = await User.findOne({ email });

      return thisUserExists;
    } catch (error) {
      console.log(error);
    };
  };

  async created(name: string, email: string, password: string, photo: string): Promise<any> {
    try {
      await this.searchRegisteredEmail(email);

      if (email != null) {
        const messege = 'Email already registered, try again!';

        return messege;
      };

      await crypto.cryptoPassword(password);

      const newUser = await new User({
        name,
        email,
        password,
        photo
      }).save();

      return newUser;
    } catch (error) {
      console.log(error);
    };
  };
};
