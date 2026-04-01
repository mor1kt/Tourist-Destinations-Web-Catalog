import { Router } from "express";
import { getAdminStats } from "../controllers/adminController.js";
import auth from "../middlewares/auth.js";
import requireAdmin from "../middlewares/requireAdmin.js";

const router = Router();

router.get("/stats", auth, requireAdmin, getAdminStats);

export default router;
