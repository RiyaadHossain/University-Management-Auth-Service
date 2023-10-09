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
exports.AcadmicFacultyController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const academicFaculty_services_1 = require("./academicFaculty.services");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const pick_1 = require("../../../shared/pick");
const pagination_1 = require("../../../constants/pagination");
const academicFaculty_constant_1 = require("./academicFaculty.constant");
const createFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const facultyData = req.body;
    const result = yield academicFaculty_services_1.AcademicFacultyService.createFaculty(facultyData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Created Faculty data Successfully!',
        data: result,
    });
}));
const getAllFaculties = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
    const filterOptions = (0, pick_1.pick)(req.query, academicFaculty_constant_1.academicFacultyFilterableFields);
    const result = yield academicFaculty_services_1.AcademicFacultyService.getAllFaculties(paginationOptions, filterOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Faculty data retrived successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
const getFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicFaculty_services_1.AcademicFacultyService.getFaculty(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Faculty data retrived successfully!',
        data: result,
    });
}));
const updateFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const facultyData = req.body;
    const result = yield academicFaculty_services_1.AcademicFacultyService.updateFaculty(id, facultyData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Faculty data updated successfully!',
        data: result,
    });
}));
const deleteFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicFaculty_services_1.AcademicFacultyService.deleteFaculty(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Faculty data deleted successfully!',
        data: result,
    });
}));
exports.AcadmicFacultyController = {
    createFaculty,
    getAllFaculties,
    getFaculty,
    updateFaculty,
    deleteFaculty,
};
