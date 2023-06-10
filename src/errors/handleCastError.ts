import { Error } from 'mongoose'
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from '../interfaces/error'

const handleCastError = (error: Error.CastError): IGenericErrorResponse => {
  const errorMessages: IGenericErrorMessage[] = [
    { path: error.path, message: 'Invalid Id' },
  ]

  const statusCode = 400
  const message = 'Cast Error'

  return { statusCode, message, errorMessages }
}

export default handleCastError
