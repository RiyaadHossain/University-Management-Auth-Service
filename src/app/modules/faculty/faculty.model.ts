import { Schema, model } from 'mongoose'
import { FacultyModel, IFaculty } from './faculty.interface'
import { bloodGroup, gender } from '../../../constants/generalUserInfo'
import { facultyDesignation } from './faculty.constant'

const facultySchema = new Schema<IFaculty>({
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
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  gender: {
    type: String,
    enum: gender,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: {
    type: String,
    required: true,
    unique: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
    unique: true,
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
  designation: {
    type: String,
    enum: facultyDesignation,
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
  },
})

const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema)
export default Faculty
