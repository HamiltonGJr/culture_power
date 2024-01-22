import { mongoose } from '../config/connection';
import { IProduct } from '../entities/interf.product';

const ProductSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
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

export const Product = mongoose.model<IProduct>('products', ProductSchema);
