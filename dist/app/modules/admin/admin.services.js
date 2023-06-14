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
exports.AdminService = void 0
const paginationHelper_1 = require('../../../helper/paginationHelper')
const admin_model_1 = __importDefault(require('./admin.model'))
const admin_constant_1 = require('./admin.constant')
const user_model_1 = __importDefault(require('../user/user.model'))
const getAllAdmins = (paginationOptions, filtersOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Pagination Options
    const { skip, page, limit, sortBy, sortOrder } = (0,
    paginationHelper_1.calculatePagination)(paginationOptions)
    // Sort condition
    const sortCondition = {}
    sortCondition[sortBy] = sortOrder
    // Filter Options
    const { searchTerm } = filtersOptions,
      filtersData = __rest(filtersOptions, ['searchTerm'])
    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        $or: admin_constant_1.adminSearchableFields.map(field => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      })
    }
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: [value],
        })),
      })
    }
    const whereCondition = Object.keys(andConditions).length
      ? { $and: andConditions }
      : {}
    const facultiesData = yield admin_model_1.default
      .find(whereCondition)
      .populate('managementDepartment')
      .sort(sortCondition)
      .skip(skip)
      .limit(limit)
      .exec()
    const totalDoc = yield admin_model_1.default.countDocuments(whereCondition)
    return {
      meta: {
        page,
        limit,
        totalDoc,
      },
      data: facultiesData,
    }
  })
const getAdmin = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const data = yield admin_model_1.default
      .findById(id)
      .populate('managementDepartment')
      .exec()
    return data
  })
const updateAdmin = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { name } = payload,
      adminData = __rest(
        payload,
        /*  Handle 'name' Embeded Fields Dynamically: */
        ['name']
      )
    /*  Handle 'name' Embeded Fields Dynamically: */
    if (name && Object.keys(name).length > 0) {
      Object.keys(name).forEach(key => {
        const nameKey = `name.${key}`
        adminData[nameKey] = name[key]
      })
    }
    const data = yield admin_model_1.default
      .findOneAndUpdate({ id }, adminData, {
        new: true,
      })
      .populate('managementDepartment')
      .exec()
    return data
  })
const deleteAdmin = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const data = yield admin_model_1.default.findOneAndDelete({ id })
    yield user_model_1.default.findOneAndDelete({ id })
    return data
  })
exports.AdminService = {
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
}
