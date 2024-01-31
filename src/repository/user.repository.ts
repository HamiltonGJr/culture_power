import { User } from '../model/user';

export class UserRepository {
  async findUserByEmail(email: string) {
    const existUser = await User.findOne({ email });
    return existUser;
  };

  async save(name: string, email: string, password: string, jewelsAmount: number, photo: string) {
    const registeredUser = await new User({ name, email, password, jewelsAmount, photo }).save();
    return registeredUser;
  };
};
