import { Model } from 'mongoose'

export type IAcademicFaculty = { title: string; syncId: string }

export type IAcademicFacultyEvent = { title: string; id: string }

export type IAcademicFacultyModel = Model<IAcademicFaculty, object>

export type IAcademicFacultyFiltersOptions = {
  searchTerm?: string
  title?: string
}
