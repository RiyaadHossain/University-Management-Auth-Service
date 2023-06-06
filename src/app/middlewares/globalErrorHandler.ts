import { Error } from 'mongoose'
import { ZodError } from 'zod'
import config from '../../config'
import APIError from '../../errors/APIErrors'
import { ErrorRequestHandler } from 'express'
import handleZodError from '../../errors/handleZodError'
import { IGenericErrorMessage } from '../../interfaces/error'
import { handleValidationError } from '../../errors/handleValidationError'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
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
    stack: config.NODE_ENV === 'development' ? error.stack : undefined,
  })

  next()
}

export default globalErrorHandler
