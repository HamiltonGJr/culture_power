import { mongoose } from '../config/connection';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String
  },
  value: {
    type: Number
  },
  amout: {
    type: Number
  },
  description: {
    type: String
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

export const Product = mongoose.model('products', ProductSchema);
