import express from 'express'
import { UserValidation } from './user.validaton'
import { UserController } from './user.controller'
import { validateRequest } from '../../middlewares/validateRequest'
const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
)

export const UserRoute = router
