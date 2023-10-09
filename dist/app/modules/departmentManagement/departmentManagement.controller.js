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
exports.DepartmentManagementController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const departmentManagement_services_1 = require("./departmentManagement.services");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const pick_1 = require("../../../shared/pick");
const pagination_1 = require("../../../constants/pagination");
const departmentManagement_constant_1 = require("./departmentManagement.constant");
const createDeptManagement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departmentData = req.body;
    const result = yield departmentManagement_services_1.DepartmentManagementService.createDeptManagement(departmentData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Created Department data Successfully!',
        data: result,
    });
}));
const getAllDeptManagements = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
    const filterOptions = (0, pick_1.pick)(req.query, departmentManagement_constant_1.departmentManagementFilterableFields);
    const result = yield departmentManagement_services_1.DepartmentManagementService.getAllDeptManagements(paginationOptions, filterOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Department data retrived successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
const getDeptManagement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield departmentManagement_services_1.DepartmentManagementService.getDeptManagement(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Department data retrived successfully!',
        data: result,
    });
}));
const updateDeptManagement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const departmentData = req.body;
    const result = yield departmentManagement_services_1.DepartmentManagementService.updateDeptManagement(id, departmentData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Department data updated successfully!',
        data: result,
    });
}));
const deleteDeptManagement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield departmentManagement_services_1.DepartmentManagementService.deleteDeptManagement(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Department data deleted successfully!',
        data: result,
    });
}));
exports.DepartmentManagementController = {
    createDeptManagement,
    getAllDeptManagements,
    getDeptManagement,
    updateDeptManagement,
    deleteDeptManagement,
};
