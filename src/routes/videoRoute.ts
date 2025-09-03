import { Router } from "express";
import { deleteVideo, getAllVideos, getVideoById, updateVideo, uploadVideo,getInstructorProfile, addTags, removeTags, updateTags, getAllVideosWithSchoolTags } from "../controllers/videoController";
import {upload }from "../lib/Utils/multer"; // Import Multer config
import { authenticate, authorizeRoles } from "../lib/Utils/Middleware";
import { ADMIN, INSTRUCTOR, SCHOOL, SUPERADMIN, USER } from "../lib/Utils/constants";

const Route: Router = Router();



// Role-based access for video routes
Route.post("/upload", authenticate,
authorizeRoles(ADMIN,SUPERADMIN, INSTRUCTOR),
    upload, // Use updated multer middleware
    uploadVideo
); // Admin & Instructor can upload
Route.get("/getSingleVideo/:id", authenticate, authorizeRoles(ADMIN,SUPERADMIN, USER, SCHOOL, INSTRUCTOR), getVideoById); // Everyone can see Video List Display (Thumbnails & Titles)
Route.get("/getAllVideos", authenticate, authorizeRoles(ADMIN,SUPERADMIN, USER, SCHOOL, INSTRUCTOR), getAllVideos); // Video List Display (Thumbnails & Titles) or Everyone can view all videos
Route.put("/updateVideo/:id", authenticate, authorizeRoles(ADMIN,SUPERADMIN, INSTRUCTOR), upload, updateVideo); // Only Admin & Instructor can update
Route.delete("/deleteVideo/:id", authenticate, authorizeRoles(ADMIN,SUPERADMIN, INSTRUCTOR), deleteVideo); // Only Admin & Instructor can delete
Route.get("/instructorProfile/:id", authenticate, authorizeRoles(ADMIN,SUPERADMIN, USER, SCHOOL, INSTRUCTOR), getInstructorProfile); // Instructor Profile Display
Route.patch("/:videoId/tags/add", authenticate, authorizeRoles(ADMIN,SUPERADMIN), addTags);
Route.patch("/:videoId/tags/remove", authenticate, authorizeRoles(ADMIN,SUPERADMIN), removeTags);
Route.put("/:videoId/tags/update", authenticate, authorizeRoles(ADMIN,SUPERADMIN), updateTags);
Route.get("/withSchoolTags", authenticate, authorizeRoles(ADMIN,SUPERADMIN,SCHOOL), getAllVideosWithSchoolTags);


export default Route;
