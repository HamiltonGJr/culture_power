import { mongoose } from '../config/connection'
import { IAdmin } from '../entities/IAdmin'

const AdminSchema = new mongoose.Schema<IAdmin>({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updateAt: {
    type: Date,
    default: new Date(),
  },
})

export const Admin = mongoose.model<IAdmin>('admins', AdminSchema)
