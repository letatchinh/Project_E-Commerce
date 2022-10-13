import express from "express";
import asyncHandler from "express-async-handler";
import { boolean } from "yup";
import { admin, protect } from "./../MiddelWare/AuthMiddleware.js";
import Order from "./../Models/OrderModel.js";

const orderRouter = express.Router();

//CREATE ORDER
orderRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItem,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      isPaid,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItem && orderItem.length === 0) {
      res.status(400);
      throw new Error("No order items");
    } else {
      const order = new Order({
        user: req.user._id,
        orderItem,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        isPaid,
        shippingPrice,
        totalPrice,
      });

      const createOrder = await order.save();
      res.status(201).json(createOrder);
    }
  })
);

//ADMIN GET ALL ORDERS
orderRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Order.countDocuments({});
    const orders = await Order.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 })
      .populate("user", "id name email");
    // const orders = orders1.filter((e) => e.user.name.includes(req.query.name));
    res.json({ orders, page, pages: Math.ceil(count / pageSize) });
  })
);
//ADMIN GET ALL ORDERS
orderRouter.get(
  "/allPaidS",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const ordersPaidS = await Order.find({ isPaid: true }).populate("user");
    // const orders = orders1.filter((e) => e.user.name.includes(req.query.name));
    res.json({ ordersPaidS });
  })
);

//ADMIN GET ALL ORDERS
orderRouter.get(
  "/allOrder",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const pageSize = 10;
    const pageFiter = Number(req.query.pageNumber) || 1;
    const count = await Order.countDocuments({});
    const orders = await Order.find({})
      .limit(pageSize)
      .skip(pageSize * (pageFiter - 1))
      .sort({ _id: -1 })
      .populate("user", "id name email");
    const ordersFilter = orders.filter((e) =>
      e.user.name.includes(req.query.name)
    );
    res.json({
      ordersFilter,
      pageFiter,
      pagesFiter: Math.ceil(count / pageSize),
    });
  })
);

//USER LOGIN ORDERS
orderRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    res.json(order);
  })
);

//GET ORDER BY ID
orderRouter.get(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order Not Email");
    }
  })
);

//ORDER IS PAID
orderRouter.put(
  "/:id/pay",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updateOrder = await order.save();
      res.json(updateOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

//ORDER IS PAID
orderRouter.put(
  "/:id/delivered",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updateOrder = await order.save();
      res.json(updateOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);
export default orderRouter;
