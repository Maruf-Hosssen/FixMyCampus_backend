
import { z } from 'zod'

// Create Student Validation
const createStudentValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    studentId: z.string().min(1, 'Student ID is required'),
    department: z.string().min(1, 'Department is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
})

// Create Staff Validation
const createStaffValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
})

// Create Admin Validation
const createAdminValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
})

export const UserValidation = {
  createStudentValidationSchema,
  createStaffValidationSchema,
  createAdminValidationSchema,
}
