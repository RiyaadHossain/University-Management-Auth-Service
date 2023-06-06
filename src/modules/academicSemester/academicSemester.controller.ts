import { RequestHandler } from 'express'
import { AcademicSemesterService } from './academicSemester.services'

const createacAdemicSemester: RequestHandler = async (req, res, next) => {
  try {
    const academicSemester = req.body

    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemester
    )

    res.status(200).json({
      success: true,
      message: 'Academic Semester created successfully!',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const AcademicSemesterController = {
  createacAdemicSemester,
}
