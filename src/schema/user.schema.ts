import * as Yup from 'yup';
import { IUserDTO } from '../entitie/user.interf';
import { TypedRequest } from '../util/typedRequest';

const UserSchema = Yup.object<IUserDTO>({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required(),
  jewelsAmount: Yup.number().default(0),
  products: Yup.object(),
  photo: Yup.string().required()
});

export namespace CreatePerson {
  export type BodyType = TypedRequest<typeof UserSchema>;
  export const schema = Yup.object().shape({ body: UserSchema });
};
