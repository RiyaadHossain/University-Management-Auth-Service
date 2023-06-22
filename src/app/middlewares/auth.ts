import { NextFunction, Request, Response } from 'express'
import APIError from '../../errors/APIErrors'
import httpStatus from 'http-status-codes'
import { jwtHelpers } from '../../helper/jwtHelper'
import config from '../../config'
import { Secret } from 'jsonwebtoken'

const auth =
  (...requiredRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new APIError(httpStatus.UNAUTHORIZED, 'Authenticaion required!')
    }

    try {
      // Token Verificaiton
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.JWT_SECRET as Secret
      )

      // Role Authorization
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new APIError(httpStatus.FORBIDDEN, 'Unauthorized access!')
      }

      req.user = verifiedUser
      next()
    } catch (error) {
      next(error)
    }
  }

export default auth
