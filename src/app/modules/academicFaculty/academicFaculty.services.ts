import { SortOrder } from 'mongoose'
import { calculatePagination } from '../../../helper/paginationHelper'
import { IPaginationType } from '../../../interfaces/pagination'
import {
  IAcademicFaculty,
  IAcademicFacultyEvent,
  IAcademicFacultyFiltersOptions,
} from './academicFaculty.interface'
import AcademicFaculty from './academicFaculty.model'
import { academicFacultySearchableFields } from './academicFaculty.constant'
import { IServiceReturnType } from '../../../interfaces/common'

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const data = await AcademicFaculty.create(payload)

  return data
}

const getAllFaculties = async (
  paginationOptions: IPaginationType,
  filtersOptions: IAcademicFacultyFiltersOptions
): Promise<IServiceReturnType<IAcademicFaculty[]>> => {
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
      $or: academicFacultySearchableFields.map(field => ({
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

  const facultiesData = await AcademicFaculty.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const totalDoc = await AcademicFaculty.countDocuments()

  return {
    meta: {
      page,
      limit,
      totalDoc,
    },
    data: facultiesData,
  }
}

const getFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const data = await AcademicFaculty.findById(id)

  return data
}

const updateFaculty = async (
  id: string,
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const data = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })

  return data
}

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const data = await AcademicFaculty.findByIdAndDelete(id)

  return data
}

const createFacultyEvent = async (payload: IAcademicFacultyEvent) => {
  const { title, id } = payload
  await AcademicFaculty.create({
    title,
    syncId: id,
  })
}

const updateFacultyEvent = async (payload: IAcademicFacultyEvent) => {
  const { title, id } = payload
  await AcademicFaculty.findOneAndUpdate(
    { syncId: id },
    {
      title,
    }
  )
}

const deleteFacultyEvent = async (payload: IAcademicFacultyEvent) => {
  const { id } = payload
  await AcademicFaculty.deleteOne({
    syncId: id,
  })
}

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculties,
  getFaculty,
  updateFaculty,
  deleteFaculty,
  createFacultyEvent,
  updateFacultyEvent,
  deleteFacultyEvent,
}
