import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import APIError from '../../../errors/APIErrors'
import { jwtHelpers } from '../../../helper/jwtHelper'
import User from '../user/user.model'
import { IAuth } from './auth.interface'
import httpStatus from 'http-status-codes'

const logIn = async (payload: IAuth) => {
  const { id: userId, password } = payload

  // Check User Existence
  const userExist = await User.isUserExist(userId)
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

  const { id, role, needsPasswordChange } = userExist

  // Generate Tokens
  const accessToken = jwtHelpers.generateToken(
    { id, role },
    config.JWT_SECRET as Secret,
    config.JWT_SECRET_EXPIRE as string
  )

  const refreshToken = jwtHelpers.generateToken(
    { id, role },
    config.JWT_REFRESH as Secret,
    config.JWT_SECRET_EXPIRE as string
  )

  return { accessToken, refreshToken, needsPasswordChange }
}

const refreshToken = async (token: string) => {
  let decoded = null
  try {
    decoded = jwtHelpers.verifyToken(token, config.JWT_REFRESH as Secret)
  } catch (error) {
    throw new APIError(httpStatus.FORBIDDEN, 'Invalid Refresh Token!')
  }

  const { id, role } = decoded

  // Check User Existence
  const userExist = await User.isUserExist(id)
  if (!userExist) {
    throw new APIError(httpStatus.BAD_REQUEST, "User doesn't exist!")
  }

  const accessToken = jwtHelpers.generateToken(
    { id, role },
    config.JWT_SECRET as Secret,
    config.JWT_SECRET_EXPIRE as string
  )

  return { accessToken }
}

export const AuthService = {
  logIn,
  refreshToken,
}
