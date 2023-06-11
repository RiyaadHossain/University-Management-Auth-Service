import { RequestHandler } from 'express'
import catchAsync from '../../shared/catchAsync'
import { AcademicFacultyService } from './academicFaculty.services'
import sendResponse from '../../shared/sendResponse'
import httpStatus from 'http-status-codes'
import { IAcademicFaculty } from './academicFaculty.interface'
import { pick } from '../../shared/pick'
import { paginationFields } from '../../constants/pagination'
import { academicFacultyFilterableFields } from './academicFaculty.constant'

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const facultyData = req.body
  const result = await AcademicFacultyService.createFaculty(facultyData)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created Faculty data Successfully!',
    data: result,
  })
})

const getAllFaculties: RequestHandler = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields)
  const filterOptions = pick(req.query, academicFacultyFilterableFields)
  const result = await AcademicFacultyService.getAllFaculties(
    paginationOptions,
    filterOptions
  )

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data retrived successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await AcademicFacultyService.getFaculty(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data retrived successfully!',
    data: result,
  })
})

const updateFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const facultyData = req.body
  const result = await AcademicFacultyService.updateFaculty(id, facultyData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data updated successfully!',
    data: result,
  })
})

const deleteFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await AcademicFacultyService.deleteFaculty(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data deleted successfully!',
    data: result,
  })
})

export const AcadmicFacultyController = {
  createFaculty,
  getAllFaculties,
  getFaculty,
  updateFaculty,
  deleteFaculty,
}
