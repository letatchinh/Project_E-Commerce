import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../Models/ProductModel.js";
import Review from "../Models/ReviewModel.js";
const ReviewRoutes = express.Router();
//GET ALL Review
ReviewRoutes.get(
  "/all",
  asyncHandler(async (req, res) => {
    try {
      const reviews = await Review.find({});
      res.json(reviews);
    } catch (error) {
      throw new Error("Not found reviews");
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
      const pageSize = 5;
      const page = Number(req.query.pageNumber) || 1;
      const count = await Review.find({
        product: req.params.id,
      }).countDocuments({});
      const reviews = await Review.find({ product: req.params.id })
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
export default ReviewRoutes;
