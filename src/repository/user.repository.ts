import { User } from '../model/User'
import { IUserRepository } from './interfaces/IUser.repository'

export class UserRepository implements IUserRepository {
  async findUserByEmail(email: string) {
    return await User.findOne({ email }).exec()
  }

  async save(
    name: string,
    email: string,
    password: string,
    jewelsAmount: number,
    photo: string
  ) {
    return await new User({ name, email, password, jewelsAmount, photo }).save()
  }

  async findUserById(id: string) {
    return await User.findById(id).exec()
  }

  async findUserByIdAndUpdate(id: string, file: Express.Multer.File) {
    return await User.findByIdAndUpdate(id, { photo: file?.filename })
  }

  async userUpdated(user: object) {
    return await new User(user).save()
  }

  async userUpdatedJewels(id: string, jewelsAmount: number) {
    return await User.findByIdAndUpdate(id, { $inc: { jewelsAmount } })
  }

  async IdAndUpdate(id: string, user: object) {
    return await User.findByIdAndUpdate(id, user)
  }
}
