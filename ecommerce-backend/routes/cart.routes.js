import { Router } from "express";
import * as c from "../controllers/cart.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const r = Router();

r.post("/", auth, c.add);
r.get("/", auth, c.get);

export default r;
