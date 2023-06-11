import { IAcademicFaculty } from './academicFaculty.interface'
import AcademicFaculty from './academicFaculty.model'

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const data = await AcademicFaculty.create(payload)
  console.log(data)
  return data
}

export const academicFacultyService = { createFaculty }
