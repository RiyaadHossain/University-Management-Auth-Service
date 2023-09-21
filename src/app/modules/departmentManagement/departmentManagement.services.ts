import { SortOrder } from 'mongoose'
import { calculatePagination } from '../../../helper/paginationHelper'
import { IPaginationType } from '../../../interfaces/pagination'
import {
  IDepartmentManagement,
  IDepartmentManagementFiltersOptions,
} from './departmentManagement.interface'
import DepartmentManagement from './departmentManagement.model'
import { departmentManagementSearchableFields } from './departmentManagement.constant'
import { IServiceReturnType } from '../../../interfaces/common'

const createDeptManagement = async (
  payload: IDepartmentManagement
): Promise<IDepartmentManagement | null> => {
  const data = await DepartmentManagement.create(payload)

  return data
}

const getAllDeptManagements = async (
  paginationOptions: IPaginationType,
  filtersOptions: IDepartmentManagementFiltersOptions
): Promise<IServiceReturnType<IDepartmentManagement[]>> => {
  // Pagination Options
  const { skip, page, limit, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  // Sort condition
  const sortCondition: { [key: string]: SortOrder } = {}
  sortCondition[sortBy] = sortOrder

  // Filter Options
  const { searchTerm, ...filtersData } = filtersOptions

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: departmentManagementSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const whereCondition = Object.keys(andConditions).length
    ? { $and: andConditions }
    : {}

  const departmentsData = await DepartmentManagement.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const totalDoc = await DepartmentManagement.countDocuments()

  return {
    meta: {
      page,
      limit,
      totalDoc,
    },
    data: departmentsData,
  }
}

const getDeptManagement = async (
  id: string
): Promise<IDepartmentManagement | null> => {
  const data = await DepartmentManagement.findById(id)

  return data
}

const updateDeptManagement = async (
  id: string,
  payload: IDepartmentManagement
): Promise<IDepartmentManagement | null> => {
  const data = await DepartmentManagement.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  )

  return data
}

const deleteDeptManagement = async (
  id: string
): Promise<IDepartmentManagement | null> => {
  const data = await DepartmentManagement.findByIdAndDelete(id)

  return data
}

export const DepartmentManagementService = {
  createDeptManagement,
  getAllDeptManagements,
  getDeptManagement,
  updateDeptManagement,
  deleteDeptManagement,
}
