
import { IUser, ICreateStudent, ICreateStaff, ICreateAdmin } from './user.interface'
import { User } from './user.model'
import { USER_ROLE } from './user.constant'

// Create Student
const createStudent = async (payload: ICreateStudent) => {
  const {name, email, studentId, department, password } = payload

  // Check existing username or email
  const existingUser = await User.findOne({
    $or: [{ email }, { studentId }],
  })

  if (existingUser) {
    throw new Error('Username, email or student ID already exists!')
  }

  const userData: Partial<IUser> = {
    name,
    email,
    password,
    studentId,
    department,
    role: USER_ROLE.STUDENT,
  }

  const result = await User.create(userData)

  return result
}

// Create Staff
const createStaff = async (payload: ICreateStaff) => {
  const { name, email, password } = payload

  const existingUser = await User.findOne({
    $or: [{ email }],
  })

  if (existingUser) {
    throw new Error('Username or email already exists!')
  }

  const userData: Partial<IUser> = {
    name,
    email,
    password,
    role: USER_ROLE.STAFF,
  }

  const result = await User.create(userData)

  return result
}

// Create Admin
const createAdmin = async (payload: ICreateAdmin) => {
  const { name, email, password } = payload

  const existingUser = await User.findOne({
    $or: [{ email }],
  })

  if (existingUser) {
    throw new Error('Username or email already exists!')
  }

  const userData: Partial<IUser> = {
   name,
    email,
    password,
    role: USER_ROLE.ADMIN,
  }

  const result = await User.create(userData)

  return result
}

export const UserServices = {
  createStudent,
  createStaff,
  createAdmin,
}
