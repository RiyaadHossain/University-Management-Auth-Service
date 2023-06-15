"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const academicDepartmentSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
}, { timestamps: true, toJSON: { virtuals: true } });
const AcademicDepartment = (0, mongoose_1.model)('AcademicDepartment', academicDepartmentSchema);
exports.default = AcademicDepartment;
