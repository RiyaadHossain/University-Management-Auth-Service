import { SortOrder } from 'mongoose'
import { calculatePagination } from '../../../helper/paginationHelper'
import { IPaginationType } from '../../../interfaces/pagination'
import {
  IAcademicDepartment,
  IAcademicDepartmentEvent,
  IAcademicDepartmentFiltersOptions,
} from './academicDepartment.interface'
import AcademicDepartment from './academicDepartment.model'
import { academicDepartmentSearchableFields } from './academicDepartment.constant'
import { IServiceReturnType } from '../../../interfaces/common'
import { AcademicFacultyService } from '../academicFaculty/academicFaculty.services'
import APIError from '../../../errors/APIErrors'
import httpStatus from 'http-status-codes'

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const data = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  )

  return data
}

const getAllDepartments = async (
  paginationOptions: IPaginationType,
  filtersOptions: IAcademicDepartmentFiltersOptions
): Promise<IServiceReturnType<IAcademicDepartment[]>> => {
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
      $or: academicDepartmentSearchableFields.map(field => ({
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

  const facultiesData = await AcademicDepartment.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const totalDoc = await AcademicDepartment.countDocuments()

  return {
    meta: {
      page,
      limit,
      totalDoc,
    },
    data: facultiesData,
  }
}

const getDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const data = await AcademicDepartment.findById(id).populate('academicFaculty')

  return data
}

const updateDepartment = async (
  id: string,
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const data = await AcademicDepartment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('academicFaculty')

  return data
}

const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const data = await AcademicDepartment.findByIdAndDelete(id)

  return data
}

const createDepartmentEvent = async (payload: IAcademicDepartmentEvent) => {
  const { title, id, academicFacultyId } = payload

  const academicFaculty = await AcademicFacultyService.getFacultyBySyncId(
    academicFacultyId
  )

  if (!academicFaculty) {
    throw new APIError(
      httpStatus.BAD_REQUEST,
      'Academic Faculty data is not exist'
    )
  }

  await AcademicDepartment.create({
    title,
    academicFaculty: academicFaculty._id,
    syncId: id,
  })

}

const updateDepartmentEvent = async (payload: IAcademicDepartmentEvent) => {
  const { title, id, academicFacultyId } = payload

  const academicFaculty = await AcademicFacultyService.getFacultyBySyncId(
    academicFacultyId
  )

  if (!academicFaculty) {
    throw new APIError(
      httpStatus.BAD_REQUEST,
      'Academic Faculty data is not exist'
    )
  }

  await AcademicDepartment.findOneAndUpdate(
    { syncId: id },
    {
      title,
      academicFaculty: academicFaculty._id,
    }
  )
}

const deleteDepartmentEvent = async (payload: IAcademicDepartmentEvent) => {
  const { id } = payload
  await AcademicDepartment.deleteOne({
    syncId: id,
  })
}

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
  createDepartmentEvent,
  updateDepartmentEvent,
  deleteDepartmentEvent,
}
