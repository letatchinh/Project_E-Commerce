import express from "express";
import asyncHandler from "express-async-handler";
// import protects from "../MiddelWare/AuthMiddleware.js";
// pro
import generateToken from "../utils/generateToken.js";
import User from "../Models/UserModel.js";
import { protect, admin } from "../MiddelWare/AuthMiddleware.js";
import mongoose, { trusted } from "mongoose";

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
        address: user.address,
        avatar: user.avatar,
        listVoucher: user.listVoucher || [],
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
        listVoucher: user.listVoucher || [],
        address : user.address,
        avatar:user.avatar,
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
    const { name, email, password ,address , avatar,listVoucher } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      address,
      avatar,
      listVoucher
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        avatar: user.avatar,
        listVoucher: user.listVoucher || [],
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
      if (!user.active) {
        res.status(401);
        throw new Error("User Has Been Disable Please Contact Us ");
      }else{
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          address : user.address || "",
          avatar : user.avatar || "",
          isAdmin: user.isAdmin,
          listVoucher: user.listVoucher || [],
          token: generateToken(user._id),
          createdAt: user.createdAt,
        });
      }
      
    } else {
      const newUser = await User.create({
        name,
      email,
      password,
      address : "",
      avatar : "",
      listVoucher : []
      });
      res.status(201).json({
        _id : newUser._id,
        name: newUser.name,
        email: newUser.email,
        address : newUser.address || "",
        avatar : newUser.avatar,
        listVoucher : newUser.listVoucher || [],
        isAdmin: false,
        token: generateToken(newUser._id),
        createdAt: newUser.createdAt,
      });
    }
  })
);

//UPDATE PROFILE
userRouter.put(
  "/profile",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.address = req.body.address || user.address;
      user.listVoucher = [...user.listVoucher,req.body.newVoucher] || user.listVoucher;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        address: updateUser.address,
        avatar: updateUser.avatar,
        isAdmin: updateUser.isAdmin,
        listVoucher: updateUser.listVoucher,
        createdAt: updateUser.createdAt,
        token: generateToken(updateUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

//ADD NEW VOUCHER
userRouter.put(
  "/addNewVoucher/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    const newVoucher = req.body.newVoucher
    if(user){
            user.listVoucher = [...user.listVoucher,{voucher : newVoucher}] || user.listVoucher;
            const updateUser = await user.save();
            res.json(updateUser)
    }
    else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);
//get Voucher By id user
userRouter.get(
  "/getVoucherUser/:id",
  asyncHandler(async (req, res) => {
    const user =   await User.findById(req.params.id).populate({
      path : 'listVoucher.voucher',
      select: 'name discount image'
    });
    const listVoucher = user.listVoucher
    const listVouchers = listVoucher.map(e => (e.voucher))
    res.json(listVouchers)
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
        address: updateUser.address,
        listVoucher: updateUser.listVoucher,
        avatar: updateUser.avatar,
        createdAt: updateUser.createdAt,
        token: generateToken(updateUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);
//get id user
userRouter.get(
  "/getId/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user)
  })
);



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
// EDIT USER
userRouter.put(
  "/profileUser/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.address = req.body.address || user.address;
      user.avatar = req.body.avatar || user.avatar;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        address: updateUser.address,
        avatar: updateUser.avatar,
        listVoucher: updateUser.listVoucher,
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
// ADD VOUCHER FOR USER
userRouter.put(
  "/addVoucher/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    const newvoucher = mongoose.Types.ObjectId(req.body.IdnewVoucher);
    if (user) {
      const isHave = user.listVoucher.some(e => JSON.stringify(e.voucher)===JSON.stringify(newvoucher))
      if(isHave){
       res.status(401);
       throw new Error("This voucher is Exist in your Bag")
      }
      else{
        user.listVoucher = [...user.listVoucher,{voucher : newvoucher}] || user.listVoucher;
        const updateUser = await user.save();
        res.json(updateUser)
    } 
  }
  else {
    res.status(404);
    throw new Error("User not found");
  }})
);
// REMOVE VOUCHER FOR USER
userRouter.put(
  "/removeVoucher/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    const newvoucher = mongoose.Types.ObjectId(req.body.IdnewVoucher);
    if (user) {
  
      user.listVoucher =  user.listVoucher.filter(e => JSON.stringify(e.voucher) !== JSON.stringify(newvoucher))
        const updateUser = await user.save();
        res.json(updateUser)
    
  }
  else {
    res.status(404);
    throw new Error("User not found");
  }})
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
