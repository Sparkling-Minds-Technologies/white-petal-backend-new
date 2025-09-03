import { Router } from "express";
import {
  getAllLibraryRecycleItems,
  restoreLibraryVideo,
  permanentDeleteLibraryVideo,
} from "../controllers/LibraryVideoRecycleBin";
import { authenticate, authorizeRoles } from "../lib/Utils/Middleware";
import { ADMIN, SUPERADMIN } from "../lib/Utils/constants";

const Route: Router = Router();

Route.get(
  "/getAllRecycleLibraryVideos",
  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN),
  getAllLibraryRecycleItems
);

Route.post(
  "/restoreRecycleLibraryVideo/:id",
  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN),
  restoreLibraryVideo
);

Route.delete(
  "/permanentDeleteRecycleLibrary/:id",
  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN),
  permanentDeleteLibraryVideo
);

export default Route;
