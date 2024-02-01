import { Router } from 'express';
import validateRouter from '../middleware/validateRouter';
import * as authSchema from '../schema/auth.schema';
import { UserRepository } from '../repository/user.repository';
import { compare } from 'bcrypt';

const router = Router();

const repository = new UserRepository();

router.post('/', validateRouter(authSchema.CreatePerson.schema), async (request, response) => {
  const { email, password } = request.body;

  const user = await repository.findUserByEmail(email);
  if (!user)
    return response.status(401).send({ message: 'Unauthorized: User with the provided email already exists. Please choose a different email.' });

  const thesePasswordsAreTheSame = await compare(password, user.password);
  if(!thesePasswordsAreTheSame)
    return response.status(401).send({ message: 'Unauthorized: Provided password does not match the existing user\'s password.' });

  response.status(200).send({ message: 'Success: User authentication successful.' });
});

export default router;
