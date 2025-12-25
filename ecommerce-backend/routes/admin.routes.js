import { Router } from "express";
import { createAdminOrSubAdmin } from "../controllers/admin.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { allow } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/create-user", auth, allow("admin"), createAdminOrSubAdmin);

export default router;
