import express from 'express'
import { UserRoute } from '../modules/user/user.route'
import { StudentRoute } from '../modules/student/student.route'
import { FacultyRoute } from '../modules/faculty/faculty.route'
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route'
import { DepartmentManagementRoute } from '../modules/departmentManagement/departmentManagement.route'
import { AdminRoute } from '../modules/admin/admin.route'
import { AuthRoute } from '../modules/auth/auth.route'
const router = express.Router()

const moduleRoutes = [
  { path: '/auth', route: AuthRoute },
  { path: '/users', route: UserRoute },
  { path: '/students', route: StudentRoute },
  { path: '/faculties', route: FacultyRoute },
  { path: '/admins', route: AdminRoute },
  { path: '/academic-semesters', route: AcademicSemesterRoute },
  { path: '/academic-faculties', route: AcademicFacultyRoute },
  { path: '/academic-departments', route: AcademicDepartmentRoute },
  { path: '/department-managements', route: DepartmentManagementRoute },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export const applicationRoutes = router
