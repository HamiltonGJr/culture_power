export interface IProductRepository {
  save: (name: string, value: number, amount: number, description: string, photo: string) => object;
};
