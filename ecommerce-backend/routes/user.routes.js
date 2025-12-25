import { Router } from "express";
import * as c from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const r = Router();

r.put("/profile", auth, c.updateProfile);

export default r;
