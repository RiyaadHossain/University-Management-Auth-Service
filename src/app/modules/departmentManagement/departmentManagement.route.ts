import express from 'express'
import { DepartmentManagementController } from './departmentManagement.controller'
import { DepartmentManagementValidation } from './departmentManagement.validation'
import { validateRequest } from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
const router = express.Router()

router.post(
  '/create-department-management',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(
    DepartmentManagementValidation.createDepartmentManagementZodSchema
  ),
  DepartmentManagementController.createDeptManagement
)

router.get('/', DepartmentManagementController.getAllDeptManagements)

router.get('/:id', DepartmentManagementController.getDeptManagement)

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(
    DepartmentManagementValidation.updateDepartmentManagementZodSchema
  ),
  DepartmentManagementController.updateDeptManagement
)

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  DepartmentManagementController.deleteDeptManagement
)

export const DepartmentManagementRoute = router
