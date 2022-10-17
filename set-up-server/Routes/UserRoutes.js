import express from "express";
import asyncHandler from "express-async-handler";
// import protects from "../MiddelWare/AuthMiddleware.js";
// pro
import generateToken from "../utils/generateToken.js";
import User from "../Models/UserModel.js";
import { protect, admin } from "../MiddelWare/AuthMiddleware.js";
import { trusted } from "mongoose";

const userRouter = express.Router();

// LOGIN
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

userRouter.post(
  "/loginUser",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user.active) {
      res.status(401);
      throw new Error("User Has Been Disable Please Contact Us ");
    } else if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

//REGISTER
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.idAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);
// LOGIN WITH FB AND GG
userRouter.post(
  "/check",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      const newUser = await User.create({
        name,
        email,
        password,
      });
      res.status(201).json({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: false,
        token: generateToken(newUser._id),
        createdAt: newUser.createdAt,
      });
    }
  })
);
// PROFILE

// userRouter.get(
//   "/profileUser",
//   (async (req, res) => {
//     const user = await User.find({});

//       res.json(
//         user
//       );

//   })
// );

//UPDATE PROFILE
userRouter.put(
  "/profile",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        createdAt: updateUser.createdAt,
        token: generateToken(updateUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// RESET PASSWORD
userRouter.put(
  "/resetPassword",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (password) {
        user.password = password;
      }
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        createdAt: updateUser.createdAt,
        token: generateToken(updateUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);
userRouter.get(
  "/getId/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  })
);
//get id user

//USER DISABLED
userRouter.put(
  "/:id/disabled",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.active = false;
      const updateUser = await user.save();
      res.json(updateUser);
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  })
);

//USER ACTVIVE
userRouter.put(
  "/:id/active",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.active = true;
      const updateActiveUser = await user.save();
      res.json(updateActiveUser);
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  })
);

userRouter.put(
  "/profileUser/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        createdAt: updateUser.createdAt,
        token: generateToken(updateUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);
// GET ALL USER ADMIN
userRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const keyword = req.query.name
      ? {
          name: {
            $regex: req.query.name,
            $options: "i",
          },
        }
      : {};
    const pageSize = 7;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.countDocuments({ ...keyword });
    const users = await User.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ users, page, pages: Math.ceil(count / pageSize) });
  })
);

//ADMIN GET ALL ORDERS
userRouter.get(
  "/allActive",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const userListActive = await User.find({ active: req.query.active });
    // const orders = orders1.filter((e) => e.user.name.includes(req.query.name));

    res.json({ userListActive });
  })
);

userRouter.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

//GET SINGLE USER SEND MAIL
userRouter.get(
  "/:id/sendMail",
  asyncHandler(async (req, res) => {
    const userMail = await User.findById(req.params.id);
    if (userMail) {
      res.json(userMail);
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  })
);
export default userRouter;
