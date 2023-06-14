'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AdminController = void 0
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'))
const pick_1 = require('../../../shared/pick')
const pagination_1 = require('../../../constants/pagination')
const admin_constant_1 = require('./admin.constant')
const admin_services_1 = require('./admin.services')
const user_services_1 = require('../user/user.services')
const http_status_codes_1 = __importDefault(require('http-status-codes'))
const createAdmin = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body,
      { admin } = _a,
      userData = __rest(_a, ['admin'])
    const result = yield user_services_1.UserService.createAdmin(
      admin,
      userData
    )
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.default.OK,
      success: true,
      message: 'Admin account created successfully!',
      data: result,
    })
  })
)
const getAllAdmins = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const paginationOPtions = (0, pick_1.pick)(
      req.query,
      pagination_1.paginationFields
    )
    const filtersOPtions = (0, pick_1.pick)(
      req.query,
      admin_constant_1.adminSearchableFields
    )
    const result = yield admin_services_1.AdminService.getAllAdmins(
      paginationOPtions,
      filtersOPtions
    )
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.default.OK,
      success: true,
      message: 'Admins data retrived successfully!',
      meta: result.meta,
      data: result.data,
    })
  })
)
const getAdmin = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const result = yield admin_services_1.AdminService.getAdmin(id)
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.default.OK,
      success: true,
      message: 'Admin data retrived successfully!',
      data: result,
    })
  })
)
const updateAdmin = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const adminData = req.body
    const result = yield admin_services_1.AdminService.updateAdmin(
      id,
      adminData
    )
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.default.OK,
      success: true,
      message: 'Admin data updated successfully!',
      data: result,
    })
  })
)
const deleteAdmin = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const result = yield admin_services_1.AdminService.deleteAdmin(id)
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.default.OK,
      success: true,
      message: 'Admin data deleted successfully!',
      data: result,
    })
  })
)
exports.AdminController = {
  createAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
}
