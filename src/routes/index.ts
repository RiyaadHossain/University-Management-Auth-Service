import express from 'express'
import { UserRoute } from '../modules/user/user.route'
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route'
const router = express.Router()

const moduleRoutes = [
  { path: '/users', route: UserRoute },
  { path: '/academic-semesters', route: AcademicSemesterRoute },
  { path: '/academic-faculty', route: AcademicFacultyRoute },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export const applicationRoutes = router
