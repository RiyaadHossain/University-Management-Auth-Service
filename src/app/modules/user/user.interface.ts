import { Model, ObjectId } from 'mongoose'

export type IUser = {
  id: string
  role: string
  password: string
  student?: ObjectId
  faculty?: ObjectId
  admin?: ObjectId
}

export type UserModel = Model<IUser, Record<string, unknown>>
