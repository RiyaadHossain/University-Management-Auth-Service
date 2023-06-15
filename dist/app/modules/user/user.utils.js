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
exports.generateAdminId = exports.generateFacultyId = exports.generateStudentId = void 0;
const user_1 = require("../../../enums/user");
const user_model_1 = __importDefault(require("./user.model"));
// Generate Student Id
const lastStudent = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.default.findOne({ role: user_1.ENUM_USER_ROLE.STUDENT }, { id: 1, _id: 0 }).sort({
        createdAt: -1,
    });
    return (_a = user === null || user === void 0 ? void 0 : user.id) === null || _a === void 0 ? void 0 : _a.substring(4);
});
const generateStudentId = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const year = (_b = academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.year) === null || _b === void 0 ? void 0 : _b.substring(2);
    const code = academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.code;
    const lastUserId = (yield lastStudent()) || String(0).padStart(5, '0');
    let currentUserId = (parseInt(lastUserId) + 1).toString().padStart(5, '0');
    currentUserId = `${year}${code}${currentUserId}`;
    return currentUserId;
});
exports.generateStudentId = generateStudentId;
// Generate Faculty Id
const lastFaculty = () => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const user = yield user_model_1.default.findOne({ role: user_1.ENUM_USER_ROLE.FACULTY }, { id: 1, _id: 0 }).sort({
        createdAt: -1,
    });
    if (!user)
        return null;
    return (_c = user === null || user === void 0 ? void 0 : user.id) === null || _c === void 0 ? void 0 : _c.substring(2);
});
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUserId = (yield lastFaculty()) || String(0).padStart(5, '0');
    let currentUserId = (parseInt(lastUserId) + 1).toString().padStart(5, '0');
    currentUserId = `F-${currentUserId}`;
    return currentUserId;
});
exports.generateFacultyId = generateFacultyId;
// Generate Admin Id
const lastAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ role: user_1.ENUM_USER_ROLE.ADMIN }, { id: 1, _id: 0 }).sort({
        createdAt: -1,
    });
    if (!user)
        return null;
    return user.id.substring(2);
});
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUserId = (yield lastAdmin()) || String(0).padStart(5, '0');
    let currentUserId = (parseInt(lastUserId) + 1).toString().padStart(5, '0');
    currentUserId = `A-${currentUserId}`;
    return currentUserId;
});
exports.generateAdminId = generateAdminId;
