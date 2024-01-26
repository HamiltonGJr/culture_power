import { Router } from 'express';
import { UserService } from '../service/user.service';
import { UserRepository } from '../repository/user.repository';
import { Crypto } from '../service/crypto.service';
import * as Yup from 'yup';
import { IUserDTO } from '../entitie/user.interf';

const router = Router();

const repository = new UserRepository();
const service = new UserService(repository);
const crypto = new Crypto();

router.post('/', async (request, response) => {
  const userQuerySchema = Yup.object<IUserDTO>({
    name: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required(),
    jewelsAmount: Yup.number().default(0),
    products: Yup.object(),
    photo: Yup.string().required()
  });

  try {
    await userQuerySchema.validate(request.body);
    const { name, email, password, photo } = request.body;

    const existUser = await service.findUserByEmail(email);
    if (existUser != null) {
      response.status(409).send({ messege: 'Conflict: User with the provided email already exists. Please choose a different email.' });
      return;
    };

    const passwordHashed = await crypto.cryptoPassword(password);

    const newUser = await service.create(name, email, passwordHashed, photo);

    response.status(201).send({ user: newUser });
  } catch (error) {
    const { errors }: any = error
    response.status(400).send({error: errors});
  };
});

export default router;
