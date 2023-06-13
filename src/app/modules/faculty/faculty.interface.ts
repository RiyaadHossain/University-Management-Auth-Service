import { Model, Types } from 'mongoose'

type Name = {
  fisrtName: string
  middleName: string
  lastName: string
}

export type IFaculty = {
  id: string
  name: Name
  gender: 'male' | 'female'
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
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
