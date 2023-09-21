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
exports.StudentService = void 0;
const paginationHelper_1 = require("../../../helper/paginationHelper");
const student_model_1 = __importDefault(require("./student.model"));
const student_constant_1 = require("./student.constant");
const user_model_1 = __importDefault(require("../user/user.model"));
const getAllStudents = (paginationOptions, filtersOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
            $or: student_constant_1.studentSearchableFields.map(field => ({
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
    const facultiesData = yield student_model_1.default.find(whereCondition)
        .populate('academicSemester academicDepartment academicFaculty')
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)
        .exec();
    const totalDoc = yield student_model_1.default.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            totalDoc,
        },
        data: facultiesData,
    };
});
const getStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield student_model_1.default.findById(id)
        .populate('academicSemester academicDepartment academicFaculty')
        .exec();
    return data;
});
const updateStudent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, guardian, localGuardian } = payload, studentData = __rest(payload
        /*  Handle Embeded Fields Dynamically: */
        // 1. name
        , ["name", "guardian", "localGuardian"]);
    /*  Handle Embeded Fields Dynamically: */
    // 1. name
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            studentData[nameKey] = name[key];
        });
    }
    // 2. guardian
    if (guardian && Object.keys(guardian).length > 0) {
        Object.keys(guardian).forEach(key => {
            const guardianKey = `guardian.${key}`;
            studentData[guardianKey] =
                guardian[key];
        });
    }
    // 3. localGuardian
    if (localGuardian && Object.keys(localGuardian).length > 0) {
        Object.keys(localGuardian).forEach(key => {
            const localGuardianKey = `localGuardian.${key}`;
            studentData[localGuardianKey] =
                localGuardian[key];
        });
    }
    const data = yield student_model_1.default.findOneAndUpdate({ id }, studentData, {
        new: true,
    })
        .populate('academicSemester academicDepartment academicFaculty')
        .exec();
    return data;
});
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield student_model_1.default.findOneAndDelete({ id });
    yield user_model_1.default.findOneAndDelete({ id });
    return data;
});
// const deleteStudent = async (id: string): Promise<IStudent | null> => {
//   let deletedStudent = null
//   const session = await mongoose.startSession()
//   try {
//     session.startTransaction()
//     // Delete User Doc
//     const deletedUser = await User.findOneAndDelete({id}, { session })
//     if (!deletedUser) {
//       throw new Error(`Failed to delete user account`)
//     }
//     // Delete Student Doc
//     const deletedData = await Student.findOneAndDelete({id}, {
//       session,
//     }).populate('academicSemester academicDepartment academicFaculty')
//     deletedStudent = deletedData
//     if (!deletedData) {
//       throw new Error(`Failed to delete student account`)
//     }
//     await session.commitTransaction()
//     await session.endSession()
//   } catch (error) {
//     await session.abortTransaction()
//     await session.endSession()
//     throw error
//   }
//   return deletedStudent
// }
exports.StudentService = {
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent,
};
