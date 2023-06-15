"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const academicDepartment_services_1 = require("./academicDepartment.services");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const pick_1 = require("../../../shared/pick");
const pagination_1 = require("../../../constants/pagination");
const academicDepartment_constant_1 = require("./academicDepartment.constant");
const createDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departmentData = req.body;
    const result = yield academicDepartment_services_1.AcademicDepartmentService.createDepartment(departmentData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Created Department data Successfully!',
        data: result,
    });
}));
const getAllDepartments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
    const filterOptions = (0, pick_1.pick)(req.query, academicDepartment_constant_1.academicDepartmentFilterableFields);
    const result = yield academicDepartment_services_1.AcademicDepartmentService.getAllDepartments(paginationOptions, filterOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Department data retrived successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
const getDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicDepartment_services_1.AcademicDepartmentService.getDepartment(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Department data retrived successfully!',
        data: result,
    });
}));
const updateDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const departmentData = req.body;
    const result = yield academicDepartment_services_1.AcademicDepartmentService.updateDepartment(id, departmentData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Department data updated successfully!',
        data: result,
    });
}));
const deleteDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicDepartment_services_1.AcademicDepartmentService.deleteDepartment(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Department data deleted successfully!',
        data: result,
    });
}));
exports.AcademicDepartmentController = {
    createDepartment,
    getAllDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment,
};
