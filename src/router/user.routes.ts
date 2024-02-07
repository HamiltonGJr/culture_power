import { Router } from 'express';
import { UserService } from '../service/user.service';
import { Crypto } from '../provider/crypto';
import { UserRepository } from '../repository/user.repository';
import * as userSchema from '../schema/user.schema';
import * as photoSchema from '../schema/photo.schema';
import validateRouter from '../middleware/validateRouter';
import { auth } from '../middleware/auth';
import { upload } from '../middleware/uploads';

const router = Router();

const repository = new UserRepository();
const service = new UserService(repository);

router.post(
  '/',
  validateRouter(userSchema.CreatePerson.schema),
  auth,
  async (request, response) => {
    console.log(`ID do usuário logado: ${request.body.userId.sub}`);

    const { name, email, password, jewelsAmount, photo } = request.body;

    const existUser = await service.userByEmail(email);
    if (existUser)
      return response.status(409).send({ message: 'Conflict: User with the provided email already exists. Please choose a different email.' });

    const passwordHashed = await new Crypto().cryptoPassword(password);

    const newUser = await service.create(name, email, passwordHashed, jewelsAmount, photo);

    response.status(201).send({ user: newUser });
  }
);

router.patch(
  '/uploadPhoto/:id',
  validateRouter(photoSchema.CreatePerson.schema),
  auth,
  upload.single('userPhoto'),
  async (request, response) => {
    const { file } = request;
    const { id } = request.params;

    const photoToUpdate = await service.userByIdAndUpdate(id, file as Express.Multer.File);
    if(!photoToUpdate)
      return response.status(404).send({ message: 'Error: User not found.' });

    const existUser = await service.userById(id);
    if(!existUser)
      return response.status(404).send({ message: 'Error: User not found.' });

    existUser.__v += 1;
    existUser.uptadeAt = new Date();

    const userUpdatedPhoto = await service.userUpdatedPhoto(existUser);

    response.status(200).send(userUpdatedPhoto);
  }
);

export default router;
