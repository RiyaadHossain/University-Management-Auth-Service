import { Schema, model } from 'mongoose'
import {
  IDepartmentManagement,
  IDepartmentManagementModel,
} from './departmentManagement.interface'

const departmentManagementSchema = new Schema<IDepartmentManagement>(
  {
    title: { type: String, required: true, unique: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

const DepartmentManagement = model<
  IDepartmentManagement,
  IDepartmentManagementModel
>('DepartmentManagement', departmentManagementSchema)

export default DepartmentManagement
