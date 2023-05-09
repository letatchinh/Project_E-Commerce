import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../Models/ProductModel.js";
import { admin, protect } from "./../MiddelWare/AuthMiddleware.js";
import Order from "./../Models/OrderModel.js";

const orderRouter = express.Router();
orderRouter.delete(
  "/deleteAll",
  asyncHandler(async (req, res) => {
    await Order.deleteMany({});
      res.json({ message: "deleted" });
  })
);
// USER

//CREATE ORDER
orderRouter.post(
  "/create",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItem,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      voucher,
      isPaid,
      shippingPrice,
      totalPrice,
      priceBill
    } = req.body;
    if (orderItem && orderItem.length === 0) {
      res.status(400);
      console.log('OK1');
      throw new Error("No order items");
    } else {
      console.log('OK2');
      const order = new Order({
        user: req.user._id,
        orderItem,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        isPaid,
        voucher,
        shippingPrice,
        totalPrice,
        priceBill
      });

      const createOrder = await order.save();
      res.status(201).json(createOrder);
    }
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

//ADMIN

//ADMIN GET ALL ORDERS NO PAGINATION
orderRouter.get(
  "/allOrderNotice",
  asyncHandler(async (req, res) => {
    const ordersNotice = await Order.find({}).populate("user");
    res.json({ ordersNotice });
  })
);

//ADMIN GET ALL ORDERS WITH PAGENATION
orderRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Order.countDocuments({});
    const orders = await Order.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 })
      .populate("user", "id name email");
    res.json({ orders, page, pages: Math.ceil(count / pageSize), count });
  })
);

//ADMIN GET ALL ORDERS FILTER PAID AND DELIVERED
orderRouter.get(
  "/allPaidS",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const isPaid = req.query.isPaid
      ? {
          isPaid: req.query.isPaid,
        }
      : {};
    const isDelivered = req.query.isDelivered
      ? {
          isDelivered: req.query.isDelivered,
        }
      : {};
    const totalPrice = req.query.totalPrice
      ? {
          totalPrice: { $gte: req.query.totalPrice },
        }
      : {};
    const ordersPaidS = await Order.find({
      ...isPaid,
      ...isDelivered,
      ...totalPrice,
    }).populate("user");
    res.json({ ordersPaidS });
  })
);

//ADMIN GET ALL ORDERS FILTER NAME HAS PAGENATION
orderRouter.get(
  "/allOrder",
  // protect,
  // admin,
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
      orders,
      ordersFilter,
      pageFiter,
      pagesFiter: Math.ceil(count / pageSize),
    });
  })
);

//ADMIN GET ORDER BY ID
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

//ORDER IS PAID (ADMIN USE)
orderRouter.put(
  "/:id/delivered",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.isPaid = true;
      order.deliveredAt = Date.now();

      const updateOrder = await order.save();
      res.json(updateOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

//NOTICE ORDERS (ADMIN USE)
orderRouter.put(
  "/all/watched",
  asyncHandler(async (req, res) => {
    const orderWatch = await Order.updateMany({ watched: true });
    if (orderWatch) {
      res.json(orderWatch);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

//Admin statistical
orderRouter.get(
  "/all/statics",
  asyncHandler(async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'Users'
        }
      },
      // Unwind the user array
      { $unwind: '$Users' },
      {
        $match:{
          deliveredAt:{$exists:true},
          deliveredAt:{$gte:new Date(startDate),$lte:new Date(endDate)}
        }
      },
      // {
      //   $group:{
      //     _id:'$Users',
      //     user:{$first:'$Users'},
      //     // shippingAddress:{$first:'$shippingAddress'},
      //     paymentMethod:{$first:'$paymentMethod'},
      //     taxPrice:{$first:'$taxPrice'},
      //     totalAmount:{$sum:'$totalPrice'},
      //     voucher:{$first:'$voucher'},
      //     isPaid:{$first:'$isPaid'},
      //     isDelivered:{$first:'$isDelivered'},
      //     watched:{$first:'$watched'},
      //     createdAt:{$first:'$createdAt'},
      //     deliveredAt:{$first:'$deliveredAt'},
      //   }
        
      // },

  ])
  const sumOrders = await Order.aggregate([
    {
      $match:{
        deliveredAt:{$exists:true},
        deliveredAt:{$gte:new Date(startDate),$lte:new Date(endDate)}
      }
    },
    {
      $group:{
        _id:'',
        totalAmount:{$sum:'$totalPrice'},
        totalShip:{$sum:'$shippingPrice'},
        totalSale:{$sum:'$taxPrice'},
        count: { $sum: 1 },
      }
    },

])
    res.status(200).send({orders,sumOrders:sumOrders[0]});
   
  })
);

export default orderRouter;
