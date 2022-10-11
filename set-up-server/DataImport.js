import express from "express";
import User from "./Models/UserModel.js";
import users from "./data/users.js";
import Product from "./Models/ProductModel.js";
import products from "./data/Products.js";
import asyncHandler from "express-async-handler";
import Order from "./Models/OrderModel.js";
import orders from "./data/Order.js";
import ordersUser from "./data/Orderuser.js";
import listCartss from "./data/listCarts.js";
import Carts from "./Models/ListCartModel.js";
import Voucher from "./Models/VocherModel.js";
import vouches from "./data/Voucher.js";
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
    const importOrders = await Order.insertMany(orders);
    res.send({ importOrders });
  })
);
ImportData.post(
  "/listCartsUser",
  asyncHandler(async (req, res) => {
    await Carts.remove({});
    const importCarts = await Carts.insertMany(listCartss);
    res.send({ importCarts });
  })
);

ImportData.post(
  "/listVoucher",
  asyncHandler(async (req, res) => {
    await Voucher.remove({});
    const importVoucher = await Voucher.insertMany(vouches);
    res.send({ importVoucher });
  })
);
export default ImportData;
