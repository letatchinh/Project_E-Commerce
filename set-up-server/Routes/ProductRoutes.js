import express from "express";
import asyncHandler from "express-async-handler";
import Product from "./../Models/ProductModel.js";
import { admin, protect } from "./../MiddelWare/AuthMiddleware.js";

const productRoute = express.Router();

//GET ALL PRODUCT
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 });
    const length = products.length;
    res.json(length);
  })
);

productRoute.get(
  "/search",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const name = req.query.name || "";
    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};

    const category = req.query.category || "";
    const categoryFilter = category
      ? { category: { $regex: category, $options: "i" } }
      : {};
    const sortPrice = Number(req.query.sortPrice);
    const sortRating = Number(req.query.sortRating);
    const rangeFilterGte = Number(req.query.rangeFilterGte) || null;
    const rangeFilterLte = Number(req.query.rangeFilterLte) || null;
    const page = Number(req.query.page) || 1;
    const count = await Product.countDocuments({
      ...nameFilter,
      ...categoryFilter,
    });
    const products = await Product.find({
      ...nameFilter,
      ...categoryFilter,
      $or:
        rangeFilterGte || rangeFilterLte
          ? [
              { price: { $gte: rangeFilterGte } },
              { price: { $lte: rangeFilterLte } },
            ]
          : [{ price: { $gte: 0 } }],
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(
        sortPrice || sortRating
          ? { price: sortPrice, rating: sortRating }
          : { _id: -1 }
      );
    res.send({ products, page, pages: Math.ceil(count / pageSize) });
  })
);
// FILTER PRODUCT SALE
productRoute.get(
  "/filterSaleProduct",
  asyncHandler(async (req, res) => {
    const limit = req.query.limit || 4;
    const products = await Product.find({ discount: { $gt: 10 } });
    res.json({ products });
  })
);

//ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PAGENATION

productRoute.get(
  "/all",
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
    const keywordCategory = req.query.category
      ? {
          category: {
            $regex: req.query.category,
            $options: "i",
          },
        }
      : {};

    const prices = req.query.sortPrice || null;
    // const categorie = req.query.sortCategory || null;
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Product.countDocuments({
      ...keyword,
      ...keywordCategory,
    });
    const products = await Product.find({ ...keyword, ...keywordCategory })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(!prices ? { _id: -1 } : { price: prices });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

//ADMIN PAGINATION HIGH
productRoute.get(
  "/allSortHigh",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Product.countDocuments({});
    const products = await Product.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ price: -1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

productRoute.get(
  "/allProduct",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 });
    res.json(products);
  })
);

//GET SINGLE PRODUCT
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  })
);

//PRODUCT REVIEW
productRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already Reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.review.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

//DELETE  PRODUCT
productRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  })
);

//CREATE  PRODUCT
productRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, countInStock, images, category } =
      req.body;
    const productExists = await Product.findOne({ name });
    if (productExists) {
      res.status(400);
      throw new Error("Product name already exist");
    } else {
      const product = new Product({
        name,
        price,
        description,
        countInStock,
        user: req.user._id,
        images,
        category,
      });
      if (product) {
        const createdproduct = await product.save();
        res.status(201).json(createdproduct);
      } else {
        res.status(400);
        throw new Error("Invalid product data");
      }
    }
  })
);

//CONVERT CURRENCY USD TO VND
productRoute.post(
  "/currencyVND",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    await products.map((product) => {
      product.price = Math.ceil(product.price * 23000).toFixed(2);
      return product;
    });
    if (products) {
      res.json({ products });
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  })
);

//CONVERT CURRENCY USD TO VND
productRoute.post(
  "/currencyUSD",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    await products.map((product) => {
      product.price = Math.ceil(product.price).toFixed(2);
      return product;
    });
    if (products) {
      res.json({ products });
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  })
);

//UPDATE PRODUCT
productRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, countInStock, images, category } =
      req.body;
    const product = await Product.findById(req.params.id);
    const productExists = await Product.findOne({ name });
    if (productExists) {
      res.status(400);
      throw new Error("Product name must be edit");
    } else if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.countInStock = countInStock || product.countInStock;
      product.images = images || product.images;
      product.category = category || product.category;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  })
);

productRoute.get(
  "/sortCreatedAt/sort",
  asyncHandler(async (req, res) => {
    try {
      const pageSize = Number(req.query.limit) || 4;
      const stream = Number(req.query.stream) || -1;
      const page = Number(req.query.page) || 1;
      const count = await Product.countDocuments({});
      const products = await Product.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ createdAt: stream });
      res.json({ products, pages: Math.ceil(count / pageSize), page });
    } catch (error) {
      res.status(404);
      throw new Error("product not found");
    }
  })
);
// GET RANDOM PRODUCT
productRoute.get(
  "/getRandomProduct/random",
  asyncHandler(async (req, res) => {
    try {
      const count = await Product.countDocuments();
      let random = Math.floor(Math.random() * count);
      const products = await Product.findOne().skip(random);
      res.json(products);
    } catch (error) {
      res.status(404);
      throw new Error("product not found");
    }
  })
);

export default productRoute;
