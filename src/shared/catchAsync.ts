import { NextFunction, Request, Response, RequestHandler } from 'express'

const catchAsync =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }

export default catchAsync
