import { Router } from 'express';
import { UserService } from '../service/user.service';
import { UserRepository } from '../repository/user.repository';
import { AdminRepository } from '../repository/admin.repository';
import { AdminService } from '../service/admin.service';
import * as userSchema from '../schema/user.schema';
import * as photoSchema from '../schema/photo.schema';
import validateRouter from '../middleware/validateRouter';
import { auth } from '../middleware/auth';
import { upload } from '../middleware/uploads';
import { Crypto } from '../provider/crypto';
import { isAdmin } from '../middleware/verifyPermission';

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const adminRepository = new AdminRepository();
const adminService = new AdminService(adminRepository);

const crypto = new Crypto();

router.post(
  '/',
  validateRouter(userSchema.CreatePerson.schema),
  auth,
  isAdmin,
  async (request, response) => {
    console.log(request.body.userId);
    const { name, email, password, jewelsAmount, photo } = request.body;

    const existUser = await userService.userByEmail(email);
    if (existUser)
      return response.status(409).send({ message: 'Conflict: User with the provided email already exists. Please choose a different email.' });

    const passwordHashed = await crypto.cryptoPassword(password);

    const newUser = await userService.create(
      name,
      email,
      passwordHashed,
      jewelsAmount,
      photo
    );

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

    const photoToUpdate = await userService.userByIdAndUpdate(id, file as Express.Multer.File);
    if (!photoToUpdate)
      return response.status(404).send({ message: 'Error: User not found.' });

    const existUser = await userService.userById(id);
    if (!existUser)
      return response.status(404).send({ message: 'Error: User not found.' });

    existUser.__v += 1;
    existUser.uptadeAt = new Date();

    const userUpdatedPhoto = await userService.userUpdatedPhoto(existUser);

    response.status(200).send(userUpdatedPhoto);
  }
);

router.get(
  '/',
  auth,
  async (request, response) => {
    const id = request.body.userId.sub;

    const userId = await userService.userById(id);
    if(id === userId?._id.toString()) {
      userId!.password = '';
      response.status(201).send({ user: userId });
      return;
    };

    const adminId = await adminService.adminById(id);
    if(id === adminId?._id.toString()) {
      adminId!.password = '';
      response.status(201).send({ admin: adminId });
      return;
    }

    response.status(404).send({ message: 'Error: User not found.' });
  }
);

export default router;
