import express from "express";
import {
  createBankAccount,
  getBankAccounts,
  getBankAccountById,
  updateBankAccount,
  deleteBankAccount,
} from "../controllers/bankController";
import { authenticate } from "../lib/Utils/Middleware";

const router = express.Router();

router.post("/", authenticate, createBankAccount);
router.get("/", authenticate, getBankAccounts);
router.get("/:id", authenticate, getBankAccountById);
router.put("/:id", authenticate, updateBankAccount);
router.delete("/:id", authenticate, deleteBankAccount);

export default router;
