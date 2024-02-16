import * as Yup from 'yup'
import { IUserDTO } from '../entities/IUser'
import { TypedRequest } from '../util/typedRequest'

const UserSchema = Yup.object<IUserDTO>({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8),
  jewelsAmount: Yup.number().default(0),
  products: Yup.string(),
  photo: Yup.string().default('_photo_'),
})

export namespace CreatePerson {
  export type BodyType = TypedRequest<typeof UserSchema>
  export const schema = Yup.object().shape({ body: UserSchema })
}
