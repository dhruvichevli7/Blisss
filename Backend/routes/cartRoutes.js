import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

// Add product to cart
router.post("/", protect, addToCart);

// Get logged-in user's cart
router.get("/", protect, getCart);

// Update quantity
router.put("/", protect, updateCartQuantity);

// Remove product from carta
router.delete("/:productId", protect, removeFromCart);

export default router;