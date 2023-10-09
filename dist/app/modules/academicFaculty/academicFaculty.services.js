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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyService = void 0;
const paginationHelper_1 = require("../../../helper/paginationHelper");
const academicFaculty_model_1 = __importDefault(require("./academicFaculty.model"));
const academicFaculty_constant_1 = require("./academicFaculty.constant");
const createFaculty = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield academicFaculty_model_1.default.create(payload);
    return data;
});
const getAllFaculties = (paginationOptions, filtersOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Pagination Options
    const { skip, page, limit, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(paginationOptions);
    // Sort condition
    const sortCondition = {};
    sortCondition[sortBy] = sortOrder;
    // Filter Options
    const { searchTerm } = filtersOptions, filtersData = __rest(filtersOptions, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: academicFaculty_constant_1.academicFacultySearchableFields.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereCondition = Object.keys(andConditions).length
        ? { $and: andConditions }
        : {};
    const facultiesData = yield academicFaculty_model_1.default.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const totalDoc = yield academicFaculty_model_1.default.countDocuments();
    return {
        meta: {
            page,
            limit,
            totalDoc,
        },
        data: facultiesData,
    };
});
const getFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield academicFaculty_model_1.default.findById(id);
    return data;
});
const updateFaculty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield academicFaculty_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return data;
});
const deleteFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield academicFaculty_model_1.default.findByIdAndDelete(id);
    return data;
});
exports.AcademicFacultyService = {
    createFaculty,
    getAllFaculties,
    getFaculty,
    updateFaculty,
    deleteFaculty,
};
