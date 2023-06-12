import { RequestHandler } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { StudentService } from './student.services'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status-codes'
import { pick } from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { IStudent } from './student.interface'
import { studentFilterableFields } from './student.constant'

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields)
  const filterOptions = pick(req.query, studentFilterableFields)
  const result = await StudentService.getAllStudents(
    paginationOptions,
    filterOptions
  )

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data retrived successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await StudentService.getStudent(id)

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data retrived successfully!',
    data: result,
  })
})

const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const studentData = req.body
  const result = await StudentService.updateStudent(id, studentData)

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data updated successfully!',
    data: result,
  })
})

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await StudentService.deleteStudent(id)

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data deleted successfully!',
    data: result,
  })
})

export const StudentController = {
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
}
