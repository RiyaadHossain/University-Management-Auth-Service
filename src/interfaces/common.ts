export type IServiceReturnType<T> = {
  meta: {
    page: number
    limit: number
    totalDoc: number
  }
  data: T
}

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

export type IGender = 'male' | 'female'
export type IBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-'
