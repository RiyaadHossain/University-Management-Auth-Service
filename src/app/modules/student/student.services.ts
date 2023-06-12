/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { calculatePagination } from '../../../helper/paginationHelper'
import { IPaginationType } from '../../../interfaces/pagination'
import { IServiceReturnType } from '../../../interfaces/common'
import { IStudent, IStudentFiltersOptions } from './student.interface'
import Student from './student.model'
import { studentSearchableFields } from './student.constant'

const getAllStudents = async (
  paginationOptions: IPaginationType,
  filtersOptions: IStudentFiltersOptions
): Promise<IServiceReturnType<IStudent[]>> => {
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
      $or: studentSearchableFields.map(field => ({
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

  const facultiesData = await Student.find(whereCondition)
    .populate('academicSemester academicDepartment academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .exec()

  const totalDoc = await Student.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      totalDoc,
    },
    data: facultiesData,
  }
}

const getStudent = async (id: string): Promise<IStudent | null> => {
  const data = await Student.findById(id)
    .populate('academicSemester academicDepartment academicFaculty')
    .exec()

  return data
}

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const { name, guardian, localGuardian, ...restStudentData } = payload

  /*  Handle Embeded Fields Dynamically: */

  // 1. name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>
      ;(restStudentData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  // 2. guardian
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent>
      ;(restStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian]
    })
  }

  // 3. localGuardian
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}` as keyof Partial<IStudent>
      ;(restStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian]
    })
  }

  const data = await Student.findOneAndUpdate({ id }, restStudentData, {
    new: true,
  })
    .populate('academicSemester academicDepartment academicFaculty')
    .exec()

  return data
}

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const data = await Student.findByIdAndDelete(id)

  return data
}

export const StudentService = {
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
}
