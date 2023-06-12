import { Model, Types } from 'mongoose'

export type IUser = {
  id: string
  role: string
  password: string
  student?: Types.ObjectId
  faculty?: Types.ObjectId
  admin?: Types.ObjectId
}

export type UserModel = Model<IUser, Record<string, unknown>>
