import express from "express";

import { authenticate } from "../middlewares/index.js";
import { pinsController } from "../controllers/index.js";

const router = express.Router();

router.get("/", pinsController.fetchAllPins);

router.post("/", authenticate, pinsController.createPin);

router.delete("/:id", authenticate, pinsController.deletePin);

export default router;
