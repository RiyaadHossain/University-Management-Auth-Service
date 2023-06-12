import { UserService } from './user.services'
import catchAsync from '../../../shared/catchAsync'
import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status-codes'

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { student, ...user } = req.body
  const result = await UserService.createStudent(student, user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student account created successfully!',
    data: result,
  })
})

export const UserController = {
  createStudent,
}
