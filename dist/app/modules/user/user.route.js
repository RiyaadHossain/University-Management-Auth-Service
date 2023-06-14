'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.UserRoute = void 0
const express_1 = __importDefault(require('express'))
const user_validaton_1 = require('./user.validaton')
const user_controller_1 = require('./user.controller')
const validateRequest_1 = require('../../middlewares/validateRequest')
const router = express_1.default.Router()
router.post(
  '/create-student',
  (0, validateRequest_1.validateRequest)(
    user_validaton_1.UserValidation.createStudentZodSchema
  ),
  user_controller_1.UserController.createStudent
)
router.post(
  '/create-faculty',
  (0, validateRequest_1.validateRequest)(
    user_validaton_1.UserValidation.createFacultyZodSchema
  ),
  user_controller_1.UserController.createFaculty
)
exports.UserRoute = router
