"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const departmentManagementSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
}, { timestamps: true, toJSON: { virtuals: true } });
const DepartmentManagement = (0, mongoose_1.model)('DepartmentManagement', departmentManagementSchema);
exports.default = DepartmentManagement;
