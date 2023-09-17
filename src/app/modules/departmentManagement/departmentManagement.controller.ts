import { RequestHandler } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { DepartmentManagementService } from './departmentManagement.services'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status-codes'
import { IDepartmentManagement } from './departmentManagement.interface'
import { pick } from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { departmentManagementFilterableFields } from './departmentManagement.constant'

const createDeptManagement: RequestHandler = catchAsync(async (req, res) => {
  const departmentData = req.body
  const result = await DepartmentManagementService.createDeptManagement(
    departmentData
  )

  sendResponse<IDepartmentManagement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created Department data Successfully!',
    data: result,
  })
})

const getAllDeptManagements: RequestHandler = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields)
  const filterOptions = pick(req.query, departmentManagementFilterableFields)
  const result = await DepartmentManagementService.getAllDeptManagements(
    paginationOptions,
    filterOptions
  )

  sendResponse<IDepartmentManagement[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department data retrived successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getDeptManagement: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await DepartmentManagementService.getDeptManagement(id)

  sendResponse<IDepartmentManagement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department data retrived successfully!',
    data: result,
  })
})

const updateDeptManagement: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const departmentData = req.body
  const result = await DepartmentManagementService.updateDeptManagement(
    id,
    departmentData
  )

  sendResponse<IDepartmentManagement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department data updated successfully!',
    data: result,
  })
})

const deleteDeptManagement: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await DepartmentManagementService.deleteDeptManagement(id)

  sendResponse<IDepartmentManagement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department data deleted successfully!',
    data: result,
  })
})

export const DepartmentManagementController = {
  createDeptManagement,
  getAllDeptManagements,
  getDeptManagement,
  updateDeptManagement,
  deleteDeptManagement,
}
