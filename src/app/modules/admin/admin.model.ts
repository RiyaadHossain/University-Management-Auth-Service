import { Schema, model } from 'mongoose'
import { AdminModel, IAdmin } from './admin.interface'
import { bloodGroup, gender } from '../../../constants/generalUserInfo'

const adminSchema = new Schema<IAdmin>(
  {
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
    gender: { type: String, enum: gender, required: true },
    permanentAddress: { type: String, required: true },
    presentAddress: { type: String, required: true },
    bloodGroup: { type: String, enum: bloodGroup, required: true },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'DepartmentManagement',
      required: true,
    },
    designation: { type: String, required: true },
    profileImage: { type: String /* required: true */ },
  },
  {
    timestamps: true,
  }
)

const Admin = model<IAdmin, AdminModel>('Admin', adminSchema)
export default Admin
