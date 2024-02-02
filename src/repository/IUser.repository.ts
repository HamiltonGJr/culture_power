export interface IUserRepository {
  findUserByEmail: (email: string) => object;

  save: (name: string, email: string, password: string, jewelsAmount: number, photo: string) => object;
};
