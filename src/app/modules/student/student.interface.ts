import { Model, ObjectId } from 'mongoose'
import { IBloodGroup, IGender } from '../../../interfaces/common'

type Name = {
  fisrtName: string
  middleName: string
  lastName: string
}

type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
  address: string
}

type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type IStudent = {
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
  guardian: Guardian
  localGuardian: LocalGuardian
  academicSemester: ObjectId
  academicDepartment: ObjectId
  academicFaculty: ObjectId
  profileImg?: string
}

export type StudentModel = Model<IStudent, Record<string, unknown>>

export type IStudentFiltersOptions = {
  searchTerm?: string
  id?: string
  bloodGroup?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
}
