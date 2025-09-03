import express from "express";
import { requestProgram, getAllProgramRequests, updateProgramStatus, } from "../controllers/programController";
import { authenticate, authorizeRoles } from "../lib/Utils/Middleware";
import { ADMIN, SCHOOL, SUPERADMIN } from "../lib/Utils/constants";


const router = express.Router();

router.post("", authenticate,authorizeRoles(ADMIN,SUPERADMIN, SCHOOL), requestProgram);
router.get("/allPrograms", authenticate, authorizeRoles(ADMIN,SUPERADMIN, SCHOOL), getAllProgramRequests);
router.put("/:id", authenticate, authorizeRoles(ADMIN,SUPERADMIN), updateProgramStatus);

export default router;
