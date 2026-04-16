import express from "express";
import {
    getProducts,
    getProductsById,
    addProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductsById);
router.post("/", addProduct);

export default router;