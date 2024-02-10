export interface IProductService {
  create: (name: string, value: number, amount: number, description: string, photo: string) => object;
};
