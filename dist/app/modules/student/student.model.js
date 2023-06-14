"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentSchema = void 0;
const mongoose_1 = require("mongoose");
const generalUserInfo_1 = require("../../../constants/generalUserInfo");
exports.studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        firstName: {
            type: String,
            required: true,
        },
        middleName: String,
        lastName: {
            type: String,
            required: true,
        },
    },
    gender: {
        type: String,
        enum: generalUserInfo_1.gender,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: generalUserInfo_1.bloodGroup,
        required: true,
    },
    guardian: {
        fatherName: {
            type: String,
            required: true,
        },
        fatherOccupation: {
            type: String,
            required: true,
        },
        fatherContactNo: {
            type: String,
            required: true,
        },
        motherName: {
            type: String,
            required: true,
        },
        motherOccupation: {
            type: String,
            required: true,
        },
        motherContactNo: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    localGuardian: {
        name: {
            type: String,
            required: true,
        },
        occupation: {
            type: String,
            required: true,
        },
        contactNo: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    academicSemester: {
        type: mongoose_1.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true,
    },
    academicDepartment: {
        type: mongoose_1.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
    },
    academicFaculty: {
        type: mongoose_1.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
    profileImg: { type: String /* required: true  */ },
});
const Student = (0, mongoose_1.model)('Student', exports.studentSchema);
exports.default = Student;
