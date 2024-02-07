import { Router } from 'express';
import validateRouter from '../middleware/validateRouter';
import * as authSchema from '../schema/auth.schema';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../service/user.service';
import { Token } from '../provider/token';
import { Crypto } from '../provider/crypto';

const router = Router();

const repository = new UserRepository();
const service = new UserService(repository);

router.post(
  '/',
  validateRouter
  (authSchema.CreatePerson.schema),
  async (request, response) => {
    const { email, password } = request.body;

    const user = await service.userByEmail(email);
    if (!user)
      return response.status(401).send({ message: 'Unauthorized: Invalid credentials. Check your email and password and try again.' });

    const thesePasswordsAreTheSame = new Crypto().comperePassword(password, user.password);
    if(!thesePasswordsAreTheSame)
      return response.status(401).send({ message: 'Unauthorized: Invalid credentials. Check your email and password and try again.' });

    user.password = '';

    const token = new Token().tokenJWT(user.id);

    response.status(200).send({ message: 'Success: User authentication successful.', user, token });
  }
);

export default router;
