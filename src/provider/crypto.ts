import { hash, compare } from 'bcrypt'
import { ICryptoProvider } from './interface/ICrypto'

export class Crypto implements ICryptoProvider {
  async cryptoPassword(password: string) {
    return await hash(password, 8)
  }

  async comperePassword(password: string, userPassword: string) {
    return await compare(password, userPassword)
  }
}
