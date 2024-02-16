export interface IProductService {
  create: (name: string, value: number, amount: number, description: string, photo: string) => object;

  update: (id: string, name: string, value: number, amount: number, description: string, photo: string) => object;

  userById: (id: string) => object;

  productUpdated: (user: object) => object;

  find: () => object;

  findId: (id: string) => object;

  productIdAndUpdate: (id: string, product: object) => object;
};
