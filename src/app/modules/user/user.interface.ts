
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

// Common user type for all three roles
export type TUser = {
  name: string;
  email: string;
  password: string;
  role: USER_ROLE;
  studentId?: string;
  department?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

// Admin creates a student
export type ICreateStudent = {
  name: string;
  email: string;
  studentId: string;
  department: string;
  password: string;
};

// Admin creates a staff member
export type ICreateStaff = {
  name: string;
  email: string;
  password: string;
};

// Admin creates another admin
export type ICreateAdmin = {
  name: string;
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser | null>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;
