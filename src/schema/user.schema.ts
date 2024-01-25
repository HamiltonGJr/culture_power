import * as Yup from 'yup';
import { IUserDTO } from '../entitie/user.interf';

export const UserSchema = Yup.object<IUserDTO>({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required(),
  jewelsAmount: Yup.number().default(0),
  products: Yup.object(),
  photo: Yup.string().required()
});
