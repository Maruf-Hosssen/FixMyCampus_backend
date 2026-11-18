import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'

export const createToken = (
  jwtPayload: {
    userId: string
    email: string
    role: string
  },
  secret: string,
  expiresIn: SignOptions['expiresIn'],
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  })
}

export const verifyToken = (
  token: string,
  secret: string,
) => {
  return jwt.verify(token, secret) as JwtPayload
}