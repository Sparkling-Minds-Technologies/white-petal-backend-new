import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user";

export interface IBankAccount extends Document {
  accountNumber: string;
  accountHolderName: string;
  ifscCode: string;
  bankName: string;
  branchName?: string;
  userId: mongoose.Types.ObjectId;
}

const bankAccountSchema = new Schema<IBankAccount>(
  {
    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },
    accountHolderName: {
      type: String,
      required: true,
      trim: true,
    },
    ifscCode: {
      type: String,
      required: true,
      uppercase: true,
      match: /^[A-Z]{4}0[A-Z0-9]{6}$/, // standard IFSC format
    },
    bankName: {
      type: String,
      required: true,
      trim: true,
    },
    branchName: {
      type: String,
      trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

  },
  { timestamps: true }
);

export default mongoose.model<IBankAccount>("BankAccount", bankAccountSchema);
