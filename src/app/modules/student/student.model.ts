import { Schema, Types, model } from 'mongoose'
import { IStudent, StudentModel } from './student.interface'
import { bloodGroup, gender } from '../../../constants/generalUserInfo'

export const studentSchema = new Schema<IStudent>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    middleName: String,
    lastName: {
      type: String,
      required: true,
    },
  },
  gender: {
    type: String,
    enum: gender,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: bloodGroup,
    required: true,
  },

  guardian: {
    fatherName: {
      type: String,
      required: true,
    },
    fatherOccupation: {
      type: String,
      required: true,
    },
    fatherContactNo: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    motherOccupation: {
      type: String,
      required: true,
    },
    motherContactNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },

  localGuardian: {
    name: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },

  academicSemester: {
    type: Types.ObjectId,
    ref: 'AcademicSemester',
    required: true,
  },
  academicDepartment: {
    type: Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  academicFaculty: {
    type: Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
  },
  profileImg: { type: String /* required: true  */ },
})

const Student = model<IStudent, StudentModel>('Student', studentSchema)

export default Student
