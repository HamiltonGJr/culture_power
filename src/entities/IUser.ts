import { Product } from '../model/Product'

export interface IUser {
  name: string
  email: string
  password: string
  jewelsAmount: number
  products: typeof Product
  photo: string
  createdAt: Date
  updateAt: Date
  _id: string
  __v: number
}

export interface IUserDTO {
  name: string
  email: string
  password: string
  jewelsAmount: number
  products: string
  photo: string
}
