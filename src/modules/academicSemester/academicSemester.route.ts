import express from 'express'
import { validateRequest } from '../../app/middlewares/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validator'
import { AcademicSemesterController } from './academicSemester.controller'
const router = express.Router()

router.get('/', AcademicSemesterController.getAllSemesters)

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createacAdemicSemester
)

export const AcademicSemesterRoute = router
