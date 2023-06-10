import { RequestHandler } from 'express'
import { pick } from '../../shared/pick'
import httpStatus from 'http-status-codes'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'
import { AcademicSemesterService } from './academicSemester.services'
import { filterFields, paginationFields } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'

const createacAdemicSemester: RequestHandler = catchAsync(
  async (req, res, next) => {
    const academicSemester = req.body

    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemester
    )

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully!',
      data: result,
    })

    next()
  }
)

const getAllSemesters: RequestHandler = catchAsync(async (req, res, next) => {
  const paginationOptions = pick(req.query, paginationFields)
  const filterOptions = pick(req.query, filterFields)

  const result = await AcademicSemesterService.getAllSemester(
    filterOptions,
    paginationOptions
  )

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Data retrived successfully!',
    meta: result.meta,
    data: result.data,
  })

  next()
})

export const AcademicSemesterController = {
  createacAdemicSemester,
  getAllSemesters,
}
