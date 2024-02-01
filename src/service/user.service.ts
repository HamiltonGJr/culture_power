import { UserRepository } from '../repository/user.repository';

export class UserService {
  // Fazer uma interface
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  };

  async create(name: string, email: string, password: string, jewelsAmount: number, photo: string) {
    return await this.repository.save(name, email, password, jewelsAmount ,photo);
  };
};
