import { ProductRepository } from '../repository/product.repository';
import { IProductService } from './interfaces/IProducts.service';

export class ProductService implements IProductService {
  repository: ProductRepository;
  constructor(repository: ProductRepository) {
    this.repository = repository;
  };

  async create(name: string, value: number, amount: number, description: string, photo: string) {
    return await this.repository.save(name, value, amount, description, photo);
  };
};
