import { NextFunction, Request, Response } from 'express'
import { createUserService } from './user.services'

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body
    const result = await createUserService(user)

    res.status(200).json({
      success: true,
      message: 'Successfully user account created',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
