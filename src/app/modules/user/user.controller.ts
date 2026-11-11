
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

// Create Student
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createStudent(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student created successfully!',
    data: result,
  })
})

// Create Staff
const createStaff = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createStaff(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Staff created successfully!',
    data: result,
  })
})

// Create Admin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createAdmin(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  })
})

export const UserControllers = {
  createStudent,
  createStaff,
  createAdmin,
}
