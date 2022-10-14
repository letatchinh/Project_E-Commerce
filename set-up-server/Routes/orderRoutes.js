import express from "express";
import asyncHandler from "express-async-handler";
import { boolean, number } from "yup";
import Product from "../Models/ProductModel.js";
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
    const keyword = req.query.isPaid
      ? {
          isPaid: {
            $regex: req.query.isPaid,
            $options: "i",
          },
        }
      : {};
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Order.countDocuments({ ...keyword });
    const orders = await Order.find({ ...keyword })
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
    const ordersPaidS = await Order.find({ isPaid: req.query.isPaid }).populate(
      "user"
    );
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
// GET ORDER WITH ID USER
orderRouter.get(
  "/getOrderUser/:id",
  asyncHandler(async (req, res) => {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Order.countDocuments({ user: req.params.id });
    const Orders = await Order.find({ user: req.params.id })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ Orders, page, pages: Math.ceil(count / pageSize) });
  })
);
// GET ALL ORDER USER BY ID
orderRouter.get(
  "/getAllOrderUser/:id",
  asyncHandler(async (req, res) => {
    const Orders = await Order.find({ user: req.params.id }).sort({ _id: -1 });
    let ProductOrder = [];
    let listProductOrder = [];
    const pageSize = 2;
    const page = Number(req.query.page) || 1;
    await Orders.forEach((e) =>
      e.orderItem.forEach((f) => ProductOrder.push(f))
    );
    await ProductOrder.forEach((e) => listProductOrder.push(e.product));
    const count = await Product.countDocuments({
      _id: { $in: listProductOrder },
    });
    const ProductUser = await Product.find({ _id: { $in: listProductOrder } })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ ProductUser, page, pages: Math.ceil(count / pageSize) });
  })
);
// CHeck Is User paymented This Product
orderRouter.get(
  "/checkPayment/:id",
  asyncHandler(async (req, res) => {
    const name = req.query.product || "";
    const Orders = await Order.find({ user: req.params.id });
    let ProductOrder = [];
    let listProductOrder = [];
    Orders.forEach((e) => e.orderItem.forEach((f) => ProductOrder.push(f)));
    ProductOrder.forEach((e) => listProductOrder.push(e.product));
    const contains = listProductOrder.some((elem) => {
      return JSON.stringify(name) === JSON.stringify(elem);
    });
    if (contains) {
      res.json({ isPayment: true });
    } else {
      res.json({ isPayment: false });
    }
  })
);
// DELETE ORDER BY ID
orderRouter.delete(
  "/deleteById/:id",
  asyncHandler(async (req, res) => {
    const order = await Order.findById({ _id: req.params.id });

    if (order) {
      await order.remove();
      res.json({ message: "order deleted" });
    } else {
      res.status(404);
      throw new Error("order Not Found");
    }
  })
);
// DELETE ALL ORDER
orderRouter.post(
  "/deleteAll",
  asyncHandler(async (req, res) => {
    const order = await Order.deleteMany({});

    if (order) {
      res.json({ message: "order deleted" });
    } else {
      res.status(404);
      throw new Error("order Not Found");
    }
  })
);
export default orderRouter;
