
import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import { USER_ROLE } from './user.constant'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<IUser, UserModel>(
  {
    name:{
type: String,
      required: true,
     
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.STUDENT,
    },
    studentId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

// Password hashing
userSchema.pre('save', async function () {
  const user = this

  if (!user.isModified('password')) return

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
})

// Check existing user by username
userSchema.statics.isUserExistsByName = async function (name: string) {
  return await User.findOne({name }).select('+password')
}

// Password matching
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

export const User = model<IUser, UserModel>('User', userSchema)
