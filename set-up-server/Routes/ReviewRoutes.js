import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "../MiddelWare/AuthMiddleware.js";
import Product from "../Models/ProductModel.js";
import Review from "../Models/ReviewModel.js";
const ReviewRoutes = express.Router();
ReviewRoutes.delete(
  "/deleteAll",
  asyncHandler(async (req, res) => {
    await Review.deleteMany({});
      res.json({ message: "deleted" });
  })
);
//USER

//GET ALL Review
ReviewRoutes.get(
  "/all",
  asyncHandler(async (req, res) => {
    try {
      const reviews = await Review.find({});
      res.json(reviews);
    } catch (error) {
      throw new Error("Not found reviews , Pls Check Again");
    }
  })
);

ReviewRoutes.post(
  "/add",
  asyncHandler(async (req, res) => {
    try {
      const { name, rating, comment, user, product } = req.body;
      const review = new Review({
        user: user,
        product: product,
        rating: rating,
        comment: comment,
        name: name,
      });
      const createReview = await review.save();
      res.status(201).json(createReview);
    } catch (error) {
      throw new Error("Not found reviews");
    }
  })
);
ReviewRoutes.get(
  "/getReviewByIdProduct/:id",
  asyncHandler(async (req, res) => {
    try {
      const pageSize = Number(req.query.limit) || 1;
      const page = Number(req.query.page) || 1;
      const count = await Review.find({
        product: req.params.id,
      }).countDocuments({});
      const reviews = await Review.find({
        product: req.params.id,
        active: true,
      })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ _id: -1 });
      res.json({ reviews, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
      throw new Error("Not found reviews");
    }
  })
);
// GET AVG REVIEW
ReviewRoutes.get(
  "/SumReviewByIdProduct/:id",
  asyncHandler(async (req, res) => {
    try {
      const reviews = await Review.find({ product: req.params.id });
      const totalReview = await Review.countDocuments({
        product: req.params.id,
      });
      const avgReview = (
        reviews.reduce((sum, agv) => sum + agv.rating, 0) / reviews.length
      ).toFixed(1);
      const newProduct = await Product.findById(req.params.id);
      if (newProduct) {
        newProduct.rating = avgReview || 0;
        newProduct.numReviews = totalReview || 0;
        const updatedProduct = await newProduct.save();
        res.json({ avgReview, totalReview, updatedProduct });
      } else {
        res.status(404);
        throw new Error("Not Found Product");
      }
    } catch (error) {
      throw new Error("Not found Sum reviews");
    }
  })
);

//ADMIN

//ADMIN GET ALL REVIEW WITH PAGEGINATION FILTER NAME ACTIVE
ReviewRoutes.get(
  "/allReview",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const keywordActive = req.query.keywordActive
      ? {
          active: req.query.keywordActive,
        }
      : {};
    const ratings = req.query.sortRating || null;
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Review.countDocuments({
      ...keyword,
      ...keywordActive,
    });
    const reviews = await Review.find({
      ...keyword,
      ...keywordActive,
    })
      .populate("product")
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(!ratings ? { _id: -1 } : { rating: ratings });
    res.json({
      reviews,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  })
);

//DELETE REVIEW
ReviewRoutes.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (review) {
      await review.remove();
      res.json({ message: "Review deleted" });
    } else {
      res.status(404);
      throw new Error("Review Not Found");
    }
  })
);

//REVIEW DISABLED
ReviewRoutes.put(
  "/:id/disabled",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (review) {
      review.active = false;
      const updateReview = await review.save();
      res.json(updateReview);
    } else {
      res.status(404);
      throw new Error("Review Not Found");
    }
  })
);

//REVIEW active
ReviewRoutes.put(
  "/:id/active",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (review) {
      review.active = true;
      const updateReview = await review.save();
      res.json(updateReview);
    } else {
      res.status(404);
      throw new Error("Review Not Found");
    }
  })
);

export default ReviewRoutes;
