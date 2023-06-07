// API Response Type
export type IAPIResponse<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  data?: T | null
}
