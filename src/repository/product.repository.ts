import { Product } from '../model/Product';
import { IProductRepository } from './interfaces/IProduct.repository';

export class ProductRepository implements IProductRepository {
  async save(name: string, value: number, amount: number, description: string, photo: string) {
    return await new Product({ name, value, amount, description, photo }).save();
  };

  async findByIdAndUpdate(id: string, name: string, value: number, amount: number, description: string, photo: string) {
    return await Product.findByIdAndUpdate(id, { name, value, amount, description, photo }).exec();
  }

  async findUserById(id: string) {
    return await Product.findById(id).exec();
  };

  async productUpdated(product: object) {
    return await new Product(product).save();
  };

  async findAll() {
    return await Product.find();
  };

  async findByID(id: string) {
    return await Product.findById(id);
  };

  async productByIdAndUpdate(id: string, product: any) {
    return await Product.findByIdAndUpdate(id, product);
  }
};
