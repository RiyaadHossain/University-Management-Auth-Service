/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model, Types } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'

const userSchema = new Schema<IUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangedAt: { type: Date },
    student: { type: Types.ObjectId, ref: 'Student' },
    faculty: { type: Types.ObjectId, ref: 'Faculty' },
    admin: { type: Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// Hash Password
userSchema.pre('save', async function () {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.BCRYPT_SALT_ROUNDS)
  )

  if (!user.needsPasswordChange) {
    user.passwordChangedAt = new Date()
  }
})

// To check User Existence
userSchema.statics.isUserExist = async function (id: string) {
  const isUserExist = await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
  )

  return isUserExist
}

// To check User Password
userSchema.statics.isPasswordMatched = async function (
  givenPass: string,
  savedPass: string
) {
  const isPassMatched = await bcrypt.compare(givenPass, savedPass)

  return isPassMatched
}

const User = model<IUser, UserModel>('User', userSchema)

export default User
