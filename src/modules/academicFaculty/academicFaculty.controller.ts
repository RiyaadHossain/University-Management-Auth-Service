import { RequestHandler } from 'express'
import catchAsync from '../../shared/catchAsync'
import { academicFacultyService } from './academicFaculty.services'
import sendResponse from '../../shared/sendResponse'
import httpStatus from 'http-status-codes'
import { IAcademicFaculty } from './academicFaculty.interface'

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const facultyData = req.body
  const result = await academicFacultyService.createFaculty(facultyData)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created Faculty data Successfully!',
    data: result,
  })
})

export const AcadmicFacultyController = {
  createFaculty,
}
