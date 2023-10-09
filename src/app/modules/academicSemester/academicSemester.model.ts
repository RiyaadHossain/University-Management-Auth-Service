import httpStatus from 'http-status-codes'
import { Schema, model } from 'mongoose'
import {
  IAcademicSemester,
  AcademicSemesterModel,
} from './academicSemester.interface'
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant'
import APIError from '../../../errors/APIErrors'

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    syncId: {
      type: String,
      required: true
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// Title + Year validation
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })

  if (isExist) {
    throw new APIError(
      httpStatus.CONFLICT,
      'Academic Semester is already exist!'
    )
  }

  next()
})

const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
)

export default AcademicSemester
