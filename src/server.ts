import app from './app'
import config from './config'
import mongoose from 'mongoose'
import { errorLogger, logger } from './shared/logger'

// Uncaught Execption: Gracefully off the server
process.on('uncaughtException', error => {
  logger.error(error)
  process.exit(1)
})

// Connect Database
mongoose
  .connect(config.MONGODB_URL as string)
  .then(() => logger.info('Database connceted successfully ✅'))
  .catch(err => errorLogger.error(`Unable to connect MongoDB ❌ ${err}`))

// Listen to Server
const server = app.listen(config.PORT, () => {
  logger.info(`Application is listening ✅`)
})
// Unhandled Rejection: Gracefully off the server
process.on('unhandledRejection', error => {
  errorLogger.error(`Unhandled Reject is closing the server ❌ ${error}`)
  console.log(error)

  // if (server) {
  //   server.close(() => {
  //     process.exit(1)
  //   })
  // } else {
  //   process.exit(1)
  // }
})

// SIGTERM
process.on('SIGTERM', () => {
  logger.info('Sigterm is triggered ⚒️')
  if (server) server.close()
})
