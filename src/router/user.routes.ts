import { Router } from 'express';
import { UserService } from '../service/user.service';

const router = Router();

const service = new UserService();

router.post('/', async (request, response) => {
  const { name, email, password, photo } = request.body;

  // 1 - Buscar se existe um usuario com email
  // 2 - Se existir retornar erro
  // 3 - Criar um hash para senha
  // 4 - Salvar no banco de dados
  // O que for verbo eu crio um serviço

  const newUser = await service.created(name, email, password, photo);

  response.status(201).send({ user: newUser });
});

export default router;
