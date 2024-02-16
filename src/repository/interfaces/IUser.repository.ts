export interface IUserRepository {
  findUserByEmail: (email: string) => object

  save: (
    name: string,
    email: string,
    password: string,
    jewelsAmount: number,
    photo: string
  ) => object

  findUserById: (id: string) => object

  findUserByIdAndUpdate: (id: string, file: Express.Multer.File) => object

  userUpdated: (user: object) => object

  userUpdatedJewels: (id: string, jewelsAmount: number) => object

  IdAndUpdate: (id: string, user: object) => object
}
