import * as Yup from 'yup'
import { TypedRequest } from '../util/typedRequest'

const PhotoSchema = Yup.object({
  id: Yup.string().required(),
})

export namespace CreatePerson {
  export type BodyType = TypedRequest<typeof PhotoSchema>
  export const schema = Yup.object().shape({ params: PhotoSchema })
}
