import { UserService } from './user.services'
import catchAsync from '../../../shared/catchAsync'
import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status-codes'
import { IUser } from './user.interface'

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

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { faculty, ...user } = req.body
  const result = await UserService.createFaculty(faculty, user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty account created successfully!',
    data: result,
  })
})

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { admin, ...userData } = req.body
  const result = await UserService.createAdmin(admin, userData)
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin account created successfully!',
    data: result,
  })
})

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
}
