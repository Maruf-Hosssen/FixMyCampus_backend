import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type IUser = {
  name:string;
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

// Admin creates another admin (if needed)
export type ICreateAdmin = {
  name: string;
  email: string;
  password: string;
};

export interface UserModel extends Model<IUser> {
  //instance methods for checking if the user exist
  isUserExistsByName(name: string): Promise<IUser>
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}
export type TUserRole = keyof typeof USER_ROLE