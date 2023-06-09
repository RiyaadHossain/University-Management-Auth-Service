// Service Return
export type IServiceReturnType<T> = {
  meta: {
    page: number
    limit: number
    totalDoc: number
  }
  data: T
}

// API Response Type
export type IAPIResponse<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  meta?: {
    page: number
    limit: number
    totalDoc: number
  }
  data?: T | null
}
