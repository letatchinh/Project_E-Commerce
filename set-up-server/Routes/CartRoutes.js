import express from "express";
import asyncHandler from "express-async-handler";
import Carts from "../Models/ListCartModel.js";
const CartRoutes = express.Router();
//GET ALL CART
CartRoutes.get(
  "/all",
  asyncHandler(async (req, res) => {
try {
  const carts = await Carts.find({}).populate('product')
  res.json(carts);
} catch (error) {
  throw new Error("Not found cart")
}
  })
);
// FILTER CART
CartRoutes.get(
  "/filterCarts/:id",
  asyncHandler(async (req, res) => {
    const carts = await Carts.find({ user: req.params.id  }).populate('product').sort({ _id: -1 });
    
    res.json(carts);
    res.send(carts)
  })
);
// ADD CART
CartRoutes.post(
  "/add",
  asyncHandler(async (req, res) => {
    const {
      user,
      product,
    } = req.body;
    const carts = await Carts.findOne({ user: user , product : product });
    if(carts){
      res.status(404);
        throw new Error("Product Is Exits In Your");
    }
    else{
      const cart = new Carts({
        user: user,
        product : product
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
      const {
        user,
        product,
      } = req.body;
      const Cart = await Carts.findOne({user : user , product : product});

      if (Cart) {
        await Cart.remove();
        res.json({ message: "Cart deleted" });
      } else {
        res.status(404);
        throw new Error("Cart Not Found");
      }
    })
  )
  CartRoutes.delete(
    "/deleteById/:id",
    asyncHandler(async (req, res) => {
      const Cart = await Carts.findById({_id : req.params.id});

      if (Cart) {
        await Cart.remove();
        res.json({ message: "Cart deleted" });
      } else {
        res.status(404);
        throw new Error("Cart Not Found");
      }
    })
  )
export default CartRoutes;
