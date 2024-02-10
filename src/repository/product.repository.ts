import { Product } from '../model/Product';
import { IProductRepository } from './interfaces/IProduct.repository';

export class ProductRepository implements IProductRepository {
  async save(name: string, value: number, amount: number, description: string, photo: string) {
    return await new Product({ name, value, amount, description, photo }).save();
  };
};
