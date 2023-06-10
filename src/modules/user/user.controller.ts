import { UserService } from './user.services'
import catchAsync from '../../shared/catchAsync'
import { RequestHandler } from 'express'
import sendResponse from '../../shared/sendResponse'
import httpStatus from 'http-status-codes'

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const user = req.body
  const result = await UserService.createUser(user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User account created successfully!',
    data: result,
  })
})

export const UserController = {
  createUser,
}
