import app from './app'
import config from './config'
import mongoose from 'mongoose'
// import { errorLogger, logger } from './shared/logger'

// Uncaught Execption: Gracefully off the server
process.on('uncaughtException', error => {
  console.log(error)
  process.exit(1)
})

// Connect Database
mongoose
  .connect(config.MONGODB_URI as string)
  .then(() => console.log('Database connceted successfully ✅'))
  .catch(err => console.log(`Unable to connect MongoDB ❌ ${err}`))

// Listen to Server
const server = app.listen(config.PORT, () => {
  console.log(`Application is listening ✅`)
})

// Unhandled Rejection: Gracefully off the server
process.on('unhandledRejection', error => {
  console.log(`Unhandled Reject is closing the server ❌ ${error}`)

  if (server) {
    server.close(() => {
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
})

// SIGTERM
process.on('SIGTERM', () => {
  console.log('Sigterm is triggered ⚒️')
  if (server) server.close()
})
