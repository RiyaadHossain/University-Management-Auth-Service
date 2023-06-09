import { RequestHandler } from 'express'
import { AcademicSemesterService } from './academicSemester.services'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'
import httpStatus from 'http-status-codes'
import { paginationFields } from '../../constants/pagination'
import { pick } from '../../shared/pick'
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

  const result = await AcademicSemesterService.getAllSemester(paginationOptions)

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
