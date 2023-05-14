import express from "express";
import asyncHandler from "express-async-handler";
import Product from "./../Models/ProductModel.js";
import { admin, protect } from "./../MiddelWare/AuthMiddleware.js";

const productRoute = express.Router();
productRoute.delete(
  "/deleteAll",
  asyncHandler(async (req, res) => {
    await Product.deleteMany({});
      res.json({ message: "deleted" });
  })
);
// USER
//GET ALL PRODUCT
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 });
    const length = products.length;
    res.json(length);
  })
);
//FIlter
productRoute.get(
  "/search",
  asyncHandler(async (req, res) => {
    const pageSize = Number(req.query.limit) || 8;
    const sortNew = (req.query.sortNew)
    const sortSold = req.query.sortSold
    const name = req.query.name || "";
    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};

    const category = req.query.category || "";
    const categoryFilter = category
      ? { category: { $regex: category, $options: "i" } }
      : {};
    const sortPrice = Number(req.query.sortPrice);
    const sortRating = Number(req.query.sortRating);
    const rangeFilterGte = Number(req.query.rangeFilterGte) || 0;
    const rangeFilterLte = Number(req.query.rangeFilterLte) || null;
    const rangeFilterGteRating = Number(req.query.rangeFilterGteRating) || null;
    const page = Number(req.query.page) || 1;
    const count = await Product.countDocuments({
      ...nameFilter,
      ...categoryFilter,
      $and : [
        { newPrice :
           rangeFilterLte
            ? {$gte : rangeFilterGte , $lte : rangeFilterLte}
            : { $gte: 0 } ,},
      { $or:
        rangeFilterGteRating
          ? [
              { rating: { $gte: rangeFilterGteRating } },
            ]
          : [{ rating: { $gte: 0 } }],}
      ]
    });
    const products = await Product.find({
      ...nameFilter,
      ...categoryFilter,
      $and : [
        { newPrice :
          rangeFilterLte
            ? {$gte : rangeFilterGte , $lte : rangeFilterLte}
            :  { $gte: 0 } ,},
      { $or:
        rangeFilterGteRating
          ? [
              { rating: { $gte: rangeFilterGteRating } },
            ]
          : [{ rating: { $gte: 0 } }],}
      ]
     
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(
        sortPrice && sortRating
          ? { price: sortPrice, rating: sortRating }
          : sortPrice
          ? { price: sortPrice }
          : sortRating
          ? { rating: sortRating }
          : sortNew !== 'false' ? {createdAt : -1} 
          : sortSold  !== 'false'? {quantitySold : -1}
          : {}
      );
    res.send({ products, page, pages: Math.ceil(count / pageSize), count });
    // const arr = products.find()
  })
);
productRoute.get(
  "/searchOnKeyUp",
  asyncHandler(async (req, res) => {
    const pageSize = Number(req.query.limit) || 8;
    const name = req.query.name || "";
    if (name !== "") {
      const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
      const page = Number(req.query.page) || 1;
      const products = await Product.find({
        ...nameFilter,
      })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ _id: -1 });
      res.send({ products });
    } else {
      res.send({ products: [] });
    }
    // const arr = products.find()
  })
);

// FILTER PRODUCT SALE (best seller)
productRoute.get(
  "/filterSaleProduct",
  asyncHandler(async (req, res) => {
    const limit = Number(req.query.limit) || 4;
    const page = Number(req.query.page) || 1;
    const count = await Product.countDocuments({ discount: { $gte: 1 } });
    const products = await Product.find({ discount: { $gte: 1 } })
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ discount: -1 });
    res.json({ products, page, pages: Math.ceil(count / limit), count });
  })
);

// FILTER PRODUCT NEW
productRoute.get(
  "/filterNewProduct",
  asyncHandler(async (req, res) => {
    const limit = Number(req.query.limit) || 4;
    const page = Number(req.query.page) || 1;
    const count = 16;
    // const count = Product.countDocuments({}) || 10
    const products = await Product.find({})
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ createdAt: -1 });
    res.json({ products, page, pages: Math.ceil(count / limit), count });
  })
);

// Update Product
productRoute.put(
  "/updateProduct",
  asyncHandler(async (req, res) => {
    const product = req.body;
    const products = await Product.findOne({ _id: product.product });
    if (products) {
      products.countInStock = products.countInStock - product.qty;
      products.quantitySold =
        products.quantitySold + product.qty || products.quantitySold;
      if (products.countInStock < 0) {
        res.status(401);
        throw new Error("out of stock");
      } else {
        await products.save();
        res.json(products);
      }
    } else {
      res.status(401);
      throw new Error("not found Product");
    }
  })
);

// FILTER PRODUCT HOT
productRoute.get(
  "/filterHotProduct",
  asyncHandler(async (req, res) => {
    const limit = Number(req.query.limit) || 4;
    const page = Number(req.query.page) || 1;
    const count = await Product.countDocuments({ quantitySold: { $gte: 5 } });
    const products = await Product.find({ quantitySold: { $gte: 5 } })
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ quantitySold: -1 });
    res.json({ products, page, pages: Math.ceil(count / limit), count });
  })
);

// Check countInStock
productRoute.post(
  "/checkCountInStock",
  asyncHandler(async (req, res) => {
    const productsId = req.body.map((e) => e.product);
    const productsQty = req.body.map((e) => e.quanlity);
    let p = [];
    const product = await Product.find({ _id: { $in: productsId } });
    product.forEach((e, i) => {
      if (e.countInStock < productsQty[i]) {
        p.push(e);
      }
    });
    if (p.length !== 0) {
      res.json({ status: false, listOutOfStock: p });
    } else {
    }
    res.json({ status: true });
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

// ADMIN

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
    // const keywordQuantitySold = req.query.quantitySold
    //   ? {
    //       quantitySold: { $gte: req.query.quantitySold },
    //     }
    //   : {};
    const keywordQuantitySold = req.query.quantitySold || null ; 

    const prices = req.query.sortPrice || null;

    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Product.countDocuments({
      ...keyword,
      ...keywordCategory,
      ...keywordQuantitySold,
    });
    const products = await Product.find({
      ...keyword,
      ...keywordCategory,
      ...keywordQuantitySold,
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      // .sort(!prices ? { _id: -1 } : { price: prices });
      .sort(prices ? { price: prices } : keywordQuantitySold ? { quantitySold: keywordQuantitySold } : { price: prices, quantitySold: keywordQuantitySold } || { _id: -1 })
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

// PRODUCT NO PAGENITION : USE FOR COUNT PRODUCT IN EACH CATEGORY, SUM PRODUCT IN DASHBOARD, EXCHANGE CURRENCY
productRoute.get(
  "/allProduct",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 });
    res.json(products);
  })
);

//GET SINGLE PRODUCT (USER AND ADMIN USE)
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
    const {
      name,
      price,
      description,
      countInStock,
      images,
      category,
      discount,
    } = req.body;
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
        discount,
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
    const {
      name,
      price,
      description,
      countInStock,
      images,
      category,
      discount,
      quantitySold,
    } = req.body;
    const product = await Product.findById(req.params.id);
    const productExists = await Product.findOne({ name , _id : {$ne : req.params.id} });
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
      product.discount = discount || product.discount;
      product.quantitySold = quantitySold || product.quantitySold;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  })
);

export default productRoute;
