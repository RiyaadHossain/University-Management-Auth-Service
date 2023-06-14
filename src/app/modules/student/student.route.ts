import express from 'express'
import { StudentController } from './student.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { StudentValidaion } from './student.validation'
const router = express.Router()

router.get('/', StudentController.getAllStudents)

router.get('/:id', StudentController.getStudent)

router.patch(
  '/:id',
  validateRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudent
)

router.delete('/:id', StudentController.deleteStudent)

export const StudentRoute = router
