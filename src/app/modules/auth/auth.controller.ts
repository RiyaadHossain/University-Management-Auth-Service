import { RequestHandler } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status-codes'
import { AuthService } from './auth.services'

const logIn: RequestHandler = catchAsync(async (req, res) => {
  const logInData = req.body
  const result = await AuthService.logIn(logInData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in Successfully',
    data: result,
  })
})

export const AuthController = {
  logIn,
}
