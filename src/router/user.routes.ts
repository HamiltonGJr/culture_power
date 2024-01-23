import { Router } from 'express';
import { User } from '../model/user';
import { hash } from 'bcrypt';

const router = Router();

router.post('/', async (request, response) => {
  const { name, email, password, photo } = request.body;

  const thisUserExists = await User.findOne({ email });
  if (thisUserExists != null) {
    response.status(401).send({ messege: 'Email already registered, try again!' });

    return;
  };

  const passwordHashed = await hash(password, 8);

  const newUser = await new User({
    name,
    email,
    password: passwordHashed,
    photo
  }).save();

  response.status(201).send({ user: newUser })
});

export default router;
