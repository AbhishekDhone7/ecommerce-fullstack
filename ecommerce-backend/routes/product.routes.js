import { Router } from "express";
import * as c from "../controllers/product.controller.js";
import { auth, role } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", c.getProducts);
router.get("/:id", c.getProductById);
router.post("/", auth, role(["admin", "sub-admin"]), c.createProduct);
router.put("/:id", auth, role(["admin", "sub-admin"]), c.updateProduct);
router.delete("/:id", auth, role(["admin"]), c.deleteProduct);

export default router;
