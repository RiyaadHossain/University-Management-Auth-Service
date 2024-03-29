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
exports.StudentController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const student_services_1 = require("./student.services");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const pick_1 = require("../../../shared/pick");
const pagination_1 = require("../../../constants/pagination");
const student_constant_1 = require("./student.constant");
const getAllStudents = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
    const filterOptions = (0, pick_1.pick)(req.query, student_constant_1.studentFilterableFields);
    const result = yield student_services_1.StudentService.getAllStudents(paginationOptions, filterOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Student data retrived successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
const getStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield student_services_1.StudentService.getStudent(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Student data retrived successfully!',
        data: result,
    });
}));
const updateStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const studentData = req.body;
    const result = yield student_services_1.StudentService.updateStudent(id, studentData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Student data updated successfully!',
        data: result,
    });
}));
const deleteStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield student_services_1.StudentService.deleteStudent(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Student data deleted successfully!',
        data: result,
    });
}));
exports.StudentController = {
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent,
};
