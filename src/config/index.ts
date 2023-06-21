import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  MONGODB_URI: process.env.MONGODB_URI,
  UNIVERSITY_STUDENT_PASS: process.env.UNIVERSITY_STUDENT_PASS,
  UNIVERSITY_FACULTY_PASS: process.env.UNIVERSITY_FACULTY_PASS,
  UNIVERSITY_ADMIN_PASS: process.env.UNIVERSITY_ADMIN_PASS,
}
