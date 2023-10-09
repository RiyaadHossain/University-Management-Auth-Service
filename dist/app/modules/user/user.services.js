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
exports.UserService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
const APIErrors_1 = __importDefault(require("../../../errors/APIErrors"));
const academicSemester_model_1 = __importDefault(require("../academicSemester/academicSemester.model"));
const student_model_1 = __importDefault(require("../student/student.model"));
const user_model_1 = __importDefault(require("./user.model"));
const user_utils_1 = require("./user.utils");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const faculty_model_1 = __importDefault(require("../faculty/faculty.model"));
const user_1 = require("../../../enums/user");
const admin_model_1 = __importDefault(require("../admin/admin.model"));
const createStudent = (student, user) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = yield academicSemester_model_1.default.findById(student.academicSemester);
    let userAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Generate ID
        const id = yield (0, user_utils_1.generateStudentId)(academicSemester);
        student.id = id;
        user.id = id;
        // Create Student Doc
        const newStudent = yield student_model_1.default.create([student], { session });
        if (!newStudent.length)
            throw new APIErrors_1.default(http_status_codes_1.default.BAD_REQUEST, 'Failed to create Stduent Account');
        // Set User default data (role, student, password)
        user.role = user_1.ENUM_USER_ROLE.STUDENT;
        user.student = newStudent[0]._id;
        if (!user.password) {
            user.password = config_1.default.UNIVERSITY_STUDENT_PASS;
        }
        // Create User
        const newUser = yield user_model_1.default.create([user], { session });
        userAllData = newUser[0];
        if (!newUser.length) {
            throw new APIErrors_1.default(http_status_codes_1.default.BAD_REQUEST, 'Failed to create Stduent Account');
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (userAllData) {
        userAllData = yield user_model_1.default.findById(userAllData._id).populate({
            path: 'student',
            populate: [
                { path: 'academicSemester' },
                { path: 'academicDepartment' },
                { path: 'academicFaculty' },
            ],
        });
    }
    return userAllData;
});
const createFaculty = (faculty, user) => __awaiter(void 0, void 0, void 0, function* () {
    let userAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Generate Faculty ID
        const id = yield (0, user_utils_1.generateFacultyId)();
        faculty.id = id;
        user.id = id;
        // Create Faculty Doc
        const newFaculty = yield faculty_model_1.default.create([faculty], { session });
        if (!newFaculty.length)
            throw new APIErrors_1.default(http_status_codes_1.default.BAD_REQUEST, 'Failed to create Faculty account!');
        // Set User default data (role, student, password)
        user.role = user_1.ENUM_USER_ROLE.FACULTY;
        user.faculty = newFaculty[0]._id;
        if (!user.password)
            user.password = config_1.default.UNIVERSITY_FACULTY_PASS;
        // Create User Doc
        const newUser = yield user_model_1.default.create([user], { session });
        userAllData = newUser[0];
        if (!newUser.length)
            throw new APIErrors_1.default(http_status_codes_1.default.BAD_REQUEST, 'Failed to create Faculty account!');
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (userAllData)
        userAllData = yield user_model_1.default.findById(userAllData._id).populate({
            path: 'faculty',
            populate: [{ path: 'academicFaculty' }, { path: 'academicDepartment' }],
        });
    return userAllData;
});
const createAdmin = (admin, user) => __awaiter(void 0, void 0, void 0, function* () {
    let userAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Generate Admin ID
        const id = yield (0, user_utils_1.generateAdminId)();
        admin.id = id;
        user.id = id;
        // Create Admin Doc
        const newAdmin = yield admin_model_1.default.create([admin], { session });
        if (!newAdmin.length)
            throw new APIErrors_1.default(http_status_codes_1.default.BAD_REQUEST, 'Failed to create Admin account!');
        // Set User default data (role, student, password)
        user.role = user_1.ENUM_USER_ROLE.ADMIN;
        user.admin = newAdmin[0]._id;
        if (!user.password)
            user.password = config_1.default.UNIVERSITY_ADMIN_PASS;
        // Create User Doc
        const newUser = yield user_model_1.default.create([user], { session });
        userAllData = newUser[0];
        if (!newUser.length)
            throw new APIErrors_1.default(http_status_codes_1.default.BAD_REQUEST, 'Failed to create Admin account!');
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (userAllData)
        userAllData = yield user_model_1.default.findById(userAllData._id).populate({
            path: 'admin',
            populate: [{ path: 'managementDepartment' }],
        });
    return userAllData;
});
exports.UserService = {
    createStudent,
    createFaculty,
    createAdmin,
};
