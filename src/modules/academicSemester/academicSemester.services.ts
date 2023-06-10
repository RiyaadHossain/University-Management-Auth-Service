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
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const sortCondition: { [key: string]: SortOrder } = {}
  sortCondition[sortBy] = sortOrder

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

  const semseterData = await AcademicSemester.find({ $and: andConditions })
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
    data: semseterData,
  }
}

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemester,
}
