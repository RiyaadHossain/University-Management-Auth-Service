"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentManagementValidation = void 0;
const zod_1 = require("zod");
const createDepartmentManagementZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
    }),
});
const updateDepartmentManagementZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
    }),
});
exports.DepartmentManagementValidation = {
    createDepartmentManagementZodSchema,
    updateDepartmentManagementZodSchema,
};
