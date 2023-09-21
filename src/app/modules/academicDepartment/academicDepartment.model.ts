import { Schema, model } from 'mongoose'
import {
  IAcademicDepartment,
  IAcademicDepartmentModel,
} from './academicDepartment.interface'

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    syncId: { type: String, required: true, unique: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

const AcademicDepartment = model<IAcademicDepartment, IAcademicDepartmentModel>(
  'AcademicDepartment',
  academicDepartmentSchema
)

export default AcademicDepartment
