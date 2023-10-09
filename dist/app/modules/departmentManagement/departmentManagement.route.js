"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentManagementRoute = void 0;
const express_1 = __importDefault(require("express"));
const departmentManagement_controller_1 = require("./departmentManagement.controller");
const departmentManagement_validation_1 = require("./departmentManagement.validation");
const validateRequest_1 = require("../../middlewares/validateRequest");
const router = express_1.default.Router();
router.post('/create-department-management', (0, validateRequest_1.validateRequest)(departmentManagement_validation_1.DepartmentManagementValidation.createDepartmentManagementZodSchema), departmentManagement_controller_1.DepartmentManagementController.createDeptManagement);
router.get('/', departmentManagement_controller_1.DepartmentManagementController.getAllDeptManagements);
router.get('/:id', departmentManagement_controller_1.DepartmentManagementController.getDeptManagement);
router.patch('/:id', (0, validateRequest_1.validateRequest)(departmentManagement_validation_1.DepartmentManagementValidation.updateDepartmentManagementZodSchema), departmentManagement_controller_1.DepartmentManagementController.updateDeptManagement);
router.delete('/:id', departmentManagement_controller_1.DepartmentManagementController.deleteDeptManagement);
exports.DepartmentManagementRoute = router;
