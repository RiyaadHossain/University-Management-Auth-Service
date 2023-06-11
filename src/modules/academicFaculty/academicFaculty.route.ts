import express from 'express'
import { AcadmicFacultyController } from './academicFaculty.controller'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import { validateRequest } from '../../app/middlewares/validateRequest'
const router = express.Router()

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcadmicFacultyController.createFaculty
)

export const AcademicFacultyRoute = router
