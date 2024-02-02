import { User } from '../model/User';
import { IUserRepository } from './IUser.repository';

export class UserRepository implements IUserRepository{
  async findUserByEmail(email: string) {
    return await User.findOne({ email }).exec();
  };

  async save(name: string, email: string, password: string, jewelsAmount: number, photo: string) {
    return new User({ name, email, password, jewelsAmount, photo }).save();
  };
};
