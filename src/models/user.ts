import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { ALLOWED_TABS } from "../lib/Utils/constants";

export type AllowedTabType = typeof ALLOWED_TABS[number];

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "admin" | "instructor" | "school" | "user";
  schoolId?: string;
  phone?: string;
  address?: string;
  bio?: string;
  profileImage?: string;
  token?: string;
  createdOn?: Date;
  updatedOn?: Date;
  approved?: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: number;

  allowedTabs?: AllowedTabType[];

  comparePassword: (candidatePassword: string) => boolean;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Number },
    role: {
      type: String,
      enum: ["superadmin","admin", "instructor", "school", "user"],
      default: "user",
    },
    schoolId: { type: String },
    phone: { type: String },
    address: { type: String },
    bio: { type: String },
    profileImage: { type: String },
    approved: { type: Boolean, default: false },
    allowedTabs: {
      type: [String],
      enum: ALLOWED_TABS,
      default: [],
    },
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" },
  }
);

// Pre-save hook: Auto-approve admin role
UserSchema.pre<IUser>("save", function (next) {
  if (this.role === "admin") {
    this.approved = true;
  }
  next();
});

// Compare passwords using bcrypt
UserSchema.methods.comparePassword = function (
  candidatePassword: string
): boolean {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
