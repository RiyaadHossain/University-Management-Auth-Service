import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf } = format
import path from 'path'

const myFormat = printf(({ message, label, timestamp }) => {
  return `${label}: ${message} ${timestamp}`
})

// Success Logs
const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'Success' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'src', 'logs', 'success.log'),
      level: 'info',
    }),
  ],
})

// Error Logs
const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'Error' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'src', 'logs', 'error.log'),
      level: 'error',
    }),
  ],
})

export { logger, errorLogger }
