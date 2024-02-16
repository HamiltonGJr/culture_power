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

router.post(
  '/',
  validateRouter(userSchema.CreatePerson.schema),
  auth,
  isAdmin,
  async (request, response) => {
    const { name, email, password, jewelsAmount, photo } = request.body

    const existUser = await userService.userByEmail(email)
    if (existUser)
      return response.status(409).send({
        message:
          'Conflict: User with the provided email already exists. Please choose a different email.',
      })

    const passwordHashed = await crypto.cryptoPassword(password)

    const newUser = await userService.create(
      name,
      email,
      passwordHashed,
      jewelsAmount,
      photo
    )

    response.status(201).send({ user: newUser })
  }
)

router.post('/productExchange', auth, async (request, response) => {
  const { idUser, idProduct } = request.body

  const user: any = await userService.userById(idUser)
  const product: any = await productService.findId(idProduct)

  if (!user || !product)
    return response.status(404).send({ erros: 'User or Products not found.' })

  if (user.jewelsAmount < product.value) {
    response
      .status(404)
      .send({ error: 'Insufficient balance to redeem the product.' })
  } else {
    user.jewelsAmount -= product.value
    user.products.push(product)

    await userService.userIdAndUpdate(idUser, user)

    if (product.amount > 0) {
      product.amount--
    } else {
      response
        .status(400)
        .send({ error: 'Não há este produto em estoque no momento' })
    }

    await productService.productIdAndUpdate(idProduct, product)
  }

  response.status(200).send({ message: 'O produto foi resgatado com sucesso!' })
})

router.patch(
  '/uploadPhoto/:id',
  validateRouter(photoSchema.CreatePerson.schema),
  auth,
  upload.single('userPhoto'),
  async (request, response) => {
    const { file } = request
    const { id } = request.params

    const photoToUpdate = await userService.userByIdAndUpdate(
      id,
      file as Express.Multer.File
    )
    if (!photoToUpdate)
      return response.status(404).send({ message: 'Error: User not found.' })

    const existUser = await userService.userById(id)
    if (!existUser)
      return response.status(404).send({ message: 'Error: User not found.' })

    existUser.updateAt = new Date()

    const userUpdatedPhoto = await userService.userUpdated(existUser)

    response.status(200).send({ userUpdate: userUpdatedPhoto })
  }
)

router.patch(
  '/:id',
  validateRouter(jewelsAmountSchema.CreatePerson.schema),
  auth,
  isAdmin,
  async (request, response) => {
    const { id } = request.params
    const { jewelsAmount } = request.body

    const jewelsToUpdated = await userService.userUpdatedJewels(
      id,
      jewelsAmount
    )
    if (!jewelsToUpdated)
      return response.status(404).send({ error: 'User not found.' })

    const existUser = await userService.userById(id)
    if (!existUser)
      return response.status(404).send({ error: 'User not found.' })

    existUser.updateAt = new Date()

    const userUpdatedJewels = await userService.userUpdated(existUser)

    response.status(200).send({ userUpdate: userUpdatedJewels })
  }
)

router.get('/', auth, async (request, response) => {
  const id = request.body.userId.sub

  const userId = await userService.userById(id)
  if (id === userId?._id.toString()) {
    userId!.password = ''
    response.status(201).send({ user: userId })
    return
  }

  const adminId = await adminService.adminById(id)
  if (id === adminId?._id.toString()) {
    adminId!.password = ''
    response.status(201).send({ admin: adminId })
    return
  }

  response.status(404).send({ message: 'Error: User not found.' })
})

export default router
