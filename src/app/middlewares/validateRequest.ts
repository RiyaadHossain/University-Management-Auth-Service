import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

export const validateRequest =
  (shema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await shema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
        cookier: req.cookies,
      })

      next()
    } catch (error) {
      next(error)
    }
  }
