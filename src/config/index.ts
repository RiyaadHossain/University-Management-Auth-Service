import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH: process.env.JWT_REFRESH,
  JWT_SECRET_EXPIRE: process.env.JWT_SECRET_EXPIRE,
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  UNIVERSITY_STUDENT_PASS: process.env.UNIVERSITY_STUDENT_PASS,
  UNIVERSITY_FACULTY_PASS: process.env.UNIVERSITY_FACULTY_PASS,
  UNIVERSITY_ADMIN_PASS: process.env.UNIVERSITY_ADMIN_PASS,
}
