import { RedisClient } from '../../../shared/redis'
import {
  EVENT_ACADEMIC_DEPARTMENT_CREATE,
  EVENT_ACADEMIC_DEPARTMENT_DELETE,
  EVENT_ACADEMIC_DEPARTMENT_UPDATE,
} from './academicDepartment.constant'
import { AcademicDepartmentService } from './academicDepartment.services'

export const initAcademicDepartmentEvents = () => {
  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_CREATE,
    async (catched: string) => {
      const data = JSON.parse(catched)

      await AcademicDepartmentService.createDepartmentEvent(data)
    }
  )

  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_UPDATE,
    async (catched: string) => {
      const data = JSON.parse(catched)
      await AcademicDepartmentService.updateDepartmentEvent(data)
    }
  )

  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_DELETE,
    async (catched: string) => {
      const data = JSON.parse(catched)
      await AcademicDepartmentService.deleteDepartmentEvent(data)
    }
  )
}
