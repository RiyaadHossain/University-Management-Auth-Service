/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose'
import { calculatePagination } from '../../../helper/paginationHelper'
import { IPaginationType } from '../../../interfaces/pagination'
import { IServiceReturnType } from '../../../interfaces/common'
import { IStudent, IStudentFiltersOptions } from './student.interface'
import Student from './student.model'
import {
  EVENT_STUDENT_DELETE,
  EVENT_STUDENT_UPDATE,
  studentSearchableFields,
} from './student.constant'
import User from '../user/user.model'
import APIError from '../../../errors/APIErrors'
import httpStatus from 'http-status-codes'
import { RedisClient } from '../../../shared/redis'

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
        [field]: value,
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
  const { name, guardian, localGuardian, ...studentData } = payload

  /*  Handle Embeded Fields Dynamically: */

  // 1. name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>
      ;(studentData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  // 2. guardian
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent>
      ;(studentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian]
    })
  }

  // 3. localGuardian
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}` as keyof Partial<IStudent>
      ;(studentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian]
    })
  }

  const data = await Student.findOneAndUpdate({ id }, studentData, {
    new: true,
  })
    .populate('academicSemester academicDepartment academicFaculty')
    .exec()

  if (data) {
    RedisClient.publish(EVENT_STUDENT_UPDATE, JSON.stringify(data))
  }

  return data
}

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  // Check if the student is exist
  const isExist = await Student.findOne({ id })

  if (!isExist) {
    throw new APIError(httpStatus.NOT_FOUND, 'Student not found !')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // 1. Delete Student
    const student = await Student.findOneAndDelete({ id }, { session })
    if (!student) {
      throw new APIError(404, 'Failed to delete Student')
    }

    // 2. Delete User
    await User.deleteOne({ id }, { session })

    // Commit the transaction if everything succeeded
    session.commitTransaction()
    session.endSession()

    if (student) {
      RedisClient.publish(EVENT_STUDENT_DELETE, JSON.stringify(student))
    }

    return student
  } catch (error) {
    session.abortTransaction()
    throw error
  }
}

export const StudentService = {
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
}
