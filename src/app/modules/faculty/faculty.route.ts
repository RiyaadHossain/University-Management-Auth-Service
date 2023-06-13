import express from 'express'
import { FacultyController } from './faculty.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { FacultyValidaion } from './faculty.validation'
const router = express.Router()

router.get('/', FacultyController.getAllFacultys)

router.get('/:id', FacultyController.getFaculty)

router.patch(
  '/:id',
  validateRequest(FacultyValidaion.updateFacultyZodSchema),
  FacultyController.updateFaculty
)

router.delete('/:id', FacultyController.deleteFaculty)

export const FacultyRoute = router
