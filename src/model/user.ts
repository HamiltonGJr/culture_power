import { mongoose } from '../config/connection';

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  jewelsAmount: {
    type: Number
  },
  products: {
    type: mongoose.Types.ObjectId,
    ref: 'products'
  },
  photo: {
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

export const User = mongoose.model('users', UserSchema);
