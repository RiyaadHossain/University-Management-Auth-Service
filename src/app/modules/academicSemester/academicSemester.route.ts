import express from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validator'
import { AcademicSemesterController } from './academicSemester.controller'
const router = express.Router()

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createacSemester
)

router.get('/', AcademicSemesterController.getAllSemesters)

router.get('/:id', AcademicSemesterController.getSemester)

router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemeter
)

router.delete('/:id', AcademicSemesterController.deleteSemester)

export const AcademicSemesterRoute = router
