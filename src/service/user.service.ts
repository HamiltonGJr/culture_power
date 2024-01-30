import { User } from '../model/user';
import { UserRepository } from '../repository/user.repository';

export class UserService {
  // Fazer uma interface
  repository: UserRepository
  constructor(repository: UserRepository) {
    this.repository = repository
  };

  // Este método ficaria no repository?
  async findUserByEmail(email: string) {
      const existUser = await User.findOne({ email });
      return existUser;
  };

  async create(name: string, email: string, password: string, photo: string) {
      const user = await this.repository.save(name, email, password, photo);
      return user;
  };
};
