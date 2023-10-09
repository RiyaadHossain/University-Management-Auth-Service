import express from 'express'
import { UserValidation } from './user.validaton'
import { UserController } from './user.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
const router = express.Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createStudent
)

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createFaculty
)

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createAdmin
)

export const UserRoute = router
