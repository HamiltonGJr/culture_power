import { User } from '../model/user';

export class UserRepository {
  async findUserByEmail(email: string) {
    return await User.findOne({ email }).exec();
  };

  async save(name: string, email: string, password: string, jewelsAmount: number, photo: string) {
    return await new User({ name, email, password, jewelsAmount, photo }).save();
  };
};
