import { Request, Response } from "express";
import BankAccount from "../models/BankAccount";
import { ResponseCode } from "../lib/Utils/ResponseCode";
import { AuthRequest } from "../lib/Utils/types";

// Create Bank Account
export const createBankAccount = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?._id) {
      res.status(ResponseCode.UNAUTHORIZED).json({ message: "Unauthorized" });
      return;
    }

    const { accountNumber, accountHolderName, bankName, ifscCode, branchName } = req.body;

    const missingFields: string[] = [];
    if (!accountNumber) missingFields.push("accountNumber");
    if (!accountHolderName) missingFields.push("accountHolderName");
    if (!bankName) missingFields.push("bankName");
    if (!ifscCode) missingFields.push("ifscCode");
    if (!branchName) missingFields.push("branchName");

    if (missingFields.length > 0) {
      res.status(ResponseCode.VALIDATION_ERROR).json({
        message: `Missing required fields: ${missingFields.join(", ")}`
      });
      return;
    }

    const bankAccount = new BankAccount({
      userId: req.user._id,
      accountNumber,
      accountHolderName,
      bankName,
      ifscCode,
      branchName,
    });

    await bankAccount.save();

    res.status(ResponseCode.SUCCESS).json({
      message: "Bank account created successfully",
      bankAccount,
    });
  } catch (error: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ message: error.message });
  }
};

// Get all Bank Accounts for logged-in user
export const getBankAccounts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?._id) {
      res.status(ResponseCode.UNAUTHORIZED).json({ message: "Unauthorized" });
      return;
    }

    const accounts = await BankAccount.find({ userId: req.user._id });

    res.status(ResponseCode.SUCCESS).json({ accounts });
  } catch (error: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ message: error.message });
  }
};

// Get single Bank Account
export const getBankAccountById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?._id) {
      res.status(ResponseCode.UNAUTHORIZED).json({ message: "Unauthorized" });
      return;
    }

    const { id } = req.params;
    const account = await BankAccount.findOne({ _id: id, userId: req.user._id });

    if (!account) {
      res.status(ResponseCode.NOT_FOUND).json({ message: "Bank account not found" });
      return;
    }

    res.status(ResponseCode.SUCCESS).json({ account });
  } catch (error: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ message: error.message });
  }
};

// Update Bank Account
export const updateBankAccount = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?._id) {
      res.status(ResponseCode.UNAUTHORIZED).json({ message: "Unauthorized" });
      return;
    }

    const { id } = req.params;
    const { accountNumber, accountHolderName, bankName, ifscCode, branchName } = req.body;

    const account = await BankAccount.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { accountNumber, accountHolderName, bankName, ifscCode, branchName },
      { new: true }
    );

    if (!account) {
      res.status(ResponseCode.NOT_FOUND).json({ message: "Bank account not found" });
      return;
    }

    res.status(ResponseCode.SUCCESS).json({
      message: "Bank account updated successfully",
      account,
    });
  } catch (error: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ message: error.message });
  }
};

// Delete Bank Account
export const deleteBankAccount = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?._id) {
      res.status(ResponseCode.UNAUTHORIZED).json({ message: "Unauthorized" });
      return;
    }

    const { id } = req.params;

    const deleted = await BankAccount.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!deleted) {
      res.status(ResponseCode.NOT_FOUND).json({ message: "Bank account not found" });
      return;
    }

    res.status(ResponseCode.SUCCESS).json({ message: "Bank account deleted successfully" });
  } catch (error: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ message: error.message });
  }
};
