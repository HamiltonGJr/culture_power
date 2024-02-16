import { Request, Response, NextFunction } from 'express';

export function logger(request: Request, response: Response, next: NextFunction) {
  console.log('Time: ', new Date());
  console.log(`Route: ${request.method}; ${request.path};`);
  console.log('--------------------------------------');

  next();
};
