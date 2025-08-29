import { Router } from "express";
import { authenticate, authorizeRoles } from "../lib/Utils/Middleware";
import {
  approveInvoice,
  rejectInvoice,
} from "../controllers/adminInvoiceController";
import { ADMIN } from "../lib/Utils/constants";

const Route: Router = Router();

Route.put(
  "/approve/invoice/:id",
  authenticate,
  authorizeRoles(ADMIN),
  approveInvoice
);
Route.put(
  "/reject/invoice/:id",
  authenticate,
  authorizeRoles(ADMIN),
  rejectInvoice
);

export default Route;

