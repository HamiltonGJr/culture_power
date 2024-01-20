import { mongoose } from '../config/connection';

const UserSchema = new mongoose.Schema({
  Name: {
    type: String
  },
  Email: {
    type: String
  },
  Password: {
    type: String
  },
  jewelsAmount: {
    type: Number
  },
  Products: {
    type: mongoose.Types.ObjectId,
    ref: 'products'
  },
  Photo: {
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
