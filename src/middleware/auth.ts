import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import { Token } from '../provider/token';

export function auth(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader)
    return response.status(401).send({ error: 'No token provided' });

  const tokenParts = authHeader.split(' ');

  if(tokenParts.length !== 2)
    return response.status(401).send({ error: 'Token error 01' });

  const [ tokenSchema, token ] = tokenParts;

  if(tokenSchema !== 'Bearer')
    return response.status(401).send({ error: 'Token error 02' });

  const verify = new Token().verifyJWT(token, process.env.CRYPTO_KEY as string);

  const { sucess, payload } = verify;

  if(!sucess)
    return response.status(401).send({ error: 'Invalid Token' });

  request.body.userId = payload;
  next();
};
