import { z } from 'zod'
import { RequestHandler } from 'express'
import { UserService } from './user.services'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    // Zod Validation
    const userZodValidation = z.object({
      body: z.object({
        role: z.string({ required_error: 'Role is required' }),
      }),
    })

    userZodValidation.parse(req)

    const { user } = req.body
    const result = await UserService.createUser(user)

    res.status(200).json({
      success: true,
      message: 'Successfully user account created',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = {
  createUser,
}
