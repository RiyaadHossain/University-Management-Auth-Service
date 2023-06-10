import { RequestHandler } from 'express'
import { pick } from '../../shared/pick'
import httpStatus from 'http-status-codes'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'
import { AcademicSemesterService } from './academicSemester.services'
import { filterFields, paginationFields } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'

const createacSemester: RequestHandler = catchAsync(async (req, res) => {
  const semesterData = req.body

  const result = await AcademicSemesterService.createSemester(semesterData)

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created successfully!',
    data: result,
  })
})

const getAllSemesters: RequestHandler = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields)
  const filterOptions = pick(req.query, filterFields)

  const result = await AcademicSemesterService.getAllSemester(
    filterOptions,
    paginationOptions
  )

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters Data retrived successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSemester: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await AcademicSemesterService.getSemester(id)

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Data retrived successfully!',
    data: result,
  })
})

const updateSemeter: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const updatedSemesterData = req.body

  const result = await AcademicSemesterService.updateSemester(
    id,
    updatedSemesterData
  )

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester updated successfully!',
    data: result,
  })
})

export const AcademicSemesterController = {
  createacSemester,
  getAllSemesters,
  getSemester,
  updateSemeter,
}
