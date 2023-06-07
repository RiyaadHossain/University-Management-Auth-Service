import { RequestHandler } from 'express'
import { AcademicSemesterService } from './academicSemester.services'
import catchAsync from '../../catchAsync'
import sendResponse from '../../shared/sendResponse'
import httpStatus from 'http-status-codes'

const createacAdemicSemester: RequestHandler = catchAsync(
  async (req, res, next) => {
    const academicSemester = req.body

    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemester
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully!',
      data: result,
    })

    next()
  }
)

export const AcademicSemesterController = {
  createacAdemicSemester,
}
