'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = require('mongoose')
const generalUserInfo_1 = require('../../../constants/generalUserInfo')
const adminSchema = new mongoose_1.Schema({
  id: { type: String, required: true, unique: true },
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  gender: { type: String, enum: generalUserInfo_1.gender, required: true },
  permanentAddress: { type: String, required: true },
  presentAddress: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: generalUserInfo_1.bloodGroup,
    required: true,
  },
  managementDepartment: {
    type: mongoose_1.Schema.Types.ObjectId,
    ref: 'DepartmentManagement',
    required: true,
  },
  designation: { type: String, required: true },
  profileImage: { type: String /* required: true */ },
})
const Admin = (0, mongoose_1.model)('Admin', adminSchema)
exports.default = Admin
