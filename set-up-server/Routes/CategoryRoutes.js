import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "./../MiddelWare/AuthMiddleware.js";
import Category from "../Models/CategoryModel.js";

const categoryRoute = express.Router();

//CATEGORY GET ALL
categoryRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const categorys = await Category.find({}).sort({ _id: -1 });
    res.json({ categorys });
  })
);

//CREATE CATEGORY
categoryRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name } = req.body;
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      res.status(400);
      throw new Error("Category name already exist");
    } else {
      const category = new Category({
        name,
      });
      if (category) {
        const createdcategory = await category.save();
        res.status(201).json(createdcategory);
      } else {
        res.status(400);
        throw new Error("Invalid category data");
      }
    }
  })
);

//UPDATE PRODUCT
categoryRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name } = req.body;
    const category = await Category.findById(req.params.id);
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      res.status(400);
      throw new Error("Category name must be edit");
    } else if (category) {
      category.name = name || category.name;
      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404);
      throw new Error("Category Not Found");
    }
  })
);

//GET SINGLE CATEGORY
categoryRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404);
      throw new Error("Category Not Found");
    }
  })
);

export default categoryRoute;
