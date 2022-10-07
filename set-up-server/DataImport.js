import express from "express";
import User from "./Models/UserModel.js";
import users from "./data/users.js";
import Product from "./Models/ProductModel.js";
import products from "./data/Products.js";
import asyncHandler from "express-async-handler";
import Order from "./Models/OrderModel.js";
import orders from "./data/Order.js";
import ordersUser from "./data/Orderuser.js";
const ImportData = express.Router();

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.deleteMany({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  })
);

ImportData.post(
  "/products",
  asyncHandler(async (req, res) => {
    await Product.remove({});
    const importProducts = await Product.insertMany(products);
    res.send({ importProducts });
  })
);
// ImportData.post(
//   "/categorys",
//   asyncHandler(async (req, res) => {
//     await Category.remove({});
//     const importCategorys = await Category.insertMany(categorys);
//     res.send({ importCategorys });
//   })
// );

ImportData.post(
  "/orderUser",
  asyncHandler(async (req, res) => {
    await Order.remove({});
    const importOrders = await Order.insertMany(ordersUser);
    res.send({ importOrders });
  })
);

export default ImportData;
