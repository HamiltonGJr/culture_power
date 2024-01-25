import { User } from '../model/user';

export class UserRepository {
  async save(name: string, email: string, password: string, photo: string) {
    const registeredUser = await new User({name, email, password, photo}).save();
    return registeredUser;
  };
};
