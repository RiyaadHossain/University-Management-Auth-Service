import { z } from 'zod'

const createDepartmentManagementZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
  }),
})

const updateDepartmentManagementZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
})

export const DepartmentManagementValidation = {
  createDepartmentManagementZodSchema,
  updateDepartmentManagementZodSchema,
}
