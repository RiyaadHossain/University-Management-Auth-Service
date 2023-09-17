import { Model, Types } from 'mongoose'
import { IBloodGroup, IGender } from '../../../interfaces/common'

type Name = {
  fisrtName: string
  middleName: string
  lastName: string
}

export type IFaculty = {
  id: string
  name: Name
  gender: IGender
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  bloodGroup: IBloodGroup
  designation: 'Professor' | 'Lecturer'
  academicDepartment: Types.ObjectId
  academicFaculty: Types.ObjectId
}

export type FacultyModel = Model<IFaculty, Record<string, unknown>>

export type IFacultyFiltersOptions = {
  searchTerm?: string
  id?: string
  bloodGroup?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
}
