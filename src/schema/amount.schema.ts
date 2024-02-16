import * as Yup from 'yup'
import { TypedRequest } from '../util/typedRequest'

const jewelsAmountSchema = Yup.object({
  jewelsAmount: Yup.number(),
})

export namespace CreatePerson {
  export type BodyType = TypedRequest<typeof jewelsAmountSchema>
  export const schema = Yup.object().shape({ params: jewelsAmountSchema })
}
