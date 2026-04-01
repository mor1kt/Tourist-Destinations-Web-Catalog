import { Router } from "express";
import {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination
} from "../controllers/destinationsController.js";
import auth from "../middlewares/auth.js";
import requireAdmin from "../middlewares/requireAdmin.js";

const router = Router();

router.get("/", getDestinations);
router.get("/:id", getDestinationById);
router.post("/", auth, requireAdmin, createDestination);
router.put("/:id", auth, requireAdmin, updateDestination);
router.delete("/:id", auth, requireAdmin, deleteDestination);

export default router;
