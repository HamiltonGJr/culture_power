import { mongoose } from '../config/connection';
import { IAdmin } from '../entitie/IAdmin';

const AdminSchema = new mongoose.Schema<IAdmin>({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  uptadeAt: {
    type: Date,
    default: new Date()
  }
});

export const Admin = mongoose.model<IAdmin>('admins', AdminSchema);