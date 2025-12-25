import { Router } from "express";
import * as c from "../controllers/review.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const r = Router();

r.post("/", auth, c.add);
r.get("/:productId", c.get);

export default r;
