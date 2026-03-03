import { Router } from "express";

import {
  createProduct,
  getAllProducts,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/", getAllProducts);
router.get("/my", requireAuth(), getMyProducts);
router.get("/:id", getProductById);

router.post("/", requireAuth(), createProduct);

router.put("/:id", requireAuth(), updateProduct);

router.delete("/:id", requireAuth(), deleteProduct);
export default router;
