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
exports.AcademicSemesterController = void 0;
const pick_1 = require("../../../shared/pick");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../../constants/pagination");
const academicSemester_services_1 = require("./academicSemester.services");
const academicSemester_constant_1 = require("./academicSemester.constant");
const createacSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterData = req.body;
    const result = yield academicSemester_services_1.AcademicSemesterService.createSemester(semesterData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Academic Semester created successfully!',
        data: result,
    });
}));
const getAllSemesters = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
    const filterOptions = (0, pick_1.pick)(req.query, academicSemester_constant_1.academicSemesterFilterableFields);
    const result = yield academicSemester_services_1.AcademicSemesterService.getAllSemesters(paginationOptions, filterOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Semesters Data retrived successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
const getSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicSemester_services_1.AcademicSemesterService.getSemester(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Semester Data retrived successfully!',
        data: result,
    });
}));
const updateSemeter = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedSemesterData = req.body;
    const result = yield academicSemester_services_1.AcademicSemesterService.updateSemester(id, updatedSemesterData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Academic Semester updated successfully!',
        data: result,
    });
}));
const deleteSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicSemester_services_1.AcademicSemesterService.deleteSemester(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Semester Data deleted successfully!',
        data: result,
    });
}));
exports.AcademicSemesterController = {
    createacSemester,
    getAllSemesters,
    getSemester,
    updateSemeter,
    deleteSemester,
};
