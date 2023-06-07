import cors from 'cors'
import { applicationRoutes } from './routes'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
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

export default app
