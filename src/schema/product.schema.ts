import * as Yup from 'yup';
import { IProductDTO } from '../entitie/IProduct';
import { TypedRequest } from '../util/typedRequest';

const productSchema = Yup.object<IProductDTO>({
  name: Yup.string().required(),
  value: Yup.number().required(),
  amount: Yup.number().required(),
  description: Yup.string().required(),
  photo: Yup.string().default('_photo_')
});

export namespace CreatePerson {
  export type BodyType = TypedRequest<typeof productSchema>;
  export const schema = Yup.object().shape({ body: productSchema });
};
