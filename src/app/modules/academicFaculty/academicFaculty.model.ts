import { Schema, model } from 'mongoose'
import {
  IAcademicFaculty,
  IAcademicFacultyModel,
} from './academicFaculty.interface'

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: { type: String, required: true, unique: true },
    syncId: { type: String, required: true, unique: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

const AcademicFaculty = model<IAcademicFaculty, IAcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
)

export default AcademicFaculty
