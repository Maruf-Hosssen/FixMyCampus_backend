import express from 'express'

import { AuthValidation } from './auth.validation'
import validateRequest from '../../middleware/validateRequest'
import { authContoller } from './auth.controller'



const router = express.Router()
router.post(
  '/auth/login',
  validateRequest(AuthValidation.loginValidationSchema),
  authContoller.loginUser,
)
// router.post(
//   '/auth/change-password',
//   auth('', 'user'),
//   validateRequest(AuthValidation.changePasswordValidationSchema),
//   authContoller.changePassword,
// )

export const AuthRoutes = router
