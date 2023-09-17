import express from 'express'
import { AcademicDepartmentController } from './academicDepartment.controller'
import { AcademicDepartmentValidation } from './academicDepartment.validation'
import { validateRequest } from '../../middlewares/validateRequest'
const router = express.Router()

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createDepartment
)

router.get('/', AcademicDepartmentController.getAllDepartments)

router.get('/:id', AcademicDepartmentController.getDepartment)

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateDepartment
)

router.delete('/:id', AcademicDepartmentController.deleteDepartment)

export const AcademicDepartmentRoute = router
