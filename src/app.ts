import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

// Routes
import userRoutes from './modules/user/user.route'

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Route
app.use('/api/v1/users/', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from University Management!')
})

export default app
