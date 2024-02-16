import { ProductRepository } from '../repository/product.repository'
import { IProductService } from './interfaces/IProducts.service'

export class ProductService implements IProductService {
  repository: ProductRepository
  constructor(repository: ProductRepository) {
    this.repository = repository
  }

  async create(
    name: string,
    value: number,
    amount: number,
    description: string,
    photo: string
  ) {
    return await this.repository.save(name, value, amount, description, photo)
  }

  async update(
    id: string,
    name: string,
    value: number,
    amount: number,
    description: string,
    photo: string
  ) {
    return await this.repository.findByIdAndUpdate(
      id,
      name,
      value,
      amount,
      description,
      photo
    )
  }

  async userById(id: string) {
    return await this.repository.findUserById(id)
  }

  async productUpdated(product: object) {
    return await this.repository.productUpdated(product)
  }

  async find() {
    return await this.repository.findAll()
  }

  async findId(id: string) {
    return await this.repository.findByID(id)
  }

  async productIdAndUpdate(id: string, product: object) {
    return await this.repository.productByIdAndUpdate(id, product)
  }
}
