import { Router } from "express";
import {
  getAllLibraryRecycleItems,
  restoreLibraryVideo,
  permanentDeleteLibraryVideo,
} from "../controllers/LibraryVideoRecycleBin";
import { authenticate, authorizeRoles } from "../lib/Utils/Middleware";
import { ADMIN } from "../lib/Utils/constants";

const Route: Router = Router();

Route.get(
  "/getAllRecycleLibraryVideos",
  authenticate,
  authorizeRoles(ADMIN),
  getAllLibraryRecycleItems
);

Route.post(
  "/restoreRecycleLibraryVideo/:id",
  authenticate,
  authorizeRoles(ADMIN),
  restoreLibraryVideo
);

Route.delete(
  "/permanentDeleteRecycleLibrary/:id",
  authenticate,
  authorizeRoles(ADMIN,),
  permanentDeleteLibraryVideo
);

export default Route;
