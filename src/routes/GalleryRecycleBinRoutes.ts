// routes/GalleryRecycleBinRoutes.ts
import { Router } from "express";
import {
  getAllRecycleItems,
  restoreImage,
  permanentDeleteImage,
} from "../controllers/GalleryRecycleBinController";
import { authenticate, authorizeRoles } from "../lib/Utils/Middleware";
import { ADMIN, SCHOOL, SUPERADMIN } from "../lib/Utils/constants";


const Route: Router = Router();


Route.get("/getAllRecycleImages", authenticate, authorizeRoles(ADMIN,SUPERADMIN, SCHOOL), getAllRecycleItems);
Route.post("/restoreRecycleImage/:id", authenticate, authorizeRoles(ADMIN,SUPERADMIN, SCHOOL), restoreImage);
Route.delete("/permanentDeleteRecycleImage/:id", authenticate, authorizeRoles(ADMIN,SUPERADMIN, SCHOOL), permanentDeleteImage);

export default Route;
