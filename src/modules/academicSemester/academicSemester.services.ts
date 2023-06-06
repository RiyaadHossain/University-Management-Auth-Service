import APIError from '../../errors/APIErrors'
import { IAcademicSemester } from './academicSemester.interface'
import AcademicSemester from './academicSemester.model'

const createAcademicSemester = async (
  semesterData: IAcademicSemester
): Promise<IAcademicSemester> => {
  const createdSemeter = await AcademicSemester.create(semesterData)
  if (!createdSemeter) {
    throw new APIError(400, 'Failed to create user account')
  }

  return createdSemeter
}

export const AcademicSemesterService = {
  createAcademicSemester,
}
