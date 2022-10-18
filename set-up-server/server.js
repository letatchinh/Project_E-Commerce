import express from "express";
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

dotenv.config();
connnectDatabase();
const app = express();
app.use(express.json());

// // LOAD PRODUCT FROM SERVER
// app.get("/api/products", (req, res) => {
//   res.json(products);
// });

// // // LOAD USER FROM SERVER
// app.get("/api/user", (req, res) => {
//   res.json(users);
// });

// // SINGLE PRODUCT FROM SERVER
// app.get("/api/products/:id", (req, res) => {
//   const product = products.find((p) => p._id === req.params.id);
//   res.json(product);
// });

//API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/carts", CartRoutes);
app.use("/api/reviews", ReviewRoutes);
app.get("/api/config/paypal",(req,res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
})
//ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
