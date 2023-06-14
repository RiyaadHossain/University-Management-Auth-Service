import { Model } from 'mongoose'

export type IDepartmentManagement = { title: string }

export type IDepartmentManagementModel = Model<IDepartmentManagement, object>

export type IDepartmentManagementFiltersOptions = {
  searchTerm?: string
  title?: string
}
