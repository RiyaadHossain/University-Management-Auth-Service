'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AcademicSemesterRoute = void 0
const express_1 = __importDefault(require('express'))
const validateRequest_1 = require('../../middlewares/validateRequest')
const academicSemester_validator_1 = require('./academicSemester.validator')
const academicSemester_controller_1 = require('./academicSemester.controller')
const router = express_1.default.Router()
router.post(
  '/create-academic-semester',
  (0, validateRequest_1.validateRequest)(
    academicSemester_validator_1.AcademicSemesterValidation
      .createAcademicSemesterZodSchema
  ),
  academicSemester_controller_1.AcademicSemesterController.createacSemester
)
router.get(
  '/',
  academicSemester_controller_1.AcademicSemesterController.getAllSemesters
)
router.get(
  '/:id',
  academicSemester_controller_1.AcademicSemesterController.getSemester
)
router.patch(
  '/:id',
  (0, validateRequest_1.validateRequest)(
    academicSemester_validator_1.AcademicSemesterValidation
      .updateAcademicSemesterZodSchema
  ),
  academicSemester_controller_1.AcademicSemesterController.updateSemeter
)
router.delete(
  '/:id',
  academicSemester_controller_1.AcademicSemesterController.deleteSemester
)
exports.AcademicSemesterRoute = router
