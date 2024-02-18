import { Router } from 'express'
import { UserService } from '../service/user.service'
import { UserRepository } from '../repository/user.repository'
import { AdminRepository } from '../repository/admin.repository'
import { AdminService } from '../service/admin.service'
import { ProductService } from '../service/product.service'
import { ProductRepository } from '../repository/product.repository'
import validateRouter from '../middleware/validateRouter'
import * as userSchema from '../schema/user.schema'
import * as photoSchema from '../schema/photo.schema'
import * as jewelsAmountSchema from '../schema/amount.schema'
import { auth } from '../middleware/auth'
import { isAdmin } from '../middleware/verifyPermission'
import { upload } from '../middleware/uploads'
import { Crypto } from '../provider/crypto'

const router = Router()

const userRepository = new UserRepository()
const userService = new UserService(userRepository)

const adminRepository = new AdminRepository()
const adminService = new AdminService(adminRepository)

const productRepository = new ProductRepository()
const productService = new ProductService(productRepository)

const crypto = new Crypto()

// 1. Criação de usuário
router.post(
  '/',
  validateRouter(userSchema.CreatePerson.schema),
  async (request, response) => {
    const { name, email, password, jewelsAmount, photo } = request.body

    // Verifica se o usuário já existe pelo e-mail
    const existingUser = await userService.userByEmail(email)
    if (existingUser)
      return response.status(409).send({
        message:
          'Conflict: User with the provided email already exists. Please choose a different email.',
      })

    // Criptografa a senha antes de salvar no banco de dados
    const passwordHashed = await crypto.cryptoPassword(password)

    // Cria um novo usuário
    const newUser = await userService.create(
      name,
      email,
      passwordHashed,
      jewelsAmount,
      photo
    )

    // Retorna o novo usuário criado
    response.status(201).send({ user: newUser })
  }
)

// 10. Resgata o produto
router.post('/productExchange', auth, async (request, response) => {
  const { idUser, idProduct } = request.body

  const user: any = await userService.userById(idUser)
  const product: any = await productService.findId(idProduct)

  // Verifica se o usuário e o produto foram encontrados
  if (!user || !product)
    return response.status(404).send({ erros: 'User or Products not found.' })

  // Verifica se o usuário tem saldo suficiente para resgatar o produto
  if (user.jewelsAmount < product.value) {
    response
      .status(404)
      .send({ error: 'Insufficient balance to redeem the product.' })
  } else {
    // Deduz o valor do produto do saldo do usuário e adiciona o produto à sua lista
    user.jewelsAmount -= product.value
    user.products.push(product)

    // Atualiza as informações do usuário na base de dados
    await userService.userIdAndUpdate(idUser, user)

    // Reduz a quantidade disponível do produto em estoque
    if (product.amount > 0) {
      product.amount--
    } else {
      // Se não houver estoque suficiente do produto, retorna um erro
      response
        .status(400)
        .send({ error: 'This product is not in stock at the moment' })
    }

    // Atualiza as informações do produto na base de dados
    await productService.productIdAndUpdate(idProduct, product)
  }

  // Responde com uma mensagem indicando o sucesso do resgate do produto
  response.status(200).send({ user, product })
})

// Não obrigatório. Envia a foto do usuário
router.patch(
  '/uploadPhoto/:id',
  validateRouter(photoSchema.CreatePerson.schema),
  auth,
  upload.single('userPhoto'),
  async (request, response) => {
    const { file } = request
    const { id } = request.params

    // Atualiza a foto do usuário com o ID especificado
    const photoToUpdate = await userService.userByIdAndUpdate(
      id,
      file as Express.Multer.File
    )

    // Verifica se a atualização da foto foi bem-sucedida
    if (!photoToUpdate)
      return response.status(404).send({ message: 'Error: User not found.' })

    // Recupera o usuário atualizado da base de dados e verifica se o usuário existe
    const existUser = await userService.userById(id)
    if (!existUser)
      return response.status(404).send({ message: 'Error: User not found.' })

    // Atualiza o campo 'updatedAt' do usuário com a data atual
    existUser.updateAt = new Date()

    // Atualiza as informações do usuário na base de dados
    const userUpdatedPhoto = await userService.userUpdated(existUser)

    // Responde com o usuário atualizado, incluindo a foto nova
    response.status(200).send({ userUpdate: userUpdatedPhoto })
  }
)

// 9. Enviar Joia para Usuário
router.patch(
  '/:id',
  validateRouter(jewelsAmountSchema.CreatePerson.schema),
  auth,
  isAdmin,
  async (request, response) => {
    const { id } = request.params
    const { jewelsAmount } = request.body

    // Atualiza a quantidade de joias do usuário com o ID especificado e verifica se a atualização da quantidade de joias foi bem-sucedida
    const jewelsToUpdated = await userService.userUpdatedJewels(
      id,
      jewelsAmount
    )
    if (!jewelsToUpdated)
      return response.status(404).send({ error: 'User not found.' })

    // Recupera o usuário da base de dados e verifica se o usuário existe
    const existUser = await userService.userById(id)
    if (!existUser)
      return response.status(404).send({ error: 'User not found.' })

    existUser.updateAt = new Date()

    // Atualiza as informações do usuário na base de dados
    const userUpdatedJewels = await userService.userUpdated(existUser)

    // Responde com o usuário atualizado, incluindo a quantidade de joias atualizada
    response.status(200).send({ userUpdate: userUpdatedJewels })
  }
)

// 4. Mostrar usuário logado
router.get('/', auth, async (request, response) => {
  const id = request.body.userId.sub

  // Verifica se o ID pertence a um usuário
  const user = await userService.userById(id)
  if (id === user?._id.toString()) {
    user!.password = '' // Remova a senha antes de enviar o usuário
    return response.status(200).send({ user })
  }

  // Se nenhum usuário ou administrador for encontrado
  const admin = await adminService.adminById(id)
  if (id === admin?._id.toString()) {
    admin!.password = '' // Remova a senha antes de enviar o administrador
    return response.status(200).send({ admin })
  }

  // Se nenhum usuário ou administrador for encontrado
  response.status(404).send({ message: 'Error: User not found.' })
})

export default router
