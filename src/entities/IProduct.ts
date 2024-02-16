export interface IProduct {
  name: string
  value: number
  amount: number
  description: string
  photo: string
  createdAt: Date
  updateAt: Date
  _id: string
  __v: number
};

export interface IProductDTO {
  name: string
  value: number
  amount: number
  description: string
  photo: string
};
