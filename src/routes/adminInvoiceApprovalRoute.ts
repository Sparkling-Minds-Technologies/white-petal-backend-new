import { Router } from "express";
import { authenticate, authorizeRoles } from "../lib/Utils/Middleware";
import {
  approveInvoice,
  rejectInvoice,
} from "../controllers/adminInvoiceController";
import { ADMIN, SUPERADMIN } from "../lib/Utils/constants";

const Route: Router = Router();

Route.put(
  "/approve/invoice/:id",
  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN),
  approveInvoice
);
Route.put(
  "/reject/invoice/:id",
  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN),
  rejectInvoice
);

export default Route;

