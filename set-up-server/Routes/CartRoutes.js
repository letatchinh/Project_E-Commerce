import express from "express";
import asyncHandler from "express-async-handler";
import Carts from "../Models/ListCartModel.js";
const CartRoutes = express.Router();

//GET ALL CART
CartRoutes.get(
  "/all",
  asyncHandler(async (req, res) => {
    try {
      const carts = await Carts.find({}).populate("product");
      res.json(carts);
    } catch (error) {
      throw new Error("Not found cart");
    }
  })
);
// FILTER CART
CartRoutes.get(
  "/filterCarts/:id",
  asyncHandler(async (req, res) => {
    const pageSize = 5;
    const carts = await Carts.find({ user: req.params.id })
      .populate("product")
      .sort({ _id: -1 })
      .limit(pageSize)
      .skip(0);
    const count = await Carts.countDocuments({ user: req.params.id });
    const allCarts = await Carts.find({ user: req.params.id })
      .populate("product")
      .sort({ _id: -1 });
    res.json({ carts, count, allCarts });
  })
);
// ADD CART
CartRoutes.post(
  "/add",
  asyncHandler(async (req, res) => {
    const { user, product } = req.body;
    const carts = await Carts.findOne({ user: user, product: product });
    if (carts) {
      res.status(404);
      throw new Error("Product is exist in your cart");
    } else {
      const cart = new Carts({
        user: user,
        product: product,
      });
      const createCart = await cart.save();
      res.status(201).json(createCart);
    }
  })
);

// DETELE CART
CartRoutes.post(
  "/delete",
  asyncHandler(async (req, res) => {
    const { user, product } = req.body;
    const Cart = await Carts.findOne({ user: user, product: product });
    if (Cart) {
      await Cart.remove();
      res.json({ message: "Cart deleted" });
    } else {
      res.status(404);
      throw new Error("Cart Not Found");
    }
  })
);
// DETELE ALL CART
CartRoutes.post(
  "/deleteAll/:id",
  asyncHandler(async (req, res) => {
    const Cart = await Carts.remove({ user: req.params.id });
    if (Cart) {
      res.json({ message: "All cart deleted", Cart });
    } else {
      res.status(404);
      throw new Error("Cart Not Found");
    }
  })
);
CartRoutes.post(
  "/deleteMany/:id",
  asyncHandler(async (req, res) => {
    const Cart = await Carts.remove({
      user: req.params.id,
      product: { $in: req.body },
    });
    if (Cart) {
      res.json(Cart);
    } else {
      res.status(404);
      throw new Error("Cart Not Found");
    }
  })
);
CartRoutes.delete(
  "/deleteById/:id",
  asyncHandler(async (req, res) => {
    const Cart = await Carts.findById({ _id: req.params.id });

    if (Cart) {
      await Cart.remove();
      res.json({ message: "Cart deleted" });
    } else {
      res.status(404);
      throw new Error("Cart Not Found");
    }
  })
);
CartRoutes.delete(
  "/deleteAll",
  asyncHandler(async (req, res) => {
    await Carts.deleteMany({});
      res.json({ message: "Cart deleted" });
  })
);
export default CartRoutes;
