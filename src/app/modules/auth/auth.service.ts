import httpStatus from 'http-status'
import { SignOptions } from 'jsonwebtoken'

import { TLoginUser } from './auth.interface'
import config from '../../config'
import { createToken } from './auth.utils'
import { User } from '../user/user.model'
import { AppError } from '../../error/appError'

// Login user
const loginUser = async (payload: TLoginUser) => {
  // Find user by email and explicitly select password
  const user = await User.findOne({
    email: payload.email,
  }).select('+password')

  if (!user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Invalid email or password',
    )
  }

  // Check password
  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password,
  )

  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Invalid email or password',
    )
  }

  // JWT payload
  const jwtPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  }

  // Generate access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as SignOptions['expiresIn'],
  )

  // Return user information without password
  return {
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      studentId: user.studentId,
      department: user.department,
    },
  }
}

export const authServices = {
  loginUser,
}