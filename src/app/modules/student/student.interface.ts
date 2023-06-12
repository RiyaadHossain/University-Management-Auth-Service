import { Model, Types } from 'mongoose'

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
  Gender: 'male' | 'female'
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  guardian: Guardian
  localGuardian: LocalGuardian
  academicSemester: Types.ObjectId
  academicDepartment: Types.ObjectId
  academicFaculty: Types.ObjectId
}
export type StudentModel = Model<IStudent, Record<string, unknown>>
