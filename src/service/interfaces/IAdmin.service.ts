export interface IAdminService {
  adminByEmail: (email: string) => object

  adminById: (id: string) => object
}
