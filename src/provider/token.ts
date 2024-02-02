import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ITokenProvider } from './IToken';

export class Token implements ITokenProvider {
  tokenJWT (id: string) {
    return jwt.sign({ sub: id }, process.env.CRYPTO_KEY as string, {
      expiresIn: 24 * 60 * 60,
    });
  };
};
