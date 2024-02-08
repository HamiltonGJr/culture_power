import { Router } from 'express';
import validateRouter from '../middleware/validateRouter';
import * as authSchema from '../schema/auth.schema';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../service/user.service';
import { AdminRepository } from '../repository/admin.repository';
import { AdminService } from '../service/admin.service';
import { Token } from '../provider/token';
import { Crypto } from '../provider/crypto';

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const adminRepository = new AdminRepository();
const adminService = new AdminService(adminRepository);

const tokenJWT = new Token();
const cryptoBC = new Crypto();

router.post(
  '/',
  validateRouter(authSchema.CreatePerson.schema),
  async (request, response) => {
    const { email, password } = request.body;

    let user;
    let admin;
    let isAdmin = false;

    user = await userService.userByEmail(email);
    if (user) {
      if (await cryptoBC.comperePassword(password, user.password)) {
        user.password = '';
        isAdmin = false;
      } else {
        user = null;
      };
    };

    if (user === null) {
      admin = await adminService.adminByEmail(email);
      if (admin) {
        if (await cryptoBC.comperePassword(password, admin.password))
          isAdmin = true;
        else
          return response.status(401).send({ message: 'Unauthorized: Invalid credentials. Check your email and password and try again.' });
      } else
        return response.status(401).send({ message: 'Unauthorized: Invalid credentials. Check your email and password and try again.' });
    };

    const id = isAdmin ? admin?._id.toString() : user?._id.toString();

    const token = tokenJWT.tokenJWT(id as string);

    response.status(200).send({
      message: isAdmin ? 'Success: Admin authentication successful.' : 'Success: User authentication successful.',
        userOrAdmin: isAdmin ? { admin } : { user },
        token,
    });
  }
);

export default router;
