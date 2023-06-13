/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
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

  return data
}

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const data = await Faculty.findOneAndDelete({ id })
  await User.findOneAndDelete({ id })

  return data
}

export const FacultyService = {
  getAllFacultys,
  getFaculty,
  updateFaculty,
  deleteFaculty,
}
