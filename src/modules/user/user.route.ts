import express from 'express'
import { UserValidation } from './user.validaton'
import { UserController } from './user.controller'
import { validateRequest } from '../../app/middlewares/validateRequest'
const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodValidation),
  UserController.createUser
)

export const UserRoute = router
