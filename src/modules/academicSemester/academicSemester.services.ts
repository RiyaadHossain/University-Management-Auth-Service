import httpStatus from 'http-status-codes'
import APIError from '../../errors/APIErrors'
import { academicSemesterTitleCodeMap } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import AcademicSemester from './academicSemester.model'
import { IPaginationType } from '../../interfaces/pagination'
import { IServiceReturnType } from '../../interfaces/common'
import { calculatePagination } from '../../helper/paginationHelper'
import { SortOrder } from 'mongoose'

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
  paginationOptions: IPaginationType
): Promise<IServiceReturnType<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const sortCondition: { [key: string]: SortOrder } = {}
  sortCondition[sortBy] = sortOrder

  const semseterData = await AcademicSemester.find()
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
