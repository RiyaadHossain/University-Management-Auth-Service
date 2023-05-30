import config from '../../config'
import { IUser } from './user.interface'
import User from './user.model'
import { generateUserId } from './user.utils'

export const createUserService = async (user: IUser): Promise<IUser | null> => {
  // Auto Generated Id
  const id = await generateUserId()
  console.log(id)
  user.id = id

  // Default Password
  if (!user.password) {
    user.password = config.UNIVERSITY_USER_PASS as string
  }

  // Create User
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('Failed to create user account')
  }

  return createdUser
}
