import User from "../models/User.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const user = await User.findById(req.user._id);

    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ product: productId, quantity: 1 });
    }

    await user.save();

    res.status(200).json({
      message: "Product added to cart",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "cart.product",
        model: "Product",
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.cart || []);

    }catch (error) {
      s
    console.error("GET CART ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity < 1) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const user = await User.findById(req.user._id);

    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cartItem.quantity = quantity;
    await user.save();

    res.status(200).json({
      message: "Cart updated",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();

    res.status(200).json({
      message: "Item removed from cart",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};