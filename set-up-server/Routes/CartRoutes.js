import express from "express";
import asyncHandler from "express-async-handler";
import Carts from "../Models/ListCartModel.js";
import { admin, protect } from "./../MiddelWare/AuthMiddleware.js";
import Order from "./../Models/OrderModel.js";

const CartRoutes = express.Router();

//CREATE ORDER
// CartRoutes.post(
//   "/",
//   protect,
//   asyncHandler(async (req, res) => {
//     const {
//       orderItem,
//       shippingAddress,
//       paymentMethod,
//       itemsPrice,
//       taxPrice,
//       shippingPrice,
//       totalPrice,
//     } = req.body;

//     if (orderItem && orderItem.length === 0) {
//       res.status(400);
//       throw new Error("No order items");
//     } else {
//       const order = new Order({
//         user: req.user._id,
//         orderItem,
//         shippingAddress,
//         paymentMethod,
//         itemsPrice,
//         taxPrice,
//         shippingPrice,
//         totalPrice,
//       });

//       const createOrder = await order.save();
//       res.status(201).json(createOrder);
//     }
//   })
// );

//GET ALL CART
CartRoutes.get(
  "/all",
  asyncHandler(async (req, res) => {
try {
  const carts = await Carts.find({}).sort({ _id: -1 })
  res.json(carts);
} catch (error) {
  throw new Error("Not found cart")
}
  })
);
CartRoutes.get(
  "/filterCarts/:id",
  asyncHandler(async (req, res) => {
    const carts = await Carts.find({ user: req.params.id }).sort({ _id: -1 });
    res.json(carts);
  })
);
// ADD CART
CartRoutes.post(
  "/add",
  asyncHandler(async (req, res) => {
    const {
      user,
      product
    } = req.body;
      const cart = new Carts({
        user: user,
        product : product
      });
      const createCart = await cart.save();
      res.status(201).json(createCart);
  })
);

// DETELE CART
CartRoutes.delete(
    "/delete/:id",
    asyncHandler(async (req, res) => {
      const Cart = await Carts.findById(req.params.id);
      if (Cart) {
        await Cart.remove();
        res.json({ message: "Cart deleted" });
      } else {
        res.status(404);
        throw new Error("Cart Not Found");
      }
    })
  )
//USER LOGIN ORDERS
// CartRoutes.get(
//   "/",
//   protect,
//   asyncHandler(async (req, res) => {
//     const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
//     res.json(order);
//   })
// );

// //GET ORDER BY ID
// CartRoutes.get(
//   "/:id",
//   protect,
//   admin,
//   asyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id).populate(
//       "user",
//       "name email"
//     );
//     if (order) {
//       res.json(order);
//     } else {
//       res.status(404);
//       throw new Error("Order Not Email");
//     }
//   })
// );
export default CartRoutes;
