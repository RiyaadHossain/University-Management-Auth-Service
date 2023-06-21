import APIError from '../../../errors/APIErrors'
import User from '../user/user.model'
import { IAuth } from './auth.interface'
import httpStatus from 'http-status-codes'

const logIn = async (payload: IAuth) => {
  const { id, password } = payload

  // Check User Existence
  const userExist = await User.isUserExist(id)
  if (!userExist) {
    throw new APIError(httpStatus.BAD_REQUEST, "User doesn't exist!")
  }

  // Check Password
  const isPassMatched = await User.isPasswordMatched(
    password,
    userExist.password
  )
  if (!isPassMatched) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'Password is incorrect!')
  }

  const { needsPasswordChange } = userExist

  return { needsPasswordChange }
}

export const AuthService = {
  logIn,
}
