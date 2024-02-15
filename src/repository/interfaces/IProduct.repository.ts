export interface IProductRepository {
  save: (name: string, value: number, amount: number, description: string, photo: string) => object;

  findByIdAndUpdate: (id: string, name: string, value: number, amount: number, description: string, photo: string) => object;

  findUserById: (id: string) => object;

  productUpdated: (product: object) => object;

  findAll: () => object;

  findByID: (id: string) => object;
};
