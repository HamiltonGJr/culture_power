import { Router } from 'express';
import { UserService } from '../service/user.service';
import { Crypto } from '../provider/crypto';
import { UserRepository } from '../repository/user.repository';
import * as userSchema from '../schema/user.schema';
import validateRouter from '../middleware/validateRouter';
import { auth } from '../middleware/auth';

const router = Router();

const repository = new UserRepository();
const service = new UserService(repository);

router.post('/', validateRouter(userSchema.CreatePerson.schema), auth, async (request, response) => {
  console.log(`ID do usuário logado: ${request.body.userId}`);

  const { name, email, password, jewelsAmount, photo } = request.body;

  const existUser = await service.userByEmail(email);
  if (existUser)
    return response.status(409).send({ message: 'Conflict: User with the provided email already exists. Please choose a different email.' });

  const passwordHashed = await new Crypto().cryptoPassword(password);

  const newUser = await service.create(name, email, passwordHashed, jewelsAmount, photo);

  response.status(201).send({ user: newUser });
});

export default router;
