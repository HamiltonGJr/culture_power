export interface IAdminRepository {
  findAdminByEmail: (email: string) => object;

  findAdminById: (id: string) => object;
};
