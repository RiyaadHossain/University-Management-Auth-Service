import httpStatus from 'http-status-codes'
import APIError from '../../errors/APIErrors'
import { academicSemesterTitleCodeMap } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import AcademicSemester from './academicSemester.model'

const createAcademicSemester = async (
  semesterData: IAcademicSemester
): Promise<IAcademicSemester> => {
  // Semester code validation
  if (academicSemesterTitleCodeMap[semesterData.title] !== semesterData.code) {
    throw new APIError(httpStatus.BAD_REQUEST, 'Invalid Semester code!')
  }

  const createdSemeter = await AcademicSemester.create(semesterData)
  if (!createdSemeter) {
    throw new APIError(400, 'Failed to create user account')
  }

  return createdSemeter
}

export const AcademicSemesterService = {
  createAcademicSemester,
}
