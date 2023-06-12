import config from '../../../config'
import APIError from '../../../errors/APIErrors'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { IUser } from './user.interface'
import User from './user.model'
import { generateStudentId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const academicSemester: IAcademicSemester = {
    title: 'Fall',
    year: '2025',
    code: '02',
    startMonth: 'February',
    endMonth: 'April',
  }
  // Auto Generated Id
  const id = await generateStudentId(academicSemester)
  user.id = id

  // Default Password
  if (!user.password) {
    user.password = config.UNIVERSITY_USER_PASS as string
  }

  // Create User
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new APIError(400, 'Failed to create user account')
  }

  return createdUser
}

export const UserService = {
  createUser,
}
