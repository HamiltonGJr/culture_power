export interface IAdminRepository {
  findAdminByEmail: (email: string) => object;
};
