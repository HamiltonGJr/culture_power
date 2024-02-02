import { UserRepository } from '../repository/user.repository';
import { IUserService } from './IUser.service';

export class UserService implements IUserService {
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  };

  async userByEmail (email: string) {
    return await this.repository.findUserByEmail(email);
  };

  async create(name: string, email: string, password: string, jewelsAmount: number, photo: string) {
    return await this.repository.save(name, email, password, jewelsAmount ,photo);
  };
};
