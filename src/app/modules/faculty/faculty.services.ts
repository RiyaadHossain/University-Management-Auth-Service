/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose'
import { calculatePagination } from '../../../helper/paginationHelper'
import { IPaginationType } from '../../../interfaces/pagination'
import { IServiceReturnType } from '../../../interfaces/common'
import { IFaculty, IFacultyFiltersOptions } from './faculty.interface'
import Faculty from './faculty.model'
import { facultySearchableFields } from './faculty.constant'
import User from '../user/user.model'

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
        [field]: [value],
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
  const { name, ...restFacultyData } = payload

  /*  Handle 'name' Embeded Fields Dynamically: */
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>
      ;(restFacultyData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const data = await Faculty.findOneAndUpdate({ id }, restFacultyData, {
    new: true,
  })
    .populate('academicDepartment academicFaculty')
    .exec()

  return data
}

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  let deletedFaculty = null
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // Delete Faculty Doc
    const deletedData = await Faculty.findByIdAndDelete(id, {
      session,
    }).populate('academicFaculty academicDepartment')
    deletedFaculty = deletedData
    if (!deletedData) {
      throw new Error(`Failed to delete faculty with id: ${id}`)
    }

    // Delete User Doc
    const deletedUser = await User.findByIdAndDelete(id, { session })
    if (!deletedUser) {
      throw new Error(`Failed to delete user with id: ${id}`)
    }

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  return deletedFaculty
}

export const FacultyService = {
  getAllFacultys,
  getFaculty,
  updateFaculty,
  deleteFaculty,
}
