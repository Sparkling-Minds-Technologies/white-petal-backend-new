import { Router } from "express"
import { authenticate, authorizeRoles } from "../lib/Utils/Middleware";
const Route: Router = Router()

import { ADMIN, SCHOOL } from "../lib/Utils/constants";
import { approveUser, createUserByAdmin, forgotPassword, getApprovedUsers, getPendingUsers, getUserProfile, login, logout, register, rejectUserbyAdmin, RejectUsers, resetPassword, updateUserProfile } from "../controllers/authController";
import uploadImages from "../lib/Utils/uploadImages";


Route.post("/register",register)
Route.post("/login",login)
Route.post("/forgot-password",forgotPassword)
Route.post("/reset-password/:token",resetPassword)
Route.post("/logout",authenticate,logout)

// Users can see their own profile, and Admin can see any user's profile
Route.get("/profile", authenticate,getUserProfile);
Route.get("/profile/:userId", authenticate, authorizeRoles(ADMIN),getUserProfile);

Route.put("/update-profile/:userId",authenticate,uploadImages.single("profilePhoto"),updateUserProfile);

// Admin can approve instructor & school users
Route.put(
    "/approve-user/:userId",
    authenticate,
    authorizeRoles(ADMIN,SCHOOL),
    approveUser
  );

  // Admin can reject users
Route.delete(
  "/reject-user/:userId",
  authenticate,
  authorizeRoles(ADMIN), 
  rejectUserbyAdmin
);

// Get all users who approved
Route.get("/getAllApprovalUsers",  authenticate,
  authorizeRoles(ADMIN), getApprovedUsers);


  // Get all users who need approval
Route.get("/getAllPendingUsers",  authenticate,
  authorizeRoles(ADMIN), getPendingUsers);

  // Delete user permanently
Route.delete("/delete-user/:userId",  authenticate,
  authorizeRoles(ADMIN), RejectUsers);


  // Admin also can create instructor or school users
Route.post(
    "/create-user-by-admin",
    authenticate,
    authorizeRoles(ADMIN), 
    createUserByAdmin
  );


export default Route;
