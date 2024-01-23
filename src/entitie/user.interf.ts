export interface IUser {
  name: string
  email: string
  password: string
  jewelsAmount?: number
  products?: string
  photo: string
  createdAt: Date
  uptadeAt: Date
  _id?: string
  __v?: number
};

export interface IUserDTO {
  name: string
  email: string
  password: string
  jewelsAmount?: number
  products?: string
  photo: string
};
