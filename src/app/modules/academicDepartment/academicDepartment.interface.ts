import { Model, ObjectId } from 'mongoose'

export type IAcademicDepartment = {
  title: string
  academicFaculty: ObjectId
  syncId: string
}

export type IAcademicDepartmentEvent = {
  title: string
  academicFacultyId: ObjectId
  id: string
}

export type IAcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>

export type IAcademicDepartmentFiltersOptions = {
  searchTerm?: string
  title?: string
  academicFaculty?: ObjectId
}
