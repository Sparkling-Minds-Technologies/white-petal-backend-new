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
import { ADMIN, SCHOOL } from "../lib/Utils/constants";


const Route: Router = Router();

Route.post(
  "/upload",
  authenticate,
  authorizeRoles(ADMIN, SCHOOL),
  upload.single("file"),
  uploadImage
);


Route.put("/approve/:id", authenticate, authorizeRoles(ADMIN), approveImage);
Route.put("/reject/:id", authenticate, authorizeRoles(ADMIN), rejectImage);
Route.get("/getGalleryImages", getGallery);
Route.get(
  "/getPendingImages",
  authenticate,
  authorizeRoles(ADMIN),
  getPendingImages
);
Route.put(
  "/update/:id",
  authenticate,
  authorizeRoles(ADMIN, SCHOOL),
  updateImage
);
Route.delete(
  "/delete/:id",
  authenticate,
  authorizeRoles(ADMIN, SCHOOL),
  deleteImage
);

export default Route;
