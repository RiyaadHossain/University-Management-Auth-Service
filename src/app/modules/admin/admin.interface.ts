import { Model, Types } from 'mongoose'
import { IBloodGroup, IGender } from '../../../interfaces/common'

type Name = {
  firstName: string
  middleName: string
  lastName: string
}

export type IAdmin = {
  id: string
  name: Name
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  gender: IGender
  permanentAddress: string
  presentAddress: string
  bloodGroup: IBloodGroup
  managementDepartment: Types.ObjectId
  designation: string
  profileImage?: string
}

export type AdminModel = Model<IAdmin, Record<string, unknown>>

export type IAdminFiltersOptions = { searchTerm?: string }
