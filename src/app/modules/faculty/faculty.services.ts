/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose'
import { calculatePagination } from '../../../helper/paginationHelper'
import { IPaginationType } from '../../../interfaces/pagination'
import { IServiceReturnType } from '../../../interfaces/common'
import { IFaculty, IFacultyFiltersOptions } from './faculty.interface'
import Faculty from './faculty.model'
import {
  EVENT_FACULTY_DELETE,
  EVENT_FACULTY_UPDATE,
  facultySearchableFields,
} from './faculty.constant'
import User from '../user/user.model'
import httpStatus from 'http-status-codes'
import APIError from '../../../errors/APIErrors'
import { RedisClient } from '../../../shared/redis'

const getAllFacultys = async (
  paginationOptions: IPaginationType,
  filtersOptions: IFacultyFiltersOptions
): Promise<IServiceReturnType<IFaculty[]>> => {
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
      $or: facultySearchableFields.map(field => ({
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

  const facultiesData = await Faculty.find(whereCondition)
    .populate('academicDepartment academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .exec()

  const totalDoc = await Faculty.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      totalDoc,
    },
    data: facultiesData,
  }
}

const getFaculty = async (id: string): Promise<IFaculty | null> => {
  const data = await Faculty.findById(id)
    .populate('academicDepartment academicFaculty')
    .exec()

  return data
}

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const { name, ...facultyData } = payload

  /*  Handle 'name' Embeded Fields Dynamically: */
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>
      ;(facultyData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const data = await Faculty.findOneAndUpdate({ id }, facultyData, {
    new: true,
  })
    .populate('academicDepartment academicFaculty')
    .exec()

  if (data) {
    RedisClient.publish(EVENT_FACULTY_UPDATE, JSON.stringify(data))
  }

  return data
}

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  // check if the faculty is exist
  const isExist = await Faculty.findOne({ id })

  if (!isExist) {
    throw new APIError(httpStatus.NOT_FOUND, 'Faculty not found !')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // 1. Delete Faculty
    const faculty = await Faculty.findOneAndDelete({ id }, { session })

    if (!faculty) {
      throw new APIError(404, 'Failed to delete Faculty')
    }

    // 2. Delete User
    await User.deleteOne({ id }, { session })

    if (faculty) {
      RedisClient.publish(EVENT_FACULTY_DELETE, JSON.stringify(faculty))
    }

    // Commit the transaction if everything succeeded
    session.commitTransaction();
    session.endSession();

    return isExist
  } catch (error) {
    // Handle errors and abort the transaction
    session.abortTransaction()
    throw error
  }
}

export const FacultyService = {
  getAllFacultys,
  getFaculty,
  updateFaculty,
  deleteFaculty,
}
