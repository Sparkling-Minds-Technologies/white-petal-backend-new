import { Router } from "express";
import {
  uploadImage,
  approveImage,
  rejectImage,
  getGallery,
  updateImage,
  deleteImage,
  getPendingImages,
} from "../controllers/GalleryController";
import { authenticate, authorizeRoles } from "../lib/Utils/Middleware";

import { upload } from "../lib/Utils/s3Uploader";
import { ADMIN, SCHOOL, SUPERADMIN } from "../lib/Utils/constants";


const Route: Router = Router();

Route.post(
  "/upload",
  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN, SCHOOL),
  upload.single("file"),
  uploadImage
);


Route.put("/approve/:id", authenticate, authorizeRoles(ADMIN,SUPERADMIN), approveImage);
Route.put("/reject/:id", authenticate, authorizeRoles(ADMIN,SUPERADMIN), rejectImage);
Route.get("/getGalleryImages", getGallery);
Route.get(
  "/getPendingImages",
  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN),
  getPendingImages
);
Route.put(
  "/update/:id",
  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN, SCHOOL),
  updateImage
);
Route.delete(
  "/delete/:id",
  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN, SCHOOL),
  deleteImage
);

export default Route;
