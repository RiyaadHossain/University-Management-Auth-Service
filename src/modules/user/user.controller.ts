import { RequestHandler } from 'express'
import { UserService } from './user.services'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await UserService.createUser(user)

    res.status(200).json({
      success: true,
      message: 'User account created successfully!',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = {
  createUser,
}
