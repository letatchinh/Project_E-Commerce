import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    images: [String],
    description: {
      type: String,
      require: true,
    },
    reviews: [],
    rating: {
      type: Number,
      require: true,
      default: 0,
    },
    newPrice: {
      type: Number,
      require: true,
      default: function () {
        return parseFloat(
          (this.price - (this.price * this.discount) / 100).toFixed(2)
        );
      },
    },
    pricePure: {
      type: Number,
      require: true,
      default: function () {
        return (this.price * 80) / 100;
      },
    },
    numReviews: {
      type: Number,
      require: true,
      default: 0,
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      require: true,
      default: 0,
    },
    category: {
      type: String,
      require: true,
    },
    discount: {
      type: Number,
      require: true,
      default: 0,
    },
    quantitySold: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
