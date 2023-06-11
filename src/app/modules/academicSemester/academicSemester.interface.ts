import { Model } from 'mongoose'

export type IAcademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall'
export type IAcademicSemesterCode = '01' | '02' | '03'

export type IAcademicSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type IAcademicSemester = {
  title: IAcademicSemesterTitle
  year: string
  code: IAcademicSemesterCode
  startMonth: IAcademicSemesterMonth
  endMonth: IAcademicSemesterMonth
}

export type AcademicSemesterModel = Model<IAcademicSemester, object>

export type IAcademicSemesterFiltersOptions = {
  searchTerm?: string
  title?: string
  code?: string
  year?: string
}
