import { Router } from 'express';
import { UserService } from '../service/user.service';
import { UserRepository } from '../repository/user.repository';
import { Crypto } from '../service/crypto.service';
import { UserSchema } from '../schema/user.schema';

const router = Router();

const repository = new UserRepository();
const service = new UserService(repository);

router.post('/', async (request, response) => {
  try {
    await UserSchema.validate(request.body);
    const { name, email, password, photo } = request.body;

    const existUser = await service.findUserByEmail(email);
    if (existUser != null) {
      response.status(409).send({ messege: 'Conflict: User with the provided email already exists. Please choose a different email.' });
      return;
    };

    const passwordHashed = await new Crypto().cryptoPassword(password);

    const newUser = await service.create(name, email, passwordHashed, photo);

    response.status(201).send({ user: newUser });
  } catch (error) {
    const { errors }: any = error
    response.status(400).send({error: errors});
  };
});

export default router;
