import { ValidationError } from 'yup';
import { NextFunction, Request, Response } from 'express';

export default (schema: any) => async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  console.log(`Validando a rota: ${request.method} ${request.path}`);

  try {
    await schema.validate({
      body: request.body,
      query: request.query,
      params: request.params,
    }, { strict: true, abortEarly: false }
    ); next();
  } catch(error) {
    const {name, message, errors} = error as ValidationError;
    response.status(406).send({ name, message, errors });
  };
};
