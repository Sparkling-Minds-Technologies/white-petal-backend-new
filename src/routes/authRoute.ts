import { Router } from "express"
import { authenticate, authorizeRoles } from "../lib/Utils/Middleware";
const Route: Router = Router()

import { ADMIN, SCHOOL, SUPERADMIN } from "../lib/Utils/constants";
import { approveUser, createUserByAdmin, forgotPassword, getApprovedUsers, getPendingUsers, getUserProfile, login, logout, register, rejectUserbyAdmin, RejectUsers, resetPassword, updateAllowedTabs, updateUserProfile } from "../controllers/authController";
import uploadImages from "../lib/Utils/uploadImages";


Route.post("/register",register)
Route.post("/login",login)
Route.post("/forgot-password",forgotPassword)
Route.post("/reset-password/:token",resetPassword)
Route.post("/logout",authenticate,logout)

// Users can see their own profile, and Admin can see any user's profile
Route.get("/profile", authenticate,getUserProfile);
Route.get("/profile/:userId", authenticate, authorizeRoles(ADMIN,SUPERADMIN),getUserProfile);

Route.put("/update-profile/:userId",authenticate,uploadImages.single("profilePhoto"),updateUserProfile);

// Admin can approve instructor & school users
Route.put(
    "/approve-user/:userId",
    authenticate,
    authorizeRoles(ADMIN,SUPERADMIN,SCHOOL),
    approveUser
  );

  // Admin can reject users
Route.delete(
  "/reject-user/:userId",
  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN), 
  rejectUserbyAdmin
);

// Get all users who approved
Route.get("/getAllApprovalUsers",  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN), getApprovedUsers);


// Get all users who need approval
Route.get("/getAllPendingUsers",  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN), getPendingUsers);

// Delete user permanently
Route.delete("/delete-user/:userId",  authenticate,
  authorizeRoles(ADMIN,SUPERADMIN), RejectUsers);


// Admin also can create instructor or school users
Route.post(
    "/create-user-by-admin",
    authenticate,
    authorizeRoles(ADMIN,SUPERADMIN), 
    createUserByAdmin
  );

Route.put("/:userId/allowedTabs",authenticate,authorizeRoles(SUPERADMIN),updateAllowedTabs);

export default Route;
