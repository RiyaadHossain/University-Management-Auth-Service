import cors from 'cors'
import httpStatus from 'http-status-codes'
import { applicationRoutes } from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Route
app.use('/api/v1/', applicationRoutes)

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from University Management!')
})

// Global Error Hanlder
app.use(globalErrorHandler)

// Not Found API Error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found!',
    errorMessages: [{ path: req.originalUrl, message: 'API Not Found!' }],
  })
  next()
})

export default app
