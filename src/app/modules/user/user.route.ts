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

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculty
)

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
)

export const UserRoute = router
