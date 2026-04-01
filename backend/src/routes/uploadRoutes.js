import { Router } from "express";
import auth from "../middlewares/auth.js";
import requireAdmin from "../middlewares/requireAdmin.js";
import upload from "../middlewares/upload.js";
import { uploadImage } from "../controllers/uploadController.js";

const router = Router();

router.post("/images", auth, requireAdmin, upload.single("image"), uploadImage);

export default router;
