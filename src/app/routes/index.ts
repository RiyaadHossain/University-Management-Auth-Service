import express from 'express'
import { UserRoute } from '../modules/user/user.route'
import { StudentRoute } from '../modules/student/student.route'
import { FacultyRoute } from '../modules/faculty/faculty.route'
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route'
const router = express.Router()

const moduleRoutes = [
  { path: '/users', route: UserRoute },
  { path: '/students', route: StudentRoute },
  { path: '/faculties', route: FacultyRoute },
  { path: '/academic-semesters', route: AcademicSemesterRoute },
  { path: '/academic-faculty', route: AcademicFacultyRoute },
  { path: '/academic-department', route: AcademicDepartmentRoute },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export const applicationRoutes = router
