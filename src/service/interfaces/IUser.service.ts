export interface IUserService {
  userByEmail: (email: string) => object

  create: (
    name: string,
    email: string,
    password: string,
    jewelsAmount: number,
    photo: string
  ) => object

  userById: (id: string) => object

  userByIdAndUpdate: (id: string, file: Express.Multer.File) => object

  userUpdated: (user: object) => object

  userUpdatedJewels: (id: string, jewelsAmount: number) => object

  userIdAndUpdate: (id: string, user: object) => object
}
