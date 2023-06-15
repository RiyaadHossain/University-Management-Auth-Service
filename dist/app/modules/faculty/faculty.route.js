"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoute = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const faculty_validation_1 = require("./faculty.validation");
const router = express_1.default.Router();
router.get('/', faculty_controller_1.FacultyController.getAllFacultys);
router.get('/:id', faculty_controller_1.FacultyController.getFaculty);
router.patch('/:id', (0, validateRequest_1.validateRequest)(faculty_validation_1.FacultyValidaion.updateFacultyZodSchema), faculty_controller_1.FacultyController.updateFaculty);
router.delete('/:id', faculty_controller_1.FacultyController.deleteFaculty);
exports.FacultyRoute = router;
