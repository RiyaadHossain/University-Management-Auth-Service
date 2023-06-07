import { UserService } from './user.services'
import catchAsync from '../../catchAsync'
import { NextFunction, Request, Response } from 'express'
import sendResponse from '../../shared/sendResponse'
import httpStatus from 'http-status-codes'

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body
    const result = await UserService.createUser(user)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User account created successfully!',
      data: result,
    })

    next()
  }
)

export const UserController = {
  createUser,
}
