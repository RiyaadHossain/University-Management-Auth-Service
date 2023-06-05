import { ZodError, ZodIssue } from 'zod'
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from '../interfaces/error'

export const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errorMessages: IGenericErrorMessage[] = error.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      }
    }
  )

  const statusCode = 400
  const message = 'Validation Error'

  return { statusCode, message, errorMessages }
}
