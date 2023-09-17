import { RedisClient } from '../../../shared/redis'
import {
  EVENT_ACADEMIC_FACULTY_CREATE,
  EVENT_ACADEMIC_FACULTY_DELETE,
  EVENT_ACADEMIC_FACULTY_UPDATE,
} from './academicFaculty.constant'
import { AcademicFacultyService } from './academicFaculty.services'

export const initAcademicFacultyEvents = () => {
  RedisClient.subscribe(
    EVENT_ACADEMIC_FACULTY_CREATE,
    async (catched: string) => {
      const data = JSON.parse(catched)
      await AcademicFacultyService.createFacultyEvent(data)
    }
  )

  RedisClient.subscribe(
    EVENT_ACADEMIC_FACULTY_UPDATE,
    async (catched: string) => {
      const data = JSON.parse(catched)
      await AcademicFacultyService.updateFacultyEvent(data)
    }
  )

  RedisClient.subscribe(
    EVENT_ACADEMIC_FACULTY_DELETE,
    async (catched: string) => {
      const data = JSON.parse(catched)
      await AcademicFacultyService.deleteFacultyEvent(data)
    }
  )
}
