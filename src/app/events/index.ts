import { initAcademicFacultyEvents } from '../modules/academicFaculty/academicFaculty.event'
import { initAcademicSemesterEvents } from '../modules/academicSemester/academicSemester.event'
import { initAcademicDepartmentEvents } from '../modules/academicDepartment/academicDepartment.event'

export const subscribeToEvents = () => {
  initAcademicSemesterEvents()
  initAcademicFacultyEvents()
  initAcademicDepartmentEvents()
}
