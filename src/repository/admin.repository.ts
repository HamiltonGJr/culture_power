import { Admin } from '../model/Admin';
import { IAdminRepository } from './IAdmin.repository';

export class AdminRepository implements IAdminRepository{
  async findAdminByEmail(email: string) {
    return await Admin.findOne({ email }).exec();
  };

  async findAdminById(id: string) {
    return await Admin.findById(id).exec();
  };
};
