import express from 'express'
import { DepartmentManagementController } from './departmentManagement.controller'
import { DepartmentManagementValidation } from './departmentManagement.validation'
import { validateRequest } from '../../middlewares/validateRequest'
const router = express.Router()

router.post(
  '/create-department-management',
  validateRequest(
    DepartmentManagementValidation.createDepartmentManagementZodSchema
  ),
  DepartmentManagementController.createDeptManagement
)

router.get('/', DepartmentManagementController.getAllDeptManagements)

router.get('/:id', DepartmentManagementController.getDeptManagement)

router.patch(
  '/:id',
  validateRequest(
    DepartmentManagementValidation.updateDepartmentManagementZodSchema
  ),
  DepartmentManagementController.updateDeptManagement
)

router.delete('/:id', DepartmentManagementController.deleteDeptManagement)

export const DepartmentManagementRoute = router
