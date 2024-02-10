import { Router } from 'express';
import validateRouter from '../middleware/validateRouter';
import * as productSchema from '../schema/product.schema';
import { ProductRepository } from '../repository/product.repository';
import { ProductService } from '../service/product.service';
import { auth } from '../middleware/auth';
import { isAdmin } from '../middleware/verifyPermission';

const router = Router();

const repository = new ProductRepository();
const service = new ProductService(repository);

router.post(
  '/',
  validateRouter(productSchema.CreatePerson.schema),
  auth,
  isAdmin,
  async (request, response) => {
    const { name, value, amount, description, photo } = request.body;

    const newProduct = await service.create(
      name,
      value,
      amount,
      description,
      photo
    );

    response.status(201).send({ user: newProduct });
  }
);

export default router;
