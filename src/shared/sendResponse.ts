import { Response } from 'express'

type IAPIResponse<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  data?: T | null
}

const sendResponse = <T>(res: Response, resData: IAPIResponse<T>): void => {
  const resBody: Omit<IAPIResponse<T>, 'statusCode'> = {
    success: resData.success,
    message: resData.message,
    data: resData.data,
  }
  res.status(resData.statusCode).json(resBody)
}

export default sendResponse
