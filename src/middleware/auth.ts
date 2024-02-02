import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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

  jwt.verify(token, process.env.CRYPTO_KEY as string, (error, decoded) => {
    if(error)
      return response.status(401).send({ error: 'Invalid Token' });

    request.body.userId = decoded!.sub as string;
  });
  next();
};
