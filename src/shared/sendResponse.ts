import { Response } from 'express'
import { IAPIResponse } from '../interfaces/common'

const sendResponse = <T>(res: Response, resData: IAPIResponse<T>): void => {
  const resBody: Omit<IAPIResponse<T>, 'statusCode'> = {
    success: resData.success,
    message: resData.message,
    meta: resData.meta,
    data: resData.data,
  }
  res.status(resData.statusCode).json(resBody)
}

export default sendResponse
