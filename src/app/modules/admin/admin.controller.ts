import { RequestHandler } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IAdmin } from './admin.interface'
import { pick } from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { adminSearchableFields } from './admin.constant'
import { AdminService } from './admin.services'
import { UserService } from '../user/user.services'
import httpStatus from 'http-status-codes'
import { IUser } from '../user/user.interface'

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { admin, ...userData } = req.body
  const result = await UserService.createAdmin(admin, userData)
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin account created successfully!',
    data: result,
  })
})

const getAllAdmins: RequestHandler = catchAsync(async (req, res) => {
  const paginationOPtions = pick(req.query, paginationFields)
  const filtersOPtions = pick(req.query, adminSearchableFields)
  const result = await AdminService.getAllAdmins(
    paginationOPtions,
    filtersOPtions
  )
  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins data retrived successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getAdmin: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await AdminService.getAdmin(id)
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin data retrived successfully!',
    data: result,
  })
})

const updateAdmin: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const adminData = req.body
  const result = await AdminService.updateAdmin(id, adminData)
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin data updated successfully!',
    data: result,
  })
})

const deleteAdmin: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await AdminService.deleteAdmin(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin data deleted successfully!',
    data: result,
  })
})

export const AdminController = {
  createAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
}
