import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connnectDatabase from "./config/MongoDB.js";
import ImportData from "./DataImport.js";
// import products from "./data/Products.js";
// import users from "./data/users.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./MiddelWare/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import CartRoutes from "./Routes/CartRoutes.js";
import ReviewRoutes from "./Routes/ReviewRoutes.js";
import categoryRoute from "./Routes/CategoryRoutes.js";
import VoucherRoutes from "./Routes/VoucherRoutes.js";
// import socket from "socket.io";
// import { Server } from "socket.io";
// import { createServer } from "http";
// import Order from "./Models/OrderModel.js";

dotenv.config();
connnectDatabase();
const app = express();
app.use(express.json());
app.use(cors());

//API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/categorys", categoryRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/carts", CartRoutes);
app.use("/api/reviews", ReviewRoutes);
app.use("/api/vouchers", VoucherRoutes);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
//ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));

// io.on('connnection',(socket)=>{
//   console.log("a user connected");
//   socket.emit('message',"Hello");
//   socket.on('disconnected',()=>{
//     console.log('user disconnected');
//   })
//   socket.on('chatmessage',alrtOrder=>{
//     const order = new Order
//     io.emit("message",order)
//   })
// })
// global.onlineUsers = new Map();
// io.on("connection",(socket)=>)
