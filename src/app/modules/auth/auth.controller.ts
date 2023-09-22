import { RequestHandler } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status-codes'
import { AuthService } from './auth.services'
import config from '../../../config'

const logIn: RequestHandler = catchAsync(async (req, res) => {
  const logInData = req.body
  const result = await AuthService.logIn(logInData)
  const { refreshToken } = result

  // Set Cookie
  const cookieOptions = {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in Successfully',
    data: result,
  })
})

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await AuthService.refreshToken(refreshToken)

  // Set Cookie
  const cookieOptions = {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Generated new access token Successfully',
    data: result,
  })
})

const changePassword: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user
  const passwords = req.body
  await AuthService.changPassword(user, passwords)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Password changed Successfully',
  })
})

export const AuthController = {
  logIn,
  refreshToken,
  changePassword,
}
