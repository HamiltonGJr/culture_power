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
    if (!newProduct)
      return response.status(404).send({ error: 'Product creation failed.' });

    response.status(201).send({ newProduct });
  }
);

router.put(
  '/:id',
  validateRouter(productSchema.CreatePerson.schema),
  auth,
  isAdmin,
  async (request, response) => {
    const { name, value, amount, description, photo } = request.body;
    const { id } = request.params;

    const productUpdate = await service.update(
      id,
      name,
      value,
      amount,
      description,
      photo
    );
    if (!productUpdate)
      return response.status(404).send({ error: 'Products not found.' });

    const existProduct = await service.userById(id);
    if (!existProduct)
      return response.status(404).send({ error: 'Products not found.' });

    existProduct.__v += 1;
    existProduct.uptadeAt = new Date();

    const productUpdated = await service.productUpdated(existProduct);

    response.status(200).send({ product: productUpdated });
  }
);

router.get(
  '/',
  auth,
  async (request, response) => {
    const amount = 0;

    const products = await service.find();
    if (!products)
      return response.status(404).send({ error: 'Products not found.' });

    const productsFilter = products.filter(
      (products) =>
      products.amount > 0 &&
      (amount === undefined || products.amount >= amount)
    );

    response.status(200).send({ productsFilter });
  }
);

router.get(
  '/:id',
  auth,
  async (request, response) => {
    const { id } = request.params;

    const product = await service.findId(id);
    if (!product)
      return response.status(404).send({ error: 'Products not found.' });

    response.status(200).send({ product });
  }
);

export default router;
