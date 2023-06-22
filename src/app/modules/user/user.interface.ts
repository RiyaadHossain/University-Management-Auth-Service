/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model, Types } from 'mongoose'

export type IUser = {
  id: string
  role: string
  password: string
  needsPasswordChange: boolean
  student?: Types.ObjectId
  faculty?: Types.ObjectId
  admin?: Types.ObjectId
}

export interface UserModel extends Model<IUser> {
  isUserExist(
    id: string
  ): Promise<Pick<
    IUser,
    'id' | 'password' | 'role' | 'needsPasswordChange'
  > | null>
  isPasswordMatched(givenPass: string, savedPass: string): Promise<boolean>
}
