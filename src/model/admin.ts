import { mongoose } from '../config/connection';

const AdminSchema = new mongoose.Schema({
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

export const Admin = mongoose.model('admins', AdminSchema);
