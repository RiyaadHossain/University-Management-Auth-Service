import { Model } from 'mongoose'

export type IAcademicFaculty = { title: string }

export type IAcademicFacultyModel = Model<IAcademicFaculty, object>

export type IAcademicFacultyFiltersOptions = {
  searchTerm?: string
  title?: string
}
