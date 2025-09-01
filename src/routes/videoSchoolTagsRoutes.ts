import { Router } from "express";
import {
  createVideoSchoolTags,
  getAllVideoSchoolTags,
  getVideoSchoolTagById,
  updateVideoSchoolTag,
  deleteVideoSchoolTag,
} from "../controllers/videoSchoolTagsController";
import { authenticate, authorizeRoles } from "../lib/Utils/Middleware";
import { SCHOOL } from "../lib/Utils/constants";

const router = Router();

router.post("/", authenticate, authorizeRoles(SCHOOL), createVideoSchoolTags);
router.get("/", authenticate, authorizeRoles(SCHOOL), getAllVideoSchoolTags);
router.get("/:id", authenticate, authorizeRoles(SCHOOL), getVideoSchoolTagById);
router.put("/:id", authenticate, authorizeRoles(SCHOOL), updateVideoSchoolTag);
router.delete("/:id", authenticate, authorizeRoles(SCHOOL), deleteVideoSchoolTag);

export default router;
