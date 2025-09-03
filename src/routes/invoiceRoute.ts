import { Router } from "express";
import {
  createInvoice,
  deleteInvoice,
  getInvoiceById,
  getInvoicePDF,
  getInvoices,
  updateInvoice,
} from "../controllers/invoiceController";
import { authenticate, authorizeRoles } from "../lib/Utils/Middleware";
import { ADMIN, INSTRUCTOR, SUPERADMIN } from "../lib/Utils/constants";

const Route: Router = Router();

Route.post(
  "/create-invoice",
  authenticate,
  authorizeRoles(INSTRUCTOR),
  createInvoice
);
Route.get(
  "/getInvoices",
  authenticate,
  authorizeRoles(INSTRUCTOR, ADMIN,SUPERADMIN),
  getInvoices
);
Route.get(
  "/getSingleInvoices/:invoiceId",
  authenticate,
  authorizeRoles(INSTRUCTOR),
  getInvoiceById
);
Route.put(
  "/updateInvoices/:invoiceId",
  authenticate,
  authorizeRoles(INSTRUCTOR),
  updateInvoice
);
Route.delete(
  "/deleteInvoices/:invoiceId",
  authenticate,
  authorizeRoles(INSTRUCTOR),
  deleteInvoice
);

Route.get("/invoice/:invoiceId/pdf",  authenticate,
  authorizeRoles(INSTRUCTOR), getInvoicePDF);
export default Route;

