import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import User from './user.model'

// Student Id
const lastStudent = async (): Promise<string | null> => {
  const user = await User.findOne({ role: 'student' }, { id: 1, _id: 0 }).sort({
    createdAt: -1,
  })
  if (!user) return null
  return user.id.substring(4)
}

export const generateStudentId = async (
  academicSemester: IAcademicSemester
) => {
  const year = academicSemester.year.substring(2)
  const code = academicSemester.code

  const lastUserId = (await lastStudent()) || String(0).padStart(5, '0')
  let currentUserId = (parseInt(lastUserId) + 1).toString().padStart(5, '0')
  currentUserId = `${year}${code}${currentUserId}`

  return currentUserId
}

// Faculty Id
const lastFaculty = async (): Promise<string | null> => {
  const user = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 }).sort({
    createdAt: -1,
  })
  if (!user) return null
  return user.id.substring(2)
}

export const generateFacultyId = async () => {
  const lastUserId = (await lastFaculty()) || String(0).padStart(5, '0')
  let currentUserId = (parseInt(lastUserId) + 1).toString().padStart(5, '0')
  currentUserId = `F-${currentUserId}`

  return currentUserId
}

// Admin Id
const lastAdmin = async (): Promise<string | null> => {
  const user = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 }).sort({
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
