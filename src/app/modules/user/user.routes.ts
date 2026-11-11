
import express from 'express'
import { UserControllers } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { UserValidation } from './user.validation'


const router = express.Router()

// Create Student
router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentValidationSchema),
  UserControllers.createStudent,
)

// Create Staff
router.post(
  '/create-staff',
  validateRequest(UserValidation.createStaffValidationSchema),
  UserControllers.createStaff,
)

// Create Admin
router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminValidationSchema),
  UserControllers.createAdmin,
)

export const userRoute = router
