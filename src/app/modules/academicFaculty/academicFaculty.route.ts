import express from 'express'
import { AcadmicFacultyController } from './academicFaculty.controller'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import { validateRequest } from '../../middlewares/validateRequest'
const router = express.Router()

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcadmicFacultyController.createFaculty
)

router.get('/', AcadmicFacultyController.getAllFaculties)

router.get('/:id', AcadmicFacultyController.getFaculty)

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcadmicFacultyController.updateFaculty
)

router.delete('/:id', AcadmicFacultyController.deleteFaculty)

export const AcademicFacultyRoute = router
