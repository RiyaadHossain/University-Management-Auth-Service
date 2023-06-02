import mongoose from 'mongoose'
import config from './config'
import app from './app'
import { errorLogger, logger } from './shared/logger'

mongoose
  .connect(config.MONGODB_URL as string)
  .then(() => logger.info('Database connceted successfully ✅'))
  .catch(err => errorLogger.error(err))

app.listen(config.PORT, () => {
  logger.info(`Application is listening ✅`)
})
