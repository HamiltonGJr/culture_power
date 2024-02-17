import { Router } from 'express'
import { ProductRepository } from '../repository/product.repository'
import { ProductService } from '../service/product.service'
import validateRouter from '../middleware/validateRouter'
import * as productSchema from '../schema/product.schema'
import { auth } from '../middleware/auth'
import { isAdmin } from '../middleware/verifyPermission'

const router = Router()

const repository = new ProductRepository()
const service = new ProductService(repository)

router.post(
  '/',
  validateRouter(productSchema.CreatePerson.schema),
  auth,
  isAdmin,
  async (request, response) => {
    const { name, value, amount, description, photo } = request.body

    // Criação do produto
    const newProduct = await service.create(
      name,
      value,
      amount,
      description,
      photo
    )

    // Verifica se a criação foi bem-sucedida
    if (!newProduct)
      return response.status(400).send({ error: 'Product creation failed.' })

    response.status(201).send({ product: newProduct })
  }
)

router.put(
  '/:id',
  validateRouter(productSchema.CreatePerson.schema),
  auth,
  isAdmin,
  async (request, response) => {
    const { name, value, amount, description, photo } = request.body
    const { id } = request.params

    // Aqui você atualiza o produto
    const productUpdate = await service.update(
      id,
      name,
      value,
      amount,
      description,
      photo
    )

    // Aqui você verifica algum erro na atualização ou na identificação do produto
    const existProduct = await service.userById(id)
    if (!productUpdate || !existProduct)
      return response.status(404).send({ error: 'Products not found.' })

    existProduct.updateAt = new Date()

    // Aqui você pode retornar o produto atualizado, se necessário
    const productUpdated = await service.productUpdated(existProduct)

    response.status(200).send({ product: productUpdated })
  }
)

router.get('/', auth, async (request, response) => {
  const amount = 0

  const products = await service.find()
  if (!products)
    return response.status(404).send({ error: 'Products not found.' })

  const productsFilter = products.filter(
    (products) =>
      products.amount > 0 && (amount === undefined || products.amount >= amount)
  )

  response.status(200).send({ products: productsFilter })
})

router.get('/:id', auth, async (request, response) => {
  const { id } = request.params

  const product = await service.findId(id)
  if (!product)
    return response.status(404).send({ error: 'Products not found.' })

  response.status(200).send({ product })
})

export default router
