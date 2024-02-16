import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { ITokenProvider } from './interface/IToken'

export class Token implements ITokenProvider {
  tokenJWT(id: string) {
    return jwt.sign({ sub: id }, process.env.CRYPTO_KEY as string, {
      expiresIn: 24 * 60 * 60,
    })
  }

  verifyJWT(token: string, secretKey: string) {
    try {
      const decoded = jwt.verify(token, secretKey) as object

      return { success: true, payload: decoded }
    } catch (err) {
      return { success: false }
    }
  }
}
