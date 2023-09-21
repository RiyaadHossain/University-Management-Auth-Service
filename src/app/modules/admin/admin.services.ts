/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose'
import { calculatePagination } from '../../../helper/paginationHelper'
import { IPaginationType } from '../../../interfaces/pagination'
import { IServiceReturnType } from '../../../interfaces/common'
import { IAdmin, IAdminFiltersOptions } from './admin.interface'
import Admin from './admin.model'
import { adminSearchableFields } from './admin.constant'
import User from '../user/user.model'
import APIError from '../../../errors/APIErrors'
import httpStatus from 'http-status-codes'

const getAllAdmins = async (
  paginationOptions: IPaginationType,
  filtersOptions: IAdminFiltersOptions
): Promise<IServiceReturnType<IAdmin[]>> => {
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
      $or: adminSearchableFields.map(field => ({
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

  const facultiesData = await Admin.find(whereCondition)
    .populate('managementDepartment')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .exec()

  const totalDoc = await Admin.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      totalDoc,
    },
    data: facultiesData,
  }
}

const getAdmin = async (id: string): Promise<IAdmin | null> => {
  const data = await Admin.findById(id).populate('managementDepartment').exec()

  return data
}

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const { name, ...adminData } = payload

  /*  Handle 'name' Embeded Fields Dynamically: */
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>
      ;(adminData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const data = await Admin.findOneAndUpdate({ id }, adminData, {
    new: true,
  })
    .populate('managementDepartment')
    .exec()

  return data
}

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  // Check if the admin is exist
  const isExist = await Admin.findById(id)

  if (!isExist) {
    throw new APIError(httpStatus.NOT_FOUND, 'Admin not found !')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // 1. Delete Admin
    const admin = await Admin.findOneAndDelete({ id }, { session })
    if (!admin) {
      throw new APIError(404, 'Failed to delete Admin')
    }

    // 2. Delete User
    await User.deleteOne({ id }, { session })
    session.commitTransaction()

    return admin
  } catch (error) {
    session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

export const AdminService = {
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
}
