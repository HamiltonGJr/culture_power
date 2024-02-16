export interface IAdmin {
  name: string
  email: string
  password: string
  createdAt: Date
  updateAt: Date
  _id: string
  __v: number
};

export interface IAdminDTO {
  name: string
  email: string
  password: string
};
