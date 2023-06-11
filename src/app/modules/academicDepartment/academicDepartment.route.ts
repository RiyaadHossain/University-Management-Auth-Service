import express from 'express'
import { AcadmicDepartmentController } from './academicDepartment.controller'
import { AcademicDepartmentValidation } from './academicDepartment.validation'
import { validateRequest } from '../../middlewares/validateRequest'
const router = express.Router()

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcadmicDepartmentController.createDepartment
)

router.get('/', AcadmicDepartmentController.getAllFaculties)

router.get('/:id', AcadmicDepartmentController.getDepartment)

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcadmicDepartmentController.updateDepartment
)

router.delete('/:id', AcadmicDepartmentController.deleteDepartment)

export const AcademicDepartmentRoute = router
