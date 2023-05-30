import { Request, Response } from 'express'
import { createUserService } from './user.services'

export const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await createUserService(user)

    res.status(200).json({
      success: true,
      message: 'Successfully user account created',
      data: result,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: 'Failed to create user account',
    })
  }
}
