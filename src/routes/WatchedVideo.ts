import { Router } from "express";
import { 
    markVideoAsWatched, 
    getWatchedUsers, 
    getUserWatchedVideos, 
    getRecentWatchedVideos
} from "../controllers/watchedVideoController";
import { authenticate, authorizeRoles } from "../lib/Utils/Middleware";
import { ADMIN, INSTRUCTOR, SCHOOL, SUPERADMIN, USER } from "../lib/Utils/constants";

const Route: Router = Router();

// Mark video as watched
Route.post("/watched/:videoId", authenticate,authorizeRoles(ADMIN,SUPERADMIN,INSTRUCTOR,SCHOOL,USER), markVideoAsWatched);

// Get all users who watched a specific video
Route.get("/watchedUsers/:videoId",authenticate,authorizeRoles(ADMIN,SUPERADMIN,INSTRUCTOR), getWatchedUsers);

// Get all videos watched by the authenticated user
Route.get("/user", authenticate,getUserWatchedVideos);

Route.get("/recent", authenticate,getRecentWatchedVideos);

export default Route;
