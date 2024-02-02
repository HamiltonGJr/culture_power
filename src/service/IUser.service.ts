export interface IUserService {
  userByEmail: (email: string) => object;

  create: (name: string, email: string, password: string, jewelsAmount: number, photo: string) => object;
}