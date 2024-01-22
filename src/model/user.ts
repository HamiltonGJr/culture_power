import { mongoose } from '../config/connection';
import { IUser } from '../entities/user.interf'

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  jewelsAmount: {
    type: Number
  },
  products: {
    type: mongoose.Types.ObjectId,
    ref: 'products'
  },
  photo: {
    type: String,
    required: true
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

export const User = mongoose.model<IUser>('users', UserSchema);
