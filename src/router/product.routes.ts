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

// 5. Criação de produto
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

// 6. Atualização de produto
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

// 7. Lista todos os produtos - Filtrando os usuários com amount zero
router.get('/', auth, async (request, response) => {
  const amount = 0

  // Busca todos os produtos no serviço e verifica se nenhum produto foi encontrado
  const products = await service.find()
  if (!products)
    return response.status(404).send({ error: 'Products not found.' })

  // Filtra os produtos de acordo com a quantidade mínima desejada
  const productsFilter = products.filter(
    (products) =>
      products.amount > 0 && (amount === undefined || products.amount >= amount)
  )

  // Retorna os produtos filtrados com status 200
  response.status(200).send({ products: productsFilter })
})

// 8. Lista apenas um produtos, buscado pelo ID
router.get('/:id', auth, async (request, response) => {
  const { id } = request.params

  // Busca o produto pelo ID no serviço e verifica se o produto foi encontrado
  const product = await service.findId(id)
  if (!product)
    return response.status(400).send({ error: 'Products not found.' })

  // Retorna o produto encontrado com status 200
  response.status(200).send({ product })
})

export default router
