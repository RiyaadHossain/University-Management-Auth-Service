import mongoose from 'mongoose'
import config from '../../../config'
import APIError from '../../../errors/APIErrors'
import AcademicSemester from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import Student from '../student/student.model'
import { IUser } from './user.interface'
import User from './user.model'
import { generateStudentId } from './user.utils'
import httpStatus from 'http-status-codes'

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // Auto Generated Id
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  )

  let combinedUserData = null

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // Generate Id
    const id = await generateStudentId(academicSemester)

    // Create Student Doc
    student.id = id
    const newStudent = await Student.create([student], { session })

    if (!newStudent.length)
      throw new APIError(
        httpStatus.BAD_REQUEST,
        'Failed to create Stduent Account'
      )

    // Set User default data (id, role, password)
    user.id = id
    user.role = 'student'
    user.student = newStudent[0]._id
    if (!user.password) {
      user.password = config.UNIVERSITY_STUDENT_PASS as string
    }

    // Create User
    const newUser = await User.create([user], { session })
    combinedUserData = newUser[0]

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

  if (combinedUserData) {
    combinedUserData = await User.findById(combinedUserData._id).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        { path: 'academicFaculty' },
      ],
    })
  }

  return combinedUserData
}

export const UserService = {
  createStudent,
}
