import { SortOrder } from 'mongoose'
import httpStatus from 'http-status-codes'
import APIError from '../../errors/APIErrors'
import AcademicSemester from './academicSemester.model'
import { IServiceReturnType } from '../../interfaces/common'
import { IPaginationType } from '../../interfaces/pagination'
import { calculatePagination } from '../../helper/paginationHelper'
import {
  academicSemesterTitleCodeMap,
  academicSemesterSearchableFields,
} from './academicSemester.constant'
import {
  IAcademicSemester,
  IFiltersOptions,
} from './academicSemester.interface'

const createAcademicSemester = async (
  semesterData: IAcademicSemester
): Promise<IAcademicSemester> => {
  // Semester code validation
  if (academicSemesterTitleCodeMap[semesterData.title] !== semesterData.code) {
    throw new APIError(httpStatus.BAD_REQUEST, 'Invalid Semester code!')
  }

  const createdSemeter = await AcademicSemester.create(semesterData)

  return createdSemeter
}

const getAllSemester = async (
  filtersOptions: IFiltersOptions,
  paginationOptions: IPaginationType
): Promise<IServiceReturnType<IAcademicSemester[]>> => {
  // Pagination Options
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  // Sort condition
  const sortCondition: { [key: string]: SortOrder } = {}
  sortCondition[sortBy] = sortOrder

  // Filter Options
  const { searchTerm, ...filtersData } = filtersOptions

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
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

  const whereCondition = Object.keys(andConditions).length ? andConditions : {}

  const semsetersData = await AcademicSemester.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const totalDoc = await AcademicSemester.countDocuments()

  return {
    meta: {
      page,
      limit,
      totalDoc,
    },
    data: semsetersData,
  }
}

const getSemester = async (id: string): Promise<IAcademicSemester | null> => {
  const semseterData = await AcademicSemester.findById(id)
  return semseterData
}

const updateSemester = async (
  id: string,
  semesterData: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  // Semester code validation
  if (
    semesterData.title &&
    semesterData.code &&
    academicSemesterTitleCodeMap[semesterData.title] !== semesterData.code
  ) {
    throw new APIError(httpStatus.BAD_REQUEST, 'Invalid Semester code!')
  }

  const updatedSemester = await AcademicSemester.findOneAndUpdate(
    { _id: id },
    semesterData,
    { new: true }
  )

  return updatedSemester
}

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemester,
  getSemester,
  updateSemester,
}
