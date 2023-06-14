import { RequestHandler } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { AcademicDepartmentService } from './academicDepartment.services'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status-codes'
import { IAcademicDepartment } from './academicDepartment.interface'
import { pick } from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { academicDepartmentFilterableFields } from './academicDepartment.constant'

const createDepartment: RequestHandler = catchAsync(async (req, res) => {
  const departmentData = req.body
  const result = await AcademicDepartmentService.createDepartment(
    departmentData
  )

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created Department data Successfully!',
    data: result,
  })
})

const getAllDepartments: RequestHandler = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields)
  const filterOptions = pick(req.query, academicDepartmentFilterableFields)
  const result = await AcademicDepartmentService.getAllDepartments(
    paginationOptions,
    filterOptions
  )

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department data retrived successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getDepartment: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await AcademicDepartmentService.getDepartment(id)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department data retrived successfully!',
    data: result,
  })
})

const updateDepartment: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const departmentData = req.body
  const result = await AcademicDepartmentService.updateDepartment(
    id,
    departmentData
  )

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department data updated successfully!',
    data: result,
  })
})

const deleteDepartment: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await AcademicDepartmentService.deleteDepartment(id)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department data deleted successfully!',
    data: result,
  })
})

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
}
