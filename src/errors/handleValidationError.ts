import mongoose from 'mongoose'
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from '../interfaces/error'

export const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errorMessages: IGenericErrorMessage[] = Object.values(error.errors).map(
    el => {
      return { path: el?.path, message: el?.message }
    }
  )

  const statusCode = 400
  const message = 'Validation Error'

  return { statusCode, message, errorMessages }
}
