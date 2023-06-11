import { SortOrder } from 'mongoose'
import { IPaginationType } from '../interfaces/pagination'

type IReturnType = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: SortOrder
}

export const calculatePagination = (options: IPaginationType): IReturnType => {
  const page = Number(options.page) || 1
  const limit = Number(options.limit) || 10
  const skip = (page - 1) * limit

  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'asc'

  return { page, limit, skip, sortBy, sortOrder }
}
