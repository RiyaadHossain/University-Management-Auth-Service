"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const generalUserInfo_1 = require("../../../constants/generalUserInfo");
const faculty_constant_1 = require("./faculty.constant");
const facultySchema = new mongoose_1.Schema({
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
        middleName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    gender: {
        type: String,
        enum: generalUserInfo_1.gender,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNo: {
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
    designation: {
        type: String,
        enum: faculty_constant_1.facultyDesignation,
        required: true,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
});
const Faculty = (0, mongoose_1.model)('Faculty', facultySchema);
exports.default = Faculty;
