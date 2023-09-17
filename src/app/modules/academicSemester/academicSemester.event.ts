import { RedisClient } from '../../../shared/redis'
import { EVENT_ACADEMIC_SEMESTER_CREATE, EVENT_ACADEMIC_SEMESTER_DELETE, EVENT_ACADEMIC_SEMESTER_UPDATE } from './academicSemester.constant'
import { AcademicSemesterService } from './academicSemester.services'

export const initAcademicSemesterEvents = () => {
  // Create Academic Semester
  RedisClient.subscribe(
    EVENT_ACADEMIC_SEMESTER_CREATE,
    async (catched: string) => {
      const data = JSON.parse(catched)
      await AcademicSemesterService.createSemesterEvent(data)
    }
  )

  // Update Academic Semester
  RedisClient.subscribe(
    EVENT_ACADEMIC_SEMESTER_UPDATE,
    async (catched: string) => {
      const data = JSON.parse(catched)
      await AcademicSemesterService.updateSemesterEvent(data)
    }
  )

  // Delete Academic Semester
  RedisClient.subscribe(
    EVENT_ACADEMIC_SEMESTER_DELETE,
    async (catched: string) => {
      const data = JSON.parse(catched)
      await AcademicSemesterService.deleteSemesterEvent(data)
    }
  )
}
