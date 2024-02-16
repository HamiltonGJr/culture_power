import { mongoose } from '../config/connection'
import { IProduct } from '../entities/IProduct'

const ProductSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: '_photo_',
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

export const Product = mongoose.model<IProduct>('products', ProductSchema)
