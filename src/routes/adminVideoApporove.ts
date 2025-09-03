import { Router } from "express";
import { authenticate, authorizeRoles } from "../lib/Utils/Middleware";
import { approveVideo, rejectVideo } from "../controllers/adminVideoController";
import { ADMIN, SUPERADMIN } from "../lib/Utils/constants";

const Route: Router = Router()

Route.put("/approve/video/:id", authenticate,authorizeRoles(ADMIN,SUPERADMIN), approveVideo);
Route.put("/reject/video/:id",authenticate,authorizeRoles(ADMIN,SUPERADMIN),rejectVideo);


export default Route;
