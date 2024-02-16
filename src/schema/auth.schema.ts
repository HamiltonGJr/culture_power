import * as Yup from 'yup'
import { TypedRequest } from '../util/typedRequest'

export const AuthSchema = Yup.object({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8),
})

export namespace CreatePerson {
  export type BodyType = TypedRequest<typeof AuthSchema>
  export const schema = Yup.object().shape({ body: AuthSchema })
}
