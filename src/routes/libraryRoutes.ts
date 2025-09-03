import { Router } from "express";
import {  deleteLibraryVideo, getAllLibraryVideo, getLibraryVideo, getLibraryVideoById, updateLibraryVideo, uploadLibraryVideo } from "../controllers/LibraryController";
import { authenticate, authorizeRoles } from "../lib/Utils/Middleware";
import multer from "multer";
import { ADMIN, SUPERADMIN } from "../lib/Utils/constants";

const Route: Router = Router();
const upload = multer({ dest: "uploads/" });


//   Upload book (Restricted to Admin & School, Needs Approval)
Route.post(
  "/uploadLibraryVideo",
  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN),
  upload.fields([{ name: "video", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]),
  uploadLibraryVideo
);

//   Approve Book (Admin only)

//   Get Books (Search & Filter)
Route.get('/searchLibraryVideo', getLibraryVideo);

//   Get Single Book by ID
Route.get("/LibraryVideo/:id", getLibraryVideoById);

//   Get All Books with Pagination
Route.get("/allLibraryVideo", getAllLibraryVideo);

//   Update Book (Restricted to Admin & School)
Route.put(
  "/LibraryVideo/:id",
  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN),
  upload.fields([{ name: "video", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]),
  updateLibraryVideo
);

//   Delete a book (Admin & School)
Route.delete("/LibraryVideo/:id", authenticate, authorizeRoles(ADMIN,SUPERADMIN), deleteLibraryVideo);

export default Route;
