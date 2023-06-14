import { RequestHandler } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { FacultyService } from './faculty.services'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status-codes'
import { pick } from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { IFaculty } from './faculty.interface'
import { facultyFilterableFields } from './faculty.constant'

const getAllFacultys: RequestHandler = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields)
  const filterOptions = pick(req.query, facultyFilterableFields)
  const result = await FacultyService.getAllFacultys(
    paginationOptions,
    filterOptions
  )

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data retrived successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await FacultyService.getFaculty(id)

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data retrived successfully!',
    data: result,
  })
})

const updateFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const facultyData = req.body
  const result = await FacultyService.updateFaculty(id, facultyData)

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data updated successfully!',
    data: result,
  })
})

const deleteFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await FacultyService.deleteFaculty(id)

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data deleted successfully!',
    data: result,
  })
})

export const FacultyController = {
  getAllFacultys,
  getFaculty,
  updateFaculty,
  deleteFaculty,
}
