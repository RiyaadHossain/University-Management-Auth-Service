import { NextFunction, Request, Response } from 'express'
import { IGenericErrorMessage } from '../../interfaces/error'
import config from '../../config'
import { handleValidationError } from '../../errors/handleValidationError'
import APIError from '../../errors/APIErrors'
import { Error } from 'mongoose'

const globalErrorHandler = (
  error: Error.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []
  const stack = ''

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof APIError) {
    statusCode = error.statusCode
    message = error.message
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  } else if (error instanceof Error) {
    message = error.message
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV === 'development' ? stack : undefined,
  })

  next()
}

export default globalErrorHandler
