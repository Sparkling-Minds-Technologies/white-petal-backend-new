import { Router } from "express";
import {
  createVideoSetting,
  getVideoSetting,
  getVideoSettingById,
  updateVideoSettingById,
  deleteVideoSettingById
} from "../controllers/videoSettingController";
import { authenticate, authorizeRoles } from "../lib/Utils/Middleware";
import { ADMIN, SUPERADMIN } from "../lib/Utils/constants";

const Route: Router = Router();


Route.post("/createVideosetting",authenticate, authorizeRoles(ADMIN,SUPERADMIN), createVideoSetting);
Route.get("/getVideosetting", getVideoSetting); // frontend use
Route.get("/getVideoSettingById/:id", authenticate, authorizeRoles(ADMIN,SUPERADMIN), getVideoSettingById);
Route.put("/updateVideosetting/:id",authenticate, authorizeRoles(ADMIN,SUPERADMIN),  updateVideoSettingById);
Route.delete("/deleteVideoSetting/:id",authenticate, authorizeRoles(ADMIN,SUPERADMIN),  deleteVideoSettingById); // delete by ID

export default Route;
