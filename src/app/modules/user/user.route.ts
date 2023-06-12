import express from 'express'
import { UserValidation } from './user.validaton'
import { UserController } from './user.controller'
import { validateRequest } from '../../middlewares/validateRequest'
const router = express.Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent
)

export const UserRoute = router
