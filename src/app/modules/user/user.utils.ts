import { ENUM_USER_ROLE } from '../../../enums/user'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import User from './user.model'

// Generate Student Id
const lastStudent = async (): Promise<string | null> => {
  const user = await User.findOne(
    { role: ENUM_USER_ROLE.STUDENT },
    { id: 1, _id: 0 }
  ).sort({
    createdAt: -1,
  })
  if (!user) return null
  return user?.id?.substring(4)
}

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
) => {
  const year = academicSemester?.year?.substring(2)
  const code = academicSemester?.code

  const lastUserId = (await lastStudent()) || String(0).padStart(5, '0')
  let currentUserId = (parseInt(lastUserId) + 1).toString().padStart(5, '0')
  currentUserId = `${year}${code}${currentUserId}`

  return currentUserId
}

// Generate Faculty Id
const lastFaculty = async (): Promise<string | null> => {
  const user = await User.findOne(
    { role: ENUM_USER_ROLE.FACULTY },
    { id: 1, _id: 0 }
  ).sort({
    createdAt: -1,
  })
  if (!user) return null
  return user?.id?.substring(2)
}

export const generateFacultyId = async () => {
  const lastUserId = (await lastFaculty()) || String(0).padStart(5, '0')
  let currentUserId = (parseInt(lastUserId) + 1).toString().padStart(5, '0')
  currentUserId = `F-${currentUserId}`

  return currentUserId
}

// Generate Admin Id
const lastAdmin = async (): Promise<string | null> => {
  const user = await User.findOne(
    { role: ENUM_USER_ROLE.ADMIN },
    { id: 1, _id: 0 }
  ).sort({
    createdAt: -1,
  })
  if (!user) return null
  return user.id.substring(2)
}

export const generateAdminId = async () => {
  const lastUserId = (await lastAdmin()) || String(0).padStart(5, '0')
  let currentUserId = (parseInt(lastUserId) + 1).toString().padStart(5, '0')
  currentUserId = `A-${currentUserId}`

  return currentUserId
}
