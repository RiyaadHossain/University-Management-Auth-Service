import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import cors from 'cors'
const app: Application = express()

// Routes
import { UserRoute } from './modules/user/user.route'
import { AcademicSemesterRoute } from './modules/academicSemester/academicSemester.route'

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Route
app.use('/api/v1/users/', UserRoute)
app.use('/api/v1/academic-semesters/', AcademicSemesterRoute)

// Health Check
app.get('/', (req: Request, res: Response) => {
  // Promise.reject((new APIError(400, "this is error")))
  res.send('Hello World from University Management!')
})

// Global Error Hanlder
app.use(globalErrorHandler)

export default app
