import { Router } from "express";
import { authenticate, authorizeRoles } from "../lib/Utils/Middleware";
import { getConversation,getUsersForSidebar,sendMessage} from "../controllers/chatController";
import { ADMIN, INSTRUCTOR, SCHOOL, SUPERADMIN } from "../lib/Utils/constants";

const Route: Router = Router();


Route.get(
  "/users",
  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN, SCHOOL, INSTRUCTOR),
  getUsersForSidebar
);
Route.get(
  "/:id",
  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN, SCHOOL, INSTRUCTOR),
  getConversation
);
Route.post(
  "/send/:id",
  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN, SCHOOL, INSTRUCTOR),
  sendMessage
);

export default Route;
