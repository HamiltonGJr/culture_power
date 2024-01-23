import { Router } from 'express';
import { UserService } from '../service/user.service';

const router = Router();

const service = new UserService(router);

router.post('/', async (request, response) => {
  const { name, email, password, photo } = request.body;

  const newUser = await service.created(name, email, password, photo);

  response.status(201).send({ user: newUser });
});

export default router;
