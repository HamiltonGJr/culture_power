import * as Yup from 'yup'

export interface TypedRequest<
  Body extends Yup.ISchema<any, any, any, any> = any,
  Params extends Yup.ISchema<any, any, any, any> = any,
  Query extends Yup.ISchema<any, any, any, any> = any,
> {
  body: Yup.InferType<Body>
  params: Yup.InferType<Params>
  query: Yup.InferType<Query>
}
