import mongoose from 'mongoose'
import config from '../../../config'
import APIError from '../../../errors/APIErrors'
import AcademicSemester from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import Student from '../student/student.model'
import { IUser } from './user.interface'
import User from './user.model'
import { generateFacultyId, generateStudentId } from './user.utils'
import httpStatus from 'http-status-codes'
import { IFaculty } from '../faculty/faculty.interface'
import Faculty from '../faculty/faculty.model'
import { ENUM_USER_ROLE } from '../../../enums/user'

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // Auto Generated Id
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  )

  let userAllData = null

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // Generate ID
    const id = await generateStudentId(academicSemester)
    student.id = id
    user.id = id

    // Create Student Doc
    const newStudent = await Student.create([student], { session })

    if (!newStudent.length)
      throw new APIError(
        httpStatus.BAD_REQUEST,
        'Failed to create Stduent Account'
      )

    // Set User default data (role, student, password)
    user.role = ENUM_USER_ROLE.STUDENT
    user.student = newStudent[0]._id
    if (!user.password) {
      user.password = config.UNIVERSITY_STUDENT_PASS as string
    }

    // Create User
    const newUser = await User.create([user], { session })
    userAllData = newUser[0]

    if (!newUser.length) {
      throw new APIError(
        httpStatus.BAD_REQUEST,
        'Failed to create Stduent Account'
      )
    }
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (userAllData) {
    userAllData = await User.findById(userAllData._id).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        { path: 'academicFaculty' },
      ],
    })
  }

  return userAllData
}

const createFaculty = async (
  faculty: IFaculty,
  user: Partial<IUser>
): Promise<IUser | null> => {
  let userAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    // Generate Faculty ID
    const id = await generateFacultyId()
    faculty.id = id
    user.id = id

    // Create Faculty Doc
    const newFaculty = await Faculty.create([faculty], { session })

    if (!newFaculty.length)
      throw new APIError(
        httpStatus.BAD_REQUEST,
        'Failed to create Faculty account!'
      )

    // Set User default data (role, student, password)
    user.role = ENUM_USER_ROLE.FACULTY
    user.faculty = newFaculty[0]._id
    if (!user.password) user.password = config.UNIVERSITY_FACULTY_PASS

    // Create User Doc
    const newUser = await User.create([user], { session })
    userAllData = newUser[0]

    if (!newUser.length)
      throw new APIError(
        httpStatus.BAD_REQUEST,
        'Failed to create Faculty account!'
      )

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
  }

  if (userAllData)
    userAllData = await User.findById(userAllData._id).populate({
      path: 'faculty',
      populate: [{ path: 'academicFaculty' }, { path: 'academicDepartment' }],
    })

  return userAllData
}

export const UserService = {
  createStudent,
  createFaculty,
}
