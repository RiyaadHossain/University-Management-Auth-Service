"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const student_route_1 = require("../modules/student/student.route");
const faculty_route_1 = require("../modules/faculty/faculty.route");
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const academicFaculty_route_1 = require("../modules/academicFaculty/academicFaculty.route");
const academicDepartment_route_1 = require("../modules/academicDepartment/academicDepartment.route");
const departmentManagement_route_1 = require("../modules/departmentManagement/departmentManagement.route");
const admin_route_1 = require("../modules/admin/admin.route");
const router = express_1.default.Router();
const moduleRoutes = [
    { path: '/users', route: user_route_1.UserRoute },
    { path: '/students', route: student_route_1.StudentRoute },
    { path: '/faculties', route: faculty_route_1.FacultyRoute },
    { path: '/admins', route: admin_route_1.AdminRoute },
    { path: '/academic-semesters', route: academicSemester_route_1.AcademicSemesterRoute },
    { path: '/academic-faculty', route: academicFaculty_route_1.AcademicFacultyRoute },
    { path: '/academic-department', route: academicDepartment_route_1.AcademicDepartmentRoute },
    { path: '/department-management', route: departmentManagement_route_1.DepartmentManagementRoute },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.applicationRoutes = router;
