import { Schema, model, Types } from 'mongoose'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    student: { type: Types.ObjectId, ref: 'Student' },
    faculty: { type: Types.ObjectId, ref: 'Faculty' },
    admin: { type: Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

const User = model<IUser, UserModel>('User', userSchema)

export default User
