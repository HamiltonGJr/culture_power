import { AdminRepository } from '../repository/admin.repository'
import { IAdminService } from './interfaces/IAdmin.service'

export class AdminService implements IAdminService {
  repository: AdminRepository
  constructor(repository: AdminRepository) {
    this.repository = repository
  }

  async adminByEmail(email: string) {
    return await this.repository.findAdminByEmail(email)
  }

  async adminById(id: string) {
    return await this.repository.findAdminById(id)
  }
}
