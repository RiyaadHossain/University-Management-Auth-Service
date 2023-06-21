import express from 'express'
import { AuthValidation } from './auth.validation'
import { validateRequest } from '../../middlewares/validateRequest'
import { AuthController } from './auth.controller'
const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.logIn
)

export const AuthRoute = router
