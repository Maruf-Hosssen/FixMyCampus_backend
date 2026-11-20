
import express from 'express'
import { UserControllers } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { UserValidation } from './user.validation'
import auth from '../../middleware/auth'
import { USER_ROLE } from './user.constant'


const router = express.Router()

// Create Student
router.post(
  '/create-student',
  auth(USER_ROLE.ADMIN),
  validateRequest(UserValidation.createStudentValidationSchema),
  UserControllers.createStudent,
)

// Create Staff
router.post(
  '/create-staff',
  auth(USER_ROLE.ADMIN),
  validateRequest(UserValidation.createStaffValidationSchema),
  UserControllers.createStaff,
)

// Create Admin
router.post(
  '/create-admin',
  auth(USER_ROLE.ADMIN),
  validateRequest(UserValidation.createAdminValidationSchema),
  UserControllers.createAdmin,
)

export const userRoute = router
