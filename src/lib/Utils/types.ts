import { Request, Response } from "express";
import { IUser } from "../../models/user";


// export interface AuthRequest extends Request {
//   user?: {
//     _id: string;
//     name: string;
//     email: string;
//     role: "admin" | "school" | "instructor";
//     schoolId?: string;
//     phone?: string;
//     address?: string;
//     bio?: string;
//     profileImage?: string;
//     approved?: boolean;
//   };
// }

export interface AuthRequest extends Request {
    user?: IUser;
}